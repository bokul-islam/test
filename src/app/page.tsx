import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials as testimonialsTable } from "@/db/schema";
import { getBestSellers, getLatestArrivals } from "@/lib/products";
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { PromoBanners } from "@/components/home/promo-banners";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { CraftSplit } from "@/components/home/craft-split";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { OfferBanner } from "@/components/home/offer-banner";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [bestSellers, latest, quotes] = await Promise.all([
    getBestSellers(5),
    getLatestArrivals(4),
    db.select().from(testimonialsTable).orderBy(asc(testimonialsTable.id)),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <PromoBanners />

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
        <SectionHeading
          subtitle="Most Loved Watches"
          title="Best Sellers"
          href="/shop?sort=rating"
          hrefLabel="View All"
        />
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <CraftSplit />
      <FeaturedCollections />
      <OfferBanner />

      {/* Latest arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
        <SectionHeading
          subtitle="Fresh In The Vault"
          title="Latest Arrivals"
          href="/shop?sort=newest"
          hrefLabel="View All"
        />
        <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {latest.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <BrandMarquee />
      <Testimonials items={quotes} />
      <Newsletter />
    </>
  );
}
