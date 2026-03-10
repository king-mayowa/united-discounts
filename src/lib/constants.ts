export const CITIES = ["London"] as const;

export const PROPERTY_TYPES = [
  "All",
  "Flat",
  "Detached",
  "Semi-detached",
  "Terraced",
  "Bungalow",
  "Maisonette",
  "Studio",
] as const;

export const SORT_OPTIONS = [
  { value: "drop_desc", label: "Biggest Drops" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "date_desc", label: "Newest First" },
] as const;

export const SCRAPE_INTERVAL_MS = 3_600_000; // 1 hour

export const PROPERTIES_COLLECTION = "properties";
