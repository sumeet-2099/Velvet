import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Validates and normalizes redirect destinations.
 * Strictly enforces relative paths within the same application domain (Check 2.7 & 5.5).
 */
function getSafeRedirectUrl(nextParam: string | null, fallback = "/dashboard"): string {
  if (!nextParam) return fallback;
  try {
    // Decode percent-encoded values to detect obfuscated characters
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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Block access to sensitive system, environment, or configuration files (Check 10.4)
  const isSensitivePath =
    pathname.includes(".env") ||
    pathname.includes(".git") ||
    pathname.includes(".sql") ||
    pathname.includes(".md") ||
    pathname.includes("..") ||
    pathname.startsWith("/.well-known/security.txt.bak");

  if (isSensitivePath) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { response, user, supabase } = await updateSession(request);

  // Protected customer & admin routes
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAdminPath = pathname.startsWith("/admin");
  const isAuthPath = pathname === "/sign-in" || pathname === "/sign-up";

  // Redirect unauthenticated visitors attempting to view private areas (Check 2.1)
  if ((isDashboardPath || isAdminPath) && !user) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Admin authorization gate: strictly check profile role in Supabase (Check 3.3)
  if (isAdminPath && user) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.role !== "admin") {
        console.warn(
          `[SECURITY AUDIT] Unauthorized admin route access attempt by user ${user.id} at ${new Date().toISOString()}`
        );
        const dashboardUrl = new URL("/dashboard", request.url);
        dashboardUrl.searchParams.set("error", "unauthorized_admin_access");
        return NextResponse.redirect(dashboardUrl);
      }
    } catch {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect already authenticated users away from sign-in/sign-up
  if (isAuthPath && user) {
    const next = getSafeRedirectUrl(
      request.nextUrl.searchParams.get("next"),
      "/dashboard"
    );
    return NextResponse.redirect(new URL(next, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.svg
     * - logo/, previews/, designs/ (public assets)
     * - api/ (API routes handle their own auth and rate limiting)
     */
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|logo/|previews/|designs/|api/).*)",
  ],
};
