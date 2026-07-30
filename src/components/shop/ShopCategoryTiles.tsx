import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    title: "TOPS",
    href: "/shop?category=Graphic+Tees",
    image: "/products/sse-001-piderman/1.png",
  },
  {
    title: "BOTTOMS",
    href: "/shop?category=Essentials",
    image: "/products/sse-027-plainblack/file_0000000016188207b5226468540c89b6.png", // A placeholder layout till bottoms are photographed separately
  },
  {
    title: "COLLECTIONS",
    href: "/shop",
    image: "/products/sse-016/BLACK/1-1.png",
  },
];

export default function ShopCategoryTiles() {
  return (
    <section aria-label="Category promotions" className="bg-[var(--color-bg)]">
      <div className="w-full max-w-[1920px] mx-auto pt-6 px-4 md:px-8 lg:px-12 xl:px-16 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative flex items-center overflow-hidden h-[240px] lg:h-[320px] cursor-pointer"
              style={{ backgroundColor: "var(--color-product-bg)" }}
              aria-label={`Shop ${tile.title}`}
            >
              {/* Image side - dominates */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>

               {/* Text side - minimal overlaid */}
               <div className="relative z-10 p-6 lg:p-10 flex flex-col h-full justify-between pointer-events-none">
                 <div className="bg-white/80 backdrop-blur-sm self-start px-4 py-2">
                    <h3 className="text-[12px] lg:text-[14px] font-bold tracking-[0.1em] text-black">
                      {tile.title}
                    </h3>
                 </div>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
