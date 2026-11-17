"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { useVelvet } from "@/context/VelvetContext";
import { SparkleBadge } from "@/components/SparkleBadge";
import { TemplateCard } from "@/components/TemplateCard";
import { TEMPLATES } from "@/data/templates";
import { FAQS } from "@/data/plans";

export default function HomePage() {
  const { previewTemplate, isPreloaded } = useVelvet();
  const [activeTab, setActiveTab] = useState<"code" | "tokens" | "ai">("code");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const featuredTemplates = TEMPLATES.slice(0, 3);

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Background ambient violet illumination (Phrase 2.8) */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl pointer-events-none transition-opacity duration-700 ${
          isPreloaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ================= HERO SECTION (Phrase 2.9 - 2.11) ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div
          className={`flex flex-col items-center text-center max-w-4xl mx-auto transition-all duration-700 ease-out ${
            isPreloaded
              ? "translate-y-0 opacity-100 filter-none"
              : "translate-y-6 opacity-0 blur-[2px]"
          }`}
        >
          {/* Pill Badge matching Design.md */}
          <SparkleBadge glow className="mb-6 animate-pulse-subtle">
            Build. Customize. Launch.
          </SparkleBadge>

          {/* Signature Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08]">
            Velvet for what&apos;s next.
          </h1>

          {/* Lead Subhead (Phrase 2.10) */}
          <p
            className={`mt-6 text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed transition-all duration-700 delay-100 ease-out ${
              isPreloaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            A curated subscription library of production-ready website templates designed
            for modern architecture studios, interior practices, and creative agencies.
          </p>

          {/* Action Pills (Phrase 2.10) */}
          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-200 ease-out ${
              isPreloaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              href="/templates"
              className="btn-white-pill px-7 py-3.5 text-sm font-semibold flex items-center gap-2 shadow-white-hover"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pricing"
              className="btn-outline-pill group px-6 py-3.5 text-sm font-medium flex items-center gap-2"
            >
              <span>View Plans &amp; Licensing</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Core Technical Standards (Phrase 2.11) */}
          <div
            className={`mt-12 pt-8 border-t border-white/[0.08] w-full max-w-lg mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-zinc-400 transition-all duration-700 delay-300 ease-out ${
              isPreloaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Next.js 14 App Router</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>TypeScript Strict Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED CATALOGUE SHOWCASE (Phrase 2.12) ================= */}
      <section
        id="templates"
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.06] scroll-mt-20 transition-opacity duration-700 delay-300 ${
          isPreloaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SparkleBadge className="mb-3">Curated Releases</SparkleBadge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Hand-crafted architectural standards.
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Each template is an authentic, tested source release. Designed for architecture firms,
              spatial studios, and creative practices who value craft over clutter.
            </p>
          </div>

          <Link
            href="/templates"
            className="btn-outline-pill px-5 py-2.5 text-xs font-medium self-start md:self-auto flex items-center gap-1.5"
          >
            <span>View All Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onQuickPreview={previewTemplate}
            />
          ))}
        </div>
      </section>

      {/* ================= "BUILT FOR CREATORS" FEATURE CARDS ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SparkleBadge className="mb-3">The Velvet Standard</SparkleBadge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
            Built for creators, by creators.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Most website templates are bloated, generic themes built to sell volume.
            Velvet is an engineering-first library built for senior developers and agencies.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-surface-elevated border border-white/[0.08] hover:border-purple-500/50 transition-colors duration-200 relative group overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              Maintainable Next.js 14 Source Code
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              No locked page builders, obfuscated bundles, or messy dependencies. Complete App Router architecture,
              TypeScript strict mode, and modular Tailwind components ready for custom deployment.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full source code ownership</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-surface-elevated border border-white/[0.08] hover:border-purple-500/50 transition-colors duration-200 relative group overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              AI-Agent Native Context (PROJECT.md)
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every template includes a machine-readable `PROJECT.md` file designed for Claude Code,
              Cursor, and Antigravity. Instruct your agent to customize colors, copy, and layout without breakage.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-hallucination agent modifications</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-surface-elevated border border-white/[0.08] hover:border-purple-500/50 transition-colors duration-200 relative group overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              Core Web Vitals &amp; Performance Budgets
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Performance is a non-negotiable contract: LCP ≤ 2.5s, CLS = 0.00, and compressed JavaScript
              under 180 KB. 3D and WebGL are progressive enhancements with immediate HTML/CSS fallbacks.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tested on real mobile hardware</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-2xl bg-surface-elevated border border-white/[0.08] hover:border-purple-500/50 transition-colors duration-200 relative group overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              1 End-Product Client Licence
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Built for professional client delivery. One licence covers one finished production website.
              Clients keep perpetual rights online forever even if you cancel your subscription.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Commercial client delivery permitted</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE CODE & DX BENCHMARK ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.06]">
        <div className="rounded-3xl bg-surface-base border border-white/[0.08] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <SparkleBadge>Developer Experience</SparkleBadge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
                Inspect the quality behind the pixels.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Explore how Velvet organizes code, design tokens, and AI instructions.
                We eliminate the hours wasted disentangling third-party spaghetti code.
              </p>

              {/* Tabs */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-elevated border border-white/10 w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    activeTab === "code" ? "bg-purple-600 text-white font-bold shadow-sm" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("tokens")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    activeTab === "tokens" ? "bg-purple-600 text-white font-bold shadow-sm" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Design Tokens
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    activeTab === "ai" ? "bg-purple-600 text-white font-bold shadow-sm" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  PROJECT.md (AI)
                </button>
              </div>
            </div>

            {/* Code Inspector Frame */}
            <div className="lg:col-span-7 rounded-2xl bg-black/90 border border-white/10 p-5 font-mono text-xs text-zinc-300 shadow-2xl overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] text-zinc-400">
                    {activeTab === "code"
                      ? "src/app/page.tsx"
                      : activeTab === "tokens"
                      ? "src/tokens/brand.ts"
                      : "PROJECT.md"}
                  </span>
                </div>
                <span className="text-[10px] text-purple-400">TypeScript 5.x</span>
              </div>

              {activeTab === "code" && (
                <pre className="text-zinc-300 leading-relaxed overflow-x-auto">
                  <code>{`// Clean Next.js 14 Server Component Architecture
export default async function TemplateShowcasePage() {
  const templates = await getPublishedTemplates({ limit: 6 });
  
  return (
    <main className="min-h-screen bg-surface-canvas text-white">
      <HeroHeader title="Curated Architectural Releases" />
      <TemplateGrid items={templates} />
      <QuickPreviewDrawer />
    </main>
  );
}`}</code>
                </pre>
              )}

              {activeTab === "tokens" && (
                <pre className="text-zinc-300 leading-relaxed overflow-x-auto">
                  <code>{`// Velvet Design Tokens System
export const brandTokens = {
  colors: {
    canvas: "#000000",
    base: "#0A0A0F",
    accentViolet: "#8B5CF6",
    textPrimary: "#FFFFFF",
    textMuted: "#9CA3AF",
  },
  typography: {
    display: "var(--font-display)",
    body: "var(--font-sans)",
  },
  animation: {
    fluidSpring: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
};`}</code>
                </pre>
              )}

              {activeTab === "ai" && (
                <pre className="text-zinc-300 leading-relaxed overflow-x-auto">
                  <code>{`<!-- AI-Agent Project Context: Template Specification -->
<PROJECT_SPECIFICATION>
  <TEMPLATE_NAME>Velvet Architectural Suite</TEMPLATE_NAME>
  <PALETTE>Canvas #000000, Violet #8B5CF6, Text #FFFFFF</PALETTE>
  <RULES>
    - Maintain Next.js 14 App Router server components
    - Preserve zero-CLS layout anchors on media elements
    - Strict WCAG AA contrast conformance
  </RULES>
</PROJECT_SPECIFICATION>`}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPANDABLE FAQ (Item 19) ================= */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.06]">
        <div className="text-center mb-10">
          <SparkleBadge className="mb-3">Frequently Asked Questions</SparkleBadge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Everything you need to know.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Clear answers about Velvet templates, source code delivery, and commercial rights.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.slice(0, 5).map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-surface-base border border-white/[0.08] hover:border-purple-500/30 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-full bg-white/[0.05] text-purple-400 ml-4 flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="relative rounded-3xl bg-gradient-to-b from-purple-900/30 via-surface-elevated to-surface-canvas border border-purple-500/30 p-10 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-velvet-radial-top pointer-events-none" />

          <SparkleBadge glow className="mb-6">
            Instant Access and Commercial License
          </SparkleBadge>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display max-w-2xl mx-auto">
            Ready to deploy your next client build?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Full source code access, modular components, and perpetual client deployment rights.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/templates"
              className="btn-white-pill px-8 py-3.5 text-sm font-semibold flex items-center gap-2"
            >
              <span>Explore All Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pricing"
              className="btn-violet-pill px-7 py-3.5 text-sm font-medium flex items-center gap-2"
            >
              <span>View Plans &amp; Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
