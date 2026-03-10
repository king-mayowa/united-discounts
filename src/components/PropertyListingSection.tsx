"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FilterBar } from "./FilterBar";
import { PropertyGrid } from "./PropertyGrid";
import type { PropertyWithMetrics } from "@/types/property";

interface PropertyListingSectionProps {
  onStatsUpdate?: (stats: {
    totalCount: number;
    dropsCount: number;
    biggestDrop: number;
  }) => void;
}

function PropertyListingInner({ onStatsUpdate }: PropertyListingSectionProps) {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<PropertyWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const res = await fetch(`/api/properties?${params}`);
      const json = await res.json();
      setProperties(json.data || []);
      if (onStatsUpdate && json.stats) {
        onStatsUpdate(json.stats);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, onStatsUpdate]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <>
      <FilterBar />
      <PropertyGrid properties={properties} loading={loading} />
    </>
  );
}

export function PropertyListingSection(props: PropertyListingSectionProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <Suspense
        fallback={
          <PropertyGrid properties={[]} loading={true} />
        }
      >
        <PropertyListingInner {...props} />
      </Suspense>
    </section>
  );
}
