import { useProducts } from "@/hooks/useProducts";
import { useLikes } from "@/hooks/useLikes";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const Home = () => {
  const { products, loading } = useProducts();
  const { toggleLike, isLiked } = useLikes();

  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <span className="font-heading text-lg font-bold text-foreground">
          ernest<span className="text-primary">resale</span>
        </span>
      </PageHeader>

      <div className="px-4 pt-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-4">
          Рекомендации
        </h2>

        {loading && (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-sm" />
                <div className="mt-2 h-3 bg-muted rounded w-2/3" />
                <div className="mt-1 h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-muted-foreground text-sm font-body mt-12">
            Товаров пока нет
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative bg-card overflow-hidden aspect-square rounded-sm">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-[10px] uppercase tracking-wider px-2 py-0.5 font-body text-foreground">
                    {product.condition}
                  </span>
                </div>
                <div className="mt-2 space-y-0.5 pr-8">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-body">{product.brand}</p>
                  <p className="text-sm font-body text-foreground leading-tight">{product.name}</p>
                  <p className="text-sm font-body font-semibold text-foreground">{product.price}</p>
                </div>
              </Link>
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute bottom-0 right-0 flex flex-col items-center gap-0.5"
              >
                <Heart
                  size={18}
                  strokeWidth={1.8}
                  className={isLiked(product.id) ? "fill-primary text-primary" : "text-muted-foreground"}
                />
                <span className="text-[10px] text-muted-foreground font-body">{product.likes_count}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
