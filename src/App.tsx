import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TelegramProvider } from "@/context/TelegramContext";
import { ProductsProvider } from "@/context/ProductsContext";
import BottomNav from "@/components/BottomNav";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Ratings from "@/pages/Ratings";
import Profile from "@/pages/Profile";
import AddProduct from "@/pages/AddProduct";
import ProductDetail from "@/pages/ProductDetail";
import SellerProfile from "@/pages/SellerProfile";
import About from "@/pages/About";
import Archive from "@/pages/Archive";
import Contacts from "@/pages/Contacts";
import Shops from "@/pages/Shops";
import ShopDetail from "@/pages/ShopDetail";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Pages that show the bottom navigation bar
const TAB_ROUTES = ["/", "/search", "/shops", "/ratings", "/profile"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const showNav = TAB_ROUTES.includes(pathname);
  return (
    <>
      {children}
      {showNav && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TelegramProvider>
      <ProductsProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/ratings" element={<Ratings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/seller/:id" element={<SellerProfile />} />
              <Route path="/shops" element={<Shops />} />
              <Route path="/shops/:id" element={<ShopDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
      </ProductsProvider>
    </TelegramProvider>
  </QueryClientProvider>
);

export default App;
