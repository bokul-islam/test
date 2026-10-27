import Link from "next/link";
import { MARQUEE_BRANDS } from "@/lib/constants";
import { SectionHeading } from "@/components/section-heading";

export function BrandMarquee() {
  return (
    <section id="brands" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <SectionHeading
        subtitle="Curated Maisons"
        title="Top Brands"
        href="/shop"
        hrefLabel="View All Brands"
      />

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="marquee-track flex w-max animate-marquee items-center gap-16 pr-16">
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, i) => (
            <li key={`${brand}-${i}`}>
              <Link
                href={`/shop?brand=${encodeURIComponent(brand)}`}
                className="group flex items-center gap-3 text-forest-900/45 transition-colors duration-300 hover:text-forest-950"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-500/70 transition group-hover:bg-gold-500" />
                <span className="whitespace-nowrap font-display text-2xl font-semibold uppercase tracking-[0.2em] sm:text-3xl">
                  {brand}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
