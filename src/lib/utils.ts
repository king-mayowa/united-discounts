import type { DealScore } from "@/types/property";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDropPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function getDealScoreColor(score: DealScore): string {
  switch (score) {
    case "HOT":
      return "var(--deal-hot)";
    case "WARM":
      return "var(--deal-warm)";
    case "FAIR":
      return "var(--deal-fair)";
    default:
      return "transparent";
  }
}

export function calculateDropPercent(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= 0) return 0;
  const drop = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(drop * 10) / 10;
}

export function calculateDealScore(dropPercent: number): DealScore {
  if (dropPercent >= 20) return "HOT";
  if (dropPercent >= 10) return "WARM";
  if (dropPercent >= 5) return "FAIR";
  return "NONE";
}

export function enrichWithMetrics<
  T extends { originalPrice: number; currentPrice: number },
>(
  property: T
): T & { dropPercent: number; dropAmount: number; dealScore: DealScore } {
  const dropAmount = property.originalPrice - property.currentPrice;
  const dropPercent = calculateDropPercent(
    property.originalPrice,
    property.currentPrice
  );
  return {
    ...property,
    dropAmount,
    dropPercent,
    dealScore: calculateDealScore(dropPercent),
  };
}
