export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price?: number;
  originalPrice?: number;
  category: string;
  images: string[];
  hoverImage?: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  discount?: number;
  colors?: string[];
  colorVariants?: { color: string; images: string[] }[];
}

// Real client products based on asset inventory
export const shopProducts: Product[] = [
  {
    id: "sse-001",
    sku: "SSE-001",
    name: "SSE-001 PIDERMAN",
    slug: "sse-001-piderman",
    price: 1299,
    category: "Graphic Tees",
    images: [
      "/products/sse-001-piderman/1.png",
      "/products/sse-001-piderman/2.png",
      "/products/sse-001-piderman/3.png",
      "/products/sse-001-piderman/4.png",
      "/products/sse-001-piderman/5.png",
      "/products/sse-001-piderman/6.png",
      "/products/sse-001-piderman/7.png",
    ],
    hoverImage: "/products/sse-001-piderman/2.png",
    isNew: true,
  },
  {
    id: "sse-002",
    sku: "SSE-002",
    name: "SSE-002 HANUMAN",
    slug: "sse-002-hanuman",
    price: 1299,
    category: "Graphic Tees",
    images: [
      "/products/sse-002-hanuman/01.png",
      "/products/sse-002-hanuman/02.png",
      "/products/sse-002-hanuman/03.png",
      "/products/sse-002-hanuman/04.png",
      "/products/sse-002-hanuman/05.png",
      "/products/sse-002-hanuman/06.png",
      "/products/sse-002-hanuman/07.png",
    ],
    hoverImage: "/products/sse-002-hanuman/02.png",
    isNew: true,
  },
  {
    id: "sse-008",
    sku: "SSE-008",
    name: "SSE-008 BP",
    slug: "sse-008-bp",
    price: 1299,
    category: "Graphic Tees",
    images: [
      "/products/sse-008-bp/1-1.png",
      "/products/sse-008-bp/1-2.png",
      "/products/sse-008-bp/1-3.png",
      "/products/sse-008-bp/1-4.png",
      "/products/sse-008-bp/1-5.png",
      "/products/sse-008-bp/1-6.png",
    ],
    hoverImage: "/products/sse-008-bp/1-2.png",
    isNew: true,
  },
  {
    id: "sse-016",
    sku: "SSE-016",
    name: "SSE-016",
    slug: "sse-016",
    price: 1899,
    category: "Graphic Tees",
    images: [
      "/products/sse-016/BLACK/1-1.png",
      "/products/sse-016/BLACK/1-2.png",
      "/products/sse-016/BLACK/1-3.png",
      "/products/sse-016/BLACK/1-4.png",
      "/products/sse-016/BLACK/1-5.png",
      "/products/sse-016/BLACK/1-6.png",
      "/products/sse-016/BLACK/1-7.png",
      "/products/sse-016/BLACK/1-8.png",
    ],
    hoverImage: "/products/sse-016/BLACK/1-2.png",
    colorVariants: [
      {
        color: "Black",
        images: [
          "/products/sse-016/BLACK/1-1.png",
          "/products/sse-016/BLACK/1-2.png",
          "/products/sse-016/BLACK/1-3.png",
          "/products/sse-016/BLACK/1-4.png",
          "/products/sse-016/BLACK/1-5.png",
          "/products/sse-016/BLACK/1-6.png",
          "/products/sse-016/BLACK/1-7.png",
          "/products/sse-016/BLACK/1-8.png",
        ],
      },
      {
        color: "Green",
        images: [
          "/products/sse-016/GREEN/1-1.png",
          "/products/sse-016/GREEN/1-2.png",
          "/products/sse-016/GREEN/1-3.png",
          "/products/sse-016/GREEN/1-4.png",
          "/products/sse-016/GREEN/1-5.png",
          "/products/sse-016/GREEN/1-6.png",
          "/products/sse-016/GREEN/1-7.png",
          "/products/sse-016/GREEN/1-8.png",
        ],
      },
      {
        color: "Red",
        images: [
          "/products/sse-016/RED/1-1.png",
          "/products/sse-016/RED/1-2.png",
          "/products/sse-016/RED/1-3.png",
          "/products/sse-016/RED/1-4.png",
          "/products/sse-016/RED/1-5.png",
          "/products/sse-016/RED/1-6.png",
          "/products/sse-016/RED/1-7.png",
        ],
      },
    ],
    colors: ["#000000", "#228B22", "#DC143C"],
    isNew: true,
  },
  {
    id: "sse-021",
    sku: "SSE-021",
    name: "SSE-021 CARPET",
    slug: "sse-021-carpet",
    price: 1999,
    category: "Graphic Tees",
    images: [
      "/products/sse-021-carpet/1.png",
      "/products/sse-021-carpet/2-1.png",
      "/products/sse-021-carpet/2-2.png",
      "/products/sse-021-carpet/2-3.png",
      "/products/sse-021-carpet/2-4.png",
      "/products/sse-021-carpet/2-5.png",
      "/products/sse-021-carpet/2-6.png",
      "/products/sse-021-carpet/2-7.png",
      "/products/sse-021-carpet/file_00000000252c720b903bf72b3826013d.png",
    ],
    hoverImage: "/products/sse-021-carpet/2-1.png",
    isNew: true,
  },
  {
    id: "sse-024",
    sku: "SSE-024",
    name: "SSE-024 NEWSPIDERMAN",
    slug: "sse-024-newspiderman",
    price: 2499,
    category: "Graphic Tees",
    images: [
      "/products/sse-024-newspiderman/file_0000000013ac820686ec3b193c6013cf.png",
      "/products/sse-024-newspiderman/file_00000000556882079d45de21443c53d8.png",
      "/products/sse-024-newspiderman/file_00000000bacc81fa871165709985d57e.png",
      "/products/sse-024-newspiderman/file_00000000c6c081faae9df815fcdcd25b.png",
    ],
    hoverImage: "/products/sse-024-newspiderman/file_00000000556882079d45de21443c53d8.png",
    isNew: true,
  },
  {
    id: "sse-026-spiderx",
    sku: "SSE-026-SPIDERX",
    name: "SSE-026 SPIDER X SPIDER",
    slug: "sse-026-spiderxspider",
    price: 1299,
    category: "Graphic Tees",
    images: [
      "/products/sse-026-spiderxspider/Screenshot_20260719-122311.png",
      "/products/sse-026-spiderxspider/Screenshot_20260719-122319.png",
      "/products/sse-026-spiderxspider/Screenshot_20260719-122327.png",
      "/products/sse-026-spiderxspider/Screenshot_20260719-122336.png",
      "/products/sse-026-spiderxspider/Screenshot_20260719-122345.png",
      "/products/sse-026-spiderxspider/Screenshot_20260719-122353.png",
    ],
    hoverImage: "/products/sse-026-spiderxspider/Screenshot_20260719-122319.png",
    isNew: true,
  },
  {
    id: "sse-026-marvel",
    sku: "SSE-026-MARVEL",
    name: "SSE-026 MARVEL SPIDER",
    slug: "sse-026marvelspider",
    price: 1299,
    category: "Graphic Tees",
    images: [
      "/products/sse-026marvelspider/1.png",
      "/products/sse-026marvelspider/1784446493487.png",
      "/products/sse-026marvelspider/Screenshot_20260719-122225.png",
      "/products/sse-026marvelspider/file_0000000021608209b41839f10911f10c.png",
    ],
    hoverImage: "/products/sse-026marvelspider/1784446493487.png",
    isNew: true,
  },
  {
    id: "sse-027",
    sku: "SSE-027",
    name: "SSE-027 PLAIN BLACK",
    slug: "sse-027-plainblack",
    price: 799,
    category: "Essentials",
    images: [
      "/products/sse-027-plainblack/file_0000000016188207b5226468540c89b6.png",
      "/products/sse-027-plainblack/file_00000000576c8207ac800ac9923e336a.png",
      "/products/sse-027-plainblack/file_00000000589082079f1596e296db9a31.png",
      "/products/sse-027-plainblack/file_00000000b47081faa8a70d2ac9bc7a79.png",
      "/products/sse-027-plainblack/file_00000000b9fc8207b0323c1f8b31185d.png",
      "/products/sse-027-plainblack/file_00000000d83081fa8563adfff6a55416.png",
      "/products/sse-027-plainblack/file_00000000f4348207810c5d4a0c0b9e72.png",
    ],
    hoverImage: "/products/sse-027-plainblack/file_00000000576c8207ac800ac9923e336a.png",
    isNew: true,
  },
];

export const newArrivals: Product[] = shopProducts.slice(0, 4);

export const bestSellers: Product[] = shopProducts.slice(4, 8);

export const shopCategories = [
  { name: "All", count: 9 },
  { name: "Tops", count: 8 },
  { name: "Bottoms", count: 6 },
  { name: "Jackets", count: 4 },
  { name: "Accessories", count: 3 },
];
