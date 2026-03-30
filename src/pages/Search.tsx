import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { products } from "@/data/products";
import { useUserProducts } from "@/hooks/useUserProducts";
import ProductCard from "@/components/ProductCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const { userProducts } = useUserProducts();

  const allProducts = [...products, ...userProducts];

  const filtered = query.trim()
    ? allProducts.filter(
        (p) =>
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sellerName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center gap-3">
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
      </div>

      <div className="px-4 pt-4">
        {!query.trim() && (
          <p className="text-center text-muted-foreground text-sm font-body mt-12">
            Начните вводить название или бренд
          </p>
        )}

        {query.trim() && filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm font-body mt-12">
            Ничего не найдено
          </p>
        )}

        {filtered.length > 0 && (
          <>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-4">
              Найдено: {filtered.length}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {filtered.map((product) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
