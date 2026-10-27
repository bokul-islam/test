import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { catalogCategoryCounts } from "@/lib/catalog-query";

export function CategoryGrid() {
  const counts = catalogCategoryCounts();
  const entries = Object.entries(CATEGORY_META);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
      <SectionHeading
        subtitle="Browse by Style"
        title="Shop by Category"
        href="/shop"
        hrefLabel="Explore All"
      />

      <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {entries.map(([key, meta], i) => (
          <Reveal key={key} delay={i * 0.07}>
            <Link
              href={key === "luxury" ? "/shop?collection=luxury" : `/shop?category=${key}`}
              className="group relative block overflow-hidden rounded-2xl border border-forest-900/8 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[4/4.4] overflow-hidden">
                <Image
                  src={meta.image}
                  alt={meta.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-transparent" />
                <span className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-cream-50/95 text-forest-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-300">
                  {meta.tagline}
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <h3 className="font-display text-[15px] font-medium leading-tight text-cream-50">
                    {meta.label}
                  </h3>
                  <span className="rounded-full bg-cream-50/15 px-2 py-0.5 text-[10px] font-medium text-cream-50/90 backdrop-blur">
                    {counts[key] ?? 0}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-8 text-center lg:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-800"
        >
          Explore the full collection <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
