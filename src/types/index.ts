import type { PaymentSelection } from "../services/payment";
export type Product = {
  id: string;
  name: string;
  priceCents: number;
  rating: number;
  category: string;
  description: string;
  specs: string[];
  image: string | null;
  imageNote?: string;
  sourceNode: string;
  brand: string;
  available: boolean;
};
export type Cart = Record<string, number>;
export type Theme = "light" | "dark";
export type DemoOrder = {
  id: string;
  date: string;
  items: Cart;
  totalCents: number;
  payment?: PaymentSelection;
};
export type Filters = {
  query?: string;
  type?: string;
  category?: string;
  brand?: string;
  minimum?: number;
  maximum?: number;
  rating?: number;
  available?: boolean;
  sort?: string;
};
