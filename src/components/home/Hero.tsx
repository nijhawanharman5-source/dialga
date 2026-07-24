import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-dark" aria-label="Hero campaign">
      {/* Desktop hero — the image already contains all text, logo, and overlays */}
      <div className="hidden md:block relative w-full">
        <Link href="/shop" className="block" aria-label="Shop the collection">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="DIALGA — Elevate your style"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="w-full h-auto cursor-pointer"
            quality={90}
          />
        </Link>
      </div>

      {/* Mobile hero */}
      <div className="md:hidden relative w-full">
        <Link href="/shop" className="block" aria-label="Shop the collection">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="DIALGA — Elevate your style"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="w-full h-auto object-cover cursor-pointer"
            quality={85}
          />
        </Link>
      </div>
    </section>
  );
}
