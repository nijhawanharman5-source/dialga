import { Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-5 lg:gap-y-10">
      {products.map((product, i) => (
        <ScrollReveal key={product.id} delay={i * 60}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}
