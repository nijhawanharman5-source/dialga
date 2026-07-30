"use client";

import { useState, useMemo } from "react";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ShopProductCard from "@/components/shop/ShopProductCard";
import { shopProducts } from "@/data/products";

type SortOption = "featured" | "price-low" | "price-high" | "newest";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(16); // starting larger
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products =
      selectedCategory === "All"
        ? shopProducts
        : shopProducts.filter((p) => p.category === selectedCategory);

    switch (sortBy) {
      case "price-low":
        products = [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        products = [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        products = [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return products;
  }, [selectedCategory, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleClearFilters = () => {
    setSelectedCategory("All");
  };

  return (
    <>
      <section
        className="w-full h-full min-h-screen pt-4 pb-20"
        style={{ backgroundColor: "var(--color-bg)" }}
        aria-label="Product listing"
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 relative">

            {/* Sidebar — desktop, clean editorial style */}
            <aside className="hidden lg:block w-[240px] xl:w-[280px] flex-shrink-0 pt-2">
              <div className="sticky top-[100px]">
                <ShopSidebar
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Mobile filter drawer */}
            {filtersOpen && (
              <div className="lg:hidden fixed inset-0 z-50">
                <div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                  onClick={() => setFiltersOpen(false)}
                />
                <div
                  className="absolute top-0 left-0 h-full w-full max-w-[340px] overflow-y-auto transform transition-transform"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  <div
                    className="flex items-center justify-between px-6 py-5 border-b"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span className="text-[12px] font-medium tracking-[0.1em] uppercase">
                      Filters
                    </span>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="text-[12px] text-[12px] tracking-wide text-gray-500 hover:text-black transition-colors"
                    >
                      Close
                    </button>
                  </div>
                  <div className="p-6">
                    <ShopSidebar
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Product Area */}
            <div className="flex-1 min-w-0">
              {/* Minimal Toolbar */}
              <div
                className="flex items-center justify-between py-4 mb-4 lg:mb-8 border-b border-t lg:border-t-0"
                style={{ borderColor: "var(--color-border)" }}
              >
                {/* Left Controls (Mobile Filter, Desktop views if any) */}
                <div className="flex items-center gap-4">
                  <button
                    className="lg:hidden flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] uppercase text-gray-500 hover:text-black transition-colors"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="8" y1="12" x2="20" y2="12" />
                      <line x1="12" y1="18" x2="20" y2="18" />
                    </svg>
                    Filter
                  </button>
                  <div className="hidden lg:flex items-center gap-2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="3" y="3" width="5" height="5" />
                      <rect x="9.5" y="3" width="5" height="5" />
                      <rect x="16" y="3" width="5" height="5" />
                      <rect x="3" y="9.5" width="5" height="5" />
                      <rect x="9.5" y="9.5" width="5" height="5" />
                      <rect x="16" y="9.5" width="5" height="5" />
                      <rect x="3" y="16" width="5" height="5" />
                      <rect x="9.5" y="16" width="5" height="5" />
                      <rect x="16" y="16" width="5" height="5" />
                    </svg>
                  </div>
                </div>

                {/* Center: Count */}
                <div className="absolute left-1/2 -translate-x-1/2 text-[10px] tracking-[0.1em] uppercase text-gray-400">
                  {filteredProducts.length} Products
                </div>

                {/* Right: Sort */}
                <div className="flex items-center">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="text-[10px] font-medium tracking-[0.1em] uppercase appearance-none cursor-pointer pr-5 py-1 focus:outline-none bg-transparent"
                      style={{ color: "var(--color-muted)" }}
                      aria-label="Sort products"
                    >
                      <option value="featured">Sort by</option>
                      <option value="price-low">Price: Low - High</option>
                      <option value="price-high">Price: High - Low</option>
                      <option value="newest">New Arrivals</option>
                    </select>
                    <svg
                      width="8"
                      height="5"
                      viewBox="0 0 10 6"
                      fill="none"
                      className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Product Grid — Larger items per row, massive spacing */}
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16"
              >
                {visibleProducts.map((product) => (
                  <div key={product.id}>
                    <ShopProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-20 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="inline-flex items-center justify-center px-10 py-3.5 text-[10px] font-medium tracking-[0.15em] uppercase hover:opacity-70 transition-opacity border"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-fg)",
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
