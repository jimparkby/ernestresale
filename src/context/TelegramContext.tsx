import { createContext, useContext, useEffect, useState } from "react";

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface TelegramContextValue {
  user: TelegramUser | null;
  isReady: boolean;
}

const TelegramContext = createContext<TelegramContextValue>({ user: null, isReady: false });

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const u = tg.initDataUnsafe?.user;
      if (u) {
        setUser(u);
      }
    }
    // Dev fallback when not in Telegram
    if (!user) {
      setUser({
        id: 100000001,
        first_name: "Александр",
        last_name: "К.",
        username: "alexk",
        photo_url: undefined,
      });
    }
    setIsReady(true);
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isReady }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
