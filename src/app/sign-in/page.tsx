"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { OAuthSetupModal } from "@/components/OAuthSetupModal";
import { createClient } from "@/lib/supabase/client";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

function safeNext(value: string | null, fallback = "/templates") {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/\\") ||
    value.includes("://")
  ) {
    return fallback;
  }
  return value;
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"), "/templates");
  const urlError = searchParams.get("error");

  const [authMode, setAuthMode] = useState<"password" | "magic_link">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [oauthSetupProvider, setOauthSetupProvider] = useState<"github" | "google" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    urlError === "auth_callback_failed" ? "Authentication link expired or invalid. Please try again." : null
  );
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const supabase = createClient();

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data.session) {
        try {
          localStorage.setItem("velvet_user_is_new", "false");
          sessionStorage.setItem("velvet_user_is_new", "false");
        } catch {}
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
        router.push(next);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setMagicLinkSent(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to dispatch magic link.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setErrorMessage("Please enter the 6-digit verification code sent to your email.");
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otpCode.trim(),
        type: "email",
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data.session) {
        try {
          localStorage.setItem("velvet_user_is_new", "false");
          sessionStorage.setItem("velvet_user_is_new", "false");
        } catch {}
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        router.push(next);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to verify code.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "github" | "google") => {
    setOauthLoading(provider);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) {
        if (
          error.message?.toLowerCase().includes("not enabled") ||
          error.message?.toLowerCase().includes("validation_failed") ||
          error.message?.toLowerCase().includes("unsupported provider")
        ) {
          setOauthSetupProvider(provider);
        } else {
          setErrorMessage(error.message);
        }
        setOauthLoading(null);
      } else if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      if (
        err.message?.toLowerCase().includes("not enabled") ||
        err.message?.toLowerCase().includes("unsupported provider")
      ) {
        setOauthSetupProvider(provider);
      } else {
        setErrorMessage(err.message || `Failed to initiate ${provider} authentication.`);
      }
      setOauthLoading(null);
    }
  };

  const [honeypot, setHoneypot] = useState("");

  const handleForgotPassword = async () => {
    if (honeypot) return; // Silent discard for bot scrapers
    if (!email.trim()) {
      setErrorMessage("Please enter your email address above to receive a password reset link.");
      return;
    }
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/dashboard`,
      });
      // Anti-enumeration protection (Check 2.3): Always display generic confirmation message
      setResetEmailSent(true);
      setErrorMessage(null);
    } catch {
      // Always display generic confirmation message to eliminate account enumeration
      setResetEmailSent(true);
      setErrorMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-surface-elevated border border-purple-500/40 shadow-velvet-xl-soft relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-velvet-radial-tr pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8">
        <BrandMark height={34} />
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display mt-5 tracking-tight">
          Welcome to Velvet
        </h1>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
          Sign in to access your downloaded templates, licence keys, and client deployments.
        </p>
      </div>

      {magicLinkSent ? (
        /* Magic Link Confirmation & 6-Digit OTP Form */
        <div className="p-6 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Check your Inbox
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
            We sent a secure sign-in link and 6-digit verification code to <strong className="text-white">{email}</strong>.
          </p>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5 text-center">
                Enter 6-Digit Verification Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="• • • • • •"
                className="w-full py-3 px-4 rounded-xl bg-surface-base border border-purple-500/40 text-white text-center font-mono text-2xl tracking-[0.4em] font-bold focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 placeholder-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="w-full btn-violet-pill py-3 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? "Verifying Code…" : "Verify Code & Sign In"}</span>
            </button>
          </form>

          <p className="text-[11px] text-zinc-400">
            Or click the direct sign-in button in the email to log in automatically.
          </p>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
            <button
              type="button"
              disabled={loading}
              onClick={handleMagicLinkSignIn}
              className="text-purple-400 hover:underline"
            >
              Resend code
            </button>
            <button
              type="button"
              onClick={() => {
                setMagicLinkSent(false);
                setErrorMessage(null);
                setOtpCode("");
              }}
              className="text-zinc-400 hover:text-white"
            >
              &larr; Use password
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2.5 text-left animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {resetEmailSent && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2.5 text-left animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Password reset instructions sent to {email}.</span>
            </div>
          )}

          {/* Social OAuth Providers */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              disabled={Boolean(oauthLoading)}
              onClick={() => handleOAuth("google")}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-semibold text-white transition-colors duration-200 shadow-sm hover:shadow-white-hover disabled:opacity-50"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{oauthLoading === "google" ? "Connecting to Google…" : "Continue with Google"}</span>
            </button>

            <button
              type="button"
              disabled={Boolean(oauthLoading)}
              onClick={() => handleOAuth("github")}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-semibold text-white transition-colors duration-200 shadow-sm hover:shadow-white-hover disabled:opacity-50"
            >
              <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>{oauthLoading === "github" ? "Connecting to GitHub…" : "Continue with GitHub"}</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-white/[0.08]" />
            <span className="absolute px-3 bg-surface-elevated text-xs text-zinc-500">
              Or sign in with email
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-base border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => setAuthMode("password")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                authMode === "password"
                  ? "bg-purple-600 text-white shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("magic_link")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                authMode === "magic_link"
                  ? "bg-purple-600 text-white shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Magic Link OTP
            </button>
          </div>

          {/* Form based on selected mode */}
          {authMode === "password" ? (
            <form onSubmit={handlePasswordSignIn} className="space-y-4">
              <input
                type="text"
                name="b_field_honey"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5 text-left">
                  Account Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.design"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-zinc-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-zinc-300">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-purple-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-base border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-zinc-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-violet-pill py-3 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{loading ? "Authenticating..." : "Sign In →"}</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5 text-left">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.design"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-zinc-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-violet-pill py-3 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>{loading ? "Sending Link…" : "Send Magic Link OTP"}</span>
                </button>
              </div>
            </form>
          )}

          {/* Switch to Sign Up */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] text-center text-xs text-zinc-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href={`/sign-up${next !== "/dashboard" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="text-purple-300 font-semibold hover:underline"
            >
              Create Studio Account
            </Link>
          </div>
        </>
      )}

      {/* OAuth Setup Guidance Modal */}
      <OAuthSetupModal
        provider={oauthSetupProvider}
        onClose={() => setOauthSetupProvider(null)}
      />
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="text-zinc-400 text-sm">
            Loading Velvet authentication…
          </div>
        }
      >
        <SignInContent />
      </Suspense>
    </div>
  );
}
