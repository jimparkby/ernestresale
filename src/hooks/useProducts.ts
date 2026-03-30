import { useState, useEffect, useCallback } from "react";

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

export const useProducts = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const { products: data } = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

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
  }) => {
    // Upload image first
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64: payload.base64Image, user_id: payload.seller_id }),
    });
    const { url } = await uploadRes.json();

    // Create product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, image_url: url }),
    });
    const { product } = await res.json();

    // Refresh list
    await fetchProducts();
    return product;
  };

  return { products, loading, addProduct, refetch: fetchProducts };
};
