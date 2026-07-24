import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import SectionHeader from "@/components/home/SectionHeader";
import ProductGrid from "@/components/product/ProductGrid";
import TrustStrip from "@/components/home/TrustStrip";
import Newsletter from "@/components/home/Newsletter";
import { newArrivals, bestSellers } from "@/data/products";

export default function HomePage() {
  return (
    <>
      {/* Hero Campaign */}
      <Hero />

      {/* Trust Strip — directly below hero */}
      <TrustStrip />

      {/* NEW SEASON section */}
      <section className="bg-ivory py-16 md:py-20 lg:py-24" aria-label="New season">
        <div className="container-main text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-4 block">
            New Season
          </span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold text-fg tracking-[0.02em] leading-tight">
            Minimal. Modern. You.
          </h2>
          <div className="mt-6 mx-auto w-12 h-[1px] bg-border" />
        </div>
      </section>

      {/* Category Discovery */}
      <CategoryGrid />

      {/* New Arrivals */}
      <section className="container-main pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24" aria-label="New arrivals">
        <SectionHeader
          title="New Arrivals"
          viewAllHref="/shop"
        />
        <ProductGrid products={newArrivals} />
      </section>

      {/* Most Wanted / Best Sellers */}
      <section className="container-main pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24" aria-label="Most wanted">
        <SectionHeader
          title="Best Sellers"
          viewAllHref="/shop"
        />
        <ProductGrid products={bestSellers} />
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
