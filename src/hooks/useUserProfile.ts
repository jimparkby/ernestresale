import { useTelegram } from "@/context/TelegramContext";

export const useUserProfile = () => {
  const { user, updateUser } = useTelegram();

  const saveProfile = async (updates: { city?: string; payment_info?: string }) => {
    if (!user) return;

    // Optimistic update
    updateUser(updates);

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, ...updates }),
    });
  };

  return {
    profile: { city: user?.city ?? "", paymentInfo: user?.payment_info ?? "" },
    saveProfile,
  };
};
