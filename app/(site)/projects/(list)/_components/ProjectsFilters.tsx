"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const fieldClasses =
  "rounded-lg border border-line bg-white text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

type ProjectsFiltersProps = {
  sectors: string[];
};

/** Search-by-title + category filter for the public projects list, mirroring the
 * admin projects list's query-string-driven pattern (?q=, ?sector=, resets ?page=). */
export function ProjectsFilters({ sectors }: ProjectsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const sector = searchParams.get("sector") ?? "";

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  const tabs = ["", ...sectors];

  return (
    <div className="mt-10 flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Filter by category"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {tabs.map((s) => {
          const active = sector === s;
          return (
            <button
              key={s || "all"}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => updateParams({ sector: s || null, page: null })}
              className={`shrink-0 whitespace-nowrap rounded-pill px-5 py-2.5 text-small font-semibold transition-colors ${
                active
                  ? "bg-ink text-bone"
                  : "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5"
              }`}
            >
              {s || "All projects"}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search by title…"
            defaultValue={query}
            onChange={(e) => updateParams({ q: e.target.value || null, page: null })}
            className={`w-full py-3 pl-11 pr-4 ${fieldClasses}`}
          />
        </div>
        {(query || sector) && (
          <button
            type="button"
            onClick={() => updateParams({ q: null, sector: null, page: null })}
            className="text-small font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
