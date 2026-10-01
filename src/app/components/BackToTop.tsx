"use client";

import { useEffect, useState } from "react";
import { analytics } from "@/app/lib/analytics";

export default function BackToTop({ label }: { label: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        analytics.backToTop();
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
      data-testid="back-to-top-button"
      aria-label={label}
      className="fixed bottom-6 right-4 z-40 rounded-full border border-white/10 bg-dark-secondary/90 p-3 text-dark-text shadow-lg backdrop-blur transition-colors hover:border-primary-500/50 hover:text-primary-300 sm:right-6"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
