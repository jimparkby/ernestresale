import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import PageHeader from "@/components/PageHeader";

const SellerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();

  const sellerId = Number(id);
  const sellerProducts = products.filter((p) => p.seller_id === sellerId);
  const seller = sellerProducts[0]?.users as any;

  if (!seller && sellerProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Продавец не найден</p>
      </div>
    );
  }

  const sellerName = seller ? `${seller.first_name}${seller.last_name ? " " + seller.last_name : ""}` : "Продавец";

  return (
    <div className="min-h-screen pb-8">
      <PageHeader>
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="font-heading text-base font-semibold text-foreground">{sellerName}</span>
      </PageHeader>

      <div className="px-4 pt-6 space-y-5">
        <div className="bg-card border border-border rounded-sm p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-2xl font-heading font-bold text-primary">{sellerName.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="font-heading text-lg font-semibold text-foreground">{sellerName}</p>
            {seller?.username && <p className="text-xs text-muted-foreground font-body">@{seller.username}</p>}
            <div className="flex items-center gap-3 mt-1.5">
              {seller?.city && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                  <MapPin size={12} /> {seller.city}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                <ShoppingBag size={12} /> {sellerProducts.length} товаров
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-4">
            Товары ({sellerProducts.length})
          </h3>
          {sellerProducts.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm font-body py-8">Нет активных товаров</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {sellerProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="aspect-square bg-card overflow-hidden rounded-sm">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-body">{p.brand}</p>
                    <p className="text-sm font-body text-foreground">{p.name}</p>
                    <p className="text-sm font-body font-semibold">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
