import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";
import shoes from "@/assets/cat-shoes-custom.jpg";
import acc from "@/assets/cat-accessories-custom.webp";

export interface ShopItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  avatar: string;
  tgLink: string;
  items: ShopItem[];
}

export const shops: Shop[] = [
  {
    id: "volodyashop",
    name: "Volodyashop",
    description: "Архивные и редкие вещи. Только проверенные бренды.",
    avatar: p1,
    tgLink: "https://t.me/luvodate",
    items: [
      { id: "vs-1", name: "2000s Diesel Faded Jacket", brand: "Diesel", price: "12 000 ₽", image: p1 },
      { id: "vs-2", name: "90s Prada Leather Shoes", brand: "Prada", price: "18 500 ₽", image: p2 },
      { id: "vs-3", name: "Vintage Armani Patchwork Jacket", brand: "Armani", price: "14 200 ₽", image: p3 },
      { id: "vs-4", name: "Adidas Y-3 Wedge Mules", brand: "Y-3", price: "16 800 ₽", image: p4 },
      { id: "vs-5", name: "Alexander McQueen Wallet", brand: "McQueen", price: "7 900 ₽", image: p5 },
      { id: "vs-6", name: "Dolce&Gabbana Bamboo Pants", brand: "D&G", price: "11 500 ₽", image: p6 },
      { id: "vs-7", name: "Archive Sport Sunglasses", brand: "D&G", price: "9 200 ₽", image: p7 },
      { id: "vs-8", name: "Vintage Leather Tall Boots", brand: "Unknown", price: "22 000 ₽", image: p8 },
      { id: "vs-9", name: "Suede Lace-Up Sneakers", brand: "Camper", price: "8 400 ₽", image: shoes },
      { id: "vs-10", name: "D&G Tortoiseshell Sunglasses", brand: "D&G", price: "13 600 ₽", image: acc },
    ],
  },
];
