export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: "New Arrivals",
    href: "/shop",
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Graphic Tees", href: "/shop?category=Graphic+Tees" },
      { label: "Essentials", href: "/shop?category=Essentials" },
      { label: "All Products", href: "/shop" },
    ],
  },
  {
    label: "Collections",
    href: "/shop",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const footerNavigation = {
  shop: [
    { label: "New Arrivals", href: "/shop" },
    { label: "Graphic Tees", href: "/shop?category=Graphic+Tees" },
    { label: "Essentials", href: "/shop?category=Essentials" },
    { label: "All Products", href: "/shop" },
  ],
  information: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter / X", href: "https://x.com" },
  ],
};
