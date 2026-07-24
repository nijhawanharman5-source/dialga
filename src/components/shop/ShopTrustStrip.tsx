const trustItems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Premium Quality",
    subtitle: "Crafted to last",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Payments",
    subtitle: "100% safe & secure",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H12" />
      </svg>
    ),
    title: "Easy Returns",
    subtitle: "Hassle-free returns",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: "Customer Support",
    subtitle: "We're here to help",
  },
];

export default function ShopTrustStrip() {
  return (
    <section className="bg-bg-dark" aria-label="Store benefits">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 py-6 lg:py-7 px-4 lg:px-6 ${
                i < trustItems.length - 1 ? "md:border-r md:border-white/10" : ""
              } ${i === 0 ? "" : "border-t md:border-t-0 border-white/10"}`}
            >
              <span className="text-white/50 flex-shrink-0">{item.icon}</span>
              <div>
                <span className="block text-[11px] font-semibold text-white tracking-[0.1em] uppercase">
                  {item.title}
                </span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
