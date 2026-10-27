"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/toast";
import { CartProvider } from "@/components/cart/cart-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <CartDrawer />
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
