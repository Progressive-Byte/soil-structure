"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "@/lib/adminApi";
import { ProjectForm, type ProjectFormValues } from "../_components/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();
  const [sectors, setSectors] = useState<string[]>([]);

  useEffect(() => {
    adminFetch<{ sectors: string[] }>("/admin/projects/sectors")
      .then((d) => setSectors(d.sectors))
      .catch(() => {});
  }, []);

  async function handleSubmit(values: ProjectFormValues) {
    await adminFetch("/admin/projects", { method: "POST", body: JSON.stringify(values) });
    router.push("/projects");
  }

  return (
    <div>
      <Link href="/projects" className="text-sm text-muted hover:underline">
        ← Back to projects
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink">New project</h1>
      <div className="mt-8 max-w-3xl">
        <ProjectForm sectors={sectors} onSubmit={handleSubmit} submitLabel="Create project" />
      </div>
    </div>
  );
}
