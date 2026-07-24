import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    title: "TOPS",
    subtitle: "New Arrivals",
    href: "/shop?category=Graphic+Tees",
    image: "/products/sse-001-piderman/1.png",
  },
  {
    title: "BOTTOMS",
    subtitle: "Everyday Comfort",
    href: "/shop?category=Essentials",
    image: "/products/sse-027-plainblack/file_0000000016188207b5226468540c89b6.png",
  },
  {
    title: "COLLECTIONS",
    subtitle: "Curated Drops",
    href: "/shop",
    image: "/products/sse-016/BLACK/1-1.png",
  },
];

export default function ShopCategoryTiles() {
  return (
    <section className="bg-ivory" aria-label="Category promotions">
      <div className="container-main py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative flex items-center overflow-hidden bg-surface h-[160px] lg:h-[180px]"
              aria-label={`Shop ${tile.title}`}
            >
              {/* Text side */}
              <div className="relative z-10 flex-1 px-6 lg:px-8">
                <h3 className="font-display text-lg lg:text-xl font-bold text-fg tracking-[0.06em] uppercase mb-1">
                  {tile.title}
                </h3>
                <p className="text-[13px] text-muted mb-3">
                  {tile.subtitle}
                </p>
                <span className="inline-flex items-center text-[18px] text-fg group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>

              {/* Image side */}
              <div className="relative w-[45%] h-full overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
