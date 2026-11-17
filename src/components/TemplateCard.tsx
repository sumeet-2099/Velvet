"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
  onQuickPreview?: (template: Template) => void;
  viewMode?: "grid" | "list";
}

export function TemplateCard({
  template,
  onQuickPreview,
  viewMode = "grid",
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const formattedPrice = `$${template.priceUsd}`;

  if (viewMode === "list") {
    return (
      <div
        className="group relative flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-purple-500/60 hover:shadow-velvet-card transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full md:w-64 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-900">
          <Image
            src={template.thumbnail}
            alt={template.title}
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {template.badge && (
            <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
              {template.badge}
            </div>
          )}
        </div>

        <div className="flex-1 w-full flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span className="text-xs font-medium text-purple-400">
                {template.category}
              </span>
              <span className="text-xs text-zinc-400">
                {template.version} | {template.bundleSizeKb} KB gzip
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
              {template.title}
            </h3>
            <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
              {template.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono font-semibold text-white">
                {formattedPrice}
              </span>
              <span className="text-xs text-zinc-400 font-sans">
                or included in Pro Pass
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onQuickPreview && (
                <button
                  type="button"
                  onClick={() => onQuickPreview(template)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 flex items-center gap-1.5 transition-colors duration-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Quick Preview
                </button>
              )}
              <Link
                href={`/templates/${template.slug}`}
                className="btn-violet-pill px-4 py-1.5 text-xs font-medium flex items-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-surface-elevated border border-border-subtle hover:border-purple-500/70 hover:shadow-velvet-hover transition-colors duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 16:10 Aspect Ratio Preview Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {template.badge ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/75 backdrop-blur-md text-purple-300 border border-purple-500/40 shadow-sm">
              {template.badge}
            </span>
          ) : (
            <span />
          )}
          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
            {template.version}
          </span>
        </div>

        {/* Hover Scrim with Centered Action Pills matching Design.md */}
        <div
          className={`absolute inset-0 bg-black/65 backdrop-blur-[3px] flex items-center justify-center gap-3 transition-opacity duration-300 z-20 ${
            isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {onQuickPreview && (
            <button
              type="button"
              onClick={() => onQuickPreview(template)}
              className="px-4 py-2 rounded-full text-xs font-medium text-white bg-white/[0.12] hover:bg-white/[0.22] border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-[transform,background-color] duration-200 transform hover:scale-105 active:scale-95"
            >
              <Eye className="w-3.5 h-3.5 text-purple-300" />
              <span>Quick Preview</span>
            </button>
          )}

          <Link
            href={`/templates/${template.slug}`}
            className="btn-violet-pill px-4 py-2 text-xs font-medium flex items-center gap-1.5 transform hover:scale-105 active:scale-95"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card Content & Footer */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-purple-200 transition-colors">
              {template.title}
            </h3>
            <span className="text-base font-mono font-semibold text-white tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <p className="text-xs text-purple-400 font-medium mb-2">
            {template.category} Template
          </p>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {template.tagline}
          </p>
        </div>

        {/* Card Lower Bar with Circular Arrow Button */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Core Web Vitals {template.lighthouse.performance}
          </span>

          <Link
            href={`/templates/${template.slug}`}
            className="w-7 h-7 rounded-full bg-white/[0.06] group-hover:bg-purple-600/30 border border-white/10 group-hover:border-purple-500/50 flex items-center justify-center text-zinc-300 group-hover:text-white transition-[transform,background-color,border-color] duration-200 transform group-hover:translate-x-0.5"
            aria-label={`View ${template.title} details`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
