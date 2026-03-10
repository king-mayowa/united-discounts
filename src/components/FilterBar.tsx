"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PROPERTY_TYPES, SORT_OPTIONS } from "@/lib/constants";

export function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeType = searchParams.get("type") || "All";
  const activeSort = searchParams.get("sort") || "drop_desc";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => updateParam("type", type)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeType === type
                ? "bg-gold text-black"
                : "border border-border bg-bg-card text-text-muted hover:border-gold/30 hover:text-text-primary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <select
        value={activeSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-lg border border-border bg-bg-card px-3 py-1.5 text-xs text-text-primary outline-none focus:border-gold/50"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
