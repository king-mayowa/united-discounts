import type { PropertySupplier } from "../types";
import type { Property } from "@/types/property";

export class RightmoveSupplier implements PropertySupplier {
  readonly name = "rightmove";
  readonly displayName = "Rightmove";

  async fetchProperties(): Promise<Property[]> {
    // TODO: Implement actual Rightmove data fetching
    // This could be via scraping, a third-party API, or RSS feeds.
    // For now, returns empty — data is seeded via the seed endpoint
    // and read directly from Firestore.
    return [];
  }
}
