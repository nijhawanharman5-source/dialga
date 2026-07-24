"use client";

import { useState, useMemo } from "react";
import ShopCategoryTiles from "@/components/shop/ShopCategoryTiles";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopTrustStrip from "@/components/shop/ShopTrustStrip";
import { shopProducts } from "@/data/products";

type SortOption = "featured" | "price-low" | "price-high" | "newest";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = selectedCategory === "All"
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
      {/* Category Tiles */}
      <ShopCategoryTiles />

      {/* Main Shopping Area */}
      <section className="container-main py-12 lg:py-16" aria-label="Product listing">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-[220px] flex-shrink-0">
            <ShopSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          {filtersOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/30" onClick={() => setFiltersOpen(false)} />
              <div className="absolute top-0 left-0 h-full w-[85vw] max-w-[360px] bg-bg overflow-y-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <span className="text-[14px] font-semibold tracking-[0.1em] uppercase">Filters</span>
                  <button onClick={() => setFiltersOpen(false)} className="text-[14px] text-muted hover:text-fg">
                    Close
                  </button>
                </div>
                <div className="p-5">
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
            {/* Header */}
            <div className="flex items-center justify-between mb-8 lg:mb-10">
              <div className="flex items-baseline gap-3">
                <h1 className="font-display text-xl font-semibold tracking-[0.02em] uppercase">
                  {selectedCategory === "All" ? "All Products" : selectedCategory}
                </h1>
                <span className="text-[14px] text-muted">
                  {filteredProducts.length} items
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border text-[12px] font-medium tracking-[0.1em] uppercase hover:bg-surface transition-colors"
                  onClick={() => setFiltersOpen(true)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="20" y2="12" />
                    <line x1="12" y1="18" x2="20" y2="18" />
                  </svg>
                  Filter
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-[12px] font-medium text-fg bg-transparent border border-border px-3 py-2 focus:outline-none focus:border-muted cursor-pointer appearance-none pr-8"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236F6B66' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                {/* Grid/List icons */}
                <div className="hidden sm:flex items-center gap-1 border border-border">
                  <button className="p-2 bg-surface" aria-label="Grid view">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-surface transition-colors" aria-label="List view">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid — 5 columns on large desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
              {visibleProducts.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-border text-[11px] font-medium text-fg tracking-[0.15em] uppercase hover:bg-surface transition-colors duration-200"
                >
                  Load More Products
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <ShopTrustStrip />
    </>
  );
}
