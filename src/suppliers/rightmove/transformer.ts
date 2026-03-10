import type { Property, PropertyType } from "@/types/property";
import type { RightmoveRawListing } from "./types";

const RIGHTMOVE_BASE_URL = "https://www.rightmove.co.uk";

export function transformRightmoveListing(
  raw: RightmoveRawListing,
  sourceUrl: string
): Property {
  const now = new Date().toISOString();
  return {
    id: `rightmove_${raw.id}`,
    currentPrice: raw.price.amount,
    originalPrice: raw.price.amount,
    imageUrl: raw.propertyImages.mainImageSrc,
    estateAgent: raw.customer.brandTradingName,
    address: raw.displayAddress,
    postcode: extractPostcode(raw.displayAddress),
    externalUrl: `${RIGHTMOVE_BASE_URL}${raw.propertyUrl}`,
    city: "London",
    dateListed: raw.firstVisibleDate,
    furnished: null,
    bedrooms: raw.bedrooms,
    description: raw.summary,
    type: mapPropertyType(raw.propertySubType),
    createdAt: now,
    updatedAt: now,
    supplier: "rightmove",
    urlSource: sourceUrl,
  };
}

function extractPostcode(address: string): string {
  const match = address.match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i);
  return match ? match[0].toUpperCase() : "";
}

function mapPropertyType(subType: string): PropertyType {
  const mapping: Record<string, PropertyType> = {
    Flat: "Flat",
    Apartment: "Flat",
    Detached: "Detached",
    "Semi-Detached": "Semi-detached",
    Terraced: "Terraced",
    "End of Terrace": "Terraced",
    Bungalow: "Bungalow",
    Maisonette: "Maisonette",
    Studio: "Studio",
  };
  return mapping[subType] || "Other";
}
