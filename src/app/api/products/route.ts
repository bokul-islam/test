import { NextRequest, NextResponse } from "next/server";
import { listProducts, type ProductQuery } from "@/lib/products";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const query: ProductQuery = {
    q: sp.get("q") ?? undefined,
    category: sp.get("category") ?? undefined,
    collection: sp.get("collection") ?? undefined,
    brand: sp.get("brand") ?? undefined,
    deals: sp.get("deals") === "true",
    min: sp.get("min") ? Number(sp.get("min")) : undefined,
    max: sp.get("max") ? Number(sp.get("max")) : undefined,
    sort: (sp.get("sort") as ProductQuery["sort"]) ?? undefined,
    limit: sp.get("limit") ? Number(sp.get("limit")) : undefined,
  };

  const idsParam = sp.get("ids");
  if (idsParam) {
    query.ids = idsParam
      .split(",")
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n));
  }

  const items = await listProducts(query);
  return NextResponse.json({ items });
}
