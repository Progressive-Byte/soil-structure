import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/sections/CtaBand";
import { getPaginatedProjects } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected geotechnical and structural engineering projects across higher education, infrastructure, healthcare and civic sectors.",
  path: "/projects",
});

const PAGE_SIZE = 9;

type ProjectsPageProps = {
  searchParams: { page?: string };
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { projects, meta } = await getPaginatedProjects(page, PAGE_SIZE);

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Different ground. Different answers."
        intro="A cross-section of the sectors we serve and the ground conditions we design for — from reclaimed waterfront to river-terrace campuses."
      />
      <Section id="sectors">
        {projects.length === 0 ? (
          <EmptyState
            title="No projects to show yet"
            description="Project case studies will appear here once they're published."
          />
        ) : (
          <>
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project._id}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>

            {meta.pages > 1 && (
              <nav
                aria-label="Projects pagination"
                className="mt-16 flex items-center justify-between border-t border-line pt-8 text-sm"
              >
                <p className="text-muted">
                  Page {meta.page} of {meta.pages}
                </p>
                <div className="flex gap-3">
                  {meta.hasPrev ? (
                    <Link
                      href={meta.page - 1 === 1 ? "/projects" : `/projects?page=${meta.page - 1}`}
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
                      href={`/projects?page=${meta.page + 1}`}
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
          </>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
