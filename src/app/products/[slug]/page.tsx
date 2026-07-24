import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { shopProducts } from "@/data/products";

export function generateStaticParams() {
  return shopProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = shopProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images[0];
  const formattedPrice = product.price ? `₹${product.price.toLocaleString("en-IN")}` : null;
  const formattedOriginalPrice = product.originalPrice
    ? `₹${product.originalPrice.toLocaleString("en-IN")}`
    : null;

  return (
    <div className="min-h-screen bg-bg">
      {/* Breadcrumb */}
      <div className="container-main py-4 border-b border-border">
        <nav className="flex items-center gap-2 text-[13px] text-muted">
          <Link href="/" className="hover:text-fg transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-fg transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-fg">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-product-bg overflow-hidden">
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative aspect-square bg-product-bg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 2}`}
                      fill
                      sizes="(max-width: 1024px) 25vw, 12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-6">
              {product.isNew && (
                <span className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase text-fg border border-fg/20 px-2 py-1 mb-4">
                  New
                </span>
              )}
              <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-fg tracking-[0.02em] uppercase leading-none mb-3">
                {product.name}
              </h1>
              <p className="text-[14px] text-muted tracking-[0.02em]">
                SKU: {product.sku}
              </p>
            </div>

            {formattedPrice && (
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-fg">
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice && (
                    <span className="text-lg text-muted line-through">
                      {formattedOriginalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm text-accent font-medium">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-[12px] font-semibold text-fg tracking-[0.08em] uppercase mb-3">
                  Color
                </h3>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full py-4 bg-fg text-bg text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-fg/90 transition-colors">
                Add to Cart
              </button>
              <button className="w-full py-4 border border-fg text-fg text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-surface transition-colors">
                Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-[12px] font-semibold text-fg tracking-[0.08em] uppercase mb-4">
                Product Details
              </h3>
              <ul className="space-y-2 text-[14px] text-muted">
                <li>• Category: {product.category}</li>
                {product.colorVariants && (
                  <li>• Available in {product.colorVariants.length} colors</li>
                )}
                <li>• Premium quality fabric</li>
                <li>• Comfortable fit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
