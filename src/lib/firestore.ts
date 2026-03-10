import { getDb } from "./firebase";
import type { Property, PropertyWithMetrics } from "@/types/property";
import type { PropertyFilters } from "@/types/filters";
import { PROPERTIES_COLLECTION } from "./constants";
import { enrichWithMetrics } from "./utils";

export async function queryProperties(
  filters: PropertyFilters
): Promise<PropertyWithMetrics[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection(PROPERTIES_COLLECTION);

  if (filters.supplier) {
    query = query.where("supplier", "==", filters.supplier);
  }
  if (filters.city) {
    query = query.where("city", "==", filters.city);
  }
  if (filters.type) {
    query = query.where("type", "==", filters.type);
  }
  if (filters.minBedrooms !== undefined) {
    query = query.where("bedrooms", ">=", filters.minBedrooms);
  }

  if (
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  ) {
    if (filters.minPrice !== undefined) {
      query = query.where("currentPrice", ">=", filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.where("currentPrice", "<=", filters.maxPrice);
    }
    query = query.orderBy("currentPrice", "desc");
  } else {
    query = query.orderBy("updatedAt", "desc");
  }

  query = query.limit(200);

  const snapshot = await query.get();
  const properties: PropertyWithMetrics[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    const property: Property = {
      id: doc.id,
      currentPrice: data.currentPrice,
      originalPrice: data.originalPrice,
      imageUrl: data.imageUrl,
      estateAgent: data.estateAgent,
      address: data.address,
      postcode: data.postcode,
      externalUrl: data.externalUrl,
      city: data.city,
      dateListed: toISOString(data.dateListed),
      furnished: data.furnished ?? null,
      bedrooms: data.bedrooms,
      description: data.description,
      type: data.type,
      createdAt: toISOString(data.createdAt),
      updatedAt: toISOString(data.updatedAt),
      supplier: data.supplier,
      urlSource: data.urlSource,
    };
    return enrichWithMetrics(property);
  });

  return sortProperties(properties, filters.sort);
}

export async function upsertProperty(property: Property): Promise<void> {
  const db = getDb();
  const docRef = db.collection(PROPERTIES_COLLECTION).doc(property.id);
  const existing = await docRef.get();

  if (existing.exists) {
    const existingData = existing.data()!;
    await docRef.update({
      currentPrice: property.currentPrice,
      imageUrl: property.imageUrl,
      description: property.description,
      furnished: property.furnished,
      updatedAt: new Date().toISOString(),
      // Preserve originalPrice from the first time we saw this listing
      originalPrice: existingData.originalPrice,
    });
  } else {
    await docRef.set({
      ...property,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}

function toISOString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate(): Date }).toDate().toISOString();
  }
  return new Date().toISOString();
}

function sortProperties(
  properties: PropertyWithMetrics[],
  sort?: string
): PropertyWithMetrics[] {
  const sorted = [...properties];
  switch (sort) {
    case "drop_desc":
      return sorted.sort((a, b) => b.dropPercent - a.dropPercent);
    case "drop_asc":
      return sorted.sort((a, b) => a.dropPercent - b.dropPercent);
    case "price_asc":
      return sorted.sort((a, b) => a.currentPrice - b.currentPrice);
    case "price_desc":
      return sorted.sort((a, b) => b.currentPrice - a.currentPrice);
    case "date_desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime()
      );
    case "date_asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime()
      );
    default:
      return sorted.sort((a, b) => b.dropPercent - a.dropPercent);
  }
}
