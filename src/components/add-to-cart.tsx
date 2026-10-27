"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { cn } from "@/lib/utils";

export function AddToCart({
  productId,
  stock,
  name,
}: {
  productId: number;
  stock: number;
  name: string;
}) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const saved = wishlist.has(productId);

  const clamp = (n: number) => Math.max(1, Math.min(stock, Math.min(10, n)));

  const handleAdd = async () => {
    setAdding(true);
    await add(productId, qty);
    setAdding(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-forest-900/20 bg-white">
        <button
          onClick={() => setQty(clamp(qty - 1))}
          disabled={qty <= 1}
          aria-label="Decrease quantity"
          className="p-3 text-forest-700 transition hover:text-forest-950 disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums">{qty}</span>
        <button
          onClick={() => setQty(clamp(qty + 1))}
          disabled={qty >= Math.min(10, stock)}
          aria-label="Increase quantity"
          className="p-3 text-forest-700 transition hover:text-forest-950 disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={adding || stock === 0}
        className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-900 px-8 py-3.5 text-sm font-semibold text-cream-50 transition-all hover:bg-forest-800 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ShoppingBag className="h-4 w-4" />
        {stock === 0 ? "Sold Out" : adding ? "Adding…" : "Add to Bag"}
      </button>

      <button
        onClick={() => wishlist.toggle(productId, name)}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full border transition-all hover:scale-105",
          saved
            ? "border-red-200 bg-red-50 text-red-500"
            : "border-forest-900/20 bg-white text-forest-700 hover:border-red-200 hover:text-red-500",
        )}
      >
        <Heart className={cn("h-5 w-5", saved && "fill-current")} />
      </button>
    </div>
  );
}
