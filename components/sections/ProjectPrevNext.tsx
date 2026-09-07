import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectNavTarget = Pick<Project, "slug" | "title"> | null;

type ProjectPrevNextProps = {
  previous: ProjectNavTarget;
  next: ProjectNavTarget;
};

/** Previous/next project links shown at the bottom of a project detail page. */
export function ProjectPrevNext({ previous, next }: ProjectPrevNextProps) {
  if (!previous && !next) return null;

  return (
    <div className="border-y border-line">
      <Container className="!px-0 sm:!px-0">
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <ProjectNavLink project={previous} direction="previous" />
          <ProjectNavLink project={next} direction="next" />
        </div>
      </Container>
    </div>
  );
}

function ProjectNavLink({
  project,
  direction,
}: {
  project: ProjectNavTarget;
  direction: "previous" | "next";
}) {
  if (!project) return <div className="hidden sm:block" aria-hidden="true" />;

  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex items-center gap-4 px-6 py-8 transition-colors hover:bg-bone-100 md:px-10",
        isNext && "sm:flex-row-reverse sm:text-right",
      )}
    >
      {!isNext && <NavArrow direction="left" />}
      <div className="min-w-0">
        <p className="text-eyebrow font-semibold uppercase text-muted">
          {isNext ? "Next project" : "Previous project"}
        </p>
        <p className="mt-2 truncate font-heading text-xl font-bold tracking-tight text-ink">
          {project.title}
        </p>
      </div>
      {isNext && <NavArrow direction="right" />}
    </Link>
  );
}

function NavArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={cn(
        "h-5 w-5 flex-none text-muted transition-transform duration-200 ease-smooth group-hover:text-ink",
        direction === "left" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
      />
    </svg>
  );
}
