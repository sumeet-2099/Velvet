"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Command,
  Check,
  ChevronDown,
} from "lucide-react";
import { TEMPLATES, Template } from "@/data/templates";
import { TemplateCard } from "@/components/TemplateCard";
import { SparkleBadge } from "@/components/SparkleBadge";
import { useVelvet } from "@/context/VelvetContext";

export default function TemplatesPage() {
  const { previewTemplate, openSearch, user, profile, isSubscribed } = useVelvet();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"all" | "pass" | "standalone">("all");
  const [sortBy, setSortBy] = useState<"popularity" | "newest" | "performance" | "price-asc">("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available categories with accurate counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: TEMPLATES.length };
    TEMPLATES.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return [
      { name: "All", count: counts.All },
      { name: "Architecture", count: counts.Architecture || 0 },
      { name: "Interior Design", count: counts["Interior Design"] || 0 },
      { name: "Studio", count: counts.Studio || 0 },
      { name: "Portfolio", count: counts.Portfolio || 0 },
    ];
  }, []);

  const featureOptions = [
    "Responsive Layout",
    "Framer Motion",
    "Clean TypeScript Code",
    "AI-Agent Context (PROJECT.md)",
    "Core Web Vitals 99+",
    "Zero-runtime layout shift",
  ];

  // Filtering & Sorting logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((template) => {
      // Category filter
      if (selectedCategory !== "All" && template.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          template.title.toLowerCase().includes(q) ||
          template.tagline.toLowerCase().includes(q) ||
          template.description.toLowerCase().includes(q) ||
          template.techStack.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Feature filters
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every((f) =>
          template.features.some((feat) => feat.toLowerCase().includes(f.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      // Price filter
      if (priceFilter === "pass" && !template.badge?.includes("Velvet Pass")) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "popularity") {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
      if (sortBy === "newest") {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
      if (sortBy === "performance") {
        return b.lighthouse.performance - a.lighthouse.performance;
      }
      if (sortBy === "price-asc") {
        return a.priceUsd - b.priceUsd;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, selectedFeatures, priceFilter, sortBy]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedFeatures([]);
    setPriceFilter("all");
    setSortBy("popularity");
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background ambient violet illumination */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Template section.png */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <SparkleBadge glow className="mb-3">
            Velvet Catalogue &amp; Releases
          </SparkleBadge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
            Explore Stunning <span className="text-gradient-velvet">Templates.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Every template is a complete, production-tested repository with isolated live demos,
            performance evidence, and AI-agent context.
          </p>

          {user && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
              <span className={`w-2 h-2 rounded-full ${isSubscribed ? "bg-purple-400" : "bg-emerald-400"} animate-pulse`} />
              <span>
                Tier: <strong className="text-white capitalize">{isSubscribed ? `${profile?.selected_plan_tier} Pass` : "Free Membership"}</strong>
              </span>
              {!isSubscribed && (
                <span className="text-zinc-500 text-[11px]">· Browse all designs (Upgrade for source code)</span>
              )}
              {!isSubscribed && (
                <Link href="/pricing" className="ml-1.5 text-purple-400 hover:text-purple-300 font-semibold underline text-[11px]">
                  Upgrade to Pro
                </Link>
              )}
            </div>
          )}

          {/* Search Bar matching mockup with ⌘K shortcut */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-purple-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by style, features, or framework…"
                className="w-full pl-11 pr-24 py-3.5 rounded-full bg-surface-elevated border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 shadow-inner placeholder-zinc-500"
              />
              <button
                type="button"
                onClick={openSearch}
                className="absolute right-3 px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs text-zinc-300 flex items-center gap-1 transition-colors duration-200"
              >
                <Command className="w-3 h-3" /> K
              </button>
            </div>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-elevated border border-white/10 text-xs font-medium text-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            <span>Filters ({selectedFeatures.length + (selectedCategory !== "All" ? 1 : 0)})</span>
          </button>
          <span className="text-xs text-zinc-400">
            {filteredTemplates.length} results
          </span>
        </div>

        {/* Main Layout Grid: Sidebar Filter + Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* ================= SIDEBAR FILTER ================= */}
          <aside
            className={`md:col-span-3 space-y-6 ${
              mobileFilterOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="p-5 rounded-2xl bg-surface-base border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-purple-400" />
                  Filters
                </span>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[11px] text-zinc-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear All
                </button>
              </div>

              {/* Categories Section */}
              <div>
                <h4 className="text-xs font-medium text-zinc-300 mb-2.5">Categories</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                        selectedCategory === cat.name
                          ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] font-mono opacity-60">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Checklist */}
              <div className="pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-medium text-zinc-300 mb-2.5">Features</h4>
                <div className="space-y-2">
                  {featureOptions.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat);
                    return (
                      <label
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer select-none group"
                      >
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors duration-200 ${
                            isChecked
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "border-white/20 bg-surface-elevated group-hover:border-purple-400/50"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="truncate">{feat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Filter */}
              <div className="pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-medium text-zinc-300 mb-2.5">Access Model</h4>
                <div className="space-y-1.5">
                  <label
                    onClick={() => setPriceFilter("all")}
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="accessModel"
                      checked={priceFilter === "all"}
                      onChange={() => {}}
                      className="accent-purple-600"
                    />
                    <span>All Templates</span>
                  </label>
                  <label
                    onClick={() => setPriceFilter("pass")}
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="accessModel"
                      checked={priceFilter === "pass"}
                      onChange={() => {}}
                      className="accent-purple-600"
                    />
                    <span>✦ Velvet Pass Included</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* ================= TEMPLATES CONTENT ================= */}
          <main className="md:col-span-9 space-y-6">
            {/* Top Bar: Category Chips + Sort + Grid/List Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-surface-base border border-white/[0.08]">
              {/* Category Quick Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {["All", "Architecture", "Interior Design", "Studio"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                      selectedCategory === cat
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.10]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Right Controls: Sort Dropdown + View Mode */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-surface-elevated border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="newest">Newest First</option>
                    <option value="performance">Lighthouse Score</option>
                    <option value="price-asc">Price: Low to High</option>
                  </select>
                </div>

                {/* View Switcher */}
                <div className="flex items-center bg-surface-elevated rounded-lg p-0.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-purple-600 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-purple-600 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-label="List View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count & Active Filters Indicator */}
            <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
              <span>Showing {filteredTemplates.length} published templates</span>
              {(selectedCategory !== "All" || selectedFeatures.length > 0 || searchQuery) && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-purple-400 hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Templates Grid / List */}
            {filteredTemplates.length === 0 ? (
              <div className="p-16 rounded-3xl bg-surface-elevated border border-white/[0.08] text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-purple-600/10 text-purple-400 flex items-center justify-center mx-auto">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">No templates found</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  No templates matched your current filter criteria. Try clearing some filters or searching for another keyword.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="btn-outline-pill px-5 py-2 text-xs font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onQuickPreview={previewTemplate}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
