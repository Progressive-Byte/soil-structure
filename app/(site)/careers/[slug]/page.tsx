import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { getVacancies, getVacancyBySlug } from "@/lib/data/vacancies";
import JobApplicationFormModal from "@/components/sections/JobApplicationFormModal";

type Params = { params: { slug: string } };

/** Line icons keyed by vacancy slug. */
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

export async function generateStaticParams() {
  const vacancies = await getVacancies();

  return vacancies.map((vacancy) => ({
    slug: vacancy.slug,
  }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const vacancy = await getVacancyBySlug(params.slug);

  if (!vacancy) {
    return buildMetadata({
      title: "Vacancy not found",
      path: `/career/${params.slug}`,
    });
  }

  return buildMetadata({
    title: vacancy.title,
    description: vacancy.summary,
    path: `/careers/${vacancy.slug}`,
  });
}

export default async function VacancyDetailPage({
  params,
}: Params) {
  const vacancy = await getVacancyBySlug(params.slug);

  if (!vacancy) notFound();

  return (
    <>
      {/* Header */}
      <section className="bg-bone pt-10 md:pt-14">
        <Container>
          <p className="flex flex-wrap items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link href="/careers" className="hover:text-ink">
              Career
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-ink">{vacancy.title}</span>
          </p>

          <span className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white text-lime-700 shadow-sm">
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
              {icons[vacancy.slug] ?? (
                <circle cx="12" cy="12" r="8" />
              )}
            </svg>
          </span>

          {/* <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-line"
            />

            <span className="text-sm font-medium text-muted">
              {vacancy.department}
            </span>
          </div> */}
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-line"
                />

                <span className="text-sm font-medium text-muted">
                  {vacancy.department}
                </span>
              </div>

              <h1 className="mt-4 font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-xs">
                {vacancy.title}
              </h1>

              <p className="mt-4 max-w-sm md:max-w-2xl text-md leading-relaxed text-muted md:text-lg">
                {vacancy.summary}
              </p>
            </div>

            <div className="shrink-0 md:pb-1">
              <JobApplicationFormModal vacancy={vacancy} />
            </div>
          </div>

          

          {/* Vacancy information */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-5">
              <p className="text-eyebrow font-semibold uppercase text-muted">
                Department
              </p>

              <p className="mt-2 font-medium text-ink">
                {vacancy.department}
              </p>
            </div>

            <div className="bg-white p-5">
              <p className="text-eyebrow font-semibold uppercase text-muted">
                Location
              </p>

              <p className="mt-2 font-medium text-ink">
                {vacancy.location}
              </p>
            </div>

            <div className="bg-white p-5">
              <p className="text-eyebrow font-semibold uppercase text-muted">
                Employment
              </p>

              <p className="mt-2 font-medium text-ink">
                {vacancy.employmentType}
              </p>
            </div>

            <div className="bg-white p-5">
              <p className="text-eyebrow font-semibold uppercase text-muted">
                Experience
              </p>

              <p className="mt-2 font-medium text-ink">
                {vacancy.experience}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Vacancy details */}
      <section className="bg-bone py-14 md:py-20">
        <Container>
          <div className="divide-y divide-line">

            {/* Job Description */}
            <div className="grid gap-8 py-12 first:pt-0 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  Job Description
                </h2>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
                {vacancy.description
                  .split("\n\n")
                  .map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="grid gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  Responsibilities
                </h2>
              </div>

              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {vacancy.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-line py-4 text-ink"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-700"
                      aria-hidden="true"
                    />

                    <span className="leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="grid gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  Requirements
                </h2>
              </div>

              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {vacancy.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-line py-4 text-ink"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-700"
                      aria-hidden="true"
                    />

                    <span className="leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred Qualifications */}
            {vacancy.preferredQualifications &&
              vacancy.preferredQualifications.length > 0 && (
                <div className="grid gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                  <div>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                      Preferred Qualifications
                    </h2>
                  </div>

                  <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                    {vacancy.preferredQualifications.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-line py-4 text-ink"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-700"
                          aria-hidden="true"
                        />

                        <span className="leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Benefits */}
            {vacancy.benefits &&
              vacancy.benefits.length > 0 && (
                <div className="grid gap-8 py-12 last:pb-0 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                  <div>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                      Benefits
                    </h2>
                  </div>

                  <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                    {vacancy.benefits.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-line py-4 text-ink"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-700"
                          aria-hidden="true"
                        />

                        <span className="leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </Container>
      </section>

      {/* Application */}
      <section className="bg-bone pt-4 pb-16 md:pb-24">
        <Container>
          <div className="rounded-card bg-lime px-6 py-12 md:px-12 md:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-heading text-display-sm font-bold tracking-tight leading- text-ink">
                  Become a part of our team and help us shape the future of engineering.
                </h2>
              </div>

              {/* Bottom Apply Button */}
              <JobApplicationFormModal vacancy={vacancy} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}