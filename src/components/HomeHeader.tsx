import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Магазин", href: "#shop" },
  { label: "О нас", href: "/about" },
  { label: "Архив", href: "/archive" },
  { label: "Контакты", href: "/contacts" },
];

const HomeHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current <= 10) {
        setVisible(true);
      } else if (current > lastScrollY.current + 4) {
        setVisible(false);
        setMobileOpen(false);
      } else if (current < lastScrollY.current - 4) {
        setVisible(true);
      }
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 bg-background border-b border-border transition-transform duration-300"
      style={{
        paddingTop: "max(var(--tg-safe-area-inset-top, 0px), env(safe-area-inset-top, 0px))",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      {/* Top row: logo centered, hamburger on right */}
      <div className="relative flex h-12 items-center justify-center px-4 py-2">
        {/* Logo — centered absolutely so TG close button (left) doesn't overlap */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-widest text-foreground uppercase whitespace-nowrap"
        >
          ernestresale
        </Link>

        {/* Desktop nav — right side on md+ */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger — right */}
        <button
          className="md:hidden absolute right-4 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile horizontal nav strip */}
      <div className="flex items-center gap-5 px-4 pb-2.5 overflow-x-auto scrollbar-hide md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block text-sm text-foreground tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default HomeHeader;
