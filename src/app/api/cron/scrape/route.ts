import { NextRequest, NextResponse } from "next/server";
import { ingestFromAllSuppliers } from "@/services/propertyService";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await ingestFromAllSuppliers();
    return NextResponse.json({
      message: "Scrape completed",
      ...result,
    });
  } catch (error) {
    console.error("Error running scrape cron:", error);
    return NextResponse.json(
      { error: "Scrape failed" },
      { status: 500 }
    );
  }
}
