import type { Property } from "@/types/property";

export interface PropertySupplier {
  readonly name: string;
  readonly displayName: string;
  fetchProperties(): Promise<Property[]>;
}
