"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Template } from "@/data/templates";
import { useVelvet } from "@/context/VelvetContext";
import confetti from "canvas-confetti";

interface PaymentRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
  onPaymentSuccess: () => void;
}

export function PaymentRequiredModal({
  isOpen,
  onClose,
  template,
  onPaymentSuccess,
}: PaymentRequiredModalProps) {
  const { purchaseTemplate, subscribePlan } = useVelvet();
  const [selectedOption, setSelectedOption] = useState<"standalone" | "subscription">("standalone");
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const standalonePrice = `$${template.priceUsd}`;
  const proPrice = "$49";

  const handleSimulatedPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      if (selectedOption === "standalone") {
        purchaseTemplate(template.slug);
      } else {
        subscribePlan("pro");
      }
      setProcessing(false);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
      onPaymentSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-surface-elevated border-2 border-purple-500/50 shadow-velvet-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient violet glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-velvet-radial-tr-strong pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto mb-3 shadow-velvet-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
            Unlock &quot;{template.title}&quot; Source Code
          </h3>
          <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
            Velvet templates are production-ready source code repositories. An active subscription or standalone purchase is required to download.
          </p>
        </div>

        {/* Option Selection Radio Cards */}
        <div className="space-y-3 mb-6">
          {/* Option 1: Standalone */}
          <div
            onClick={() => setSelectedOption("standalone")}
            className={`p-4 rounded-2xl cursor-pointer border transition-colors duration-200 ${
              selectedOption === "standalone"
                ? "bg-purple-950/30 border-purple-500 shadow-velvet-soft"
                : "bg-surface-base border-white/[0.08] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="purchaseOption"
                  checked={selectedOption === "standalone"}
                  onChange={() => {}}
                  className="accent-purple-600"
                />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Standalone {template.title} Source
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    1 End-Product Client Licence · Perpetual Rights
                  </div>
                </div>
              </div>
              <span className="text-base font-bold font-mono text-white">
                {standalonePrice}
              </span>
            </div>
          </div>

          {/* Option 2: Pro Pass Subscription */}
          <div
            onClick={() => setSelectedOption("subscription")}
            className={`relative p-4 rounded-2xl cursor-pointer border transition-colors duration-200 ${
              selectedOption === "subscription"
                ? "bg-purple-950/30 border-purple-500 shadow-velvet-soft"
                : "bg-surface-base border-white/[0.08] hover:border-white/20"
            }`}
          >
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-velvet-600 text-white">
              Best value (all templates)
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="purchaseOption"
                  checked={selectedOption === "subscription"}
                  onChange={() => {}}
                  className="accent-purple-600"
                />
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>Velvet Pro Pass</span>
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Access all 6+ templates + 5 client deployments / yr
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-purple-300">
                  {proPrice}
                </span>
                <span className="text-[10px] text-zinc-500 block">/ mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            disabled={processing}
            onClick={handleSimulatedPayment}
            className="w-full btn-violet-pill py-3 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>
              {processing
                ? "Processing Secure Payment…"
                : selectedOption === "standalone"
                ? `Pay ${standalonePrice} & Download Source`
                : `Subscribe to Pro (${proPrice}/mo) & Download`}
            </span>
          </button>

          <Link
            href={`/checkout?${
              selectedOption === "standalone"
                ? `template=${template.slug}&mode=standalone`
                : `plan=pro&cycle=yearly`
            }`}
            onClick={onClose}
            className="w-full btn-outline-pill py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 text-zinc-300"
          >
            <span>Go to Full Checkout Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Security badge */}
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Encrypted Checkout · Test Sandbox
          </span>
          <span>Instant source activation</span>
        </div>
      </div>
    </div>
  );
}
