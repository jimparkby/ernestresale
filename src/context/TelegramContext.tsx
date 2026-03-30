import { createContext, useContext, useEffect, useState } from "react";

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  city: string;
  payment_info: string;
}

interface TelegramContextValue {
  user: TelegramUser | null;
  isReady: boolean;
  updateUser: (updates: Partial<TelegramUser>) => void;
}

const TelegramContext = createContext<TelegramContextValue>({
  user: null,
  isReady: false,
  updateUser: () => {},
});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const tg = (window as any).Telegram?.WebApp;
      let initData = "";
      let tgUser: any = null;

      if (tg) {
        tg.ready();
        tg.expand();
        // Request fullscreen (Telegram 7.8+)
        if (tg.requestFullscreen) tg.requestFullscreen();
        initData = tg.initData;
        tgUser = tg.initDataUnsafe?.user ?? null;
      }

      // Dev fallback — not in Telegram
      if (!initData && !tgUser) {
        setUser({
          id: 100000001,
          first_name: "Александр",
          last_name: "К.",
          username: "alexk",
          photo_url: undefined,
          city: "",
          payment_info: "",
        });
        setIsReady(true);
        return;
      }

      // Always show Telegram user immediately (even if backend fails)
      if (tgUser) {
        setUser({
          id: tgUser.id,
          first_name: tgUser.first_name,
          last_name: tgUser.last_name,
          username: tgUser.username,
          photo_url: tgUser.photo_url,
          city: "",
          payment_info: "",
        });
      }

      // Then try to enrich with DB data (city, payment_info)
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        });
        if (res.ok) {
          const { user: dbUser } = await res.json();
          setUser(dbUser);
        }
      } catch (e) {
        // Backend not ready yet, Telegram data already shown above
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  const updateUser = (updates: Partial<TelegramUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <TelegramContext.Provider value={{ user, isReady, updateUser }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
