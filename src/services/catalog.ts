import raw from "../data/products.json";
import type { Product, Cart, Filters } from "../types";
export const products: Product[] = raw;
export const categories = [
  "Fios e cabos",
  "Tomadas e interruptores",
  "Iluminação",
  "Disjuntores e quadros",
  "Ferramentas e acessórios",
];
export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
export const productById = (id: string) => products.find((p) => p.id === id);
export function cleanCart(value: unknown): Cart {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(
        ([id, n]) =>
          productById(id) &&
          typeof n === "number" &&
          Number.isFinite(n) &&
          n >= 1,
      )
      .map(([id, n]) => [id, Math.min(99, Math.floor(n as number))]),
  );
}
export function cartTotal(cart: Cart): number {
  return Object.entries(cleanCart(cart)).reduce(
    (sum, [id, n]) => sum + productById(id)!.priceCents * n,
    0,
  );
}
// Operações puras: a interface e os testes usam as mesmas regras.
export function addCartItem(cart: Cart, id: string, quantity = 1): Cart {
  if (!productById(id)?.available || !Number.isSafeInteger(quantity) || quantity < 1)
    return cart;
  return { ...cart, [id]: Math.min(99, (cart[id] || 0) + quantity) };
}
export function setCartQuantity(cart: Cart, id: string, quantity: number): Cart {
  if (!productById(id) || !Number.isSafeInteger(quantity) || quantity < 0)
    return cart;
  const next = { ...cart };
  if (quantity === 0) delete next[id];
  else next[id] = Math.min(99, quantity);
  return next;
}
export function filterProducts(f: Filters): Product[] {
  const result = products.filter(
    (p) =>
      (!f.query ||
        normalize(p.name + " " + p.brand).includes(normalize(f.query))) &&
      (!f.category || slug(p.category) === f.category) &&
      (!f.type || slug(p.category) === f.type) &&
      (!f.brand || p.brand === f.brand) &&
      (f.minimum === undefined || p.priceCents >= f.minimum) &&
      (f.maximum === undefined || p.priceCents <= f.maximum) &&
      (!f.rating || p.rating >= f.rating) &&
      (!f.available || p.available),
  );
  switch (f.sort) {
    case "menor-preco":
      return result.sort((a, b) => a.priceCents - b.priceCents);
    case "maior-preco":
      return result.sort((a, b) => b.priceCents - a.priceCents);
    case "avaliacao":
      return result.sort((a, b) => b.rating - a.rating);
    case "novidades":
      return result.reverse();
    case "mais-vendidos": {
      const featured = ["cabo25", "tomada10", "bipolar", "painel"];
      return result.sort(
        (a, b) =>
          (featured.indexOf(a.id) < 0 ? 99 : featured.indexOf(a.id)) -
          (featured.indexOf(b.id) < 0 ? 99 : featured.indexOf(b.id)),
      );
    }
    default:
      return result;
  }
}
