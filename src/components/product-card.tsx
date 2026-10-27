"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { ProductDTO } from "@/db/schema";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { discountPercent, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { RatingStars } from "./rating-stars";

type Props = {
  product: ProductDTO;
  index?: number;
  className?: string;
  imageClassName?: string;
};

export function ProductCard({ product, index = 0, className, imageClassName }: Props) {
  const { add, busy } = useCart();
  const wishlist = useWishlist();
  const [adding, setAdding] = useState(false);
  const saved = wishlist.has(product.id);
  const discount = discountPercent(product.priceCents, product.originalPriceCents);

  const handleAdd = async () => {
    setAdding(true);
    await add(product.id);
    setAdding(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-forest-900/8 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      <div className={cn("relative aspect-[4/5] overflow-hidden bg-cream-100", imageClassName)}>
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={cn("object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]")}
          />
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                product.badge.startsWith("-")
                  ? "bg-red-600 text-white"
                  : "bg-forest-900 text-cream-50",
              )}
            >
              {product.badge}
            </span>
          )}
          {discount !== null && !product.badge?.startsWith("-") && (
            <span className="rounded-full bg-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest-950">
              Save {discount}%
            </span>
          )}
          {product.stock <= 3 && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* wishlist */}
        <button
          onClick={() => wishlist.toggle(product.id, product.name)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur transition-all hover:scale-110",
            saved ? "text-red-500" : "text-forest-600 hover:text-red-500",
          )}
        >
          <Heart className={cn("h-4 w-4", saved && "fill-current")} />
        </button>

        {/* Desktop hover quick-add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            onClick={handleAdd}
            disabled={adding || busy || product.stock === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-900/95 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream-50 backdrop-blur transition hover:bg-forest-950 disabled:opacity-60"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {product.stock === 0 ? "Sold Out" : adding ? "Adding…" : "Add to Bag"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700">
          {product.brand}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-1 text-sm font-medium leading-snug text-forest-950 transition hover:text-forest-700"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5">
          <RatingStars rating={product.rating} />
          <span className="text-[11px] text-forest-500">({product.reviewCount})</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-forest-950">
            {formatMoney(product.priceCents)}
          </span>
          {product.originalPriceCents && (
            <span className="text-xs text-forest-400 line-through">
              {formatMoney(product.originalPriceCents)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
