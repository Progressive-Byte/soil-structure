"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const controlClasses =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

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
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <input
        type="search"
        placeholder="Search by title…"
        defaultValue={query}
        onChange={(e) => updateParams({ q: e.target.value || null, page: null })}
        className={`max-w-sm ${controlClasses}`}
      />
      <select
        value={sector}
        onChange={(e) => updateParams({ sector: e.target.value || null, page: null })}
        className={`w-auto ${controlClasses}`}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {sectors.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
