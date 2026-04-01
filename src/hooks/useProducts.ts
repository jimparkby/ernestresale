// Re-export DBProduct type for backwards compatibility
export type { DBProduct } from "@/context/ProductsContext";

// useProducts is now a thin wrapper over the shared ProductsContext
// so all components see the same product list (fixes: new products not
// appearing in Profile after adding them in AddProduct)
export { useProductsContext as useProducts } from "@/context/ProductsContext";
