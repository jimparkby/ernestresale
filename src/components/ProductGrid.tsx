import { Link } from "react-router-dom";
import { products } from "@/data/products";

const ProductGrid = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl text-primary font-medium">
            Новинки
          </h2>
          <div className="mt-3 flex justify-center">
            <svg width="20" height="12" viewBox="0 0 20 12" className="text-primary">
              <path d="M10 12L0 0h20L10 12z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group animate-fade-in">
              <div className="relative bg-card overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={640}
                  height={640}
                />
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">
                  {product.brand}
                </p>
                <p className="text-sm font-body text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </p>
                <p className="text-sm font-body font-medium text-foreground">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
