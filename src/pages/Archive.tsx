import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { useProducts } from "@/hooks/useProducts";
import { useLikes } from "@/hooks/useLikes";

const Archive = () => {
  const { products, loading } = useProducts();
  const { toggleLike, isLiked } = useLikes();

  // Archive shows sold-out / featured archive pieces (top liked items)
  const archiveItems = [...products].sort((a, b) => b.likes_count - a.likes_count);

  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground">Архив</span>
      </PageHeader>

      <div className="px-4 py-6">
        <p className="text-xs text-muted-foreground tracking-wide mb-6 leading-relaxed">
          Архивные и коллекционные предметы — самые желанные вещи на платформе, отобранные по количеству лайков.
        </p>

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

        {!loading && archiveItems.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-12">
            Архив пуст
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          {archiveItems.map((product) => (
            <div key={product.id} className="relative group">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative bg-muted overflow-hidden aspect-square">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.likes_count > 0 && (
                    <span className="absolute bottom-2 left-2 bg-foreground text-primary-foreground text-[10px] px-2 py-0.5 uppercase tracking-wider">
                      {product.likes_count} ♥
                    </span>
                  )}
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
      </div>
    </div>
  );
};

export default Archive;
