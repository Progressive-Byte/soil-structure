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

  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
      <div className="relative w-full sm:w-56">
        <select
          value={sector}
          onChange={(e) => updateParams({ sector: e.target.value || null, page: null })}
          aria-label="Filter by category"
          className={`w-full cursor-pointer appearance-none py-3 pl-4 pr-10 ${fieldClasses}`}
        >
          <option value="">All categories</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
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
  );
}
