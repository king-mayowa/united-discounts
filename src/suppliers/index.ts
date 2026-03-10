import { supplierRegistry } from "./registry";
import { RightmoveSupplier } from "./rightmove";

supplierRegistry.register(new RightmoveSupplier());

// Future suppliers:
// supplierRegistry.register(new ZooplaSupplier());
// supplierRegistry.register(new PrimeLocationSupplier());
// supplierRegistry.register(new OnTheMarketSupplier());

export { supplierRegistry };
