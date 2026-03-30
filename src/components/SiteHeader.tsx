import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  "Каталог", "Дизайнеры", "Коллекции", "Новинки", "Мужское", "Скидки", "Магазины", "Контакты"
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Luxe<span className="text-primary">Resale</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <a href="#" className="text-xs font-bold uppercase tracking-widest text-primary">
            Продать
          </a>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="hidden md:flex items-center border border-border rounded-sm overflow-hidden">
              <input
                autoFocus
                type="text"
                placeholder="Поиск..."
                className="bg-transparent px-3 py-1.5 text-sm outline-none w-48 font-body"
              />
              <button onClick={() => setSearchOpen(false)} className="px-2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Search size={20} />
            </button>
          )}
          <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-border" />

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <a href="#" className="text-sm font-bold uppercase tracking-widest text-primary">
              Продать
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
