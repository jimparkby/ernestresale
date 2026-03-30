import { useState, useEffect } from "react";
import { useTelegram } from "@/context/TelegramContext";

export const useLikes = () => {
  const { user } = useTelegram();
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  // Load user's likes from backend
  useEffect(() => {
    if (!user) return;
    fetch(`/api/likes?user_id=${user.id}`)
      .then((r) => r.json())
      .then(({ liked_ids }) => {
        if (Array.isArray(liked_ids)) setLikedIds(new Set(liked_ids));
      })
      .catch(() => {});
  }, [user?.id]);

  const toggleLike = async (productId: number) => {
    if (!user) return;
    const isCurrentlyLiked = likedIds.has(productId);

    // Optimistic update
    setLikedIds((prev) => {
      const next = new Set(prev);
      isCurrentlyLiked ? next.delete(productId) : next.add(productId);
      return next;
    });

    try {
      await fetch("/api/likes", {
        method: isCurrentlyLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: productId }),
      });
    } catch {
      // Revert on error
      setLikedIds((prev) => {
        const next = new Set(prev);
        isCurrentlyLiked ? next.add(productId) : next.delete(productId);
        return next;
      });
    }
  };

  const isLiked = (productId: number) => likedIds.has(productId);

  return { toggleLike, isLiked };
};
