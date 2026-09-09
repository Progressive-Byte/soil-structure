"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../_lib/adminApi";
import { ProjectForm, type ProjectFormValues } from "../_components/ProjectForm";
import type { PaginationMeta } from "@/types";

export default function NewProjectPage() {
  const router = useRouter();
  const [defaultOrder, setDefaultOrder] = useState<number | null>(null);

  // Pre-fill "Display order" with the next free number so new projects don't
  // all default to the same value and collide with existing ones.
  useEffect(() => {
    adminFetch<{ meta: PaginationMeta }>("/admin/projects?limit=1")
      .then((d) => setDefaultOrder(d.meta.total + 1))
      .catch(() => setDefaultOrder(1));
  }, []);

  async function handleSubmit(values: ProjectFormValues) {
    await adminFetch("/admin/projects", { method: "POST", body: JSON.stringify(values) });
    router.push("/admin/projects");
  }

  return (
    <div>
      <Link href="/admin/projects" className="text-sm text-muted hover:underline">
        ← Back to projects
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-ink">New project</h1>
      <div className="mt-8 max-w-3xl">
        {defaultOrder !== null && (
          <ProjectForm
            onSubmit={handleSubmit}
            submitLabel="Create project"
            defaultOrder={defaultOrder}
          />
        )}
      </div>
    </div>
  );
}
