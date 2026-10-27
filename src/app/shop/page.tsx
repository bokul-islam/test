import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Shop All Watches",
  description: "Browse the full WatchShop vault — men's, women's, smart and luxury timepieces.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-forest-500">
          Loading the vault…
        </div>
      }
    >
      <ShopView />
    </Suspense>
  );
}
