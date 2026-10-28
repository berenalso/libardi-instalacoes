import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cleanCart, productById, cartTotal, addCartItem, setCartQuantity } from "../services/catalog";
import type { Cart, Theme, DemoOrder } from "../types";
import { calculatePayment, normalizePayment } from "../services/payment";
const KEY = "libardi:v1";
function read(): {
  cart: Cart;
  favorites: string[];
  theme: Theme;
  orders: DemoOrder[];
} {
  try {
    const x = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      cart: cleanCart(x.cart),
      favorites: Array.isArray(x.favorites)
        ? [
            ...new Set<string>(
              x.favorites.filter(
                (id: unknown) => typeof id === "string" && productById(id),
              ),
            ),
          ]
        : [],
      theme: x.theme === "dark" ? "dark" : "light",
      orders: Array.isArray(x.orders)
        ? x.orders
            .filter(
              (o: DemoOrder) =>
                o &&
                typeof o.id === "string" &&
                typeof o.date === "string" &&
                Number.isFinite(o.totalCents) &&
                o.items,
            )
            .slice(0, 20)
            .map((o: DemoOrder) => ({
              id: o.id,
              date: o.date,
              items: cleanCart(o.items),
              totalCents: calculatePayment(
                cartTotal(cleanCart(o.items)),
                normalizePayment(o.payment),
              ).totalCents,
              payment: normalizePayment(o.payment),
            }))
        : [],
    };
  } catch {
    return { cart: {}, favorites: [], theme: "light", orders: [] };
  }
}
function useStoreValue() {
  const [initial] = useState(read);
  const [cart, setCart] = useState(initial.cart);
  const [favorites, setFavorites] = useState(initial.favorites);
  const [theme, setTheme] = useState(initial.theme);
  const [orders, setOrders] = useState(initial.orders);
  const [message, setMessage] = useState("");
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ cart, favorites, theme, orders }),
      );
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [cart, favorites, theme, orders]);
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(t);
  }, [message]);
  function add(id: string, quantity = 1) {
    if (!productById(id)?.available || !Number.isSafeInteger(quantity) || quantity < 1) return;
    setCart((c) => addCartItem(c, id, quantity));
    setMessage("Produto adicionado ao carrinho.");
  }
  function quantity(id: string, n: number) {
    setCart((c) => setCartQuantity(c, id, n));
  }
  function favorite(id: string) {
    if (!productById(id)) return;
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );
  }
  return {
    cart,
    favorites,
    theme,
    orders,
    message,
    storageError,
    add,
    quantity,
    favorite,
    setTheme,
    setMessage,
    setCart,
    setOrders,
  };
}
const Context = createContext<ReturnType<typeof useStoreValue> | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const value = useStoreValue();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useStore() {
  const context = useContext(Context);
  if (!context) throw new Error("StoreProvider ausente");
  return context;
}
