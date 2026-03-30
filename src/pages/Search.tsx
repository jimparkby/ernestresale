import { useState } from "react";
import { Search as SearchIcon, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useLikes } from "@/hooks/useLikes";
import PageHeader from "@/components/PageHeader";

const Search = () => {
  const [query, setQuery] = useState("");
  const { products } = useProducts();
  const { toggleLike, isLiked } = useLikes();

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.users?.first_name?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <div className="flex-1 flex items-center gap-2 bg-muted rounded-sm px-3 py-2">
          <SearchIcon size={16} className="text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Бренд, название, продавец..."
            className="flex-1 bg-transparent text-sm outline-none font-body text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </PageHeader>

      <div className="px-4 pt-4">
        {!query.trim() && (
          <p className="text-center text-muted-foreground text-sm font-body mt-12">
            Начните вводить название или бренд
          </p>
        )}
        {query.trim() && filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm font-body mt-12">Ничего не найдено</p>
        )}
        {filtered.length > 0 && (
          <>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-4">
              Найдено: {filtered.length}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {filtered.map((product) => (
                <div key={product.id} className="relative group">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="aspect-square bg-card overflow-hidden rounded-sm">
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="mt-2 space-y-0.5 pr-8">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-body">{product.brand}</p>
                      <p className="text-sm font-body text-foreground">{product.name}</p>
                      <p className="text-sm font-body font-semibold">{product.price}</p>
                    </div>
                  </Link>
                  <button onClick={() => toggleLike(product.id)} className="absolute bottom-0 right-0 flex flex-col items-center gap-0.5">
                    <Heart size={18} strokeWidth={1.8} className={isLiked(product.id) ? "fill-primary text-primary" : "text-muted-foreground"} />
                    <span className="text-[10px] text-muted-foreground font-body">{product.likes_count}</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
