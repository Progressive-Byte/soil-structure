"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../../_lib/adminApi";
import {
  VacancyForm,
  type VacancyValues,
} from "../../_components/VacancyForm";

export default function EditVacancyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [vacancy, setVacancy] = useState<Partial<VacancyValues> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<{ vacancy: VacancyValues }>(`/admin/careers/${id}`)
      .then((d) => setVacancy(d.vacancy))
      .catch((e) => setError(e.message));
  }, [id]);

  async function save(values: VacancyValues) {
    await adminFetch(`/admin/careers/${id}`, {
      method: "PUT",
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
        Edit vacancy
      </h1>

      <div className="mt-8">
        {error ? (
          <p role="alert">{error}</p>
        ) : (
          vacancy && (
            <VacancyForm
              initial={vacancy}
              onSubmit={save}
              label="Save changes"
            />
          )
        )}
      </div>
    </div>
  );
}