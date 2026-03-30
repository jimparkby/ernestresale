import { Link } from "react-router-dom";
import { MapPin, ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import PageHeader from "@/components/PageHeader";

const medalColors = ["#C9A84C", "#A8A9AD", "#CD7F32"];

const Ratings = () => {
  const { products } = useProducts();

  // Build sellers leaderboard from products data
  const sellersMap = new Map<number, { id: number; name: string; username?: string; city: string; totalLikes: number; totalProducts: number }>();

  products.forEach((p) => {
    const s = p.users as any;
    if (!s) return;
    const existing = sellersMap.get(p.seller_id);
    const name = `${s.first_name}${s.last_name ? " " + s.last_name : ""}`;
    if (existing) {
      existing.totalLikes += p.likes_count;
      existing.totalProducts += 1;
    } else {
      sellersMap.set(p.seller_id, {
        id: p.seller_id,
        name,
        username: s.username,
        city: s.city || "",
        totalLikes: p.likes_count,
        totalProducts: 1,
      });
    }
  });

  const sorted = [...sellersMap.values()].sort((a, b) => b.totalLikes - a.totalLikes);

  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <span className="font-heading text-base font-semibold text-foreground">Рейтинг продавцов</span>
      </PageHeader>

      <div className="px-4 pt-4 space-y-3">
        {sorted.length === 0 && (
          <p className="text-center text-muted-foreground text-sm font-body mt-12">Пока нет данных</p>
        )}
        {sorted.map((seller, index) => (
          <Link key={seller.id} to={`/seller/${seller.id}`}
            className="flex items-center gap-4 bg-card border border-border rounded-sm p-4 active:opacity-70 transition-opacity">
            <div className="w-8 text-center">
              {index < 3 ? (
                <span style={{ color: medalColors[index] }} className="text-xl font-heading font-bold">{index + 1}</span>
              ) : (
                <span className="text-sm text-muted-foreground font-body font-medium">{index + 1}</span>
              )}
            </div>
            <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-base font-heading font-medium text-primary">{seller.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground">{seller.name}</p>
              <div className="flex items-center gap-3 mt-0.5">
                {seller.city && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                    <MapPin size={11} /> {seller.city}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                  <ShoppingBag size={11} /> {seller.totalProducts} товаров
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-body font-semibold text-foreground">♥ {seller.totalLikes}</p>
              <p className="text-[10px] text-muted-foreground font-body">лайков</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
