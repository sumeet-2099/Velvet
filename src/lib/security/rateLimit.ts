/**
 * Velvet In-Memory Sliding Window Rate Limiter
 * Provides per-IP and per-account request throttling to protect against
 * credential stuffing, brute force, API abuse, and credit/download farming.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale records every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      record.timestamps = record.timestamps.filter((t) => now - t < 15 * 60 * 1000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
  identifier: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

export function checkRateLimit(options: RateLimitOptions): RateLimitResult {
  const { limit, windowMs, identifier } = options;
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetMs = oldestTimestamp + windowMs - now;
    return {
      success: false,
      limit,
      remaining: 0,
      resetMs: Math.max(resetMs, 0),
    };
  }

  record.timestamps.push(now);

  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    resetMs: windowMs,
  };
}

/**
 * Extract verified client IP from request headers.
 * Safely handles cloud reverse proxies (Cloudflare, Vercel, Supabase, AWS).
 */
export function getClientIp(request: Request): string {
  // 1. Cloudflare connecting IP
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // 2. Standard X-Real-IP
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // 3. X-Forwarded-For: Client IP is typically the first or proxy-set value.
  // We take the leftmost non-empty value trimmed.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim());
    if (parts.length > 0 && parts[0]) {
      return parts[0];
    }
  }

  return "127.0.0.1";
}
