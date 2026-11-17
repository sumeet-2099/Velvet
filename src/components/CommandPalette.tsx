"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles, Terminal, Layers } from "lucide-react";
import { TEMPLATES, Template } from "@/data/templates";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTemplates = TEMPLATES.filter((tmpl) => {
    const q = query.toLowerCase();
    return (
      tmpl.title.toLowerCase().includes(q) ||
      tmpl.category.toLowerCase().includes(q) ||
      tmpl.tagline.toLowerCase().includes(q) ||
      tmpl.framework.toLowerCase().includes(q) ||
      tmpl.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/templates/${slug}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-surface-elevated border border-purple-500/30 shadow-velvet-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-surface-base">
          <Search className="w-5 h-5 text-purple-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates by architectural style, framework, or features…"
            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-zinc-500"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-zinc-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[420px] overflow-y-auto p-2">
          {filteredTemplates.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500">
              No matching templates found for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs text-zinc-400">
                Templates ({filteredTemplates.length})
              </div>
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelect(template.slug)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] hover:border-purple-500/40 border border-transparent transition-colors duration-200 group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                      <Image
                        src={template.thumbnail}
                        alt={template.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {template.title}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 truncate max-w-md mt-0.5">
                        {template.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-medium text-zinc-300">
                      ${template.priceUsd}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-[transform,color] duration-200" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-white/[0.06] bg-surface-base/80 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06]">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06]">↵</kbd> to select
            </span>
          </div>
          <span className="text-purple-400 font-medium">Velvet Curated Engine</span>
        </div>
      </div>
    </div>
  );
}
