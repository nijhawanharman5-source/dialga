"use client";

import { useState } from "react";
import { shopCategories } from "@/data/products";

interface ShopSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 flex-shrink-0 text-gray-400"
      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function ShopSidebar({
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}: ShopSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["category", "price"])
  );

  // States are kept to simulate real filters visually
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => {
      const next = new Set(prev);
      if (next.has(color)) next.delete(color);
      else next.add(color);
      return next;
    });
  };

  const hasActiveFilters = selectedSizes.size > 0 || selectedColors.size > 0 || priceMin || priceMax || selectedCategory !== "All";

  const handleClearAll = () => {
    onClearFilters();
    setSelectedSizes(new Set());
    setSelectedColors(new Set());
    setPriceMin("");
    setPriceMax("");
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { value: "#0A0A0A", label: "Black" },
    { value: "#333333", label: "Charcoal" },
    { value: "#CAC9C7", label: "Grey" },
    { value: "#F7F6F2", label: "White" },
    { value: "#8E3B3B", label: "Red" }, // Adjusted to match the new accent
  ];

  return (
    <div className="text-[12px] font-normal tracking-wide">
      {/* Active filter count + Apply/Clear */}
      {hasActiveFilters && (
        <div className="flex justify-between w-full mb-6 py-2 border-b border-[var(--color-border)]">
          <span className="text-gray-400">{hasActiveFilters ? "FILTERS ACTIVE" : ""}</span>
          <button
            onClick={handleClearAll}
            className="text-[10px] tracking-widest uppercase cursor-pointer hover:text-[var(--color-accent)] transition-colors"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Category Accordion */}
      <div className="border-b border-[var(--color-border)]">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full py-4 capitalize tracking-wide font-normal text-[12px]"
          aria-expanded={expandedSections.has("category")}
        >
          <span>Category</span>
          <ChevronIcon expanded={expandedSections.has("category")} />
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${expandedSections.has("category") ? "max-h-[300px] mb-4 opacity-100" : "max-h-0 opacity-0"}`}>
          {shopCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between cursor-pointer py-1.5 group"
              onClick={() => onCategoryChange(cat.name)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 border flex items-center justify-center transition-colors ${selectedCategory === cat.name ? "border-black bg-black" : "border-gray-300 bg-transparent"}`}
                >
                  {selectedCategory === cat.name && (
                     <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-[12px] font-normal tracking-wide transition-colors group-hover:text-black"
                  style={{ color: selectedCategory === cat.name ? "var(--color-fg)" : "var(--color-muted)" }}
                >
                  {cat.name.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Accordion */}
      <div className="border-b border-[var(--color-border)]">
        <button
          onClick={() => toggleSection("size")}
          className="flex items-center justify-between w-full py-4 capitalize tracking-wide font-normal text-[12px]"
          aria-expanded={expandedSections.has("size")}
        >
          <span>Size</span>
          <ChevronIcon expanded={expandedSections.has("size")} />
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${expandedSections.has("size") ? "max-h-[300px] mb-4 opacity-100" : "max-h-0 opacity-0"}`}>
           <div className="flex flex-col gap-1.5">
              {sizes.map((size) => (
                <div
                  key={size}
                  className="flex items-center justify-between cursor-pointer py-1 group"
                  onClick={() => toggleSize(size)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 border flex items-center justify-center transition-colors ${selectedSizes.has(size) ? "border-black bg-black" : "border-gray-300 bg-transparent"}`}
                    >
                      {selectedSizes.has(size) && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-[12px] font-normal tracking-wide transition-colors group-hover:text-black"
                      style={{ color: selectedSizes.has(size) ? "var(--color-fg)" : "var(--color-muted)" }}
                    >
                      {size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Color Accordion */}
      <div className="border-b border-[var(--color-border)]">
        <button
          onClick={() => toggleSection("color")}
          className="flex items-center justify-between w-full py-4 capitalize tracking-wide font-normal text-[12px]"
          aria-expanded={expandedSections.has("color")}
        >
          <span>Color</span>
          <ChevronIcon expanded={expandedSections.has("color")} />
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${expandedSections.has("color") ? "max-h-[300px] mb-4 opacity-100" : "max-h-0 opacity-0"}`}>
           <div className="flex flex-col gap-1.5">
              {colors.map((c) => (
                <div
                  key={c.value}
                  className="flex items-center justify-between cursor-pointer py-1 group"
                  onClick={() => toggleColor(c.value)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 border flex items-center justify-center transition-colors ${selectedColors.has(c.value) ? "border-black bg-black" : "border-gray-300 bg-transparent"}`}
                    >
                      {selectedColors.has(c.value) && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-[12px] font-normal tracking-wide transition-colors group-hover:text-black"
                      style={{ color: selectedColors.has(c.value) ? "var(--color-fg)" : "var(--color-muted)" }}
                    >
                      {c.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Price Accordion */}
      <div className="border-b border-[var(--color-border)]">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-4 capitalize tracking-wide font-normal text-[12px]"
          aria-expanded={expandedSections.has("price")}
        >
          <span>Price</span>
          <ChevronIcon expanded={expandedSections.has("price")} />
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${expandedSections.has("price") ? "max-h-[300px] mb-4 opacity-100" : "max-h-0 opacity-0"}`}>
           <div className="flex items-center gap-3 py-2">
              <input
                type="number"
                placeholder="MIN"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full text-[10px] tracking-widest px-3 py-2 bg-transparent focus:outline-none placeholder:text-gray-400"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-fg)",
                }}
                aria-label="Minimum price"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="MAX"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full text-[10px] tracking-widest px-3 py-2 bg-transparent focus:outline-none placeholder:text-gray-400"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-fg)",
                }}
                aria-label="Maximum price"
              />
            </div>
        </div>
      </div>

    </div>
  );
}
