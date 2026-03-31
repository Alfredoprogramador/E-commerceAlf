"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

type CartProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string;
  stock: number;
};

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: CartProduct;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  loading: boolean;
  addItem: (product: CartProduct, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQty: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

function getLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

function saveLocalCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!session?.user) {
      setItems(getLocalCart());
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (product: CartProduct, quantity = 1) => {
    if (!session?.user) {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        let next: CartItem[];
        if (existing) {
          next = prev.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          next = [
            ...prev,
            {
              id: product.id,
              productId: product.id,
              quantity,
              product,
            },
          ];
        }
        saveLocalCart(next);
        return next;
      });
      return;
    }
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity }),
    });
    fetchCart();
  };

  const removeItem = async (productId: string) => {
    if (!session?.user) {
      setItems((prev) => {
        const next = prev.filter((i) => i.productId !== productId);
        saveLocalCart(next);
        return next;
      });
      return;
    }
    await fetch(`/api/cart?productId=${productId}`, { method: "DELETE" });
    fetchCart();
  };

  const updateQty = async (productId: string, quantity: number) => {
    if (quantity < 1) return removeItem(productId);
    if (!session?.user) {
      setItems((prev) => {
        const next = prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );
        saveLocalCart(next);
        return next;
      });
      return;
    }
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const clearCart = () => {
    setItems([]);
    if (!session?.user) localStorage.removeItem("cart");
  };

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, loading, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
