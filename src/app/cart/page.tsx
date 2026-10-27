"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { lines, count, subtotalCents, update, remove, ready } = useCart();
  const shippingCents = subtotalCents >= 50000 || subtotalCents === 0 ? 0 : 2900;

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-forest-900/5">
          <ShoppingBag className="h-10 w-10 text-forest-400" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-medium text-forest-950">
          Your bag is empty
        </h1>
        <p className="mt-3 max-w-sm text-sm text-forest-600">
          Every great collection starts with a single reference. Explore the vault and find yours.
        </p>
        <Link
          href="/shop"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest-900 px-8 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-800"
        >
          Browse Watches
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-medium tracking-tight text-forest-950 sm:text-5xl">
          Your Bag
        </h1>
        <p className="mt-2 text-sm text-forest-600">
          {count} {count === 1 ? "item" : "items"} reserved — pieces are held for 60 minutes while
          you decide.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Lines */}
        <ul className="divide-y divide-forest-900/10">
          {lines.map((line, i) => (
            <motion.li
              key={line.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-5 py-6 first:pt-0"
            >
              <Link
                href={`/product/${line.product.slug}`}
                className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-cream-100 shadow-card"
              >
                <Image
                  src={line.product.image}
                  alt={line.product.imageAlt}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-700">
                      {line.product.brand}
                    </p>
                    <Link
                      href={`/product/${line.product.slug}`}
                      className="mt-1 block truncate font-display text-lg font-medium text-forest-950 transition hover:text-forest-700"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-forest-500">
                      {formatMoney(line.product.priceCents)} each
                    </p>
                  </div>
                  <button
                    onClick={() => remove(line.id)}
                    aria-label="Remove from bag"
                    className="rounded-lg p-2 text-forest-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full border border-forest-900/15 bg-white">
                    <button
                      onClick={() => update(line.id, line.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-2.5 text-forest-700 transition hover:text-forest-950"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      onClick={() => update(line.id, line.quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-2.5 text-forest-700 transition hover:text-forest-950"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-display text-xl font-semibold text-forest-950">
                    {formatMoney(line.product.priceCents * line.quantity)}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-forest-900/8 bg-white p-6 shadow-card lg:sticky lg:top-36">
          <h2 className="font-display text-xl font-semibold text-forest-950">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-forest-700">
              <dt>Subtotal</dt>
              <dd className="font-medium text-forest-950">{formatMoney(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between text-forest-700">
              <dt>Shipping</dt>
              <dd className="font-medium text-forest-950">
                {shippingCents === 0 ? (
                  <span className="text-gold-700">Free</span>
                ) : (
                  formatMoney(shippingCents)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-forest-900/10 pt-3">
              <dt className="font-semibold text-forest-950">Total</dt>
              <dd className="font-display text-2xl font-semibold text-forest-950">
                {formatMoney(subtotalCents + shippingCents)}
              </dd>
            </div>
          </dl>

          {shippingCents > 0 && (
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-cream-100 p-3 text-xs text-forest-700">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              Add {formatMoney(50000 - subtotalCents)} more to unlock free worldwide shipping.
            </p>
          )}

          <Link
            href="/checkout"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-forest-800"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-xs font-medium text-forest-600 underline-offset-4 transition hover:text-forest-950 hover:underline"
          >
            Continue shopping
          </Link>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-forest-500">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
            Encrypted checkout · Visa, Mastercard, AMEX, PayPal
          </p>
        </aside>
      </div>
    </div>
  );
}
