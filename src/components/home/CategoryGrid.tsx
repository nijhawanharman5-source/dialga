import Image from "next/image";
import Link from "next/link";
import { categories, Category } from "@/data/categories";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Validates that a category object has all required properties
 * for safe rendering. Returns false for undefined, null,
 * or malformed category objects.
 */
function isValidCategory(category: unknown): category is Category {
  if (!category || typeof category !== "object") return false;
  const cat = category as Record<string, unknown>;
  return (
    typeof cat.name === "string" &&
    typeof cat.href === "string" &&
    typeof cat.image === "string" &&
    cat.name.length > 0 &&
    cat.href.length > 0 &&
    cat.image.length > 0
  );
}

export default function CategoryGrid() {
  // Filter to only valid categories — never crash on bad data
  const validCategories = categories.filter(isValidCategory);

  if (validCategories.length === 0) return null;

  // The first valid category is the featured "large" tile
  const [featured, ...rest] = validCategories;

  return (
    <section className="bg-ivory" aria-label="Shop by category">
      <div className="container-main pb-20 md:pb-24 lg:pb-28">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10 lg:mb-12">
            <h2 className="text-section-title">Shop by Category</h2>
            <Link
              href="/shop"
              className="text-[12px] font-medium text-muted hover:text-fg tracking-[0.1em] uppercase flex items-center gap-2 transition-colors duration-200"
            >
              View All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Large feature tile — first category */}
          <ScrollReveal className="col-span-2 lg:col-span-5 lg:row-span-2" delay={100}>
            <CategoryTile category={featured} large />
          </ScrollReveal>

          {/* Remaining categories — dynamic grid */}
          {rest.map((category, index) => {
            // Alternate between wider (4-col) and narrower (3-col) tiles
            const isWide = index % 2 === 0;
            return (
              <ScrollReveal
                key={category.id}
                className={`col-span-1 ${isWide ? "lg:col-span-4" : "lg:col-span-3"}`}
                delay={200 + index * 50}
              >
                <CategoryTile category={category} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CategoryTileProps {
  category: Category;
  large?: boolean;
}

function CategoryTile({ category, large }: CategoryTileProps) {
  // Secondary defensive check — should never reach here with invalid data
  // due to the filter above, but prevents any crash if props are wrong
  if (!isValidCategory(category)) return null;

  return (
    <Link
      href={category.href}
      className="group relative block overflow-hidden"
      aria-label={`Shop ${category.name}`}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: large ? "3/4" : "4/3" }}>
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes={large ? "(max-width: 1024px) 100vw, 42vw" : "(max-width: 1024px) 50vw, 28vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <span className={`font-display font-semibold text-white tracking-[0.06em] uppercase transition-transform duration-500 group-hover:translate-x-1 ${large ? "text-lg lg:text-xl" : "text-base lg:text-lg"}`}>
            {category.name}
          </span>
          {category.description && (
            <p className={`text-white/60 mt-1 tracking-[0.02em] ${large ? "text-[13px]" : "text-[11px]"}`}>
              {category.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
            <span className="text-[11px] text-white/70 tracking-[0.15em] uppercase">Shop</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
