"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  Shield,
  Headphones,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { PRICING_PLANS, FAQS } from "@/data/plans";
import { SparkleBadge } from "@/components/SparkleBadge";
import { useVelvet } from "@/context/VelvetContext";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Background ambient illumination */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Pricing section.png */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SparkleBadge glow className="mb-3">
            Simple. Transparent. Fair.
          </SparkleBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            Pricing that scales with your <span className="text-gradient-velvet">vision.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            One subscription for complete source code, isolated live demos, continuous updates,
            and developer-friendly client licensing with perpetual rights.
          </p>

          {/* Billing Switcher Toggle & Currency Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Monthly / Yearly Segmented Toggle */}
            <div className="inline-flex p-1 rounded-full bg-surface-elevated border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap ${
                  billingCycle === "yearly"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>Yearly</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= 3-TIER PRICING CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => {
            const isYearly = billingCycle === "yearly";
            const amount = isYearly
              ? Math.round(plan.price.usd.yearly / 12)
              : plan.price.usd.monthly;

            const formattedPrice = `$${amount}`;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-colors duration-300 ${
                  plan.isPopular
                    ? "bg-surface-elevated border-2 border-purple-500/70 shadow-velvet-lg md:-translate-y-2"
                    : "bg-surface-base border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white font-display">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      {plan.seats} {plan.seats === 1 ? "Seat" : "Seats"}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 min-h-[36px] leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                      {formattedPrice}
                    </span>
                    <span className="text-xs text-zinc-400">/ month</span>
                    {isYearly && (
                      <span className="text-[11px] text-purple-400 block ml-2">
                        billed annually
                      </span>
                    )}
                  </div>

                  {/* Project Rights highlight */}
                  <div className="mb-6 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-purple-300">
                    {plan.clientProjectsLimit}
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 text-xs mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            feat.highlight ? "text-purple-400" : "text-zinc-500"
                          }`}
                        />
                        <span
                          className={
                            feat.highlight
                              ? "text-zinc-100 font-medium"
                              : "text-zinc-400"
                          }
                        >
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div>
                  <Link
                    href={`/checkout?plan=${plan.id}&cycle=${billingCycle}`}
                    className={`w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-1.5 ${
                      plan.ctaStyle === "violet"
                        ? "btn-violet-pill"
                        : plan.ctaStyle === "white"
                        ? "btn-white-pill"
                        : "btn-outline-pill"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                  </Link>
                  <p className="text-[10px] text-zinc-500 text-center mt-2.5">
                    Instant access. Cancel anytime. Perpetual client rights.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= VALUE / TRUST BANNER ================= */}
        <div className="p-6 rounded-2xl bg-surface-elevated border border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-20">
          <div className="flex flex-col items-center p-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Instant Source Access</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Direct access to clean, maintainable Next.js 14 repositories and signed downloads immediately upon checkout.
            </p>
          </div>

          <div className="flex flex-col items-center p-3 border-y md:border-y-0 md:border-x border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Cryptographic Licence Records</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Every end-product deployment is issued a verifiable license hash for client reassurance and audit safety.
            </p>
          </div>

          <div className="flex flex-col items-center p-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Developer-to-Developer Support</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Direct access to template creators on GitHub and Discord for setup assistance and framework questions.
            </p>
          </div>
        </div>

        {/* ================= FAQ ACCORDION SECTION ================= */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <SparkleBadge className="mb-3">Got Questions?</SparkleBadge>
            <h2 className="text-3xl font-bold text-white font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Essential details on Velvet subscriptions, licensing, and client delivery.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-surface-base border border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
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
        </div>
      </div>
    </div>
  );
}
