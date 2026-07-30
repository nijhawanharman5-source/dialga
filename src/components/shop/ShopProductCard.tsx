"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ShopProductCardProps {
  product: Product;
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  // Use existing data structure
  // Primary image is ideally the clean product image.
  // We'll use images[0] as primary.
  const primaryImage = product.images[0];
  // Secondary image is on-person/model. We'll use hoverImage if it exists, otherwise the second image.
  const secondaryImage = product.hoverImage || (product.images.length > 1 ? product.images[1] : undefined);

  const formattedPrice = product.price ? `RS. ${product.price.toLocaleString("en-IN")}` : null;
  const formattedOriginalPrice = product.originalPrice
    ? `RS. ${product.originalPrice.toLocaleString("en-IN")}`
    : null;

  return (
    <article className="group relative flex flex-col h-full">
      {/* Image container */}
      <div className="relative overflow-hidden mb-4 bg-transparent" style={{ aspectRatio: "4/5" }}>
        <Link
          href={`/products/${product.slug}`}
          className="relative block w-full h-full"
          aria-label={product.name}
        >
          <div className="relative w-full h-full">
            {/* Primary clean product image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
              loading="lazy"
            />

            {/* Hover model/lifestyle secondary image */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.name} on model`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
                aria-hidden="true"
              />
            )}
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && !product.discount && !product.isSoldOut && (
            <span
              className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-white text-black"
            >
              NEW
            </span>
          )}
          {product.discount && !product.isSoldOut && (
            <span
              className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5"
              style={{ backgroundColor: "var(--color-accent)", color: "white" }}
            >
              SAVE {product.discount}%
            </span>
          )}
          {product.isSoldOut && (
            <span
              className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-gray-200 text-gray-800"
            >
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-500 hover:text-black"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            // Wishlist logic
          }}
        >
          <HeartIcon />
        </button>
      </div>

      {/* Product info - centralized typography as in preview */}
      <div className="flex flex-col items-center text-center mt-auto pb-4">
        <Link href={`/products/${product.slug}`} className="inline-block group-hover:underline decoration-1 underline-offset-4">
          <h3
            className="text-[13px] font-medium leading-tight capitalize tracking-normal"
            style={{ color: "var(--color-fg)" }}
          >
            {product.name.toLowerCase()}
          </h3>
        </Link>

        {formattedPrice && (
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              className={`text-[12px] ${
                product.isSoldOut ? "text-gray-400 line-through" : product.discount ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
              }`}
            >
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-[12px] text-[var(--color-muted-light)] line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
