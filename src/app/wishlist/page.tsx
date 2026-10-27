"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/components/wishlist-provider";
import { ProductCard } from "@/components/product-card";
import { CATALOG } from "@/data/catalog";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = useMemo(() => {
    const set = new Set(ids);
    return CATALOG.filter((p) => set.has(p.id));
  }, [ids]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-display text-4xl font-medium tracking-tight text-forest-950 sm:text-5xl">
          Your Wishlist
          <Heart className="h-7 w-7 fill-red-500 text-red-500" />
        </h1>
        <p className="mt-2 text-sm text-forest-600">
          {ids.length} {ids.length === 1 ? "piece" : "pieces"} saved for later.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-forest-900/20 bg-white/60 px-6 py-24 text-center">
          <Heart className="h-10 w-10 text-forest-300" />
          <p className="mt-4 font-display text-xl text-forest-900">Nothing saved yet</p>
          <p className="mt-1 max-w-sm text-sm text-forest-600">
            Tap the heart on any piece you love — it will wait for you here.
          </p>
          <Link
            href="/shop"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-forest-800"
          >
            Discover watches
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
