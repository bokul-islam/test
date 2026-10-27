import { NextRequest, NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, products } from "@/db/schema";
import { attachCartCookie, ensureToken, getCartToken, loadCart } from "@/lib/cart";

export async function GET() {
  let existing = await getCartToken();
  const { token, isNew } = ensureToken(existing);
  if (isNew) existing = token;
  const cart = await loadCart(token);
  const res = NextResponse.json(cart);
  if (isNew) attachCartCookie(res, token);
  return res;
}

export async function POST(req: NextRequest) {
  let body: { productId?: number; quantity?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const productId = Number(body.productId);
  const quantity = Math.max(1, Math.min(10, Number(body.quantity) || 1));
  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  if (product.stock <= 0) {
    return NextResponse.json({ error: "This piece is currently out of stock" }, { status: 400 });
  }

  const existingToken = await getCartToken();
  const { token, isNew } = ensureToken(existingToken);

  const [line] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartToken, token), eq(cartItems.productId, productId)))
    .limit(1);

  if (line) {
    const nextQty = Math.min(product.stock, line.quantity + quantity);
    await db
      .update(cartItems)
      .set({ quantity: nextQty })
      .where(eq(cartItems.id, line.id));
  } else {
    await db.insert(cartItems).values({
      cartToken: token,
      productId,
      quantity: Math.min(product.stock, quantity),
    });
  }

  // Keep response consistent — recompute cautiously
  const cart = await loadCart(token);
  const res = NextResponse.json(cart);
  if (isNew) attachCartCookie(res, token);
  return res;
}

export async function DELETE() {
  const existingToken = await getCartToken();
  if (existingToken) {
    await db.execute(sql`delete from ${cartItems} where ${cartItems.cartToken} = ${existingToken}`);
  }
  return NextResponse.json({ ok: true });
}
