import "server-only";
import { and, asc, desc, eq, gte, ilike, inArray, lte, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { products, type Product, type ProductDTO } from "@/db/schema";

export function toDTO(p: Product): ProductDTO {
  return { ...p, rating: Number(p.rating) };
}

export type ProductQuery = {
  q?: string;
  category?: string;
  collection?: string;
  brand?: string;
  deals?: boolean;
  min?: number; // cents
  max?: number; // cents
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
  ids?: number[];
  limit?: number;
};

export async function listProducts(query: ProductQuery = {}): Promise<ProductDTO[]> {
  const conditions = [];

  if (query.q) {
    const like = `%${query.q.trim()}%`;
    conditions.push(
      or(
        ilike(products.name, like),
        ilike(products.brand, like),
        ilike(products.collection, like),
        ilike(products.category, like),
      ),
    );
  }
  if (query.category && query.category !== "all") {
    if (query.category === "luxury") {
      conditions.push(eq(products.collection, "luxury"));
    } else {
      conditions.push(eq(products.category, query.category));
    }
  }
  if (query.collection && query.collection !== "all") {
    conditions.push(eq(products.collection, query.collection));
  }
  if (query.brand) conditions.push(eq(products.brand, query.brand));
  if (query.deals) conditions.push(sql`${products.originalPriceCents} is not null`);
  if (typeof query.min === "number") conditions.push(gte(products.priceCents, query.min));
  if (typeof query.max === "number") conditions.push(lte(products.priceCents, query.max));
  if (query.ids && query.ids.length > 0) conditions.push(inArray(products.id, query.ids));

  const orderBy =
    query.sort === "price-asc"
      ? [asc(products.priceCents)]
      : query.sort === "price-desc"
        ? [desc(products.priceCents)]
        : query.sort === "rating"
          ? [desc(products.rating)]
          : query.sort === "newest"
            ? [desc(products.createdAt), desc(products.id)]
            : [desc(sql`case when ${products.badge} is not null then 1 else 0 end`), desc(products.rating)];

  const rows = await db
    .select()
    .from(products)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...orderBy)
    .limit(query.limit ?? 100);

  return rows.map(toDTO);
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return row ? toDTO(row) : null;
}

export async function getBestSellers(limit = 5): Promise<ProductDTO[]> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.badge, "Best Seller"))
    .orderBy(desc(products.reviewCount))
    .limit(limit);
  if (rows.length < limit) {
    const more = await db
      .select()
      .from(products)
      .orderBy(desc(products.rating), desc(products.reviewCount))
      .limit(limit - rows.length);
    const seen = new Set(rows.map((r) => r.id));
    return [...rows, ...more.filter((r) => !seen.has(r.id))].map(toDTO);
  }
  return rows.map(toDTO);
}

export async function getLatestArrivals(limit = 4): Promise<ProductDTO[]> {
  const rows = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt), desc(products.id))
    .limit(limit);
  return rows.map(toDTO);
}

export async function getRelatedProducts(p: ProductDTO, limit = 4): Promise<ProductDTO[]> {
  const rows = await db
    .select()
    .from(products)
    .where(
      and(
        sql`${products.id} != ${p.id}`,
        or(eq(products.category, p.category), eq(products.collection, p.collection)),
      ),
    )
    .orderBy(desc(products.rating))
    .limit(limit);
  return rows.map(toDTO);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({ key: products.category, count: sql<number>`count(*)::int` })
    .from(products)
    .groupBy(products.category);
  const map: Record<string, number> = {};
  for (const r of rows) map[r.key] = r.count;
  map.luxury =
    (await db
      .select({ count: sql<number>`count(*)::int` })
      .from(products)
      .where(eq(products.collection, "luxury")))[0]?.count ?? 0;
  return map;
}

export async function getAllBrands(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ brand: products.brand })
    .from(products)
    .orderBy(asc(products.brand));
  return rows.map((r) => r.brand);
}

export async function searchSuggest(q: string, limit = 6): Promise<ProductDTO[]> {
  if (!q.trim()) return [];
  return listProducts({ q, limit });
}
