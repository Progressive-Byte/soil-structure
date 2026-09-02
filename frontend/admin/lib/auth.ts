// See frontend/login/lib/auth.ts for why this is a cookie, not localStorage:
// admin/ and login/ are separate Next.js apps on different ports, and cookies
// on "localhost" aren't port-scoped the way localStorage's origin is.
const TOKEN_KEY = "ss_admin_token";

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearToken() {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}
