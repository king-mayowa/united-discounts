import type { PropertyWithMetrics } from "@/types/property";
import { PropertyCard } from "./PropertyCard";

interface PropertyGridProps {
  properties: PropertyWithMetrics[];
  loading: boolean;
}

export function PropertyGrid({ properties, loading }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="font-heading text-4xl text-text-muted">
          No properties found
        </div>
        <p className="mt-2 text-sm text-text-muted">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-5">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-border bg-bg-card">
      <div className="h-[195px] bg-bg-elevated" />
      <div className="space-y-3 p-3.5">
        <div className="h-3 w-16 rounded bg-bg-elevated" />
        <div className="h-4 w-3/4 rounded bg-bg-elevated" />
        <div className="h-3 w-1/2 rounded bg-bg-elevated" />
        <div className="h-8 w-24 rounded bg-bg-elevated" />
      </div>
      <div className="border-t border-border px-3.5 py-2.5">
        <div className="h-3 w-20 rounded bg-bg-elevated" />
      </div>
    </div>
  );
}
