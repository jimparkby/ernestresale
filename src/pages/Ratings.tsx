import { Link } from "react-router-dom";
import { Star, MapPin, ShoppingBag } from "lucide-react";
import { sellers } from "@/data/sellers";

const sorted = [...sellers].sort((a, b) => b.rating - a.rating || b.sales - a.sales);

const medalColors = ["#C9A84C", "#A8A9AD", "#CD7F32"];

const Ratings = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center">
        <span className="font-heading text-base font-semibold text-foreground">Рейтинг продавцов</span>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {sorted.map((seller, index) => (
          <Link
            key={seller.id}
            to={`/seller/${seller.id}`}
            className="flex items-center gap-4 bg-card border border-border rounded-sm p-4 active:opacity-70 transition-opacity"
          >
            {/* Position */}
            <div className="w-8 text-center">
              {index < 3 ? (
                <span style={{ color: medalColors[index] }} className="text-xl font-heading font-bold">
                  {index + 1}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground font-body font-medium">{index + 1}</span>
              )}
            </div>

            {/* Avatar placeholder */}
            <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-base font-heading font-medium text-primary">
                {seller.name.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground">{seller.name}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                  <MapPin size={11} />
                  {seller.city}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                  <ShoppingBag size={11} />
                  {seller.sales} продаж
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 shrink-0">
              <Star size={14} className="fill-primary text-primary" />
              <span className="text-sm font-body font-semibold text-foreground">{seller.rating.toFixed(1)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
