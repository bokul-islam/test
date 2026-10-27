import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, orderItems, orders, products } from "@/db/schema";
import { getCartToken, loadCart } from "@/lib/cart";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const fields = {
    email: String(body.email ?? "").trim(),
    firstName: String(body.firstName ?? "").trim(),
    lastName: String(body.lastName ?? "").trim(),
    address: String(body.address ?? "").trim(),
    city: String(body.city ?? "").trim(),
    postalCode: String(body.postalCode ?? "").trim(),
    country: String(body.country ?? "").trim(),
    paymentMethod: String(body.paymentMethod ?? "card"),
  };

  if (!EMAIL_RE.test(fields.email)) {
    return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
  }
  for (const key of ["firstName", "lastName", "address", "city", "postalCode", "country"] as const) {
    if (!fields[key].length) {
      return NextResponse.json({ error: "Please complete all shipping fields" }, { status: 400 });
    }
  }
  if (!["card", "paypal", "cod"].includes(fields.paymentMethod)) {
    fields.paymentMethod = "card";
  }

  const token = await getCartToken();
  if (!token) return NextResponse.json({ error: "Your bag is empty" }, { status: 400 });

  const cart = await loadCart(token);
  if (cart.items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty" }, { status: 400 });
  }

  // Stock validation
  for (const line of cart.items) {
    if (line.quantity > line.product.stock) {
      return NextResponse.json(
        { error: `Only ${line.product.stock} left in stock for ${line.product.name}` },
        { status: 400 },
      );
    }
  }

  const shippingCents = cart.subtotalCents >= 50000 ? 0 : 2900;
  const totalCents = cart.subtotalCents + shippingCents;
  const orderNumber = `WS-${Date.now().toString(36).toUpperCase().slice(-4)}${randomBytes(2)
    .toString("hex")
    .toUpperCase()}`;

  const order = await db.transaction(async (tx) => {
    const [created] = await tx
      .insert(orders)
      .values({
        orderNumber,
        email: fields.email,
        firstName: fields.firstName,
        lastName: fields.lastName,
        address: fields.address,
        city: fields.city,
        postalCode: fields.postalCode,
        country: fields.country,
        paymentMethod: fields.paymentMethod,
        subtotalCents: cart.subtotalCents,
        shippingCents,
        totalCents,
        status: "placed",
      })
      .returning();

    await tx.insert(orderItems).values(
      cart.items.map((line) => ({
        orderId: created.id,
        productId: line.product.id,
        name: line.product.name,
        brand: line.product.brand,
        priceCents: line.product.priceCents,
        quantity: line.quantity,
        image: line.product.image,
      })),
    );

    for (const line of cart.items) {
      await tx
        .update(products)
        .set({ stock: sql`greatest(0, ${products.stock} - ${line.quantity})` })
        .where(eq(products.id, line.product.id));
    }

    await tx.delete(cartItems).where(eq(cartItems.cartToken, token));

    return created;
  });

  return NextResponse.json({
    orderNumber: order.orderNumber,
    totalCents: order.totalCents,
  });
}
