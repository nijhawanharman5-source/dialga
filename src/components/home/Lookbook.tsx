import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const lookbookImages = [
  { src: "/images/lookbook/look-1.jpg", alt: "DIALGA lookbook — editorial 1" },
  { src: "/images/lookbook/look-2.jpg", alt: "DIALGA lookbook — editorial 2" },
  { src: "/images/lookbook/look-3.jpg", alt: "DIALGA lookbook — editorial 3" },
];

export default function Lookbook() {
  return (
    <section className="container-main pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24" aria-label="Lookbook">
      <ScrollReveal>
        <h2 className="text-section-title mb-10 lg:mb-12">Dialga World</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
        {lookbookImages.map((img, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "3/4" }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
