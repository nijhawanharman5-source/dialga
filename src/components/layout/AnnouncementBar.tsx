"use client";

import { useEffect, useRef, useState } from "react";

const messages = [
  "NEW DROP — ESSENTIALS, REDEFINED.",
  "FREE SHIPPING ON ORDERS ABOVE ₹1999 • COD AVAILABLE • EASY RETURNS",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-bg-dark text-fg-light"
      style={{ zIndex: "var(--z-announcement)" }}
    >
      <div className="relative h-9 flex items-center justify-center">
        {messages.map((msg, i) => (
          <span
            key={msg}
            className="absolute inset-0 flex items-center justify-center text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-500 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateY(0)" : "translateY(6px)",
            }}
            aria-hidden={i !== current}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
