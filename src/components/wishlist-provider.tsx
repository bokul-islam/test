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
import { useToast } from "@/components/toast";

type WishlistContextValue = {
  ids: number[];
  count: number;
  has: (id: number) => boolean;
  toggle: (id: number, label?: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "ws_wishlist_v1";

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [ids, setIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw) as number[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: number, label?: string) => {
      setIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        toast(
          exists
            ? `${label ?? "Item"} removed from wishlist`
            : `${label ?? "Item"} saved to wishlist`,
        );
        return next;
      });
    },
    [toast],
  );

  const value = useMemo(
    () => ({ ids: hydrated ? ids : [], count: hydrated ? ids.length : 0, has, toggle }),
    [ids, hydrated, has, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
