import type { PropertyType } from "./property";

export interface PropertyFilters {
  supplier?: string;
  city?: string;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  sort?: SortOption;
}

export type SortOption =
  | "drop_desc"
  | "drop_asc"
  | "price_asc"
  | "price_desc"
  | "date_desc"
  | "date_asc";
