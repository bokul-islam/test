"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, MapPin, PackageCheck } from "lucide-react";
import { formatMoney } from "@/lib/format";

type StoredOrder = {
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  items: {
    id: number;
    quantity: number;
    name: string;
    brand: string;
    priceCents: number;
    image: string;
  }[];
};

function ConfirmationInner() {
  const searchParams = useSearchParams();
  const n = searchParams.get("n");
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ws_last_order");
      if (raw) {
        const parsed = JSON.parse(raw) as StoredOrder;
        if (!n || parsed.orderNumber === n) setOrder(parsed);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [n]);

  const orderNumber = order?.orderNumber ?? n ?? "WS-DEMO";
  const firstName = order?.firstName ?? "there";
  const eta = new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-forest-500">
        Preparing your confirmation…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-900 text-gold-400 shadow-lift">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">
          Order confirmed
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-forest-950 sm:text-5xl">
          Thank you, {firstName}.
        </h1>
        <p className="mt-3 text-sm text-forest-600">
          Order <span className="font-mono font-semibold text-forest-900">{orderNumber}</span> is
          being prepared by our atelier.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-2xl border border-forest-900/8 bg-white p-5 shadow-card">
          <Mail className="mt-0.5 h-5 w-5 text-gold-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-500">
              Confirmation sent to
            </p>
            <p className="mt-1 text-sm font-medium text-forest-950">
              {order?.email ?? "your inbox"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-forest-900/8 bg-white p-5 shadow-card">
          <PackageCheck className="mt-0.5 h-5 w-5 text-gold-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-500">
              Estimated delivery
            </p>
            <p className="mt-1 text-sm font-medium text-forest-950">{eta} — insured courier</p>
          </div>
        </div>
      </div>

      {order && (
        <>
          <div className="mt-6 rounded-2xl border border-forest-900/8 bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-forest-950">Order items</h2>
            <ul className="mt-4 divide-y divide-forest-900/8">
              {order.items.map((line) => (
                <li key={line.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                    <Image src={line.image} alt={line.name} fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-wider text-gold-700">
                      {line.brand}
                    </span>
                    <span className="block truncate text-sm font-medium text-forest-950">
                      {line.name}
                    </span>
                    <span className="text-xs text-forest-500">Qty {line.quantity}</span>
                  </span>
                  <span className="text-sm font-semibold text-forest-950">
                    {formatMoney(line.priceCents * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-forest-900/10 pt-4 text-sm">
              <div className="flex justify-between text-forest-700">
                <dt>Subtotal</dt>
                <dd>{formatMoney(order.subtotalCents)}</dd>
              </div>
              <div className="flex justify-between text-forest-700">
                <dt>Shipping</dt>
                <dd>{order.shippingCents === 0 ? "Free" : formatMoney(order.shippingCents)}</dd>
              </div>
              <div className="flex justify-between pt-1 font-display text-xl font-semibold text-forest-950">
                <dt>Total</dt>
                <dd>{formatMoney(order.totalCents)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-cream-100 p-5 text-sm text-forest-700">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <p>
              Shipping to {order.address}, {order.city} {order.postalCode}, {order.country}. A
              watchmaker will contact you if bracelet sizing is available for your piece.
            </p>
          </div>
        </>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 rounded-full bg-forest-900 px-8 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-forest-800"
        >
          Continue Exploring
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-forest-500">
          Preparing your confirmation…
        </div>
      }
    >
      <ConfirmationInner />
    </Suspense>
  );
}
