import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Box,
  Fingerprint,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { discountPercent, formatMoney } from "@/lib/format";
import { CATEGORY_META, COLLECTION_META } from "@/lib/constants";
import { RatingStars } from "@/components/rating-stars";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Watch not found" };
  return {
    title: `${product.brand} ${product.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const discount = discountPercent(product.priceCents, product.originalPriceCents);
  const categoryLabel = CATEGORY_META[product.category]?.label ?? product.category;
  const collectionLabel = COLLECTION_META[product.collection]?.label ?? product.collection;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-forest-500">
        <Link href="/" className="transition hover:text-forest-900">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link href="/shop" className="transition hover:text-forest-900">
          Shop
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="transition hover:text-forest-900"
        >
          {categoryLabel}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-forest-800">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="self-start lg:sticky lg:top-36">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-forest-900/8 bg-cream-100 shadow-card">
            <Image
              src={product.image}
              alt={product.imageAlt || product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.badge && (
                <span
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider",
                    product.badge.startsWith("-")
                      ? "bg-red-600 text-white"
                      : "bg-forest-900 text-cream-50",
                  )}
                >
                  {product.badge}
                </span>
              )}
              {discount !== null && discount > 0 && !product.badge?.startsWith("-") && (
                <span className="rounded-full bg-gold-500 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-forest-950">
                  Save {discount}%
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: Fingerprint, label: "Serial verified" },
              { icon: Box, label: "Full set box & papers" },
              { icon: BadgeCheck, label: "2-year guarantee" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-forest-900/8 bg-white px-2 py-3 shadow-card"
              >
                <f.icon className="mx-auto h-4.5 w-4.5 text-gold-600" />
                <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-forest-600">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium leading-[1.08] tracking-tight text-forest-950 sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <RatingStars rating={product.rating} size={16} />
            <span className="text-sm text-forest-600">
              {product.rating.toFixed(1)} · {product.reviewCount} verified reviews
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-forest-950">
              {formatMoney(product.priceCents)}
            </span>
            {product.originalPriceCents && (
              <span className="text-lg text-forest-400 line-through">
                {formatMoney(product.originalPriceCents)}
              </span>
            )}
            {discount !== null && discount > 0 && (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                You save {formatMoney((product.originalPriceCents ?? 0) - product.priceCents)}
              </span>
            )}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-forest-700">{product.description}</p>

          <div className="mt-6 flex items-center gap-2 text-sm">
            {product.stock > 0 ? (
              product.stock <= 3 ? (
                <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                  </span>
                  Only {product.stock} left — moving fast
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-forest-900/5 px-3 py-1 text-xs font-semibold text-forest-700">
                  <span className="h-2 w-2 rounded-full bg-forest-500" />
                  In stock, ready to ship
                </span>
              )
            ) : (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                Currently sold out
              </span>
            )}
          </div>

          <div className="mt-7">
            <AddToCart productId={product.id} stock={product.stock} name={product.name} />
          </div>

          <ul className="mt-8 space-y-3 border-t border-forest-900/10 pt-7 text-sm text-forest-700">
            {[
              { icon: Truck, text: "Free insured worldwide shipping on orders over $500" },
              { icon: ShieldCheck, text: "Independently authenticated & serial-verified" },
              { icon: RotateCcw, text: "60-day returns — no questions asked" },
            ].map((row) => (
              <li key={row.text} className="flex items-center gap-3">
                <row.icon className="h-4.5 w-4.5 shrink-0 text-gold-600" />
                {row.text}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-forest-400">
            SKU WS-{String(product.id).padStart(5, "0")} · {categoryLabel} · {collectionLabel}{" "}
            collection
          </p>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight text-forest-950">
            Every detail,
            <br />
            <em className="italic text-gold-600">certified.</em>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-600">
            Each reference ships with its original papers, our independent authentication report and
            a two-year WatchShop guarantee on top of the manufacturer warranty.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-forest-900/8 bg-white shadow-card">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specs).map(([k, v], i) => (
                <tr
                  key={k}
                  className={cn("border-b border-forest-900/6 last:border-0", i % 2 === 1 && "bg-cream-100/60")}
                >
                  <th className="w-44 px-5 py-4 text-left align-top text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-500">
                    {k}
                  </th>
                  <td className="px-5 py-4 font-medium text-forest-900">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related */}
      <section className="mt-20">
        <SectionHeading
          subtitle="Complete The Look"
          title="You May Also Like"
          href={`/shop?category=${product.category}`}
          hrefLabel="More like this"
        />
        <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
