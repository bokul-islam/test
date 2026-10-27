"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, CartResponse } from "@/lib/cart-types";
import { useToast } from "@/components/toast";
import { isStaticExport } from "@/lib/static-mode";
import { catalogById } from "@/lib/catalog-query";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (productId: number, quantity?: number) => Promise<void>;
  update: (lineId: number, quantity: number) => Promise<void>;
  remove: (lineId: number) => Promise<void>;
  reset: () => void;
  ready: boolean;
  busy: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ws_cart_static_v1";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

function totals(lines: CartLine[]): Pick<CartResponse, "count" | "subtotalCents"> {
  return {
    count: lines.reduce((n, i) => n + i.quantity, 0),
    subtotalCents: lines.reduce((n, i) => n + i.product.priceCents * i.quantity, 0),
  };
}

function applyCart(
  data: CartResponse,
  set: (lines: CartLine[], count: number, subtotal: number) => void,
) {
  set(data.items, data.count, data.subtotalCents);
}

function readLocal(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* ignore quota */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [count, setCount] = useState(0);
  const [subtotalCents, setSubtotalCents] = useState(0);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const setAll = useCallback((l: CartLine[], c: number, s: number) => {
    setLines(l);
    setCount(c);
    setSubtotalCents(s);
  }, []);

  const setLocalLines = useCallback(
    (next: CartLine[]) => {
      writeLocal(next);
      const t = totals(next);
      setAll(next, t.count, t.subtotalCents);
    },
    [setAll],
  );

  useEffect(() => {
    let cancelled = false;
    if (isStaticExport) {
      const local = readLocal();
      const t = totals(local);
      if (!cancelled) {
        setAll(local, t.count, t.subtotalCents);
        setReady(true);
      }
      return () => {
        cancelled = true;
      };
    }

    fetch("/api/cart")
      .then((r) => r.json())
      .then((data: CartResponse) => {
        if (!cancelled) applyCart(data, setAll);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [setAll]);

  const add = useCallback(
    async (productId: number, quantity = 1) => {
      setBusy(true);
      try {
        if (isStaticExport) {
          const product = catalogById(productId);
          if (!product) {
            toast("This piece is no longer available");
            return;
          }
          const qty = Math.max(1, Math.min(10, quantity));
          const current = readLocal();
          const existing = current.find((l) => l.product.id === productId);
          let next: CartLine[];
          if (existing) {
            next = current.map((l) =>
              l.product.id === productId
                ? { ...l, quantity: Math.min(product.stock, l.quantity + qty) }
                : l,
            );
          } else {
            next = [
              ...current,
              {
                id: productId,
                quantity: Math.min(product.stock, qty),
                product: {
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  brand: product.brand,
                  priceCents: product.priceCents,
                  originalPriceCents: product.originalPriceCents,
                  image: product.image,
                  imageAlt: product.imageAlt,
                  stock: product.stock,
                },
              },
            ];
          }
          setLocalLines(next);
          setOpen(true);
          return;
        }

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          toast(err?.error ?? "Could not add to bag");
          return;
        }
        const data: CartResponse = await res.json();
        applyCart(data, setAll);
        setOpen(true);
      } finally {
        setBusy(false);
      }
    },
    [setAll, setLocalLines, toast],
  );

  const update = useCallback(
    async (lineId: number, quantity: number) => {
      if (isStaticExport) {
        const current = readLocal();
        const next =
          quantity <= 0
            ? current.filter((l) => l.id !== lineId)
            : current.map((l) =>
                l.id === lineId
                  ? { ...l, quantity: Math.max(1, Math.min(10, Math.min(l.product.stock, quantity))) }
                  : l,
              );
        setLocalLines(next);
        return;
      }
      try {
        const res = await fetch(`/api/cart/${lineId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        if (res.ok) {
          const data: CartResponse = await res.json();
          applyCart(data, setAll);
        }
      } catch {
        /* noop */
      }
    },
    [setAll, setLocalLines],
  );

  const remove = useCallback(
    async (lineId: number) => {
      if (isStaticExport) {
        setLocalLines(readLocal().filter((l) => l.id !== lineId));
        return;
      }
      try {
        const res = await fetch(`/api/cart/${lineId}`, { method: "DELETE" });
        if (res.ok) {
          const data: CartResponse = await res.json();
          applyCart(data, setAll);
        }
      } catch {
        /* noop */
      }
    },
    [setAll, setLocalLines],
  );

  const reset = useCallback(() => {
    if (isStaticExport) writeLocal([]);
    setAll([], 0, 0);
  }, [setAll]);

  const value = useMemo(
    () => ({ lines, count, subtotalCents, open, setOpen, add, update, remove, reset, ready, busy }),
    [lines, count, subtotalCents, open, add, update, remove, reset, ready, busy],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
