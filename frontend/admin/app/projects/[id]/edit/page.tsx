"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "@/lib/adminApi";
import type { Project } from "@/lib/types";
import { ProjectForm, type ProjectFormValues } from "../../_components/ProjectForm";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [sectors, setSectors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch<{ project: Project }>(`/admin/projects/${params.id}`)
      .then((d) => setProject(d.project))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load project"));
    adminFetch<{ sectors: string[] }>("/admin/projects/sectors")
      .then((d) => setSectors(d.sectors))
      .catch(() => {});
  }, [params.id]);

  async function handleSubmit(values: ProjectFormValues) {
    await adminFetch(`/admin/projects/${params.id}`, { method: "PUT", body: JSON.stringify(values) });
    router.push("/projects");
  }

  return (
    <div>
      <Link href="/projects" className="text-sm text-muted hover:underline">
        ← Back to projects
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink">Edit project</h1>

      {error && (
        <p role="alert" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      {project ? (
        <div className="mt-8 max-w-3xl">
          <ProjectForm
            initial={project}
            sectors={sectors}
            onSubmit={handleSubmit}
            submitLabel="Save changes"
          />
        </div>
      ) : (
        !error && <p className="mt-8 text-muted">Loading…</p>
      )}
    </div>
  );
}
