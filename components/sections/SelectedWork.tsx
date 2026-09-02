import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

type SelectedWorkProps = {
  projects: Project[];
};

/** Dark "Different ground. Different answers." — featured project grid. */
export function SelectedWork({ projects }: SelectedWorkProps) {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionEyebrow tone="bone">Selected work</SectionEyebrow>
          <h2 className="mt-5 max-w-2xl font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            Different ground. Different answers.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-dark md:text-lg">
            Placeholder copy about the range of sectors served and the value
            delivered on each project.
          </p>
        </div>
        <Button href="/projects" variant="outline-light" withArrow className="self-start md:self-end">
          More Projects
        </Button>
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project._id} delay={i * 90}>
            <ProjectCard project={project} tone="ink" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
