import { useState } from "react";
import { Product } from "@/data/products";

const STORAGE_KEY = "ernestresale_user_products";

export interface UserProduct extends Omit<Product, "sellerId" | "sellerName"> {
  sellerId: number;
  sellerName: string;
  isUserProduct: true;
}

function load(): UserProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useUserProducts = (userId?: number) => {
  const [userProducts, setUserProducts] = useState<UserProduct[]>(load);

  const addProduct = (product: Omit<UserProduct, "id" | "likes" | "isUserProduct">) => {
    const newProduct: UserProduct = {
      ...product,
      id: Date.now(),
      likes: 0,
      isUserProduct: true,
    };
    setUserProducts((prev) => {
      const next = [newProduct, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const myProducts = userId ? userProducts.filter((p) => p.sellerId === userId) : [];

  return { userProducts, myProducts, addProduct };
};
