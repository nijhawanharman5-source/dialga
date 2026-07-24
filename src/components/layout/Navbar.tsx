"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoNav } from "@/components/brand/Logo";
import MobileMenu from "./MobileMenu";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

const navLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 w-full transition-all duration-200 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-sm border-b border-border"
            : "bg-bg"
        }`}
        style={{ zIndex: "var(--z-navbar)" }}
      >
        <nav className="container-main" aria-label="Main navigation">
          <div className="flex items-center justify-between h-[64px] lg:h-[72px]">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 -ml-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <MenuIcon />
            </button>

            {/* Logo — left */}
            <div className="flex-shrink-0">
              <LogoNav />
            </div>

            {/* Desktop navigation — center */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`nav-link text-[11px] font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${
                      isActive ? "text-fg nav-link-active" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Utility icons — right */}
            <div className="flex items-center gap-2">
              <button
                className="hidden lg:flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity duration-200"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              <button
                className="hidden lg:flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity duration-200"
                aria-label="Account"
              >
                <UserIcon />
              </button>
              <button
                className="flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity duration-200 relative"
                aria-label="Cart (0 items)"
              >
                <BagIcon />
                <span className="absolute top-0 right-0 w-4 h-4 bg-fg text-bg text-[9px] font-medium flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
