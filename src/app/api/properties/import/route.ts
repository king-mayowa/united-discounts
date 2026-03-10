import { NextRequest, NextResponse } from "next/server";
import { upsertProperty } from "@/lib/firestore";
import { supplierRegistry } from "@/suppliers";
import type { Property } from "@/types/property";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { supplier: supplierName, properties: rawProperties } = body as {
      supplier: string;
      properties: unknown[];
    };

    if (!supplierName || !rawProperties?.length) {
      return NextResponse.json(
        { error: "Missing supplier name or properties array" },
        { status: 400 }
      );
    }

    const supplier = supplierRegistry.get(supplierName);
    if (!supplier) {
      return NextResponse.json(
        {
          error: `Unknown supplier: ${supplierName}`,
          available: supplierRegistry.getNames(),
        },
        { status: 400 }
      );
    }

    let imported = 0;
    for (const raw of rawProperties) {
      const property = raw as Property;
      await upsertProperty(property);
      imported++;
    }

    return NextResponse.json({
      message: `Imported ${imported} properties from ${supplierName}`,
      imported,
    });
  } catch (error) {
    console.error("Error importing properties:", error);
    return NextResponse.json(
      { error: "Failed to import properties" },
      { status: 500 }
    );
  }
}
