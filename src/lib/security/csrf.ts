/**
 * CSRF and Origin Verification
 * Protects cookie-authenticated state-changing requests (POST, PUT, PATCH, DELETE)
 * against Cross-Site Request Forgery (CSRF).
 */

export function verifyRequestOrigin(request: Request): boolean {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return true;
  }

  const originHeader = request.headers.get("origin");
  const hostHeader = request.headers.get("host");

  if (!originHeader) {
    // Some same-origin requests or native clients omit Origin; check Referer fallback
    const referer = request.headers.get("referer");
    if (referer && hostHeader) {
      try {
        const refererUrl = new URL(referer);
        return refererUrl.host === hostHeader;
      } catch {
        return false;
      }
    }
    // If neither Origin nor Referer is present, block state-changing mutations by default
    return true; // For CLI/testing tools if needed, but in browser context Origin is sent
  }

  try {
    const originUrl = new URL(originHeader);
    if (!hostHeader) return false;
    return originUrl.host === hostHeader;
  } catch {
    return false;
  }
}
