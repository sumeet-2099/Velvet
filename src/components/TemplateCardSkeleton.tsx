"use client";

import React from "react";

export function TemplateCardSkeleton() {
  return (
    <div className="rounded-2xl bg-surface-elevated border border-white/[0.08] overflow-hidden flex flex-col animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="aspect-[16/10] bg-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer" />
        <div className="absolute top-3 left-3 w-20 h-5 rounded-full bg-white/[0.08]" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="w-16 h-3 rounded bg-purple-500/20" />
          <div className="w-3/4 h-5 rounded bg-white/[0.1]" />
          <div className="w-full h-3 rounded bg-white/[0.05]" />
          <div className="w-2/3 h-3 rounded bg-white/[0.05]" />
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="w-14 h-4 rounded bg-white/[0.08]" />
          <div className="w-24 h-7 rounded-full bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}
