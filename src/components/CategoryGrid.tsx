import catAccessories from "@/assets/cat-accessories-custom.webp";
import catNewArrivals from "@/assets/cat-new-arrivals.jpg";
import catOutwear from "@/assets/cat-outwear.jpg";
import catShoes from "@/assets/cat-shoes-custom.jpg";

export type CategoryKey = "Аксессуары" | "Новинки" | "Верхняя одежда" | "Обувь" | null;

const categories: { name: CategoryKey & string; image: string }[] = [
  { name: "Аксессуары", image: catAccessories },
  { name: "Новинки", image: catNewArrivals },
  { name: "Верхняя одежда", image: catOutwear },
  { name: "Обувь", image: catShoes },
];

interface CategoryGridProps {
  active: CategoryKey;
  onSelect: (cat: CategoryKey) => void;
}

const CategoryGrid = ({ active, onSelect }: CategoryGridProps) => {
  return (
    <section className="px-4 py-8">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isActive = active === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(isActive ? null : cat.name)}
              className="group block text-left"
            >
              <div
                className={`relative aspect-square overflow-hidden bg-muted mb-2 transition-all duration-200 ${
                  isActive ? "ring-2 ring-foreground ring-offset-1" : ""
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3
                className={`text-xs tracking-wide transition-colors ${
                  isActive ? "font-semibold text-foreground" : "font-normal text-foreground"
                }`}
              >
                {cat.name}
                {isActive && (
                  <span className="ml-1.5 text-[10px] text-muted-foreground">✕</span>
                )}
              </h3>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
