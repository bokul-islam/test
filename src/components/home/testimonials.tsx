"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import type { Testimonial } from "@/db/schema";
import { RatingStars } from "@/components/rating-stars";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = window.setInterval(() => go(1), 5200);
    return () => window.clearInterval(t);
  }, [go, paused, items.length]);

  if (!items.length) return null;

  const visible = [0, 1, 2].map((offset) => items[(index + offset) % items.length]);

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-end justify-between gap-4">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Customers Say"
          href={undefined}
        />
        <div className="mb-1 hidden items-center gap-2 sm:flex">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonials"
            className="grid h-10 w-10 place-items-center rounded-full border border-forest-900/15 text-forest-800 transition hover:border-gold-500 hover:bg-gold-400 hover:text-forest-950"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonials"
            className="grid h-10 w-10 place-items-center rounded-full border border-forest-900/15 text-forest-800 transition hover:border-gold-500 hover:bg-gold-400 hover:text-forest-950"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((t, i) => (
            <motion.figure
              key={`${t.id}-${index}-${i}`}
              initial={{ opacity: 0, x: 60 * dir, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60 * dir, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative flex flex-col rounded-2xl border border-forest-900/8 bg-white p-7 shadow-card",
                i > 0 && "hidden md:flex",
              )}
            >
              <MessageSquareQuote className="absolute right-6 top-6 h-7 w-7 text-gold-500/30" />
              <RatingStars rating={t.rating} size={14} />
              <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-forest-800">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-900/8 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-forest-900 font-display text-sm font-semibold text-gold-300">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-forest-950">{t.name}</span>
                  <span className="block text-[11px] text-forest-500">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {items.map((t, i) => (
          <button
            key={t.id}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => {
              setDir(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-7 bg-gold-500" : "w-1.5 bg-forest-900/20 hover:bg-forest-900/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}
