"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("velvet_cookie_consent");
    if (!consent) {
      // Delay display slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("velvet_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("velvet_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl bg-surface-elevated/95 backdrop-blur-xl border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-white">Privacy &amp; Cookie Preferences</span>
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Close cookie banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            We use privacy-respecting cookies to maintain authentication sessions and analyze platform telemetry. No third-party ad tracking.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="btn-violet-pill px-3.5 py-1.5 text-xs font-semibold"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="btn-outline-pill px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
            >
              Essential Only
            </button>
            <Link
              href="/privacy"
              className="text-[11px] text-zinc-400 hover:text-purple-300 underline ml-auto"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
