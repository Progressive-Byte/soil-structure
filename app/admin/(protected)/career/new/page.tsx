"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../_lib/adminApi";
import {
  VacancyForm,
  type VacancyValues,
} from "../_components/VacancyForm";

export default function NewVacancyPage() {
  const router = useRouter();

  async function save(values: VacancyValues) {
    await adminFetch("/admin/careers", {
      method: "POST",
      body: JSON.stringify(values),
    });

    router.push("/admin/career");
  }

  return (
    <div>
      <Link
        href="/admin/career"
        className="text-sm text-muted hover:underline"
      >
        ← Back to career
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
        New vacancy
      </h1>

      <div className="mt-8">
        <VacancyForm
          onSubmit={save}
          label="Create vacancy"
        />
      </div>
    </div>
  );
}
