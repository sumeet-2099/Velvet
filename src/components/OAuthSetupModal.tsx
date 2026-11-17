"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, X, ShieldAlert, Sparkles } from "lucide-react";

interface OAuthSetupModalProps {
  provider: "github" | "google" | null;
  onClose: () => void;
}

export function OAuthSetupModal({ provider, onClose }: OAuthSetupModalProps) {
  const [copied, setCopied] = useState(false);

  if (!provider) return null;

  const callbackUrl = "https://nvzszrsdowacqmddymev.supabase.co/auth/v1/callback";
  const providerName = provider === "github" ? "GitHub" : "Google";

  const handleCopy = () => {
    navigator.clipboard.writeText(callbackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-surface-elevated border border-purple-500/40 shadow-velvet-xl-dim relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-velvet-radial-tr pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Enable {providerName} Sign-In
              </h3>
              <p className="text-[11px] text-zinc-400">
                Single sign-on configuration for Velvet Cloud
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs text-zinc-300">
          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {providerName} OAuth provider is currently awaiting API credentials in your Cloud Authentication dashboard.
            </p>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">
              Authorized Callback / Redirect URI
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={callbackUrl}
                className="w-full px-3 py-2 rounded-xl bg-surface-base border border-white/10 text-zinc-200 font-mono text-[11px] select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="btn-outline-pill px-3 py-2 text-[11px] font-medium flex items-center gap-1.5 flex-shrink-0 border-white/10 text-purple-300 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-semibold text-white">Setup Instructions:</h4>
            {provider === "github" ? (
              <ol className="list-decimal pl-4 space-y-1.5 text-zinc-400 text-[11px] leading-relaxed">
                <li>
                  Go to <strong className="text-zinc-200">GitHub Settings &rarr; Developer settings &rarr; OAuth Apps &rarr; New OAuth App</strong>.
                </li>
                <li>
                  Paste the <strong className="text-purple-300">Callback URI</strong> above into the &quot;Authorization callback URL&quot; field.
                </li>
                <li>
                  Copy the generated <strong className="text-zinc-200">Client ID</strong> and <strong className="text-zinc-200">Client Secret</strong> into your Cloud Authentication &rarr; Providers &rarr; GitHub settings.
                </li>
              </ol>
            ) : (
              <ol className="list-decimal pl-4 space-y-1.5 text-zinc-400 text-[11px] leading-relaxed">
                <li>
                  Go to <strong className="text-zinc-200">Google Cloud Console &rarr; APIs & Services &rarr; Credentials &rarr; Create Credentials &rarr; OAuth client ID</strong> (Web application).
                </li>
                <li>
                  Add the <strong className="text-purple-300">Callback URI</strong> above under &quot;Authorized redirect URIs&quot;.
                </li>
                <li>
                  Copy the <strong className="text-zinc-200">Client ID</strong> and <strong className="text-zinc-200">Client Secret</strong> into your Cloud Authentication &rarr; Providers &rarr; Google settings.
                </li>
              </ol>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            Email & password authentication remains fully functional.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-violet-pill px-5 py-2 text-xs font-semibold"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
