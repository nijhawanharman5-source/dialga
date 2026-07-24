"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-bg-dark text-fg-light" aria-label="Newsletter signup">
      <div className="container-main pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28">
        <ScrollReveal>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[0.04em] uppercase mb-4">
              Enter the Dialga World.
            </h2>
            <p className="text-[14px] text-muted-light mb-10">
              Get early access to drops, collections and exclusive releases.
            </p>

            {!submitted ? (
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border border-border-dark text-fg-light text-[14px] px-5 py-4 focus:outline-none focus:border-muted-light placeholder:text-muted-light/50 transition-colors"
                  aria-label="Email address for newsletter"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-fg-light text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            ) : (
              <p className="text-[14px] text-fg-light tracking-[0.1em] animate-fade-in">
                You&apos;re in. Welcome to DIALGA.
              </p>
            )}

            <p className="text-[12px] text-muted-light/40 mt-5 tracking-wide">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
