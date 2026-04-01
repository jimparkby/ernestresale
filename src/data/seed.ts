import jacketImg from "@/assets/product-jacket.webp";
import jacket2Img from "@/assets/product-jacket2.webp";
import shoesImg from "@/assets/cat-shoes-custom.jpg";
import accessoriesImg from "@/assets/cat-accessories-custom.webp";
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
  {
    id: 9000003,
    seller_id: ME.id,
    brand: "Camper",
    name: "Suede Lace-Up Sneakers Brown",
    price: "8 400 ₽",
    condition: "Отличное",
    material: "Замша",
    description: "Camper замшевые кеды шоколадного цвета. Мягкая подошва, шнуровка. Размер 42.",
    image_url: shoesImg,
    likes_count: 5,
    created_at: new Date().toISOString(),
    users: ME,
  },
  {
    id: 9000004,
    seller_id: ME.id,
    brand: "Dolce & Gabbana",
    name: "Archive D&G Tortoiseshell Sunglasses",
    price: "13 600 ₽",
    condition: "Хорошее",
    material: "Пластик / металл",
    description: "Архивные солнцезащитные очки Dolce & Gabbana. Черепаховая оправа, коричневые линзы. Оригинал.",
    image_url: accessoriesImg,
    likes_count: 11,
    created_at: new Date().toISOString(),
    users: ME,
  },
];
