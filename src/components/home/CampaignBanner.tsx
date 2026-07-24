import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CampaignBanner() {
  return (
    <section className="relative w-full overflow-hidden" aria-label="Collection campaign">
      <ScrollReveal>
        <div className="relative w-full campaign-aspect">
          <Image
            src="/images/campaign/campaign-main.jpg"
            alt="DIALGA Collection 001 — Built for the undefined"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex items-center">
            <div className="container-main">
              <div className="max-w-lg">
                <p className="text-[11px] font-medium text-white/50 tracking-[0.3em] uppercase mb-4">
                  DIALGA / 001
                </p>
                <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold text-white leading-[1] tracking-[0.02em] uppercase mb-7">
                  Built for<br />the undefined.
                </h2>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-3 text-[11px] font-medium text-white/80 tracking-[0.18em] uppercase hover:text-white transition-colors duration-300"
                >
                  Explore Collection
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        .campaign-aspect {
          aspect-ratio: 16/7;
        }
        @media (max-width: 767px) {
          .campaign-aspect {
            aspect-ratio: 3/4;
          }
        }
      `}</style>
    </section>
  );
}
