"use client";

import Link from "next/link";
import { DAMonogram } from "@/components/brand/Logo";
import { footerNavigation } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-fg-light">
      <div className="container-main pt-12 lg:pt-16 pb-10 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Shop */}
          <div>
            <h3 className="text-[11px] font-semibold text-fg-light mb-5 tracking-[0.12em] uppercase">Shop</h3>
            <ul className="space-y-2.5">
              {footerNavigation.shop.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] text-muted-light hover:text-fg-light transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-[11px] font-semibold text-fg-light mb-5 tracking-[0.12em] uppercase">Information</h3>
            <ul className="space-y-2.5">
              {footerNavigation.information.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] text-muted-light hover:text-fg-light transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="text-[11px] font-semibold text-fg-light mb-5 tracking-[0.12em] uppercase">Follow</h3>
            <ul className="space-y-2.5">
              {footerNavigation.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[13px] text-muted-light hover:text-fg-light transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[11px] font-semibold text-fg-light mb-5 tracking-[0.12em] uppercase">Newsletter</h3>
            <p className="text-[13px] text-muted-light mb-4 leading-relaxed">
              Early access to drops and new releases.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent border border-border-dark text-fg-light text-[13px] px-3 py-2.5 focus:outline-none focus:border-muted-light placeholder:text-muted transition-colors"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="px-5 py-2.5 bg-fg-light text-bg-dark text-[10px] font-semibold tracking-[0.1em] uppercase hover:opacity-90 transition-opacity">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Brand mark */}
        <div className="mt-12 lg:mt-16 border-t border-border-dark pt-8 flex flex-col items-center">
          <DAMonogram className="w-10 h-10 text-white/10 mb-3" />
          <div className="font-display text-[clamp(2rem,8vw,5rem)] font-semibold tracking-[0.04em] text-white/5 leading-none uppercase select-none">
            DIALGA
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[12px] text-muted-light/50">
            © {new Date().getFullYear()} DIALGA. All rights reserved.
          </p>
          <p className="text-[12px] text-muted-light/35">
            Homegrown in India
          </p>
        </div>
      </div>
    </footer>
  );
}
