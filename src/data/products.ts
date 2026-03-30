import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: string;
  material: string;
  condition: string;
  likes: number;
  sellerId: number;
  sellerName: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    image: product1,
    brand: "Celine",
    name: "Micro Luggage",
    price: "€650",
    material: "Кожа",
    condition: "Отличное",
    likes: 34,
    sellerId: 1,
    sellerName: "Анна М.",
    description: "Классическая сумка Celine Micro Luggage в чёрной коже. Минимальные следы носки, оригинальный пыльник в комплекте.",
  },
  {
    id: 2,
    image: product2,
    brand: "Hermès",
    name: "Mini Evelyne 16",
    price: "€2 200",
    material: "Кожа",
    condition: "Как новая",
    likes: 89,
    sellerId: 2,
    sellerName: "Елена К.",
    description: "Hermès Mini Evelyne 16 в коже Clemence. Полный комплект: коробка, пыльник, чек.",
  },
  {
    id: 3,
    image: product3,
    brand: "Chanel",
    name: "Classic Flap Mini",
    price: "€3 400",
    material: "Кожа",
    condition: "Отличное",
    likes: 112,
    sellerId: 3,
    sellerName: "Дарья С.",
    description: "Chanel Classic Flap Mini с золотой фурнитурой. Стёганая кожа ягнёнка, цвет — бордо.",
  },
  {
    id: 4,
    image: product4,
    brand: "Louis Vuitton",
    name: "Neverfull MM",
    price: "€850",
    material: "Канвас",
    condition: "Хорошее",
    likes: 56,
    sellerId: 4,
    sellerName: "Ирина В.",
    description: "Louis Vuitton Neverfull MM в монограммном канвасе. Лёгкая патина на ручках, без повреждений.",
  },
  {
    id: 5,
    image: product5,
    brand: "Prada",
    name: "Galleria Saffiano",
    price: "€1 100",
    material: "Кожа",
    condition: "Отличное",
    likes: 71,
    sellerId: 5,
    sellerName: "Мария Л.",
    description: "Prada Galleria в коже Saffiano. Двухцветная подкладка, оригинальный ремень в комплекте.",
  },
  {
    id: 6,
    image: product6,
    brand: "Miu Miu",
    name: "Mini Crossbody",
    price: "€420",
    material: "Кожа",
    condition: "Как новая",
    likes: 48,
    sellerId: 2,
    sellerName: "Елена К.",
    description: "Miu Miu Mini Crossbody в розовой коже. Использовалась один раз, состояние идеальное.",
  },
  {
    id: 7,
    image: product7,
    brand: "Mulberry",
    name: "Iris Shoulder",
    price: "€575",
    material: "Кожа",
    condition: "Хорошее",
    likes: 22,
    sellerId: 4,
    sellerName: "Ирина В.",
    description: "Mulberry Iris в оливковой коже. Мягкая текстура, просторное отделение. Пыльник в комплекте.",
  },
  {
    id: 8,
    image: product8,
    brand: "Saint Laurent",
    name: "Envelope Clutch",
    price: "€595",
    material: "Кожа",
    condition: "Отличное",
    likes: 63,
    sellerId: 1,
    sellerName: "Анна М.",
    description: "Saint Laurent Envelope в стёганой белой коже. Магнитная застёжка YSL, цепочка-ремешок.",
  },
];

export const getProductById = (id: number) => products.find((p) => p.id === id);
export const getProductsBySeller = (sellerId: number) => products.filter((p) => p.sellerId === sellerId);
