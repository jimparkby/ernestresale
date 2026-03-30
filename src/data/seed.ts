import jacketImg from "@/assets/product-jacket.webp";
import jacket2Img from "@/assets/product-jacket2.webp";
import type { DBProduct } from "@/hooks/useProducts";

// Your Telegram user as the seller
export const ME = {
  id: 100000001, // will be replaced with real Telegram ID after auth
  first_name: "Vbelo",
  last_name: "",
  username: "jimparkby",
  city: "Москва",
  payment_info: "",
};

export const seedProducts: DBProduct[] = [
  {
    id: 9000001,
    seller_id: ME.id,
    brand: "Diesel",
    name: "Vintage Leather Jacket",
    price: "€420",
    condition: "Отличное",
    material: "Кожа",
    description: "Diesel куртка из натуральной кожи. Классический крой, оригинальная фурнитура. Размер M.",
    image_url: jacketImg,
    likes_count: 14,
    created_at: new Date().toISOString(),
    users: ME,
  },
  {
    id: 9000002,
    seller_id: ME.id,
    brand: "Diesel",
    name: "Black Biker Jacket",
    price: "€380",
    condition: "Как новая",
    material: "Кожа",
    description: "Diesel байкерская куртка. Надевалась 2 раза, состояние идеальное. Размер S/M.",
    image_url: jacket2Img,
    likes_count: 8,
    created_at: new Date().toISOString(),
    users: ME,
  },
];
