"use client";

import { Suspense, useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { adminFetch, getToken } from "../../../_lib/adminApi";
import type { PaginationMeta } from "@/types";
import { ApplicationCard, type Application } from "../_components/ApplicationCard";
import Link from "next/link";

const control =
  "rounded-lg border border-line bg-bone-50 px-4 py-2 text-sm text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

function ApplicationsList() {
  const router = useRouter(),
    pathname = usePathname(),
    search = useSearchParams();

  const page = Math.max(1, Number(search.get("page")) || 1),
    q = search.get("q") ?? "",
    status = search.get("status") ?? "",
    vacancy = search.get("vacancy") ?? "";

  const [rows, setRows] = useState<Application[]>([]),
    [meta, setMeta] = useState<PaginationMeta | null>(null),
    [vacancyTitle, setVacancyTitle] = useState(""),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [confirmingId, setConfirmingId] = useState<string | null>(null),
    [refreshKey, setRefreshKey] = useState(0);

  function update(vals: Record<string, string | null>) {
    const p = new URLSearchParams(search.toString());

    Object.entries(vals).forEach(([k, v]) =>
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

    if (q) p.set("q", q);
    if (status) p.set("status", status);
    if (vacancy) p.set("vacancy", vacancy);

    adminFetch<{
      applications: Application[];
      meta: PaginationMeta;
    }>(`/admin/careers/applications?${p}`)
      .then((d) => {
        if (active) {
          setRows(d.applications);
          setMeta(d.meta);
          setError("");
        }
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [page, q, status, vacancy, refreshKey]);

  useEffect(() => {
    if (!vacancy) {
      setVacancyTitle("");
      return;
    }

    let active = true;
    adminFetch<{ vacancy: { title: string } }>(`/admin/careers/${vacancy}`)
      .then(({ vacancy: selected }) => active && setVacancyTitle(selected.title))
      .catch((e) => active && setError(e.message));

    return () => {
      active = false;
    };
  }, [vacancy]);

  async function change(
    id: string,
    next: Application["status"]
  ) {
    try {
      const { application } = await adminFetch<{
        application: Application;
      }>(`/admin/careers/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: next }),
      });

      setRows((old) =>
        old.map((a) => (a._id === id ? application : a))
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not update application"
      );
    }
  }

  async function downloadCv(application: Application) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? ""}/admin/careers/applications/${application._id}/cv`,
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || "Unable to download this CV.");
      }
      const fileUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = application.cvName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to download this CV.");
    }
  }

  async function deleteApplication(application: Application) {
    try {
      await adminFetch(`/admin/careers/applications/${application._id}`, {
        method: "DELETE",
      });
      setConfirmingId(null);
      if (rows.length === 1 && page > 1) {
        update({ page: String(page - 1) });
      } else {
        setRefreshKey((key) => key + 1);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not delete application",
      );
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/career"
            className="text-sm text-muted hover:underline"
          >
            ← Career
          </Link>

          <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink">
            {vacancy ? (vacancyTitle || "Position applications") : "Applications"}
          </h1>
        </div>
      </div>

      {vacancy && (
        <p className="mt-2 text-sm text-muted">Applications for this vacancy</p>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        <input
          type="search"
          placeholder="Search applicants or roles…"
          defaultValue={q}
          onChange={(e) =>
            update({
              q: e.target.value || null,
              page: null,
            })
          }
          className={`w-full max-w-sm ${control}`}
        />

        <select
          value={status}
          onChange={(e) =>
            update({
              status: e.target.value || null,
              page: null,
            })
          }
          className={control}
          aria-label="Filter by application status"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
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

      <div className="mt-6 grid w-full min-w-0 gap-4">
        {loading ? (
          <div className="rounded-card border border-line bg-bone-50 p-10 text-center text-sm text-muted">
            Loading applications…
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-card border border-line bg-bone-50 p-10 text-center text-sm text-muted">
            No applications found.
          </div>
        ) : (
          rows.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              onStatusChange={change}
              onDownloadCv={downloadCv}
              onDelete={deleteApplication}
              confirmingDelete={confirmingId === application._id}
              onConfirmDelete={() => {
                setConfirmingId(application._id);
              }}
              onCancelDelete={() => setConfirmingId(null)}
            />
          ))
        )}
      </div>

      {meta && meta.pages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm text-muted">
          <span>{meta.total} applications</span>

          <div className="flex items-center gap-2">
            <button
              disabled={!meta.hasPrev}
              onClick={() =>
                update({ page: String(page - 1) })
              }
              className="rounded-lg border border-line px-3 py-2 disabled:opacity-40"
            >
              Previous
            </button>

            <span>
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

export default function ApplicationsPage() {
  return (
    <Suspense fallback={null}>
      <ApplicationsList />
    </Suspense>
  );
}
