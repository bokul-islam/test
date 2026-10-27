import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const img =
  "https://images.pexels.com/photos/5350693/pexels-photo-5350693.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200";

export function CraftSplit() {
  return (
    <section className="grain relative mt-4 overflow-hidden bg-forest-950 text-cream-50">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-gold-600/15 blur-[110px]" />
      <div className="relative z-[2] mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-0">
        {/* Copy */}
        <div className="py-4 lg:py-24">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400">
              <span className="h-px w-10 bg-gold-400/70" />
              Our Collection
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              Modern Style Meets
              <br />
              <em className="italic text-gold-300">Timeless Craft</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-50/65">
              Every reference in our vault is hand-inspected by master watchmakers, pressure-tested
              and certified before it ships. Centuries of savoir-faire, delivered to your door.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-7 space-y-3 text-sm text-cream-50/75">
              {[
                "Independent authentication on every piece",
                "Two-year WatchShop guarantee on top of the manufacturer's",
                "Complimentary bracelet sizing & engraving",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-forest-950 transition hover:bg-gold-300"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Image */}
        <Reveal delay={0.15} className="relative lg:h-full">
          <div className="relative aspect-[4/3] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[110%]">
            <Image
              src={img}
              alt="Gentleman in a suit checking his watch"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-forest-950 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
