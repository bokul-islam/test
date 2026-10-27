import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

const darkImg =
  "https://images.pexels.com/photos/19810831/pexels-photo-19810831.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=640&w=1000";
const lightImg =
  "https://images.pexels.com/photos/35080771/pexels-photo-35080771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=640&w=1000";

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Luxury */}
        <Reveal>
          <Link
            href="/shop?collection=luxury"
            className="group relative block overflow-hidden rounded-2xl bg-forest-950 shadow-card"
          >
            <div className="absolute inset-0">
              <Image
                src={darkImg}
                alt="Luxury watch with black dial and rose gold accents"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/70 to-forest-950/10" />
            </div>
            <div className="relative z-[2] flex h-full min-h-[260px] flex-col justify-center p-8 sm:p-10">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                <Sparkles className="h-3.5 w-3.5" /> Top Brands · Limited Time
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-cream-50 sm:text-4xl">
                Up to 40% Off
                <br />
                <em className="italic text-gold-300">Luxury</em> Watches
              </h3>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-forest-950 transition-transform duration-300 group-hover:scale-[1.04]">
                Shop Now
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Women */}
        <Reveal delay={0.12}>
          <Link
            href="/shop?category=women"
            className="group relative block overflow-hidden rounded-2xl bg-cream-100 shadow-card"
          >
            <div className="absolute inset-0">
              <Image
                src={lightImg}
                alt="Elegant rose gold women's watch"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/75 to-cream-50/10" />
            </div>
            <div className="relative z-[2] flex h-full min-h-[260px] flex-col justify-center p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-700">
                New Season Edit
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-forest-950 sm:text-4xl">
                Elegant Women&apos;s
                <br />
                Watches — <em className="italic text-gold-600">Style in Every Second</em>
              </h3>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream-50 transition-transform duration-300 group-hover:scale-[1.04]">
                Discover
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
