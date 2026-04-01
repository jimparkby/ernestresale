import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { shops } from "@/data/shopsData";

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const shop = shops.find((s) => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Магазин не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <Link to="/shops" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-sm font-medium text-foreground">{shop.name}</span>
      </PageHeader>

      {/* Shop info */}
      <div className="px-4 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-4 mb-3">
          <img
            src={shop.avatar}
            alt={shop.name}
            className="w-14 h-14 object-cover"
          />
          <div>
            <h1 className="text-base font-semibold text-foreground tracking-wide">
              {shop.name}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">{shop.items.length} товаров</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{shop.description}</p>
      </div>

      {/* TG channel button */}
      <div className="px-4 py-4 border-b border-border">
        <a
          href={shop.tgLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-foreground text-primary-foreground text-xs font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          <ExternalLink size={14} />
          Перейти в Telegram канал
        </a>
      </div>

      {/* All products grid */}
      <div className="px-4 pt-5">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Все товары
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {shop.items.map((item) => (
            <div key={item.id} className="group">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 space-y-0.5">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{item.brand}</p>
                <p className="text-xs text-foreground leading-snug">{item.name}</p>
                <p className="text-xs font-medium text-foreground">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom TG button (sticky) */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2">
        <a
          href={shop.tgLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-primary-foreground text-xs font-medium uppercase tracking-widest shadow-lg hover:opacity-90 transition-opacity"
        >
          <ExternalLink size={14} />
          Перейти в Telegram канал
        </a>
      </div>
    </div>
  );
};

export default ShopDetail;
