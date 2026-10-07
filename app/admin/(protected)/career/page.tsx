"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/components/ui/Button";
import { adminFetch } from "../../_lib/adminApi";
import type { PaginationMeta } from "@/types";

type Vacancy = {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  status: "open" | "closed";
  createdAt: string;
};

const control =
  "rounded-lg border border-line bg-bone-50 px-4 py-2 text-sm text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

function CareerList() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const page = Math.max(1, Number(search.get("page")) || 1);
  const query = search.get("q") ?? "";
  const status = search.get("status") ?? "";
  const department = search.get("department") ?? "";

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function update(values: Record<string, string | null>) {
    const p = new URLSearchParams(search.toString());

    Object.entries(values).forEach(([k, v]) =>
      v ? p.set(k, v) : p.delete(k)
    );

    router.replace(`${pathname}?${p}`);
  }

  useEffect(() => {
    let active = true;

    setLoading(true);

    const p = new URLSearchParams({
      page: String(page),
      limit: "10",
    });

    if (query) p.set("q", query);
    if (status) p.set("status", status);
    if (department) p.set("department", department);

    adminFetch<{
      vacancies: Vacancy[];
      meta: PaginationMeta;
      departments: string[];
    }>(`/admin/careers?${p}`)
      .then((d) => {
        if (active) {
          setVacancies(d.vacancies);
          setMeta(d.meta);
          setDepartments(d.departments);
          setError("");
        }
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [page, query, status, department]);

  async function remove(id: string) {
    if (!window.confirm("Delete this vacancy?")) return;

    try {
      await adminFetch(`/admin/careers/${id}`, {
        method: "DELETE",
      });

      setVacancies((old) =>
        old.filter((v) => v._id !== id)
      );

      setMeta((old) =>
        old
          ? {
              ...old,
              total: Math.max(0, old.total - 1),
            }
          : old
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Delete failed"
      );
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-ink">
          Career
        </h1>

        <div className="flex gap-3">
          <Button
            href="/admin/career/applications"
            variant="dark"
            size="sm"
          >
            Applications
          </Button>

          <Button
            href="/admin/career/new"
            variant="lime"
            size="sm"
          >
            + New vacancy
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search vacancies…"
          defaultValue={query}
          onChange={(e) =>
            update({
              q: e.target.value || null,
              page: null,
            })
          }
          className={`w-full max-w-sm ${control}`}
        />

        <select
          value={department}
          onChange={(e) =>
            update({
              department: e.target.value || null,
              page: null,
            })
          }
          className={control}
          aria-label="Filter by department"
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) =>
            update({
              status: e.target.value || null,
              page: null,
            })
          }
          className={control}
          aria-label="Filter by status"
        >
          <option value="">All status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-card border border-line bg-bone-50">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-muted"
                >
                  Loading vacancies…
                </td>
              </tr>
            ) : vacancies.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-muted"
                >
                  No vacancies found.
                </td>
              </tr>
            ) : (
              vacancies.map((v) => (
                <tr key={v._id}>
                  <td className="px-4 py-4 font-medium text-ink">
                    {v.title}
                    <span className="mt-1 block text-xs text-muted">
                      {v.employmentType}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-muted-dark">
                    {v.department}
                  </td>

                  <td className="px-4 py-4 text-muted-dark">
                    {v.location}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        v.status === "open"
                          ? "bg-green-100 text-green-800"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Link
                      className="font-medium text-ink hover:underline"
                      href={`/admin/career/${v._id}/edit`}
                    >
                      Edit
                    </Link>

                    <button
                      className="ml-4 text-red-700 hover:underline"
                      onClick={() => remove(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.pages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm text-muted">
          <span>{meta.total} vacancies</span>

          <div className="flex gap-2">
            <button
              disabled={!meta.hasPrev}
              onClick={() =>
                update({ page: String(page - 1) })
              }
              className="rounded-lg border border-line px-3 py-2 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-2 py-2">
              {page} / {meta.pages}
            </span>

            <button
              disabled={!meta.hasNext}
              onClick={() =>
                update({ page: String(page + 1) })
              }
              className="rounded-lg border border-line px-3 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerPage() {
  return (
    <Suspense fallback={null}>
      <CareerList />
    </Suspense>
  );
}