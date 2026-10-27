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

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

function applyCart(
  data: CartResponse,
  set: (lines: CartLine[], count: number, subtotal: number) => void,
) {
  set(data.items, data.count, data.subtotalCents);
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

  useEffect(() => {
    let cancelled = false;
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
    [setAll, toast],
  );

  const update = useCallback(
    async (lineId: number, quantity: number) => {
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
    [setAll],
  );

  const remove = useCallback(
    async (lineId: number) => {
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
    [setAll],
  );

  const reset = useCallback(() => {
    setAll([], 0, 0);
  }, [setAll]);

  const value = useMemo(
    () => ({ lines, count, subtotalCents, open, setOpen, add, update, remove, reset, ready, busy }),
    [lines, count, subtotalCents, open, add, update, remove, reset, ready, busy],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
