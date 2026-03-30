import { products } from "@/data/products";
import { useUserProducts } from "@/hooks/useUserProducts";
import ProductCard from "@/components/ProductCard";
import { useLikes } from "@/hooks/useLikes";

const Home = () => {
  const { userProducts } = useUserProducts();
  const { getLikeCount } = useLikes();

  const allProducts = [...products, ...userProducts];
  const sorted = [...allProducts].sort((a, b) => getLikeCount(b.id) - getLikeCount(a.id));

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center">
        <span className="font-heading text-lg font-bold text-foreground">
          ernest<span className="text-primary">resale</span>
        </span>
      </div>

      <div className="px-4 pt-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-4">
          Рекомендации
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {sorted.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              brand={product.brand}
              name={product.name}
              price={product.price}
              condition={product.condition}
              likes={product.likes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
