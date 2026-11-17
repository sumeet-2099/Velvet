import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { verifyRequestOrigin } from "@/lib/security/csrf";

/**
 * POST /api/v1/user/delete-account
 * Allows authenticated users to exercise data erasure (GDPR / DPDP Check 12.3).
 * Deletes user profiles, project licenses, and associated session records.
 */
export async function POST(request: Request) {
  try {
    // 1. CSRF Verification
    if (!verifyRequestOrigin(request)) {
      return NextResponse.json(
        { error: "Cross-site request blocked.", code: "CSRF_DETECTED" },
        { status: 403 }
      );
    }

    // 2. Rate Limiting (5 requests per 10 minutes per IP)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit({
      limit: 5,
      windowMs: 10 * 60 * 1000,
      identifier: `delete_account:${clientIp}`,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many deletion requests. Please try again later.", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    // 3. User Authentication
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required to request account erasure.", code: "UNAUTHENTICATED" },
        { status: 401 }
      );
    }

    // 4. Cascade delete user data across tables
    // Delete project licenses registered by this user
    await supabase.from("project_licenses").delete().eq("user_id", user.id);

    // Delete download logs for this user
    await supabase.from("download_logs").delete().eq("user_id", user.id);

    // Delete user profile
    await supabase.from("profiles").delete().eq("id", user.id);

    // Sign out user session
    await supabase.auth.signOut();

    return NextResponse.json({
      status: "success",
      message: "Account and associated personal records have been successfully erased.",
    });
  } catch (err) {
    console.error("Error during user account deletion:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing account deletion.", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
