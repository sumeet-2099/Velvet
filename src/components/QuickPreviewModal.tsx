"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Monitor, Tablet, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";
import { Template } from "@/data/templates";

interface QuickPreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

export function QuickPreviewModal({
  template,
  onClose,
}: QuickPreviewModalProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!template) return null;

  const formattedPrice = `$${template.priceUsd}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl bg-surface-elevated border border-white/10 shadow-velvet-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-surface-base">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">
              {template.title}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {template.category}
            </span>
            <span className="hidden sm:inline text-xs text-zinc-400">
              {template.version} | {template.framework}
            </span>
          </div>

          {/* Viewport switchers */}
          <div className="flex items-center gap-1 bg-surface-overlay p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                device === "desktop"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("tablet")}
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                device === "tablet"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                device === "mobile"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/templates/${template.slug}`}
              className="hidden md:flex btn-violet-pill px-4 py-1.5 text-xs font-medium items-center gap-1.5"
            >
              <span>View Full Specs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas Frame */}
        <div className="flex-1 overflow-y-auto bg-black/60 p-4 md:p-8 flex items-center justify-center">
          <div
            className={`rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 flex flex-col ${
              device === "desktop"
                ? "w-full max-w-5xl h-[620px]"
                : device === "tablet"
                ? "w-[680px] h-[580px]"
                : "w-[375px] h-[580px]"
            }`}
          >
            {/* Mock browser address bar */}
            <div className="h-9 bg-surface-overlay border-b border-white/[0.06] flex items-center px-4 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-0.5 rounded-full bg-black/50 border border-white/[0.08] text-[11px] text-zinc-400 max-w-sm truncate">
                  demo.velvet.dev/{template.slug}
                </div>
              </div>
            </div>

            {/* Interactive Preview Body */}
            <div className="relative flex-1 overflow-y-auto bg-surface-elevated p-6 text-white">
              {/* Simulated Isolated Template UI Preview */}
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <span className="text-xl font-bold tracking-tight font-display text-gradient-velvet">
                    {template.title}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span>Projects</span>
                    <span>About</span>
                    <span>Journal</span>
                    <span>Contact</span>
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={template.thumbnail}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs text-purple-300">
                      Selected Works 2026
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-1">
                      {template.tagline}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-elevated border border-white/[0.06]">
                    <span className="text-xs text-purple-400">01 / ARCHITECTURE</span>
                    <h4 className="text-base font-semibold text-white mt-1">The Monolith Pavilion</h4>
                    <p className="text-xs text-zinc-400 mt-1">Brutalist glass & textured cast concrete structure.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-elevated border border-white/[0.06]">
                    <span className="text-xs text-purple-400">02 / INTERIOR</span>
                    <h4 className="text-base font-semibold text-white mt-1">Atelier Sanctuarium</h4>
                    <p className="text-xs text-zinc-400 mt-1">Acoustic timber slats, basalt stone, ambient light.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Footer */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-surface-base border-t border-white/[0.08] gap-4">
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Lighthouse {template.lighthouse.performance}/100
            </span>
            <span>Bundle: {template.bundleSizeKb} KB</span>
            <span>Licence: 1 End-Product Client Site</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-mono font-bold text-white">
              {formattedPrice}
            </span>
            <Link
              href={`/templates/${template.slug}`}
              className="btn-violet-pill px-5 py-2 text-xs font-medium"
            >
              Get Template Source
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
