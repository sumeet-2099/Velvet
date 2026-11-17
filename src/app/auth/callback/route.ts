import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

function getSafeRedirectUrl(nextParam: string | null, fallback = "/templates"): string {
  if (!nextParam) return fallback;
  try {
    const decoded = decodeURIComponent(nextParam);
    if (
      decoded.startsWith("/") &&
      !decoded.startsWith("//") &&
      !decoded.startsWith("/\\") &&
      !decoded.includes("://") &&
      !decoded.includes("\r") &&
      !decoded.includes("\n")
    ) {
      const parsed = new URL(decoded, "http://localhost");
      if (parsed.origin === "http://localhost" && parsed.pathname.startsWith("/")) {
        return parsed.pathname + parsed.search;
      }
    }
  } catch {
    return fallback;
  }
  return fallback;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = getSafeRedirectUrl(searchParams.get("next"), "/templates");

  const supabase = createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // Fallback if already authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return NextResponse.redirect(new URL(next, origin));
  }

  // If code exchange failed or no code provided, redirect to sign-in with error
  return NextResponse.redirect(new URL("/sign-in?error=auth_callback_failed", origin));
}
