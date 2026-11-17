import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { TEMPLATES } from "@/data/templates";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";

export async function GET(request: Request) {
  // 1. Rate Limiting per IP (60 requests per minute)
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit({
    limit: 60,
    windowMs: 60 * 1000,
    identifier: `templates_get:${clientIp}`,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down.", code: "RATE_LIMITED" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(rateLimit.resetMs / 1000).toString(),
        },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const rawQuery = searchParams.get("q");
  const query = rawQuery ? rawQuery.trim().toLowerCase().slice(0, 50) : null;

  // Maximum pagination limit enforcement (Check 6.4)
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "30", 10), 1), 50);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

  try {
    const supabase = createClient();
    let dbQuery = supabase
      .from("templates")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("popularity_rank", { ascending: true })
      .range(offset, offset + limit - 1);

    if (category && category !== "All") {
      const sanitizedCategory = category.replace(/[^a-zA-Z0-9\s-]/g, "").trim().slice(0, 30);
      if (sanitizedCategory) {
        dbQuery = dbQuery.ilike("category", `%${sanitizedCategory.toLowerCase()}%`);
      }
    }

    if (query) {
      // Strip PostgREST filter operators, grouping symbols and punctuation to prevent filter injection
      const sanitizedQuery = query.replace(/[(),.:"'\\%_]/g, "").trim();
      if (sanitizedQuery) {
        dbQuery = dbQuery.or(
          `title.ilike.%${sanitizedQuery}%,tagline.ilike.%${sanitizedQuery}%,description.ilike.%${sanitizedQuery}%`
        );
      }
    }

    const { data: dbTemplates, error, count } = await dbQuery;

    if (!error && dbTemplates && dbTemplates.length > 0) {
      return NextResponse.json({
        status: "success",
        source: "velvet_cloud",
        count: count || dbTemplates.length,
        limit,
        offset,
        data: dbTemplates,
      });
    }
  } catch (err) {
    console.warn("Notice: Falling back to verified local template library:", err);
  }

  // Fallback to local verified templates
  let results = [...TEMPLATES];

  if (category && category !== "All") {
    results = results.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.tagline.toLowerCase().includes(query) ||
        t.techStack.some((tech) => tech.toLowerCase().includes(query))
    );
  }

  const paginated = results.slice(offset, offset + limit);

  return NextResponse.json({
    status: "success",
    source: "local_cache",
    count: results.length,
    limit,
    offset,
    data: paginated,
  });
}
