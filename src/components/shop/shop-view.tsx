"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PackageSearch, X } from "lucide-react";
import { CATEGORY_META, COLLECTION_META } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { ShopFilters, SortSelect } from "@/components/shop/filters";
import { formatMoney } from "@/lib/format";
import { catalogBrands, filterCatalog } from "@/lib/catalog-query";
import type { ProductQuery } from "@/lib/product-query";

export function ShopView() {
  const searchParams = useSearchParams();
  const brands = useMemo(() => catalogBrands(), []);

  const query: ProductQuery = useMemo(() => {
    const pick = (k: string) => searchParams.get(k) || undefined;
    return {
      q: pick("q"),
      category: pick("category"),
      collection: pick("collection"),
      brand: pick("brand"),
      deals: pick("deals") === "true",
      min: pick("min") ? Number(pick("min")) : undefined,
      max: pick("max") ? Number(pick("max")) : undefined,
      sort: (pick("sort") as ProductQuery["sort"]) ?? "featured",
      limit: 100,
    };
  }, [searchParams]);

  const items = useMemo(() => filterCatalog(query), [query]);

  let title = "All Watches";
  let blurb = "The complete vault — every certified pre-loved and unworn reference we hold.";
  if (query.q) {
    title = `Results for “${query.q}”`;
    blurb = "Pieces matching your search.";
  } else if (query.brand) {
    title = query.brand;
    blurb = `Every ${query.brand} reference currently in the vault.`;
  } else if (query.deals) {
    title = "Current Deals";
    blurb = "Reduced references — when they're gone, they're gone.";
  } else if (query.collection && COLLECTION_META[query.collection]) {
    title = `${COLLECTION_META[query.collection].label} Collection`;
    blurb = COLLECTION_META[query.collection].tagline + ".";
  } else if (query.category && CATEGORY_META[query.category]) {
    title = CATEGORY_META[query.category].label;
    blurb = CATEGORY_META[query.category].tagline + ".";
  }

  const chips: { label: string; href: string }[] = [];
  const mkRemove = (keys: string[]) => {
    const next = new URLSearchParams(searchParams.toString());
    for (const k of keys) next.delete(k);
    const s = next.toString();
    return s ? `/shop?${s}` : "/shop";
  };
  if (query.q) chips.push({ label: `“${query.q}”`, href: mkRemove(["q"]) });
  if (query.category && CATEGORY_META[query.category])
    chips.push({ label: CATEGORY_META[query.category].label, href: mkRemove(["category"]) });
  if (query.collection && COLLECTION_META[query.collection])
    chips.push({
      label: `${COLLECTION_META[query.collection].label} collection`,
      href: mkRemove(["collection"]),
    });
  if (query.brand) chips.push({ label: query.brand, href: mkRemove(["brand"]) });
  if (query.min != null && query.max != null)
    chips.push({
      label: `${formatMoney(query.min)} – ${formatMoney(Math.min(query.max, 500000000))}`,
      href: mkRemove(["min", "max"]),
    });
  if (query.deals) chips.push({ label: "On sale", href: mkRemove(["deals"]) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
      <header className="mb-8">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-xs text-forest-500">
          <Link href="/" className="transition hover:text-forest-900">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-forest-800">Shop</span>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-medium tracking-tight text-forest-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-forest-600">{blurb}</p>
          </div>
          <p className="text-sm text-forest-500">
            <span className="font-semibold text-forest-900">{items.length}</span>{" "}
            {items.length === 1 ? "piece" : "pieces"} found
          </p>
        </div>

        {chips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group flex items-center gap-2 rounded-full border border-forest-900/15 bg-white px-3.5 py-1.5 text-xs font-medium text-forest-800 shadow-card transition hover:border-red-300 hover:text-red-700"
              >
                {c.label}
                <X className="h-3 w-3 text-forest-400 transition group-hover:text-red-500" />
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="lg:flex lg:gap-8">
        <ShopFilters brands={brands} />

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between">
            <p className="hidden text-xs uppercase tracking-[0.2em] text-forest-500 lg:block">
              Certified authentic · Insured shipping
            </p>
            <SortSelect />
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-forest-900/20 bg-white/60 px-6 py-24 text-center">
              <PackageSearch className="h-10 w-10 text-forest-300" />
              <p className="mt-4 font-display text-xl text-forest-900">Nothing in the vault matches</p>
              <p className="mt-1 max-w-sm text-sm text-forest-600">
                Try widening your filters or search for another brand, reference or style.
              </p>
              <Link
                href="/shop"
                className="mt-6 rounded-full bg-forest-900 px-6 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-forest-800"
              >
                Reset all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
