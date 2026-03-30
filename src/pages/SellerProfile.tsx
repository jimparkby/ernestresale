import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, ShoppingBag } from "lucide-react";
import { getSellerById } from "@/data/sellers";
import { getProductsBySeller } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const SellerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const seller = getSellerById(Number(id));
  const sellerProducts = getProductsBySeller(Number(id));

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Продавец не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="font-heading text-base font-semibold text-foreground">{seller.name}</span>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Seller card */}
        <div className="bg-card border border-border rounded-sm p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-2xl font-heading font-bold text-primary">
              {seller.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading text-lg font-semibold text-foreground">{seller.name}</p>
            {seller.username && (
              <p className="text-xs text-muted-foreground font-body">@{seller.username}</p>
            )}
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm font-body text-foreground font-medium">
                <Star size={14} className="fill-primary text-primary" />
                {seller.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                <ShoppingBag size={12} />
                {seller.sales} продаж
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                <MapPin size={12} />
                {seller.city}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews count */}
        <div className="flex gap-3">
          <div className="flex-1 bg-card border border-border rounded-sm p-4 text-center">
            <p className="text-xl font-heading font-bold text-primary">{seller.sales}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Продаж</p>
          </div>
          <div className="flex-1 bg-card border border-border rounded-sm p-4 text-center">
            <p className="text-xl font-heading font-bold text-primary">{seller.reviews}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Отзывов</p>
          </div>
          <div className="flex-1 bg-card border border-border rounded-sm p-4 text-center">
            <p className="text-xl font-heading font-bold text-primary">{seller.rating.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Рейтинг</p>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-4">
            Товары ({sellerProducts.length})
          </h3>
          {sellerProducts.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm font-body py-8">
              Нет активных товаров
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {sellerProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  brand={p.brand}
                  name={p.name}
                  price={p.price}
                  condition={p.condition}
                  likes={p.likes}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
