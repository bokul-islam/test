import { CATALOG } from "@/data/catalog";
import type { ProductDTO } from "@/db/schema";
import type { ProductQuery } from "@/lib/product-query";

export function filterCatalog(query: ProductQuery = {}): ProductDTO[] {
  let rows = [...CATALOG];

  if (query.q) {
    const q = query.q.trim().toLowerCase();
    rows = rows.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  if (query.category && query.category !== "all") {
    rows =
      query.category === "luxury"
        ? rows.filter((p) => p.collection === "luxury")
        : rows.filter((p) => p.category === query.category);
  }
  if (query.collection && query.collection !== "all") {
    rows = rows.filter((p) => p.collection === query.collection);
  }
  if (query.brand) rows = rows.filter((p) => p.brand === query.brand);
  if (query.deals) rows = rows.filter((p) => p.originalPriceCents != null);
  if (typeof query.min === "number") rows = rows.filter((p) => p.priceCents >= query.min!);
  if (typeof query.max === "number") rows = rows.filter((p) => p.priceCents <= query.max!);
  if (query.ids && query.ids.length > 0) {
    const set = new Set(query.ids);
    rows = rows.filter((p) => set.has(p.id));
  }

  const sort = query.sort ?? "featured";
  rows.sort((a, b) => {
    if (sort === "price-asc") return a.priceCents - b.priceCents;
    if (sort === "price-desc") return b.priceCents - a.priceCents;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "newest") return b.id - a.id;
    const ab = a.badge ? 1 : 0;
    const bb = b.badge ? 1 : 0;
    if (bb !== ab) return bb - ab;
    return b.rating - a.rating;
  });

  return rows.slice(0, query.limit ?? 100);
}

export function catalogBySlug(slug: string): ProductDTO | null {
  return CATALOG.find((p) => p.slug === slug) ?? null;
}

export function catalogById(id: number): ProductDTO | null {
  return CATALOG.find((p) => p.id === id) ?? null;
}

export function catalogBestSellers(limit = 5): ProductDTO[] {
  const tagged = CATALOG.filter((p) => p.badge === "Best Seller").sort(
    (a, b) => b.reviewCount - a.reviewCount,
  );
  if (tagged.length >= limit) return tagged.slice(0, limit);
  const seen = new Set(tagged.map((p) => p.id));
  const more = [...CATALOG]
    .filter((p) => !seen.has(p.id))
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  return [...tagged, ...more].slice(0, limit);
}

export function catalogLatest(limit = 4): ProductDTO[] {
  return [...CATALOG].sort((a, b) => b.id - a.id).slice(0, limit);
}

export function catalogRelated(product: ProductDTO, limit = 4): ProductDTO[] {
  return CATALOG.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection),
  )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function catalogCategoryCounts(): Record<string, number> {
  const map: Record<string, number> = {};
  for (const p of CATALOG) {
    map[p.category] = (map[p.category] ?? 0) + 1;
  }
  map.luxury = CATALOG.filter((p) => p.collection === "luxury").length;
  return map;
}

export function catalogBrands(): string[] {
  return Array.from(new Set(CATALOG.map((p) => p.brand))).sort();
}
