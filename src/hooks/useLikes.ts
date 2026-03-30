import { useState } from "react";
import { products as baseProducts } from "@/data/products";

const STORAGE_KEY = "ernestresale_likes";
const COUNTS_KEY = "ernestresale_likes_counts";

function loadLikedIds(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function loadCounts(): Record<number, number> {
  try {
    const raw = localStorage.getItem(COUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const useLikes = () => {
  const [likedIds, setLikedIds] = useState<Set<number>>(loadLikedIds);
  const [overrides, setOverrides] = useState<Record<number, number>>(loadCounts);

  const getLikeCount = (productId: number) => {
    if (overrides[productId] !== undefined) return overrides[productId];
    return baseProducts.find((p) => p.id === productId)?.likes ?? 0;
  };

  const toggleLike = (productId: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      const base = baseProducts.find((p) => p.id === productId)?.likes ?? 0;
      const current = overrides[productId] ?? base;

      let newCount: number;
      if (next.has(productId)) {
        next.delete(productId);
        newCount = Math.max(0, current - 1);
      } else {
        next.add(productId);
        newCount = current + 1;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));

      setOverrides((prevO) => {
        const nextO = { ...prevO, [productId]: newCount };
        localStorage.setItem(COUNTS_KEY, JSON.stringify(nextO));
        return nextO;
      });

      return next;
    });
  };

  const isLiked = (productId: number) => likedIds.has(productId);

  return { toggleLike, isLiked, getLikeCount };
};
