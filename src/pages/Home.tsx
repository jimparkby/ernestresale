import { useState, useRef } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useLikes } from "@/hooks/useLikes";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import CategoryGrid, { CategoryKey } from "@/components/CategoryGrid";
import heroImg from "@/assets/hero-studio.jpg";

// Keyword map for category filtering by product name/brand
const categoryKeywords: Record<string, string[]> = {
  "Обувь": ["shoe", "boot", "sneaker", "обувь", "туфли", "кроссовк", "сапог", "mule", "loafer", "heel", "сандал"],
  "Аксессуары": ["sunglasses", "glasses", "bag", "wallet", "belt", "scarf", "hat", "cap", "очки", "сумка", "кошелёк", "ремень", "шарф", "шапка", "accessory"],
  "Верхняя одежда": ["jacket", "coat", "куртка", "пальто", "пуховик", "бомбер", "парка", "outerwear", "blazer"],
  "Новинки": [], // shows most recent (last 4 items)
};

function matchCategory(product: { name: string; brand: string }, cat: CategoryKey): boolean {
  if (!cat) return true;
  const keywords = categoryKeywords[cat] ?? [];
  if (cat === "Новинки") return true; // handled separately
  const text = `${product.name} ${product.brand}`.toLowerCase();
  return keywords.some((kw) => text.includes(kw));
}

const Home = () => {
  const { products, loading } = useProducts();
  const { toggleLike, isLiked } = useLikes();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(null);
  const shopRef = useRef<HTMLElement>(null);

  const handleCategorySelect = (cat: CategoryKey) => {
    setActiveCategory(cat);
    // Scroll to products section
    setTimeout(() => {
      shopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const filteredProducts = activeCategory === "Новинки"
    ? [...products].slice(0, 6)
    : activeCategory
      ? products.filter((p) => matchCategory(p, activeCategory))
      : products;

  const sectionTitle = activeCategory ?? "Все товары";

  return (
    <div className="min-h-screen pb-20">
      {/* Spacer to push content below fixed header */}
      <div style={{ height: "calc(3.5rem + 2rem + max(var(--tg-safe-area-inset-top, 0px), env(safe-area-inset-top, 0px)))" }} />

      {/* HomeHeader is fixed, rendered via component below */}
      <HomeHeader />

      {/* Hero Banner */}
      <section className="relative w-full h-[55vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Exclusive archive fashion pieces"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-2xl md:text-4xl font-light tracking-wide text-primary-foreground mb-5">
            эксклюзивные архивные вещи
          </h1>
          <button
            onClick={() => handleCategorySelect(null)}
            className="border border-primary-foreground text-primary-foreground px-7 py-2.5 text-xs tracking-widest uppercase hover:bg-primary-foreground hover:text-foreground transition-colors"
          >
            Смотреть всё
          </button>
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGrid active={activeCategory} onSelect={handleCategorySelect} />

      {/* Products Section */}
      <section id="shop" ref={shopRef} className="px-4 pb-4 scroll-mt-24">
        <h2 className="text-base font-normal tracking-tight text-foreground mb-5">
          {sectionTitle}
        </h2>

        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="mt-2 h-3 bg-muted rounded w-2/3" />
                <div className="mt-1 h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-12">
            {activeCategory ? `Товаров в категории «${activeCategory}» пока нет` : "Товаров пока нет"}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative group">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative bg-muted overflow-hidden aspect-square">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 bg-foreground text-primary-foreground text-[10px] px-2 py-0.5 uppercase tracking-wider">
                    {product.condition}
                  </span>
                </div>
                <div className="mt-2 space-y-0.5 pr-7">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                  <p className="text-xs text-foreground leading-snug">{product.name}</p>
                  <p className="text-xs font-medium text-foreground">{product.price}</p>
                </div>
              </Link>
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute bottom-0 right-0 flex flex-col items-center gap-0.5"
              >
                <Heart
                  size={16}
                  strokeWidth={1.5}
                  className={isLiked(product.id) ? "fill-foreground text-foreground" : "text-muted-foreground"}
                />
                <span className="text-[10px] text-muted-foreground">{product.likes_count}</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
