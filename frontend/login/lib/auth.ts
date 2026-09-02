// admin/ and login/ run as separate Next.js apps on different ports (different
// origins), so localStorage can't be shared between them — but cookies on
// "localhost" aren't port-scoped, so a plain cookie is what actually works
// here. Not httpOnly (it's set by client JS after a fetch() login), same
// trade-off impact-reports itself makes for its admin JWT.
const TOKEN_KEY = "ss_admin_token";

export function setToken(token: string, maxAgeSeconds = 60 * 60 * 12) {
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
