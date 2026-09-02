/**
 * Small, dependency-free class-name joiner. Filters out falsey values so
 * conditional classes stay readable: cn("a", cond && "b").
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format an ISO date string as e.g. "12 Aug 2024". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
