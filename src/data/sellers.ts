export interface Seller {
  id: number;
  name: string;
  username: string;
  city: string;
  rating: number;
  sales: number;
  reviews: number;
  avatar?: string;
  paymentInfo: string;
}

export const sellers: Seller[] = [
  {
    id: 1,
    name: "Анна М.",
    username: "annam",
    city: "Москва",
    rating: 4.9,
    sales: 47,
    reviews: 43,
    paymentInfo: "Тинькофф • 5536 9138 **** 2241",
  },
  {
    id: 2,
    name: "Елена К.",
    username: "elenak",
    city: "Санкт-Петербург",
    rating: 5.0,
    sales: 23,
    reviews: 23,
    paymentInfo: "Сбербанк • 4276 1600 **** 8812",
  },
  {
    id: 3,
    name: "Дарья С.",
    username: "daryas",
    city: "Москва",
    rating: 4.8,
    sales: 31,
    reviews: 29,
    paymentInfo: "Тинькофф • 5536 9138 **** 7753",
  },
  {
    id: 4,
    name: "Ирина В.",
    username: "irinav",
    city: "Казань",
    rating: 4.7,
    sales: 65,
    reviews: 60,
    paymentInfo: "Альфа-Банк • 4154 8100 **** 3319",
  },
  {
    id: 5,
    name: "Мария Л.",
    username: "marial",
    city: "Москва",
    rating: 4.9,
    sales: 18,
    reviews: 17,
    paymentInfo: "Тинькофф • 5536 9138 **** 0034",
  },
];

export const getSellerById = (id: number) => sellers.find((s) => s.id === id);
