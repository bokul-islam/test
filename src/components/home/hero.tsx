"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CreditCard, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { useRef } from "react";

const heroImg =
  "https://images.pexels.com/photos/38946826/pexels-photo-38946826.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000";

const trustItems = [
  { icon: Truck, title: "Free Shipping", sub: "Orders over $500" },
  { icon: ShieldCheck, title: "100% Authentic", sub: "Certified serials" },
  { icon: CreditCard, title: "Secure Payments", sub: "256-bit encryption" },
  { icon: RotateCcw, title: "Easy Returns", sub: "60-day window" },
];

function CircularBadge() {
  return (
    <div className="absolute -left-7 top-8 z-10 hidden h-28 w-28 sm:block">
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-cream-50 text-[9.5px] uppercase" style={{ letterSpacing: "2.2px" }}>
            <textPath href="#badge-circle">
              certified authentic · swiss craft ·
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/50 bg-forest-900/80 backdrop-blur">
          <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-forest-950 text-cream-50">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[540px] w-[540px] rounded-full bg-forest-600/30 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[460px] w-[460px] rounded-full bg-gold-600/15 blur-[130px]" />
      {/* fine grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,234,208,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(245,234,208,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(75% 75% at 40% 35%, black, transparent)",
        }}
      />

      <div className="relative z-[3] mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-12 pb-10 pt-12 lg:grid-cols-2 lg:gap-8 lg:pb-14 lg:pt-16">
          {/* Copy */}
          <motion.div style={{ y: textY }} className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400"
            >
              <span className="h-px w-10 bg-gold-400/70" />
              Timepieces for a better tomorrow
            </motion.p>

            <h1 className="mt-5 font-display text-[13vw] font-medium leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              {["Premium Watches", "for Every Moment"].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.12 + i * 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {i === 0 ? (
                      line
                    ) : (
                      <>
                        for <em className="italic text-gold-300">Every Moment</em>
                      </>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-50/65"
            >
              Discover timeless style, unmatched quality and the perfect watch for your lifestyle —
              certified authentic, sourced from 120+ maisons.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-forest-950 transition-shadow hover:shadow-[0_16px_40px_-12px_rgba(213,174,105,0.55)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shop?collection=luxury"
                className="rounded-full border border-cream-50/25 px-7 py-3.5 text-sm font-medium text-cream-50 transition hover:border-gold-400 hover:text-gold-300"
              >
                Explore Luxury
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-9 flex items-center gap-6 text-xs text-cream-50/55"
            >
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                4.9 from 12,000+ collectors
              </span>
              <span className="hidden h-3 w-px bg-cream-50/20 sm:block" />
              <span className="hidden sm:block">Insured global delivery</span>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
          >
            <CircularBadge />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-cream-50/10 shadow-lift sm:aspect-[5/5.4]">
              <Image
                src={heroImg}
                alt="Gold luxury watch resting on deep green fabric"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
            </div>

            {/* floating price card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute -right-3 bottom-10 animate-float-slow rounded-2xl border border-cream-50/15 bg-forest-900/80 p-4 shadow-lift backdrop-blur-xl sm:-right-6"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold-400">Rolex</p>
              <p className="mt-0.5 font-display text-sm font-medium text-cream-50">
                Datejust 41
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-gold-300">$8,250</p>
              <Link
                href="/product/rolex-datejust-41"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cream-50/75 transition hover:text-gold-300"
              >
                View piece <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* floating tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="absolute left-4 top-4 animate-float-slower rounded-full border border-cream-50/15 bg-forest-950/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-cream-50/85 backdrop-blur-md"
            >
              Est. 2009 · Geneva Standard
            </motion.div>
          </motion.div>
        </div>

        {/* trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cream-50/10 py-6 md:grid-cols-4"
        >
          {trustItems.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/35 bg-forest-900/60 text-gold-400">
                <t.icon className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-cream-50">{t.title}</span>
                <span className="block text-[11px] text-cream-50/50">{t.sub}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
