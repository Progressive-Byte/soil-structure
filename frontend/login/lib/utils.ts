/**
 * Small, dependency-free class-name joiner. Filters out falsey values so
 * conditional classes stay readable: cn("a", cond && "b").
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
