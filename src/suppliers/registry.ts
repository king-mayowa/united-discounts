import type { PropertySupplier } from "./types";

class SupplierRegistry {
  private suppliers: Map<string, PropertySupplier> = new Map();

  register(supplier: PropertySupplier): void {
    this.suppliers.set(supplier.name, supplier);
  }

  get(name: string): PropertySupplier | undefined {
    return this.suppliers.get(name);
  }

  getAll(): PropertySupplier[] {
    return Array.from(this.suppliers.values());
  }

  getNames(): string[] {
    return Array.from(this.suppliers.keys());
  }
}

export const supplierRegistry = new SupplierRegistry();
