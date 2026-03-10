export interface Property {
  id: string;
  currentPrice: number;
  originalPrice: number;
  imageUrl: string;
  estateAgent: string;
  address: string;
  postcode: string;
  externalUrl: string;
  city: string;
  dateListed: string;
  furnished: boolean | null;
  bedrooms: number;
  description: string;
  type: PropertyType;
  createdAt: string;
  updatedAt: string;
  supplier: string;
  urlSource: string;
}

export type PropertyType =
  | "Flat"
  | "Detached"
  | "Semi-detached"
  | "Terraced"
  | "Bungalow"
  | "Maisonette"
  | "Studio"
  | "Other";

export interface PropertyWithMetrics extends Property {
  dropPercent: number;
  dropAmount: number;
  dealScore: DealScore;
}

export type DealScore = "HOT" | "WARM" | "FAIR" | "NONE";
