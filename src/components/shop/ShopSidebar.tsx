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
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function ShopSidebar({ selectedCategory, onCategoryChange, onClearFilters }: ShopSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["category"])
  );

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

  return (
    <div className="lg:sticky lg:top-[110px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[13px] font-semibold text-fg tracking-[0.12em] uppercase">
          Filter & Sort
        </h2>
        <button
          onClick={onClearFilters}
          className="text-[12px] text-muted hover:text-fg transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="border-t border-border">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full py-5 text-[12px] font-semibold text-fg tracking-[0.12em] uppercase"
          aria-expanded={expandedSections.has("category")}
        >
          Category
          <ChevronIcon expanded={expandedSections.has("category")} />
        </button>
        {expandedSections.has("category") && (
          <div className="pb-5 space-y-3">
            {shopCategories.map((cat) => (
              <label
                key={cat.name}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === cat.name}
                  onChange={() => onCategoryChange(cat.name)}
                  className="w-4 h-4 border-border accent-fg cursor-pointer"
                />
                <span className="text-[14px] text-muted group-hover:text-fg transition-colors">
                  {cat.name} ({cat.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="border-t border-border">
        <button
          onClick={() => toggleSection("size")}
          className="flex items-center justify-between w-full py-5 text-[12px] font-semibold text-fg tracking-[0.12em] uppercase"
          aria-expanded={expandedSections.has("size")}
        >
          Size
          <ChevronIcon expanded={expandedSections.has("size")} />
        </button>
        {expandedSections.has("size") && (
          <div className="pb-5">
            <div className="flex flex-wrap gap-2.5">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className="px-3.5 py-2 text-[12px] font-medium text-muted border border-border hover:border-fg hover:text-fg transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Color */}
      <div className="border-t border-border">
        <button
          onClick={() => toggleSection("color")}
          className="flex items-center justify-between w-full py-5 text-[12px] font-semibold text-fg tracking-[0.12em] uppercase"
          aria-expanded={expandedSections.has("color")}
        >
          Color
          <ChevronIcon expanded={expandedSections.has("color")} />
        </button>
        {expandedSections.has("color") && (
          <div className="pb-5">
            <div className="flex flex-wrap gap-2.5">
              {["#0a0a0a", "#333333", "#6b6b6b", "#fafafa", "#c8102e"].map((color) => (
                <button
                  key={color}
                  className="w-7 h-7 rounded-full border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  aria-label={`Color: ${color}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-t border-border">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-5 text-[12px] font-semibold text-fg tracking-[0.12em] uppercase"
          aria-expanded={expandedSections.has("price")}
        >
          Price
          <ChevronIcon expanded={expandedSections.has("price")} />
        </button>
        {expandedSections.has("price") && (
          <div className="pb-5">
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                className="w-full text-[13px] px-3 py-2.5 border border-border bg-transparent focus:outline-none focus:border-muted"
                aria-label="Minimum price"
              />
              <span className="text-muted text-[13px]">—</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full text-[13px] px-3 py-2.5 border border-border bg-transparent focus:outline-none focus:border-muted"
                aria-label="Maximum price"
              />
            </div>
          </div>
        )}
      </div>

      {/* Apply button */}
      <div className="border-t border-border pt-6">
        <button className="w-full py-3.5 bg-fg text-fg-light text-[12px] font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
