"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../_lib/adminApi";
import { ProjectForm, type ProjectFormValues } from "../_components/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();

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
        <ProjectForm onSubmit={handleSubmit} submitLabel="Create project" />
      </div>
    </div>
  );
}
