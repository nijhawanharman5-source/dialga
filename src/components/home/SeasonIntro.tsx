import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SeasonIntro() {
  return (
    <section className="bg-ivory" aria-label="New season introduction">
      <div className="container-main py-20 md:py-24 lg:py-32 text-center">
        <ScrollReveal>
          <p className="text-section-title mb-4">New Season</p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light text-fg tracking-[0.02em]">
            Minimal. Modern. You.
          </h2>
          <div className="w-12 h-px bg-border mx-auto mt-6" />
        </ScrollReveal>
      </div>
    </section>
  );
}
