import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  /** Dark cards (on the home "Selected work" band) vs light cards (index page). */
  tone?: "ink" | "bone";
};

/** Project thumbnail with sector tag and title; links to the detail page. */
export function ProjectCard({ project, tone = "bone" }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block transition-transform duration-300 ease-smooth hover:-translate-y-1 focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-image transition-shadow duration-500 group-hover:shadow-card-hover">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-[600ms] ease-smooth group-hover:scale-[1.06]"
        />
        {project.featured && (
          <Tag variant="solid" className="absolute left-4 top-4">
            Featured
          </Tag>
        )}
      </div>
      <div className="mt-4">
        <Tag variant={tone === "ink" ? "solid" : "muted"}>{project.sector}</Tag>
        <h3
          className={cn(
            "mt-3 font-heading text-lg font-bold leading-snug tracking-tight",
            tone === "ink" ? "text-bone group-hover:text-lime" : "text-ink group-hover:text-ink/80",
          )}
        >
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
