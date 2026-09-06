import Link from "next/link";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
};

/** Simple line icons keyed by service slug, drawn in the lime badge. */
const icons: Record<string, React.ReactNode> = {
  "structural-design": (
    <path d="M4 21h16M6 21V10m4 11V10m4 11V10m4 11V10M4 10h16L12 4 4 10Z" />
  ),
  "geotechnical-design": <path d="M3 18a9 9 0 0 1 18 0M3 18h18" />,
  "water-resources-engineering": (
    <path d="M12 3s6 5.5 6 10a6 6 0 1 1-12 0c0-4.5 6-10 6-10Z" />
  ),
  "environmental-engineering": (
    <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14ZM4 20c4-6 8-8 12-9" />
  ),
  "mechanical-electrical-piping": <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  "project-construction-management": (
    <path d="M9 5H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM9 13l2 2 4-4" />
  ),
  "architectural-design": (
    <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M5 21h14M15 21V10h4v11M8 8h2M8 12h2M8 16h2" />
  ),
  "quality-assurance-control": (
    <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3ZM9 12l2 2 4-4" />
  ),
};

/** Icon card: lime icon badge, numbered title, description and a Learn More link. */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] bg-bone-200 p-8 shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card focus-visible:outline-none md:p-10"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lime-700 shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          {icons[service.slug] ?? <circle cx="12" cy="12" r="8" />}
        </svg>
      </span>

      <div className="mt-8 flex items-baseline gap-3">
        <span className="font-heading text-xs font-bold text-lime-700">{service.number}</span>
        <h3 className="font-heading text-xl font-bold tracking-tight text-ink md:text-2xl">
          {service.title}
        </h3>
      </div>

      <p className="mt-4 text-base leading-relaxed text-muted">{service.summary}</p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime-700">
        Learn More
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
