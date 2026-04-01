import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { shops } from "@/data/shopsData";

const Shops = () => {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground">
          Магазины
        </span>
      </PageHeader>

      <div className="px-4 pt-4 space-y-6">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

const ShopCard = ({ shop }: { shop: (typeof shops)[number] }) => {
  const preview = shop.items.slice(0, 3);

  return (
    <div className="border border-border">
      {/* Shop header */}
      <div className="flex items-center gap-3 px-3 pt-3 pb-2">
        <img
          src={shop.avatar}
          alt={shop.name}
          className="w-10 h-10 object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{shop.name}</p>
          <p className="text-[11px] text-muted-foreground leading-tight mt-0.5 truncate">
            {shop.description}
          </p>
        </div>
        <Link
          to={`/shops/${shop.id}`}
          className="shrink-0 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
        >
          Все <ChevronRight size={13} />
        </Link>
      </div>

      {/* Last 3 products */}
      <div className="grid grid-cols-3 gap-px bg-border">
        {preview.map((item) => (
          <Link key={item.id} to={`/shops/${shop.id}`} className="block bg-background">
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border">
        <span className="text-[11px] text-muted-foreground">
          {shop.items.length} товаров
        </span>
        <Link
          to={`/shops/${shop.id}`}
          className="text-[11px] uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
        >
          Открыть магазин →
        </Link>
      </div>
    </div>
  );
};

export default Shops;
