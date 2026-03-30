import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, X } from "lucide-react";
import { useState } from "react";
import { getProductById } from "@/data/products";
import { getSellerById } from "@/data/sellers";
import { useUserProducts } from "@/hooks/useUserProducts";
import { useLikes } from "@/hooks/useLikes";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProducts } = useUserProducts();
  const { toggleLike, isLiked, getLikeCount } = useLikes();
  const [paymentOpen, setPaymentOpen] = useState(false);

  const productId = Number(id);
  const product =
    getProductById(productId) ?? userProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Товар не найден</p>
      </div>
    );
  }

  const seller = getSellerById(product.sellerId);
  const liked = isLiked(product.id);
  const likeCount = getLikeCount(product.id);

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="font-heading text-base font-semibold text-foreground flex-1 truncate">
          {product.brand} · {product.name}
        </span>
        <button onClick={() => toggleLike(product.id)} className="flex items-center gap-1.5">
          <Heart
            size={20}
            strokeWidth={1.8}
            className={liked ? "fill-primary text-primary" : "text-muted-foreground"}
          />
          <span className="text-xs text-muted-foreground font-body">{likeCount}</span>
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-card overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Title + price */}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">{product.brand}</p>
          <h1 className="font-heading text-xl font-semibold text-foreground mt-1">{product.name}</h1>
          <p className="text-2xl font-heading font-bold text-primary mt-2">{product.price}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-sm p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-1">Состояние</p>
            <p className="text-sm font-body text-foreground">{product.condition}</p>
          </div>
          <div className="bg-card border border-border rounded-sm p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-1">Материал</p>
            <p className="text-sm font-body text-foreground">{product.material}</p>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-2">Описание</p>
            <p className="text-sm font-body text-foreground leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Seller */}
        <div className="bg-card border border-border rounded-sm p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-3">Продавец</p>
          <Link
            to={seller ? `/seller/${seller.id}` : "#"}
            className="flex items-center gap-3 active:opacity-70"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-sm font-heading font-bold text-primary">
                {product.sellerName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground">{product.sellerName}</p>
              {seller && (
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                    <Star size={11} className="fill-primary text-primary" />
                    {seller.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                    <MapPin size={11} />
                    {seller.city}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-primary font-body">Профиль →</span>
          </Link>
        </div>

        {/* Buy button */}
        <button
          onClick={() => setPaymentOpen(true)}
          className="w-full bg-primary text-primary-foreground py-4 font-body text-sm uppercase tracking-widest rounded-sm"
        >
          Купить
        </button>
      </div>

      {/* Payment modal */}
      {paymentOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-background rounded-t-2xl px-6 pt-6 pb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">Оплата</h2>
              <button onClick={() => setPaymentOpen(false)}>
                <X size={22} className="text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm font-body text-muted-foreground">
              Переведите {product.price} на реквизиты продавца:
            </p>
            <div className="bg-muted rounded-sm p-4">
              <p className="text-sm font-body text-foreground font-medium">
                {seller?.paymentInfo ?? "Реквизиты уточните у продавца"}
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              После оплаты свяжитесь с продавцом для подтверждения и согласования доставки.
            </p>
            {seller && (
              <Link
                to={`/seller/${seller.id}`}
                className="block w-full text-center border border-primary text-primary py-3 font-body text-sm uppercase tracking-wider rounded-sm"
                onClick={() => setPaymentOpen(false)}
              >
                Профиль продавца
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
