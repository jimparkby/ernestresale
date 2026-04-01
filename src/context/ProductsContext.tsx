import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { seedProducts, ME } from "@/data/seed";
import { useTelegram } from "@/context/TelegramContext";

export interface DBProduct {
  id: number;
  seller_id: number;
  brand: string;
  name: string;
  price: string;
  condition: string;
  material: string;
  description: string;
  image_url: string;
  likes_count: number;
  created_at: string;
  users: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    city: string;
  };
}

interface ProductsContextValue {
  products: DBProduct[];
  loading: boolean;
  addProduct: (payload: {
    seller_id: number;
    brand: string;
    name: string;
    price: string;
    condition: string;
    material: string;
    description: string;
    base64Image: string;
  }) => Promise<DBProduct>;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useTelegram();
  const [products, setProducts] = useState<DBProduct[]>(seedProducts);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const { products: data } = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const dbIds = new Set(data.map((p: DBProduct) => p.id));
        const onlySeed = seedProducts.filter((p) => !dbIds.has(p.id));
        setProducts([...data, ...onlySeed]);
      }
    } catch {
      // API not ready — keep showing current products
    } finally {
      setLoading(false);
    }
  }, []);

  // Update seed seller_id to real user when available
  useEffect(() => {
    if (user) {
      setProducts((prev) =>
        prev.map((p) =>
          p.seller_id === ME.id
            ? {
                ...p,
                seller_id: user.id,
                users: {
                  ...p.users,
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  username: user.username,
                },
              }
            : p
        )
      );
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (payload: {
    seller_id: number;
    brand: string;
    name: string;
    price: string;
    condition: string;
    material: string;
    description: string;
    base64Image: string;
  }): Promise<DBProduct> => {
    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: payload.base64Image, user_id: payload.seller_id }),
      });
      const { url } = await uploadRes.json();

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, image_url: url }),
      });
      const { product } = await res.json();
      await fetchProducts();
      return product;
    } catch {
      // Fallback: add immediately to shared state so profile sees it right away
      const localProduct: DBProduct = {
        id: Date.now(),
        seller_id: payload.seller_id,
        brand: payload.brand,
        name: payload.name,
        price: payload.price,
        condition: payload.condition,
        material: payload.material,
        description: payload.description,
        image_url: payload.base64Image,
        likes_count: 0,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id ?? payload.seller_id,
          first_name: user?.first_name ?? "Я",
          last_name: user?.last_name,
          username: user?.username,
          city: user?.city ?? "",
        },
      };
      // Prepend so it shows at top
      setProducts((prev) => [localProduct, ...prev]);
      return localProduct;
    }
  };

  return (
    <ProductsContext.Provider value={{ products, loading, addProduct, refetch: fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProductsContext must be used inside ProductsProvider");
  return ctx;
};
