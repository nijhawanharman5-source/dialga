import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function BrandStory() {
  return (
    <section className="container-main pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24" aria-label="Brand story">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center">
        <ScrollReveal>
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/brand/brand-story.jpg"
              alt="DIALGA — Fashion for those who don't dress to blend in"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="lg:pl-14 xl:pl-20 py-10 lg:py-0">
            <p className="text-section-title mb-5">The Brand</p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.01em] uppercase mb-5">
              Dialga is built<br />
              for those who<br />
              don&apos;t dress to<br />
              blend in.
            </h2>
            <div className="w-12 h-px bg-border mb-6" />
            <p className="text-body text-muted max-w-sm leading-relaxed">
              Every piece is designed with intention — constructed for movement,
              built for presence, and made for those who understand that what you
              wear is the first thing you say without speaking.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
