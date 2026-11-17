"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Download,
  Copy,
  Check,
  FileCode,
  Folder,
  Layers,
  Shield,
  Gauge,
  Sparkles,
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  ChevronRight,
  Lock,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { TEMPLATES, Template } from "@/data/templates";
import { CopyButton } from "@/components/CopyButton";
import { SparkleBadge } from "@/components/SparkleBadge";
import { PaymentRequiredModal } from "@/components/PaymentRequiredModal";
import { useVelvet } from "@/context/VelvetContext";
import confetti from "canvas-confetti";

export default function TemplateDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { hasAccessToTemplate, isSubscribed } = useVelvet();

  const template = TEMPLATES.find((t) => t.slug === slug);
  if (!template) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<"overview" | "tokens" | "files" | "ai">("overview");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [downloading, setDownloading] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadTicket, setDownloadTicket] = useState<{
    token: string;
    expiresAt: string;
    downloadUrl: string;
  } | null>(null);

  const isEntitled = hasAccessToTemplate(template.slug);
  const formattedPrice = `$${template.priceUsd}`;

  const handleDownloadClick = async () => {
    setDownloadError(null);

    // Guard: If customer has NOT paid or subscribed, block download and prompt payment!
    if (!isEntitled) {
      setPaymentModalOpen(true);
      return;
    }

    setDownloading(true);
    try {
      const res = await fetch(`/api/v1/templates/${template.slug}/download-ticket`, {
        method: "POST",
      });

      if (res.status === 402 || !res.ok) {
        const errData = await res.json().catch(() => ({}));
        setDownloadError(errData.message || "Payment or active subscription required.");
        setPaymentModalOpen(true);
        return;
      }

      const data = await res.json();
      setDownloadTicket(data);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      setDownloadError("Network error checking entitlement.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Background radial glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-radial from-purple-800/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/templates" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Templates
          </Link>
          <span>/</span>
          <span className="text-purple-400 font-medium">{template.category}</span>
          <span>/</span>
          <span className="text-white font-semibold">{template.title}</span>
        </div>

        {/* Template Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <SparkleBadge glow>{template.category} Template</SparkleBadge>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.06] text-zinc-300 border border-white/10">
                {template.version}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Audited Release
              </span>
              {isEntitled && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  Licence Active
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              {template.title}: {template.tagline}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
              {template.description}
            </p>

            {/* Quality badges */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 text-white">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Lighthouse</span>
                <span className="font-mono text-emerald-400 font-semibold">{template.lighthouse.performance}</span>
                <span>/100</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Bundle:</span>
                <span className="text-zinc-200 font-mono">{template.bundleSizeKb}</span>
                <span>KB compressed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Updated:</span>
                <span className="text-zinc-200">{template.releaseDate}</span>
              </div>
            </div>
          </div>

          {/* Right Action & Purchase Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-surface-elevated border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-3xl font-bold font-mono text-white">{formattedPrice}</span>
                <span className="text-xs text-zinc-400 ml-2">one-time standalone</span>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                ✦ Velvet Pass
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Included in the Velvet Pro ($49/mo) or Studio subscription with access to all templates,
              continuous source updates, and 5 client deployments per year.
            </p>

            {/* Conditional Action UI based on Entitlement */}
            <div className="space-y-3">
              {isEntitled ? (
                <>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>You own an active commercial licence for this template.</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadClick}
                    disabled={downloading}
                    className="w-full btn-violet-pill py-3 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {downloading ? "Generating Signed Ticket..." : "Download Source Archive"}
                    </span>
                  </button>

                  <Link
                    href="/dashboard"
                    className="w-full btn-outline-pill py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 text-zinc-300"
                  >
                    <span>View Licence in Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              ) : (
                <>
                  {/* Unpaid / Unsubscribed State: Payment Required */}
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(true)}
                    className="w-full btn-violet-pill py-3.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-velvet-md"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Purchase Template Source: {formattedPrice}</span>
                  </button>

                  <Link
                    href="/checkout?plan=pro&cycle=yearly"
                    className="w-full btn-white-pill py-3 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Unlock with Pro Pass ($49/mo)</span>
                  </Link>
                </>
              )}
            </div>

            {/* Error Message if download was rejected */}
            {downloadError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{downloadError}</span>
              </div>
            )}

            {/* Expiring Download Ticket Box */}
            {downloadTicket && (
              <div className="mt-4 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-purple-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Signed Ticket Issued
                  </span>
                  <span className="text-[10px]">Exp in 15m</span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  Token: <code className="font-mono text-purple-300">{downloadTicket.token}</code>
                </p>
                <a
                  href={`#download-${template.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Starting direct verified download for ${template.title} ${template.version} source package.`);
                  }}
                  className="block text-center py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
                >
                  Download {template.title}-{template.version}.zip
                </a>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-2 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Commercial Client Licence: 1 Production Site</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>Includes PROJECT.md for AI Coding Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Perpetual use rights on completed websites</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LIVE PREVIEW FRAME & SANDBOX ================= */}
        <div className="mb-16 rounded-3xl bg-surface-base border border-white/[0.08] overflow-hidden shadow-2xl">
          {/* Viewport Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-surface-elevated">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white">
                Isolated Live Sandbox
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                demo.velvet.dev
              </span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-surface-overlay p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                  deviceMode === "desktop"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop (1440px)</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("tablet")}
                className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                  deviceMode === "tablet"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet (768px)</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                  deviceMode === "mobile"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile (390px)</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 hidden md:inline">
                Zero CLS
              </span>
            </div>
          </div>

          {/* Interactive Live Viewport */}
          <div className="bg-surface-base p-4 sm:p-8 flex items-center justify-center overflow-x-auto min-h-[520px]">
            <div
              className={`rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-elevated flex flex-col ${
                deviceMode === "desktop"
                  ? "w-full max-w-5xl h-[580px]"
                  : deviceMode === "tablet"
                  ? "w-[720px] h-[540px]"
                  : "w-[390px] h-[540px]"
              }`}
            >
              {/* Inner Template Header */}
              <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-lg font-bold font-display text-white tracking-tight">
                  {template.title}
                </span>
                <div className="flex items-center gap-5 text-xs text-zinc-400 font-medium">
                  <span className="text-white hover:text-purple-300 cursor-pointer">Projects</span>
                  <span className="hover:text-purple-300 cursor-pointer">Philosophy</span>
                  <span className="hover:text-purple-300 cursor-pointer">Inquiries</span>
                </div>
              </div>

              {/* Inner Template Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={template.thumbnail}
                    alt={template.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs text-purple-300">
                      Architectural Case Study 2026
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {template.tagline}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {template.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-surface-elevated border border-white/[0.06]">
                      <span className="text-xs text-purple-400">Spec 0{i + 1}</span>
                      <p className="text-xs text-zinc-300 mt-1 font-medium">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DEEP SPECIFICATION TABS ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                activeTab === "overview"
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Features &amp; Tech Stack
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tokens")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                activeTab === "tokens"
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Design Tokens
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("files")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                activeTab === "files"
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Included File Tree
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                activeTab === "ai"
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              AI-Agent Instructions (PROJECT.md)
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-surface-base border border-white/[0.08] space-y-4">
                <h3 className="text-base font-semibold text-white">Engineering Features</h3>
                <ul className="space-y-2.5">
                  {template.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-surface-base border border-white/[0.08] space-y-4">
                <h3 className="text-base font-semibold text-white">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {template.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface-elevated border border-white/10 text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.08] space-y-3">
                  <h4 className="text-xs font-semibold text-zinc-400">
                    Lighthouse Audit Breakdown
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-surface-elevated border border-white/[0.06]">
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {template.lighthouse.performance}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Performance</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-elevated border border-white/[0.06]">
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {template.lighthouse.accessibility}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Accessibility</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-elevated border border-white/[0.06]">
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {template.lighthouse.bestPractices}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Best Practices</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-elevated border border-white/[0.06]">
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {template.lighthouse.seo}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">SEO</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN TOKENS */}
          {activeTab === "tokens" && (
            <div className="p-6 rounded-2xl bg-surface-base border border-white/[0.08] space-y-6">
              <h3 className="text-base font-semibold text-white">Color Palette &amp; Material Spectrum</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div
                    className="h-16 rounded-xl border border-white/20 shadow-inner"
                    style={{ backgroundColor: template.colorScheme.canvas }}
                  />
                  <div className="text-xs">
                    <span className="text-white block font-medium">Canvas</span>
                    <code className="text-zinc-500 font-mono block">{template.colorScheme.canvas}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-16 rounded-xl border border-white/20 shadow-inner"
                    style={{ backgroundColor: template.colorScheme.primary }}
                  />
                  <div className="text-xs">
                    <span className="text-white block font-medium">Primary Surface</span>
                    <code className="text-zinc-500 font-mono block">{template.colorScheme.primary}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-16 rounded-xl border border-white/20 shadow-inner"
                    style={{ backgroundColor: template.colorScheme.secondary }}
                  />
                  <div className="text-xs">
                    <span className="text-white block font-medium">Muted Ash</span>
                    <code className="text-zinc-500 font-mono block">{template.colorScheme.secondary}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-16 rounded-xl border border-white/20 shadow-inner"
                    style={{ backgroundColor: template.colorScheme.accent }}
                  />
                  <div className="text-xs">
                    <span className="text-white block font-medium">Signature Accent</span>
                    <code className="text-zinc-500 font-mono block">{template.colorScheme.accent}</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FILE TREE */}
          {activeTab === "files" && (
            <div className="p-6 rounded-2xl bg-surface-base border border-white/[0.08] text-xs">
              <h3 className="text-base font-semibold text-white font-sans mb-4">
                Clean Repository Architecture
              </h3>
              <div className="space-y-2 text-zinc-300">
                {template.fileTree.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-purple-300">
                      {item.type === "folder" ? (
                        <Folder className="w-4 h-4 text-purple-400" />
                      ) : (
                        <FileCode className="w-4 h-4 text-zinc-400" />
                      )}
                      <code className="font-mono">{item.name}/</code>
                    </div>
                    {item.children?.map((child, cIdx) => (
                      <div key={cIdx} className="ml-6 flex items-center gap-2 text-zinc-400">
                        {child.type === "folder" ? (
                          <Folder className="w-3.5 h-3.5 text-purple-400/80" />
                        ) : (
                          <FileCode className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                        <code className="font-mono">{child.name}</code>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI PROMPT */}
          {activeTab === "ai" && (
            <div className="p-6 rounded-2xl bg-surface-base border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    AI-Agent Instructions (`PROJECT.md`)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Copy and pass directly to Claude Code, Antigravity, or Cursor for zero-hallucination customization.
                  </p>
                </div>
                <CopyButton
                  text={template.aiPrompt}
                  label="Copy Instructions"
                  className="px-3 py-1.5"
                />
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-purple-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {template.aiPrompt}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Required Modal */}
      <PaymentRequiredModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        template={template}
        onPaymentSuccess={() => {
          // Entitlement updated, trigger download ticket generation immediately
          handleDownloadClick();
        }}
      />
    </div>
  );
}
