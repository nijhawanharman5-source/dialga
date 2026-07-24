export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  description?: string;
}

/**
 * Categories built from the actual product catalogue.
 *
 * Product breakdown:
 *   Graphic Tees  — SSE-001 PIDERMAN, SSE-002 HANUMAN, SSE-008 BP,
 *                    SSE-016, SSE-021 CARPET
 *   Marvel / Spider Collection — SSE-024, SSE-026 SPIDER×SPIDER,
 *                                SSE-026 MARVEL SPIDER
 *   Essentials    — SSE-027 PLAIN BLACK
 *   New Drops     — everything marked isNew (currently all products)
 *   All Products  — full catalogue
 */
export const categories: Category[] = [
  {
    id: "cat-graphic-tees",
    name: "Graphic Tees",
    slug: "graphic-tees",
    image: "/products/sse-002-hanuman/01.png",
    href: "/shop?category=Graphic+Tees",
    description: "Bold prints, bolder statements",
  },
  {
    id: "cat-spider-collection",
    name: "Spider Collection",
    slug: "spider-collection",
    image: "/products/sse-026-spiderxspider/Screenshot_20260719-122311.png",
    href: "/shop?category=Graphic+Tees",
    description: "Marvel × Streetwear",
  },
  {
    id: "cat-essentials",
    name: "Essentials",
    slug: "essentials",
    image: "/products/sse-027-plainblack/file_0000000016188207b5226468540c89b6.png",
    href: "/shop?category=Essentials",
    description: "Timeless basics",
  },
  {
    id: "cat-new-drops",
    name: "New Drops",
    slug: "new-drops",
    image: "/products/sse-021-carpet/1.png",
    href: "/shop",
    description: "Latest releases",
  },
  {
    id: "cat-all",
    name: "All Products",
    slug: "all",
    image: "/products/sse-008-bp/1-1.png",
    href: "/shop",
    description: "Browse everything",
  },
];
