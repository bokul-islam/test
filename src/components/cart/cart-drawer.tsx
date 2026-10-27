"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatMoney } from "@/lib/format";

export function CartDrawer() {
  const { open, setOpen, lines, count, subtotalCents, update, remove } = useCart();
  const freeShipTarget = 50000; // $500
  const progress = Math.min(100, Math.round((subtotalCents / freeShipTarget) * 100));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-forest-950/60 backdrop-blur-sm"
          />
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-cream-50 shadow-lift"
            role="dialog"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between border-b border-forest-900/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-forest-800" />
                <h2 className="font-display text-xl font-semibold text-forest-950">
                  Your Bag{" "}
                  <span className="text-base font-normal text-forest-600">
                    ({count} {count === 1 ? "item" : "items"})
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="rounded-full p-2 text-forest-700 transition hover:bg-forest-900/5"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Free shipping progress */}
            <div className="border-b border-forest-900/10 bg-cream-100/60 px-6 py-3">
              <div className="flex items-center gap-2 text-xs text-forest-700">
                <Truck className="h-4 w-4 text-gold-600" />
                {subtotalCents >= freeShipTarget ? (
                  <span className="font-medium text-forest-800">
                    Congratulations — your order ships free.
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatMoney(freeShipTarget - subtotalCents)}</strong> more for free
                    worldwide shipping
                  </span>
                )}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-forest-900/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="rounded-full bg-forest-900/5 p-6">
                    <ShoppingBag className="h-8 w-8 text-forest-400" />
                  </div>
                  <p className="font-display text-lg text-forest-900">Your bag is empty</p>
                  <p className="max-w-[240px] text-sm text-forest-600">
                    Discover timeless pieces from the world&apos;s finest maisons.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-full bg-forest-900 px-6 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-forest-800"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-forest-900/10">
                  {lines.map((line) => (
                    <motion.li
                      key={line.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 py-5"
                    >
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={() => setOpen(false)}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-100"
                      >
                        <Image
                          src={line.product.image}
                          alt={line.product.imageAlt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-gold-700">
                              {line.product.brand}
                            </p>
                            <Link
                              href={`/product/${line.product.slug}`}
                              onClick={() => setOpen(false)}
                              className="mt-0.5 line-clamp-1 text-sm font-medium text-forest-950 hover:text-forest-700"
                            >
                              {line.product.name}
                            </Link>
                          </div>
                          <button
                            onClick={() => remove(line.id)}
                            aria-label="Remove item"
                            className="rounded p-1 text-forest-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-forest-900/15">
                            <button
                              onClick={() => update(line.id, line.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1.5 text-forest-700 transition hover:text-forest-950"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => update(line.id, line.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1.5 text-forest-700 transition hover:text-forest-950"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-forest-950">
                            {formatMoney(line.product.priceCents * line.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-forest-900/10 bg-white/70 px-6 py-5 backdrop-blur">
                <div className="flex items-center justify-between text-sm text-forest-700">
                  <span>Subtotal</span>
                  <span className="font-display text-lg font-semibold text-forest-950">
                    {formatMoney(subtotalCents)}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-forest-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
                  Taxes and shipping calculated at checkout
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-forest-900/20 py-2.5 text-center text-sm font-medium text-forest-900 transition hover:bg-forest-900/5"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-center gap-1.5 rounded-full bg-forest-900 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-forest-800"
                  >
                    Checkout
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
