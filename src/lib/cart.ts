import "server-only";
import { randomUUID } from "crypto";
import { asc, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { cartItems, products } from "@/db/schema";
import type { CartLine, CartResponse } from "@/lib/cart-types";

export const CART_COOKIE = "ws_cart";

export async function getCartToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value;
}

/** Attach the cart token cookie to a response when it was freshly created. */
export function attachCartCookie(res: NextResponse, token: string) {
  res.cookies.set(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export function ensureToken(existing?: string): { token: string; isNew: boolean } {
  if (existing) return { token: existing, isNew: false };
  return { token: randomUUID(), isNew: true };
}

export async function loadCart(token: string): Promise<CartResponse> {
  const rows = await db
    .select({ line: cartItems, product: products })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartToken, token))
    .orderBy(asc(cartItems.createdAt), asc(cartItems.id));

  const items: CartLine[] = rows.map(({ line, product }) => ({
    id: line.id,
    quantity: line.quantity,
    product: {
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      priceCents: product.priceCents,
      originalPriceCents: product.originalPriceCents,
      image: product.image,
      imageAlt: product.imageAlt,
      stock: product.stock,
    },
  }));

  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotalCents = items.reduce((n, i) => n + i.product.priceCents * i.quantity, 0);

  return { items, count, subtotalCents };
}
