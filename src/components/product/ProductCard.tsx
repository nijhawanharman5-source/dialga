"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const secondaryImage = product.hoverImage || (product.images.length > 1 ? product.images[1] : undefined);
  const formattedPrice = product.price ? `₹${product.price.toLocaleString("en-IN")}` : null;
  const formattedOriginalPrice = product.originalPrice
    ? `₹${product.originalPrice.toLocaleString("en-IN")}`
    : null;

  return (
    <article className="group">
      {/* Image container */}
      <div className="relative block overflow-hidden bg-product-bg">
        <Link
          href={`/products/${product.slug}`}
          className="relative block product-image-wrapper"
          aria-label={product.name}
        >
          <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
            {/* Primary image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />

            {/* Hover image */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover absolute inset-0 product-hover-image"
                loading="lazy"
                aria-hidden="true"
              />
            )}

            {/* Sold out overlay */}
            {product.isSoldOut && (
              <div className="absolute inset-0 bg-bg/70 flex items-center justify-center backdrop-blur-[1px]">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fg border border-fg/20 px-4 py-2">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Badges — top left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.isNew && !product.isSoldOut && (
              <span className="bg-fg text-bg text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-0.5">
                New
              </span>
            )}
            {product.discount && !product.isSoldOut && (
              <span className="bg-accent text-white text-[9px] font-medium tracking-[0.08em] px-2 py-0.5">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist — top right (always visible) */}
          <button
            className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white transition-all duration-200"
            aria-label={`Add ${product.name} to wishlist`}
            onClick={(e) => e.preventDefault()}
          >
            <HeartIcon />
          </button>
        </Link>
      </div>

      {/* Product info */}
      <div className="mt-3">
        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-border"
                style={{ backgroundColor: color }}
                aria-label={`Color option ${i + 1}`}
              />
            ))}
          </div>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[14px] font-medium text-fg tracking-[0.01em] leading-tight group-hover:opacity-60 transition-opacity duration-300">
            {product.name}
          </h3>
        </Link>

        {formattedPrice && (
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[14px] font-medium ${product.isSoldOut ? "text-muted" : "text-fg"}`}>
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-[13px] text-muted line-through">
                {formattedOriginalPrice}
              </span>
            )}
            {product.discount && !product.isSoldOut && (
              <span className="text-[11px] text-accent font-medium">
                Save {product.discount}%
              </span>
            )}
          </div>
        )}

        {/* ADD TO BAG button — always visible */}
        <button
          className="mt-3 w-full py-2.5 bg-fg text-white text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-fg/90 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
          disabled={product.isSoldOut}
        >
          {product.isSoldOut ? "Sold Out" : "Add to Bag"}
        </button>
      </div>
    </article>
  );
}
