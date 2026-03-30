import SiteHeader from "@/components/SiteHeader";
import ProductGrid from "@/components/ProductGrid";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ProductGrid />
      <SiteFooter />
    </div>
  );
};

export default Index;
