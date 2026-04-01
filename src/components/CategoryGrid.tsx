import catAccessories from "@/assets/cat-accessories.jpg";
import catNewArrivals from "@/assets/cat-new-arrivals.jpg";
import catOutwear from "@/assets/cat-outwear.jpg";
import catShoes from "@/assets/cat-shoes.jpg";

const categories = [
  { name: "Аксессуары", image: catAccessories },
  { name: "Новинки", image: catNewArrivals },
  { name: "Верхняя одежда", image: catOutwear },
  { name: "Обувь", image: catShoes },
];

const CategoryGrid = () => {
  return (
    <section className="px-4 py-8">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <a key={cat.name} href="#shop" className="group block">
            <div className="relative aspect-square overflow-hidden bg-muted mb-2">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs font-normal text-foreground tracking-wide">{cat.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
