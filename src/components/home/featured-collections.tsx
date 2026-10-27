import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTION_META } from "@/lib/constants";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function FeaturedCollections() {
  const entries = Object.entries(COLLECTION_META);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
      <SectionHeading
        subtitle="Curated For You"
        title="Featured Collections"
        href="/shop"
        hrefLabel="View All"
      />

      <div className="mt-9 grid grid-cols-2 gap-9 lg:grid-cols-4" style={{ columnGap: "1.25rem" }}>
        {entries.map(([key, meta], i) => (
          <Reveal key={key} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-10" : ""}>
            <Link
              href={`/shop?collection=${key}`}
              className="group relative block overflow-hidden rounded-2xl shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[3/3.6] overflow-hidden rounded-2xl">
                <Image
                  src={meta.image}
                  alt={`${meta.label} watches collection`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <h3 className="font-display text-xl font-medium text-cream-50">{meta.label}</h3>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-gold-300">
                      {meta.tagline}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/30 text-cream-50 backdrop-blur transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
