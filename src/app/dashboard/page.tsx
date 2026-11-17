"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Download,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Folder,
  Layers,
  Code2,
  Check,
  Copy,
  Clock,
} from "lucide-react";
import { SparkleBadge } from "@/components/SparkleBadge";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CopyButton } from "@/components/CopyButton";
import { TEMPLATES, Template } from "@/data/templates";
import { useVelvet } from "@/context/VelvetContext";

export default function DashboardPage() {
  const { user, profile, userPlan, isSubscribed, signOut, purchasedTemplates } = useVelvet();

  const [downloadingSlug, setDownloadingSlug] = useState<string | null>(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [downloadTicket, setDownloadTicket] = useState<{
    slug: string;
    token: string;
    downloadUrl: string;
    expiresAt: string;
    filename: string;
  } | null>(null);

  const rawName =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Studio Member";

  // Capitalize the user's name with the first letter capitalized
  const capitalizedName = rawName
    ? String(rawName)
        .split(/[\s]+/)
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "Studio Member";

  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    try {
      // 1. Check URL parameters (e.g. ?new_user=true or ?signup=true)
      const urlParams = new URLSearchParams(window.location.search);
      const newFromUrl =
        urlParams.get("new_user") === "true" ||
        urlParams.get("signup") === "true" ||
        urlParams.get("is_new") === "true";

      // 2. Check storage flag set during registration vs sign-in
      const storageFlag =
        sessionStorage.getItem("velvet_user_is_new") === "true" ||
        localStorage.getItem("velvet_user_is_new") === "true";

      // 3. Check Supabase user creation vs sign in timestamps
      let isBrandNewAccount = false;
      if (user?.created_at) {
        const createdAt = new Date(user.created_at).getTime();
        const lastSignIn = user.last_sign_in_at
          ? new Date(user.last_sign_in_at).getTime()
          : createdAt;
        // Account created recently AND first sign-in within 5 minutes of creation
        const createdRecently = Date.now() - createdAt < 30 * 60 * 1000;
        const firstSignInClose = Math.abs(lastSignIn - createdAt) < 5 * 60 * 1000;
        if (createdRecently && firstSignInClose) {
          isBrandNewAccount = true;
        }
      }

      if (newFromUrl || storageFlag || isBrandNewAccount) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
      }
    } catch {}
  }, [user]);

  const userRole = profile?.role || "customer";
  const planDisplay =
    userPlan !== "none"
      ? `${userPlan.toUpperCase()} PASS`
      : isSubscribed
      ? "PRO PASS"
      : "COMMUNITY TIER";

  // Determine which templates the user is entitled to
  // If subscribed, they have access to all templates in the library.
  // Otherwise, only templates they have explicitly purchased.
  const entitledTemplates: Template[] = isSubscribed
    ? TEMPLATES
    : TEMPLATES.filter((t) => purchasedTemplates.includes(t.slug));

  const handleDownload = async (template: Template) => {
    setDownloadingSlug(template.slug);
    try {
      const res = await fetch(`/api/v1/templates/${template.slug}/download-ticket`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || "Failed to generate download ticket.");
        return;
      }

      setDownloadTicket({
        slug: template.slug,
        token: data.token,
        downloadUrl: data.downloadUrl,
        expiresAt: data.expiresAt,
        filename: data.template?.filename || `${template.slug}-${template.version}.zip`,
      });
    } catch {
      alert("Network error requesting download ticket.");
    } finally {
      setDownloadingSlug(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Background radial glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-purple-800/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <SparkleBadge glow>Customer Workspace</SparkleBadge>
              <span className="text-xs font-mono text-zinc-400">
                {user ? user.email : "Signed in as guest"}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                  isSubscribed
                    ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                    : "bg-white/[0.05] text-zinc-400 border-white/10"
                }`}
              >
                {planDisplay}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              {isNewUser ? "Welcome, " : "Welcome back, "}
              {capitalizedName}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Review your active subscription, access purchased template archives, and manage your account.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {user && (
              <button
                type="button"
                onClick={() => setShowSignOutModal(true)}
                className="btn-outline-pill px-4 py-2 text-xs font-medium text-rose-300 hover:text-rose-200 border-white/10 flex items-center gap-1.5"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Sign Out Confirmation Modal (Item 17) */}
        <ConfirmationModal
          isOpen={showSignOutModal}
          title="Sign Out of Velvet"
          message="Are you sure you want to sign out of your account? Your local downloads and commercial project licenses remain safe."
          confirmLabel="Sign Out"
          cancelLabel="Stay Signed In"
          isDestructive
          onConfirm={() => {
            setShowSignOutModal(false);
            signOut();
          }}
          onCancel={() => setShowSignOutModal(false)}
        />

        {/* ================= ACTIVE MEMBER SUBSCRIPTION ================= */}
        <div className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-elevated border border-purple-500/30 shadow-velvet-card relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-velvet-radial-tr pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-purple-400 font-semibold">
                    Active member subscription
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      isSubscribed
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-white/[0.06] text-zinc-400 border-white/10"
                    }`}
                  >
                    {isSubscribed ? "Active" : "No active pass"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {planDisplay}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  {isSubscribed
                    ? "Your membership grants full commercial source-code downloads for all architectural and interior studio templates in the Velvet library, with 1 End-Product Client Licence per project."
                    : "You are currently on the Community tier. Upgrade to Velvet Pass to gain unlimited instant source-code downloads and commercial rights."}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <Link
                  href="/pricing"
                  className={
                    isSubscribed
                      ? "btn-outline-pill px-5 py-2.5 text-xs font-medium flex items-center gap-1.5"
                      : "btn-violet-pill px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5"
                  }
                >
                  <span>{isSubscribed ? "Manage Plan" : "View Velvet Plans"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Key Subscription Invariants */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400">
              <div className="p-3.5 rounded-2xl bg-surface-base border border-white/[0.06]">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Account Email</span>
                <span className="text-white font-mono font-medium truncate block">
                  {user ? user.email : "demo@studio.design"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-base border border-white/[0.06]">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Commercial Rights</span>
                <span className="text-white font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isSubscribed ? "Perpetual Client Rights" : "Single License on Purchase"}</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-base border border-white/[0.06]">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Account Role</span>
                <span className="text-white capitalize font-medium">{userRole}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TEMPLATE ACCESS & LIBRARY ================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {isSubscribed
                  ? "Included Library Releases"
                  : entitledTemplates.length > 0
                  ? `Purchased Templates (${entitledTemplates.length})`
                  : "Your Template Library"}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {isSubscribed
                  ? "As an active Velvet subscriber, you have instant access to download complete Next.js 14 source code for all templates."
                  : entitledTemplates.length > 0
                  ? "Templates you have purchased with individual commercial end-product client licences."
                  : "Templates you purchase or access through your subscription will be available here for download."}
              </p>
            </div>

            {entitledTemplates.length > 0 && (
              <span className="text-xs text-purple-300 self-start sm:self-auto">
                <span className="font-mono">{entitledTemplates.length}</span> available releases
              </span>
            )}
          </div>

          {/* Download Ticket Confirmation Modal / Banner */}
          {downloadTicket && (
            <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/50 shadow-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">
                    Signed Download Ticket Issued
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setDownloadTicket(null)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-xs text-zinc-300">
                Your secure archive ticket for <strong className="text-white">{downloadTicket.filename}</strong> has been created.
                Signed URLs expire in 15 minutes.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={downloadTicket.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-violet-pill px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Archive (.zip)</span>
                </a>

                <CopyButton
                  text={downloadTicket.token}
                  label="Copy Ticket Token"
                  className="px-3 py-2"
                />
              </div>
            </div>
          )}

          {/* Case 1: User has access to templates (Subscribed or Purchased) */}
          {entitledTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entitledTemplates.map((template) => (
                <div
                  key={template.id}
                  className="rounded-2xl bg-surface-elevated border border-white/[0.08] hover:border-purple-500/40 transition-colors duration-200 overflow-hidden flex flex-col group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-base">
                    <Image
                      src={template.thumbnail}
                      alt={template.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/80 backdrop-blur-md text-white border border-white/10 font-semibold">
                        {template.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-600/80 backdrop-blur-md text-white font-semibold">
                        {template.version}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white font-display group-hover:text-purple-300 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {template.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                      <Link
                        href={`/templates/${template.slug}`}
                        className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3 text-purple-400" />
                      </Link>

                      <button
                        type="button"
                        disabled={downloadingSlug === template.slug}
                        onClick={() => handleDownload(template)}
                        className="btn-violet-pill px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingSlug === template.slug ? "Generating..." : "Download"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Case 2: Realistic Empty State (No Active Subscription & No Purchases) */
            <div className="p-10 sm:p-14 rounded-3xl bg-surface-elevated/40 border border-white/[0.08] text-center space-y-4 max-w-2xl mx-auto my-8">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 text-zinc-400 flex items-center justify-center mx-auto">
                <Folder className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                No Purchased Templates Yet
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                Your library is currently empty. When you purchase an architectural template or subscribe to Velvet Pass, your source code releases and download tickets will appear here automatically.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/templates"
                  className="btn-violet-pill px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Explore Templates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="btn-outline-pill px-5 py-2.5 text-xs font-medium"
                >
                  <span>View Velvet Pass Plans</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}