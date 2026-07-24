"use client";

import Link from "next/link";
import { LogoNav } from "@/components/brand/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const mobileNavLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 mobile-menu-overlay transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: "var(--z-mobile-menu)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[82vw] max-w-[360px] bg-bg transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: "var(--z-mobile-menu)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[76px] px-5 border-b border-border/40">
          <LogoNav />
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 -mr-2"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="overflow-y-auto h-[calc(100%-76px)] py-4" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {mobileNavLinks.map((item) => {
              const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");
              return (
                <li key={item.label} className="border-b border-border/30">
                  <Link
                    href={item.href}
                    className={`block px-5 py-4.5 text-[13px] font-medium tracking-[0.1em] uppercase transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Utility links */}
          <div className="mt-8 px-5 space-y-4">
            <Link
              href="/search"
              className="block text-[12px] font-medium text-muted tracking-[0.1em] uppercase hover:text-fg transition-colors"
              onClick={onClose}
            >
              Search
            </Link>
            <Link
              href="/account"
              className="block text-[12px] font-medium text-muted tracking-[0.1em] uppercase hover:text-fg transition-colors"
              onClick={onClose}
            >
              Account
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
