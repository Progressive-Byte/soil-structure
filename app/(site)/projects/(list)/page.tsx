import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/sections/CtaBand";
import { getPaginatedProjects, getProjectSectors } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/seo";
import { ProjectsFilters } from "./_components/ProjectsFilters";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Project experience across our engineering disciplines — from ground improvement to structural design.",
  path: "/projects",
});

const PAGE_SIZE = 9;

type ProjectsPageProps = {
  searchParams: { page?: string; q?: string; sector?: string };
};

/** Static fallback used for the featured card until a project is published. */
const fallbackFeatured = {
  title: "Ground Improvement at Matarbari Road Project",
  summary:
    "Ground improvement works for the Matarbari road scheme, treating soft ground ahead of embankment construction. The scope drew on our geotechnical capability in stabilised earth solutions, vertical drainage and settlement control.",
  client: "Roads and Highways Department (RHD)",
  scope: "Ground improvement",
  image: {
    src: "/images/projects/matarbari-road-project.jpg",
    alt: "Two engineers in hard hats reviewing plans inside a large industrial hall",
  },
  detailsHref: "/projects",
};

/** Sectors the practice works in. */
const sectors = [
  {
    slug: "industrial-facilities",
    title: "Industrial facilities",
    description: "Cement, bitumen, food, dyeing, spinning, re-rolling and garments factories.",
  },
  {
    slug: "roads-and-bridges",
    title: "Roads and bridges",
    description: "Roads, culverts, bridges, embankments and pavement design.",
  },
  {
    slug: "marine-and-riverine",
    title: "Marine and riverine",
    description: "Jetties, trestle bridges, shore protection and river bank erosion control.",
  },
  {
    slug: "storage-and-handling",
    title: "Storage and handling",
    description: "RC and steel silos, warehouses and conveying structures.",
  },
  {
    slug: "water-infrastructure",
    title: "Water infrastructure",
    description: "Irrigation, sluice gates, hydraulic structures, water supply and distribution.",
  },
  {
    slug: "environmental-works",
    title: "Environmental works",
    description: "Waste water treatment, drainage systems and solid waste management.",
  },
];

const sectorIcons: Record<string, React.ReactNode> = {
  "industrial-facilities": (
    <path d="M4 21h16V10l-6 3V10l-6 3V6H4v15ZM8 21v-4M12 21v-4M16 21v-4" />
  ),
  "roads-and-bridges": <path d="M8 3 6 21M16 3l2 18M12 4v3M12 11v3M12 18v2" />,
  "marine-and-riverine": (
    <path d="M12 3v11M8 6h8M5 14a7 7 0 0 0 14 0M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  ),
  "storage-and-handling": <path d="M4 8 12 4l8 4v11H4V8ZM4 8h16M9 19v-6h6v6" />,
  "water-infrastructure": <path d="M12 3s6 5.5 6 10a6 6 0 1 1-12 0c0-4.5 6-10 6-10Z" />,
  "environmental-works": <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14ZM4 20c4-6 8-8 12-9" />,
};

/** Builds a /projects pagination link that keeps the current search/category filters. */
function buildPageHref(page: number, filters: { q?: string; sector?: string }) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.sector) params.set("sector", filters.sector);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/projects?${qs}` : "/projects";
}

function SectorIcon({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {sectorIcons[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const q = searchParams.q ?? "";
  const sector = searchParams.sector ?? "";
  const isFiltered = Boolean(q || sector);
  // Dynamic: projects come from the MongoDB-backed API (paginated, search/category-filterable).
  const [{ projects, meta }, categoryOptions] = await Promise.all([
    getPaginatedProjects(page, PAGE_SIZE, { q, sector }),
    getProjectSectors(),
  ]);

  const firstProject = projects[0];
  const gridProjects = projects.slice(1);

  const featured = firstProject
    ? {
        title: firstProject.title,
        summary: firstProject.summary,
        client: firstProject.client,
        scope: firstProject.sector,
        image: firstProject.coverImage,
        detailsHref: `/projects/${firstProject.slug}`,
      }
    : fallbackFeatured;

  return (
    <>
      {/* Heading */}
      <section className="bg-bone pt-10 md:pt-14">
        <Container>
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Projects</span>
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
            <h1 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              Project experience.
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
              Selected work across our engineering disciplines. Further case
              studies are being prepared.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured project (dynamic, with fallback) */}
      <section className="bg-bone py-8 md:py-10">
        <Container>
          <div className="overflow-hidden rounded-[1.75rem] bg-ink text-bone lg:grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <SectionEyebrow tone="bone">Featured project</SectionEyebrow>
              <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight md:text-3xl lg:text-display-sm">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-dark">
                {featured.summary}
              </p>
              <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line-dark pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-muted-dark">Client</dt>
                  <dd className="mt-2 font-medium text-bone">{featured.client}</dd>
                </div>
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-muted-dark">Scope</dt>
                  <dd className="mt-2 font-medium text-bone">{featured.scope}</dd>
                </div>
              </dl>
              {firstProject && (
                <div className="mt-8">
                  <Button href={featured.detailsHref} variant="outline-light">
                    See Details
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Dynamic projects grid — always shown (projects come from the API) */}
      <section id="all-projects" className="bg-bone py-8 md:py-12">
        <Container>
          <SectionEyebrow>All projects</SectionEyebrow>

          <Suspense fallback={null}>
            <ProjectsFilters sectors={categoryOptions} />
          </Suspense>

          {gridProjects.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                title={isFiltered ? "No projects match your search" : "More case studies coming soon"}
                description={
                  isFiltered
                    ? "Try a different title or category filter."
                    : "Published projects appear here automatically. Add them from the admin panel to populate this list."
                }
              />
            </div>
          ) : (
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {gridProjects.map((project, i) => (
                <li key={project._id}>
                  <Reveal delay={(i % 3) * 90}>
                    <ProjectCard project={project} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}

          {meta.pages > 1 && (
              <nav
                aria-label="Projects pagination"
                className="mt-16 flex items-center justify-between border-t border-line pt-8 text-small"
              >
                <p className="text-muted">
                  Page {meta.page} of {meta.pages}
                </p>
                <div className="flex gap-3">
                  {meta.hasPrev ? (
                    <Link
                      href={buildPageHref(meta.page - 1, { q, sector })}
                      className="rounded-pill border border-ink/25 px-4 py-2 font-medium text-ink transition-colors hover:border-ink"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="rounded-pill border border-ink/10 px-4 py-2 font-medium text-muted-light">
                      Previous
                    </span>
                  )}
                  {meta.hasNext ? (
                    <Link
                      href={buildPageHref(meta.page + 1, { q, sector })}
                      className="rounded-pill border border-ink/25 px-4 py-2 font-medium text-ink transition-colors hover:border-ink"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="rounded-pill border border-ink/10 px-4 py-2 font-medium text-muted-light">
                      Next
                    </span>
                  )}
                </div>
              </nav>
            )}
          </Container>
        </section>

      {/* Sectors */}
      <section className="bg-bone py-14 md:py-20">
        <Container>
          <SectionEyebrow>Sectors we work in</SectionEyebrow>
          <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
            Where our engineering is applied.
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, i) => (
              <Reveal
                as="li"
                key={sector.slug}
                delay={(i % 3) * 90}
                className="rounded-[1.5rem] bg-bone-200 p-8"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-lime-700 shadow-sm">
                  <SectorIcon slug={sector.slug} />
                </span>
                <h3 className="mt-6 font-heading text-lg font-bold tracking-tight text-ink">
                  {sector.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-muted">{sector.description}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
