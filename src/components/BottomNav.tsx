import { Home, Search, Trophy, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { to: "/", icon: Home, label: "Лента" },
  { to: "/search", icon: Search, label: "Поиск" },
  { to: "/ratings", icon: Trophy, label: "Рейтинг" },
  { to: "/profile", icon: User, label: "Профиль" },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex">
      {tabs.map(({ to, icon: Icon, label }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-body tracking-wide">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
