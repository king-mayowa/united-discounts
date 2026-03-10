import { queryProperties, upsertProperty } from "@/lib/firestore";
import type { PropertyWithMetrics } from "@/types/property";
import type { PropertyFilters } from "@/types/filters";
import { supplierRegistry } from "@/suppliers";

export async function getProperties(filters: PropertyFilters): Promise<{
  properties: PropertyWithMetrics[];
  stats: {
    totalCount: number;
    dropsCount: number;
    biggestDrop: number;
  };
}> {
  const properties = await queryProperties(filters);
  const dropsOnly = properties.filter((p) => p.dropPercent > 0);

  return {
    properties,
    stats: {
      totalCount: properties.length,
      dropsCount: dropsOnly.length,
      biggestDrop:
        dropsOnly.length > 0
          ? Math.max(...dropsOnly.map((p) => p.dropPercent))
          : 0,
    },
  };
}

export async function ingestFromAllSuppliers(): Promise<{
  total: number;
  bySupplier: Record<string, number>;
}> {
  const suppliers = supplierRegistry.getAll();
  const bySupplier: Record<string, number> = {};
  let total = 0;

  for (const supplier of suppliers) {
    const properties = await supplier.fetchProperties();
    for (const property of properties) {
      await upsertProperty(property);
    }
    bySupplier[supplier.name] = properties.length;
    total += properties.length;
  }

  return { total, bySupplier };
}
