import { useState } from "react";
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

  return (
    <header
      className="sticky top-0 z-50 bg-background border-b border-border"
      style={{ paddingTop: "var(--tg-content-safe-area-inset-top, 0px)" }}
    >
      <div className="flex h-13 items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-sm font-semibold tracking-widest text-foreground uppercase">
          ernestresale
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
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
