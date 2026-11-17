import React from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Sparkles, Shield, Cpu, Terminal, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-surface-base border-t border-white/[0.08] text-zinc-400 text-sm overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <BrandMark height={36} />
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed mt-4">
              Velvet is a curated marketplace and subscription library for premium website templates.
              Combining high-end architectural aesthetics, maintainable Next.js 14 source code, isolated live demos, and AI-agent context.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                WCAG 2.2 AA Validated
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                LCP ≤ 2.5s Budget
              </span>
            </div>
          </div>

          {/* Links column 1 */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/templates" className="hover:text-purple-300 transition-colors">
                  All Templates
                </Link>
              </li>
              <li>
                <Link href="/templates?category=Architecture" className="hover:text-purple-300 transition-colors">
                  Architecture Studios
                </Link>
              </li>
              <li>
                <Link href="/templates?category=Interior+Design" className="hover:text-purple-300 transition-colors">
                  Interior & Spatial
                </Link>
              </li>
              <li>
                <Link href="/templates?category=Portfolio" className="hover:text-purple-300 transition-colors">
                  Creative Portfolios
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                  <span>✦ Velvet Pass</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Links column 2 */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-4">
              Platform & Specs
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/pricing" className="hover:text-purple-300 transition-colors">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-300 transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-purple-300 transition-colors">
                  Publishing Gate
                </Link>
              </li>
              <li>
                <span className="text-zinc-500">Live Demo Sandbox</span>
              </li>
              <li>
                <span className="text-zinc-500">AI Prompt Specs</span>
              </li>
            </ul>
          </div>

          {/* Links column 3 */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-4">
              Licensing & Trust
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  End-Product Licence (1 Site)
                </span>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  Client Delivery Rights
                </span>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  Perpetual Completed Rights
                </span>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-purple-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} VELVET.
          </div>
          <div className="flex items-center gap-6">
            <span>Modular Monolith Architecture</span>
            <span>·</span>
            <span>Zero-Lag WebGL Fallback</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
