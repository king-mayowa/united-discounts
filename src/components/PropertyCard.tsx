import type { PropertyWithMetrics } from "@/types/property";
import { formatPrice, formatDate, formatDropPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface PropertyCardProps {
  property: PropertyWithMetrics;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const hasDrop = property.dropPercent > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-all duration-200 hover:-translate-y-1 hover:border-gold/35">
      {/* Image */}
      <div className="relative h-[195px] overflow-hidden bg-bg-elevated">
        <img
          src={property.imageUrl}
          alt={property.address}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {hasDrop && (
            <Badge variant="drop">
              -{formatDropPercent(property.dropPercent)}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="supplier">{property.supplier}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {/* Postcode */}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
          {property.postcode}
        </span>

        {/* Address */}
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-text-primary">
          {property.address}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[12px] text-text-muted">
          <span className="flex items-center gap-1">
            <BedIcon />
            {property.bedrooms} bed
          </span>
          <span>{property.type}</span>
          {property.furnished !== null && (
            <span>{property.furnished ? "Furnished" : "Unfurnished"}</span>
          )}
        </div>

        {/* Price */}
        <div className="mt-1">
          <span className="font-heading text-[26px] leading-none text-text-primary">
            {formatPrice(property.currentPrice)}
          </span>
          <span className="ml-1 text-xs text-text-muted">/mo</span>
        </div>

        {/* Drop info */}
        {hasDrop && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-muted line-through">
              {formatPrice(property.originalPrice)}
            </span>
            <span className="text-xs font-semibold text-drop">
              Save {formatPrice(property.dropAmount)}/mo
            </span>
            {property.dealScore !== "NONE" && (
              <Badge variant="deal" dealScore={property.dealScore}>
                {property.dealScore} DEAL
              </Badge>
            )}
          </div>
        )}

        {/* Date */}
        <div className="mt-auto text-[11px] text-text-muted">
          Listed {formatDate(property.dateListed)}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-3.5 py-2.5">
        <span className="truncate text-[12px] text-text-muted">
          {property.estateAgent}
        </span>
        <a
          href={property.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded bg-gold px-3 py-1 text-[11px] font-bold uppercase text-black transition-colors hover:bg-gold-light"
        >
          View &rarr;
        </a>
      </div>
    </div>
  );
}

function BedIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 17V8h2V6a2 2 0 012-2h14a2 2 0 012 2v2h2v9m-22 0v2m22-2v2M6 8h12a2 2 0 012 2v2H4v-2a2 2 0 012-2z"
      />
    </svg>
  );
}
