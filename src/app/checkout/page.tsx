"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { PRICING_PLANS } from "@/data/plans";
import { TEMPLATES } from "@/data/templates";
import { useVelvet } from "@/context/VelvetContext";
import confetti from "canvas-confetti";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "pro";
  const cycle = searchParams.get("cycle") || "yearly";
  const templateSlug = searchParams.get("template");
  const mode = searchParams.get("mode");
  const { purchaseTemplate, subscribePlan } = useVelvet();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("lead@studio.design");
  const [name, setName] = useState("Alex Vance");

  const isStandalone = mode === "standalone" && Boolean(templateSlug);
  const matchedTemplate = isStandalone ? TEMPLATES.find((t) => t.slug === templateSlug) : null;
  const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[1];
  const isYearly = cycle === "yearly";

  const totalAmount = isStandalone && matchedTemplate
    ? matchedTemplate.priceUsd
    : isYearly
    ? plan.price.usd.yearly
    : plan.price.usd.monthly;

  const formattedTotal = `$${totalAmount}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (isStandalone && templateSlug) {
        purchaseTemplate(templateSlug);
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
        });
        router.push(`/templates/${templateSlug}?purchased=true`);
      } else {
        subscribePlan(plan.id as any);
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
        });
        router.push("/dashboard?status=success");
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-surface-elevated border border-purple-500/40 shadow-velvet-xl-soft relative overflow-hidden">
      {/* Glow halo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-velvet-radial-tr-subtle pointer-events-none" />

      <div className="text-center mb-8">
        <BrandMark height={32} />
        <h1 className="text-2xl font-bold text-white font-display mt-4">
          {isStandalone && matchedTemplate
            ? `Purchase ${matchedTemplate.title} Licence`
            : `Subscribe to Velvet ${plan.name} Pass`}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Server-side idempotent checkout · Encrypted transaction
        </p>
        <div className="mt-3 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 inline-block">
          Sandbox Mode · Payment Gateway Integration Pending
        </div>
      </div>

      {/* Item Summary Box */}
      <div className="p-4 rounded-2xl bg-surface-base border border-white/[0.08] mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">
            {isStandalone && matchedTemplate
              ? `Template Source Code: ${matchedTemplate.title} (${matchedTemplate.version})`
              : `Velvet ${plan.name} Pass`}
          </div>
          <div className="text-xs text-zinc-400">
            {isStandalone
              ? "1 End-Product Client Website Licence · Complete Source Archive"
              : isYearly
              ? "Annual Billing (2 Months Free) · Full Library Access"
              : "Monthly Billing · Full Library Access"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold font-mono text-purple-300">
            {formattedTotal}
          </div>
          <div className="text-[10px] text-zinc-500">
            One-time payment
          </div>
        </div>
      </div>

      {/* Mock Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Account Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-surface-base border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Cardholder / Studio Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-surface-base border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Payment Method (Encrypted Sandbox)
          </label>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-base border border-white/10 text-xs text-zinc-300">
            <CreditCard className="w-4 h-4 text-purple-400" />
            <span className="tabular-nums">•••• •••• •••• 4242</span>
            <span className="ml-auto text-[10px] text-emerald-400">READY</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-violet-pill py-3 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>
              {loading
                ? "Authorizing Transaction…"
                : `Pay ${formattedTotal} & Unlock Source Code`}
            </span>
          </button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          256-Bit SSL Encryption
        </span>
        <span>Perpetual client rights on delivery</span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="text-zinc-400 text-sm">
            Loading secure checkout session…
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
