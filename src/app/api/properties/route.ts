import { NextRequest, NextResponse } from "next/server";
import { getProperties } from "@/services/propertyService";
import type { PropertyFilters, SortOption } from "@/types/filters";
import type { PropertyType } from "@/types/property";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: PropertyFilters = {
      supplier: searchParams.get("supplier") || undefined,
      city: searchParams.get("city") || undefined,
      type: (searchParams.get("type") as PropertyType) || undefined,
      minPrice: searchParams.has("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.has("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      minBedrooms: searchParams.has("minBedrooms")
        ? Number(searchParams.get("minBedrooms"))
        : undefined,
      sort: (searchParams.get("sort") as SortOption) || "drop_desc",
    };

    const { properties, stats } = await getProperties(filters);

    return NextResponse.json({
      data: properties,
      count: properties.length,
      stats,
      filters,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
