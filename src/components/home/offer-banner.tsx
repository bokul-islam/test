"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, TicketPercent } from "lucide-react";
import { Reveal } from "@/components/reveal";

const img =
  "https://images.pexels.com/photos/35991499/pexels-photo-35991499.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=620&w=1400";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function OfferBanner() {
  const [end] = useState(() => Date.now() + 1000 * 60 * 60 * 47 + 1000 * 60 * 22);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const diff = now ? Math.max(0, end - now) : 0;
  const parts = [
    { value: pad(Math.floor(diff / 86400000)), label: "Days" },
    { value: pad(Math.floor(diff / 3600000) % 24), label: "Hours" },
    { value: pad(Math.floor(diff / 60000) % 60), label: "Mins" },
    { value: pad(Math.floor(diff / 1000) % 60), label: "Secs" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-forest-950 shadow-lift">
          <Image
            src={img}
            alt="Collection of luxury watches on display"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/30" />
          {/* shimmering border line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

          <div className="relative z-[2] grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400">
                <TicketPercent className="h-4 w-4" /> Limited Time Offer
              </p>
              <h3 className="mt-3 font-display text-4xl font-medium leading-tight text-cream-50 sm:text-5xl">
                Save Up to <em className="italic text-gold-300">50%</em>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-50/65">
                On selected models from Seiko, Casio, Citizen and more. When the clock runs out, so
                do the prices.
              </p>
              <Link
                href="/shop?deals=true"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-forest-950 transition hover:bg-gold-300"
              >
                Shop the Sale
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex gap-3 lg:justify-end">
              {parts.map((p) => (
                <div
                  key={p.label}
                  className="grid w-[76px] place-items-center rounded-2xl border border-cream-50/15 bg-forest-900/70 px-2 py-4 backdrop-blur"
                >
                  <span className="font-display text-3xl font-semibold tabular-nums text-cream-50">
                    {now === null ? "--" : p.value}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold-400">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
