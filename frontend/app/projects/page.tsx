import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/sections/CtaBand";
import { getProjects } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected geotechnical and structural engineering projects across higher education, infrastructure, healthcare and civic sectors.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

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
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project._id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
