import type { DealScore } from "@/types/property";

type BadgeVariant = "drop" | "deal" | "supplier" | "new";

interface BadgeProps {
  variant: BadgeVariant;
  dealScore?: DealScore;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  drop: "bg-drop text-white",
  supplier: "bg-bg-elevated/80 text-text-muted border border-border",
  new: "bg-gold text-black",
};

function getDealStyles(score?: DealScore): string {
  switch (score) {
    case "HOT":
      return "bg-[var(--deal-hot)] text-white";
    case "WARM":
      return "bg-[var(--deal-warm)] text-white";
    case "FAIR":
      return "bg-[var(--deal-fair)] text-white";
    default:
      return "hidden";
  }
}

export function Badge({ variant, dealScore, children }: BadgeProps) {
  const styles =
    variant === "deal"
      ? getDealStyles(dealScore)
      : variantStyles[variant] || "";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}
