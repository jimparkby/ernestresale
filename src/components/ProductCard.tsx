import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLikes } from "@/hooks/useLikes";

interface ProductCardProps {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: string;
  condition: string;
  likes: number;
}

const ProductCard = ({ id, image, brand, name, price, condition, likes }: ProductCardProps) => {
  const { toggleLike, isLiked, getLikeCount } = useLikes();
  const liked = isLiked(id);
  const count = getLikeCount(id);

  return (
    <div className="relative group">
      <Link to={`/product/${id}`} className="block">
        <div className="relative bg-card overflow-hidden aspect-square rounded-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-[10px] uppercase tracking-wider px-2 py-0.5 font-body text-foreground">
            {condition}
          </span>
        </div>
        <div className="mt-2 space-y-0.5 pr-8">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-body">{brand}</p>
          <p className="text-sm font-body text-foreground leading-tight">{name}</p>
          <p className="text-sm font-body font-semibold text-foreground">{price}</p>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleLike(id);
        }}
        className="absolute bottom-0 right-0 flex flex-col items-center gap-0.5"
        aria-label="Лайк"
      >
        <Heart
          size={18}
          strokeWidth={1.8}
          className={`transition-colors ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
        <span className="text-[10px] text-muted-foreground font-body">{count}</span>
      </button>
    </div>
  );
};

export default ProductCard;
