import Link from "next/link";
import type { Vacancy } from "@/types";

type VacancyCardProps = {
  vacancy: Vacancy;
};

const icons: Record<string, React.ReactNode> = {
  "senior-structural-engineer": (
    <path d="M4 21h16M6 21V10m4 11V10m4 11V10m4 11V10M4 10h16L12 4 4 10Z" />
  ),

  "geotechnical-engineer": (
    <path d="M3 18a9 9 0 0 1 18 0M3 18h18" />
  ),

  "architectural-engineer": (
    <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M5 21h14M15 21V10h4v11M8 8h2M8 12h2M8 16h2" />
  ),

  "electrical-engineer": (
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  ),

  "mechanical-engineer": (
    <path d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V3M9 12v9M15 12v9M6 21h6M12 21h6" />
  ),

  "project-engineer": (
    <path d="M9 5H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM9 13l2 2 4-4" />
  ),
};

export function VacancyCard({ vacancy }: VacancyCardProps) {
  return (
    <Link
      href={`/careers/${vacancy?.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] bg-bone-200 p-8 shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card focus-visible:outline-none md:p-10"
    >

      {/* Number + Title */}
      <div className="mt-8 flex items-baseline gap-3">
        <h3 className="font-heading text-xl font-bold tracking-tight text-ink md:text-2xl">
          {vacancy.title}
        </h3>
      </div>

      {/* Summary */}
      <p className="mt-4 text-base leading-relaxed text-muted">
        {vacancy.summary}
      </p>

      {/* Vacancy information */}
      <div className="mt-6 space-y-2 text-sm text-muted">
        <p>
          <span className="font-semibold text-ink">Department:</span>{" "}
          {vacancy.department}
        </p>

        <p>
          <span className="font-semibold text-ink">Location:</span>{" "}
          {vacancy.location}
        </p>

        <p>
          <span className="font-semibold text-ink">Employment:</span>{" "}
          {vacancy.employmentType}
        </p>

        <p>
          <span className="font-semibold text-ink">Experience:</span>{" "}
          {vacancy.experience} Years
        </p>
      </div>

      {/* View Vacancy */}
      <span className="mt-auto pt-6 inline-flex items-center gap-2 text-small font-semibold text-lime-700">
        View Vacancy

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M13 6l6 6-6 6"
          />
        </svg>
      </span>
    </Link>
  );
}