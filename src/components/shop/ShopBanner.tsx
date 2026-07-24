import Image from "next/image";
import { DAMonogram } from "@/components/brand/Logo";

export default function ShopBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-dark" aria-label="Shop introduction">
      {/* Desktop */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: "16/5" }}>
        <Image
          src="/images/hero/hero-main.jpg"
          alt="DIALGA Shop — Timeless essentials"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-50"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-main">
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white tracking-[0.08em] uppercase mb-3">
              Shop
            </h1>
            <p className="text-[15px] text-white/70 max-w-sm leading-relaxed">
              Timeless essentials.<br />
              Designed to elevate every day.
            </p>
          </div>
        </div>

        {/* DA watermark — bottom right */}
        <div className="absolute bottom-8 right-12 opacity-20">
          <DAMonogram className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src="/images/hero/hero-main.jpg"
          alt="DIALGA Shop"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-50"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-main">
            <h1 className="font-display text-[2.5rem] font-bold text-white tracking-[0.08em] uppercase mb-2">
              Shop
            </h1>
            <p className="text-[14px] text-white/70 leading-relaxed">
              Timeless essentials.<br />
              Designed to elevate every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
