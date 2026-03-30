import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TelegramProvider } from "@/context/TelegramContext";
import BottomNav from "@/components/BottomNav";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Ratings from "@/pages/Ratings";
import Profile from "@/pages/Profile";
import AddProduct from "@/pages/AddProduct";
import ProductDetail from "@/pages/ProductDetail";
import SellerProfile from "@/pages/SellerProfile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Pages that show the bottom navigation bar
const TAB_ROUTES = ["/", "/search", "/ratings", "/profile"];

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </TelegramProvider>
  </QueryClientProvider>
);

export default App;
