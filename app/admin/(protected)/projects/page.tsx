"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable, useSortable } from "@dnd-kit/react/sortable";
import { Button } from "@/components/ui/Button";
import { AdminTableSkeleton } from "../../_components/AdminSkeletons";
import { PROJECT_CATEGORIES } from "@/lib/data/projects";
import { adminFetch } from "../../_lib/adminApi";
import type { PaginationMeta, Project } from "@/types";

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: "", label: "Manual order" },
  { value: "recent", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Title A–Z" },
  { value: "za", label: "Title Z–A" },
];

function SortableProjectRow({
  project,
  index,
  enabled,
  confirming,
  onConfirm,
  onCancel,
  onDelete,
}: {
  project: Project;
  index: number;
  enabled: boolean;
  confirming: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: project._id,
    index,
    group: "projects",
    disabled: !enabled,
  });

  return (
    <tr
      ref={ref}
      className={`bg-bone-50 ${isDragging ? "relative z-10 opacity-60 shadow-card" : ""}`}
    >
      <td className="px-4 py-3 font-medium text-ink">
        <div className="flex items-center gap-3">
          <button
            ref={handleRef}
            type="button"
            aria-label={`Drag ${project.title} to change its order`}
            title={enabled ? "Drag to reorder" : "Choose Manual order to reorder projects"}
            disabled={!enabled}
            className="cursor-grab touch-none text-muted-light hover:text-ink focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
              <circle cx="5" cy="3" r="1.25" /><circle cx="11" cy="3" r="1.25" />
              <circle cx="5" cy="8" r="1.25" /><circle cx="11" cy="8" r="1.25" />
              <circle cx="5" cy="13" r="1.25" /><circle cx="11" cy="13" r="1.25" />
            </svg>
          </button>
          <span>{project.title}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-muted">{project.sector}</td>
      <td className="px-4 py-3 text-muted">{project.featured ? "Yes" : "—"}</td>
      <td className="px-4 py-3 text-muted">{project.order}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-4">
          {confirming ? (
            <>
              <span className="text-muted">Delete?</span>
              <button onClick={onDelete} className="font-semibold text-red-700 hover:underline">
                Confirm
              </button>
              <button onClick={onCancel} className="text-muted hover:underline">
                Cancel
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/admin/projects/${project._id}/edit`}
                className="font-medium text-ink hover:underline"
              >
                Edit
              </Link>
              <button onClick={onConfirm} className="font-medium text-red-700 hover:underline">
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

const controlClasses =
  "rounded-lg border border-line bg-bone-50 px-4 py-2 text-sm text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

function ProjectsListInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const sector = searchParams.get("sector") ?? "";

  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [sectors, setSectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [savingOrder, setSavingOrder] = useState(false);

  // Presets first, then any custom categories already used on projects (deduped case-insensitively).
  const allSectors = [...PROJECT_CATEGORIES, ...sectors].filter(
    (s, i, list) => list.findIndex((x) => x.toLowerCase() === s.toLowerCase()) === i,
  );

  // Keeps search/sort/page all in the URL — same query-string-driven pattern
  // impact-reports uses for its admin list (shareable/bookmarkable, survives
  // a refresh).
  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    adminFetch<{ sectors: string[] }>("/admin/projects/sectors")
      .then((d) => setSectors(d.sectors))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
    if (query) params.set("q", query);
    if (sort) params.set("sort", sort);
    if (sector) params.set("sector", sector);

    adminFetch<{ projects: Project[]; meta: PaginationMeta }>(`/admin/projects?${params}`)
      .then((data) => {
        if (cancelled) return;
        setProjects(data.projects);
        setMeta(data.meta);
        setError(null);
      })
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [page, query, sort, sector, refreshKey]);

  async function handleDelete(id: string) {
    try {
      await adminFetch(`/admin/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setConfirmingId(null);
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { source } = event.operation;
    if (event.canceled || !source || !isSortable(source) || savingOrder) return;

    const from = projects.findIndex((project) => project._id === String(source.id));
    const to = source.sortable.index;
    if (from < 0 || to < 0 || to >= projects.length || from === to) return;

    const previous = projects;
    const reordered = [...projects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setProjects(reordered);
    setSavingOrder(true);
    setError(null);
    try {
      await adminFetch("/admin/projects/reorder", {
        method: "PUT",
        body: JSON.stringify({ orderedIds: reordered.map((project) => project._id) }),
      });
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setProjects(previous);
      setError(err instanceof Error ? err.message : "Unable to update project order");
    } finally {
      setSavingOrder(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-ink">Projects</h1>
        <Button href="/admin/projects/new" variant="lime" size="sm">
          + New project
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search by title…"
          defaultValue={query}
          onChange={(e) => updateParams({ q: e.target.value || null, page: null })}
          className={`w-full max-w-sm ${controlClasses}`}
        />
        <select
          value={sector}
          onChange={(e) => updateParams({ sector: e.target.value || null, page: null })}
          className={controlClasses}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {allSectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value || null, page: null })}
          className={controlClasses}
          aria-label="Sort projects"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {!sort && (
        <p className="mt-3 text-xs text-muted">
          Drag projects by the handle to change their display order.{savingOrder && " Saving order…"}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-card border border-line bg-bone-50">
        <DragDropProvider onDragEnd={handleDragEnd}>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading ? (
                <AdminTableSkeleton columns={5} rows={7} />
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project, index) => (
                  <SortableProjectRow
                    key={project._id}
                    project={project}
                    index={index}
                    enabled={!loading && !savingOrder && !sort}
                    confirming={confirmingId === project._id}
                    onConfirm={() => setConfirmingId(project._id)}
                    onCancel={() => setConfirmingId(null)}
                    onDelete={() => handleDelete(project._id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </DragDropProvider>
      </div>

      {meta && meta.pages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <p className="text-muted">
            Page {meta.page} of {meta.pages} — {meta.total} project{meta.total === 1 ? "" : "s"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => updateParams({ page: String(page - 1) })}
              disabled={!meta.hasPrev}
              className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => updateParams({ page: String(page + 1) })}
              disabled={!meta.hasNext}
              className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsListInner />
    </Suspense>
  );
}
