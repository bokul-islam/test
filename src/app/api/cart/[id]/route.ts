import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, products } from "@/db/schema";
import { getCartToken, loadCart } from "@/lib/cart";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const lineId = Number(id);
  if (!Number.isFinite(lineId)) {
    return NextResponse.json({ error: "Invalid line id" }, { status: 400 });
  }

  let body: { quantity?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const token = await getCartToken();
  if (!token) return NextResponse.json({ error: "No cart" }, { status: 404 });

  const quantity = Number(body.quantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.id, lineId), eq(cartItems.cartToken, token)));
    return NextResponse.json(await loadCart(token));
  }

  const [line] = await db
    .select({ line: cartItems, stock: products.stock })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(and(eq(cartItems.id, lineId), eq(cartItems.cartToken, token)))
    .limit(1);

  if (!line) return NextResponse.json({ error: "Line not found" }, { status: 404 });

  const clamped = Math.max(1, Math.min(10, Math.min(line.stock, quantity)));
  await db.update(cartItems).set({ quantity: clamped }).where(eq(cartItems.id, lineId));

  return NextResponse.json(await loadCart(token));
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const lineId = Number(id);
  const token = await getCartToken();
  if (!token) return NextResponse.json({ error: "No cart" }, { status: 404 });

  await db
    .delete(cartItems)
    .where(and(eq(cartItems.id, lineId), eq(cartItems.cartToken, token)));

  return NextResponse.json(await loadCart(token));
}
