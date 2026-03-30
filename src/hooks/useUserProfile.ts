import { useState } from "react";

const STORAGE_KEY = "ernestresale_profile";

interface Profile {
  city: string;
  paymentInfo: string;
}

function load(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { city: "", paymentInfo: "" };
  } catch {
    return { city: "", paymentInfo: "" };
  }
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<Profile>(load);

  const saveProfile = (updates: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { profile, saveProfile };
};
