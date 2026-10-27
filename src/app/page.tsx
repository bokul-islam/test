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
import { catalogBestSellers, catalogLatest } from "@/lib/catalog-query";
import { TESTIMONIALS } from "@/data/catalog";

export default function HomePage() {
  const bestSellers = catalogBestSellers(5);
  const latest = catalogLatest(4);
  const quotes = TESTIMONIALS.map((t, i) => ({ id: i + 1, ...t }));

  return (
    <>
      <Hero />
      <CategoryGrid />
      <PromoBanners />

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
