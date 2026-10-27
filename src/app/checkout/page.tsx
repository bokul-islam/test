"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { isStaticExport } from "@/lib/static-mode";

const inputCls =
  "w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm text-forest-950 placeholder:text-forest-400 transition focus:border-gold-500 focus:outline-none";

const paymentOptions = [
  { value: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, AMEX", icon: CreditCard },
  { value: "paypal", label: "PayPal", sub: "Redirect after confirmation", icon: Wallet },
  { value: "cod", label: "Bank Transfer", sub: "Invoice via email", icon: Banknote },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, count, subtotalCents, ready, reset } = useCart();
  const [payment, setPayment] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingCents = subtotalCents >= 50000 || subtotalCents === 0 ? 0 : 2900;
  const total = subtotalCents + shippingCents;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: fd.get("email"),
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      address: fd.get("address"),
      city: fd.get("city"),
      postalCode: fd.get("postalCode"),
      country: fd.get("country"),
      paymentMethod: payment,
    };
    try {
      const snapshot = {
        email: String(payload.email ?? ""),
        firstName: String(payload.firstName ?? ""),
        lastName: String(payload.lastName ?? ""),
        address: String(payload.address ?? ""),
        city: String(payload.city ?? ""),
        postalCode: String(payload.postalCode ?? ""),
        country: String(payload.country ?? ""),
        paymentMethod: payment,
        subtotalCents,
        shippingCents,
        totalCents: total,
        items: lines.map((l) => ({
          id: l.id,
          quantity: l.quantity,
          name: l.product.name,
          brand: l.product.brand,
          priceCents: l.product.priceCents,
          image: l.product.image,
        })),
      };

      let orderNumber = `WS-${Date.now().toString(36).toUpperCase()}`;

      if (!isStaticExport) {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Checkout failed — please try again.");
          setLoading(false);
          return;
        }
        orderNumber = data.orderNumber ?? orderNumber;
      }

      try {
        sessionStorage.setItem("ws_last_order", JSON.stringify({ orderNumber, ...snapshot }));
      } catch {
        /* ignore */
      }
      reset();
      router.push(`/order/confirmation?n=${encodeURIComponent(orderNumber)}`);
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  };

  if (ready && count === 0 && !loading) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-medium text-forest-950">Nothing to check out</h1>
        <p className="mt-3 max-w-sm text-sm text-forest-600">
          Your bag is empty. Add a piece you love and come back.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-900 px-8 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-800"
        >
          Browse Watches
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-2 text-sm text-forest-600 transition hover:text-forest-950"
      >
        <ArrowLeft className="h-4 w-4" /> Back to bag
      </Link>

      <h1 className="font-display text-4xl font-medium tracking-tight text-forest-950 sm:text-5xl">
        Secure Checkout
      </h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-forest-600">
        <Lock className="h-3.5 w-3.5 text-gold-600" />
        256-bit encrypted · Your details are never stored.
      </p>

      <form onSubmit={submit} className="mt-9 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Form */}
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-forest-950">
              1 · Contact
            </h2>
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              autoComplete="email"
              className={inputCls}
            />
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-forest-950">
              2 · Shipping Address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="firstName" required placeholder="First name" autoComplete="given-name" className={inputCls} />
              <input name="lastName" required placeholder="Last name" autoComplete="family-name" className={inputCls} />
              <div className="sm:col-span-2">
                <input name="address" required placeholder="Street address" autoComplete="street-address" className={inputCls} />
              </div>
              <input name="city" required placeholder="City" autoComplete="address-level2" className={inputCls} />
              <input name="postalCode" required placeholder="Postal code" autoComplete="postal-code" className={inputCls} />
              <div className="sm:col-span-2">
                <select name="country" required defaultValue="" className={cn(inputCls, "text-forest-700")}>
                  <option value="" disabled>
                    Select country
                  </option>
                  {["United States", "United Kingdom", "Canada", "Germany", "France", "United Arab Emirates", "Singapore", "Australia", "Japan", "India"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-forest-950">
              3 · Payment Method
            </h2>
            <div className="space-y-3">
              {paymentOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setPayment(opt.value)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition",
                    payment === opt.value
                      ? "border-gold-500 bg-gold-100/40 shadow-card"
                      : "border-forest-900/15 bg-white hover:border-gold-500/60",
                  )}
                >
                  <opt.icon
                    className={cn(
                      "h-5 w-5",
                      payment === opt.value ? "text-gold-600" : "text-forest-400",
                    )}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-forest-950">{opt.label}</span>
                    <span className="block text-xs text-forest-500">{opt.sub}</span>
                  </span>
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full border-2 transition",
                      payment === opt.value
                        ? "border-gold-500 bg-gold-500"
                        : "border-forest-900/20 bg-white",
                    )}
                  >
                    {payment === opt.value && (
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-950" />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-forest-500">
              This is a demo checkout — no real payment is processed.
            </p>
          </section>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || count === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 py-4 text-sm font-semibold text-cream-50 transition hover:bg-forest-800 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            {loading ? "Placing order…" : `Place Order — ${formatMoney(total)}`}
          </button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-forest-900/8 bg-white p-6 shadow-card lg:sticky lg:top-36">
          <h2 className="font-display text-xl font-semibold text-forest-950">
            Your Pieces ({count})
          </h2>
          <ul className="mt-5 space-y-4">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center gap-3">
                <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                  <Image
                    src={line.product.image}
                    alt={line.product.imageAlt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -right-0 -top-0 grid h-5 w-5 place-items-center rounded-bl-lg bg-forest-900 text-[10px] font-bold text-cream-50">
                    {line.quantity}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-wider text-gold-700">
                    {line.product.brand}
                  </span>
                  <span className="block truncate text-sm font-medium text-forest-950">
                    {line.product.name}
                  </span>
                </span>
                <span className="text-sm font-semibold text-forest-950">
                  {formatMoney(line.product.priceCents * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2.5 border-t border-forest-900/10 pt-5 text-sm">
            <div className="flex justify-between text-forest-700">
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between text-forest-700">
              <dt>Insured shipping</dt>
              <dd>{shippingCents === 0 ? "Free" : formatMoney(shippingCents)}</dd>
            </div>
            <div className="flex justify-between border-t border-forest-900/10 pt-3 font-semibold text-forest-950">
              <dt>Total</dt>
              <dd className="font-display text-xl">{formatMoney(total)}</dd>
            </div>
          </dl>
          <p className="mt-5 flex items-center gap-1.5 text-[11px] text-forest-500">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
            Covered by the WatchShop authenticity warranty.
          </p>
        </aside>
      </form>
    </div>
  );
}
