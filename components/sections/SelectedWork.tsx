import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { Project } from "@/types";

type SelectedWorkProps = {
  /** Optional featured projects from the API; the first one is showcased. */
  projects?: Project[];
};

/** Static fallback shown until a featured project is published via the admin. */
const fallback = {
  title: "Ground Improvement at Matarbari Road Project",
  summary:
    "Ground improvement works carried out on the Matarbari road scheme, applying stabilised earth solutions and vertical drainage to prepare soft ground for embankment loading.",
  client: "Roads and Highways Department (RHD)",
  discipline: "Geotechnical — Ground Improvement",
  image: {
    src: "/images/projects/matarbari-road-project.jpg",
    alt: "Two engineers in hard hats reviewing plans inside a large industrial hall",
  },
  detailsHref: "/projects",
};

/**
 * "Project experience" — a dark rounded card with the featured project image on
 * the left and its details on the right.
 */
export function SelectedWork({ projects }: SelectedWorkProps) {
  const project = projects?.[1];
  const data = project
    ? {
        title: project.title,
        summary: project.summary,
        client: project.client,
        discipline: project.sector,
        image: project.coverImage,
        detailsHref: `/projects/${project.slug}`,
      }
    : fallback;

  return (
    <section className="bg-bone py-6 md:py-10">
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] bg-ink text-bone lg:grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[540px]">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <SectionEyebrow tone="bone">Project experience</SectionEyebrow>
            <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight md:text-3xl lg:text-display-sm">
              {data.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-dark">
              {data.summary}
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line-dark pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-eyebrow font-semibold uppercase text-muted-dark">Client</dt>
                <dd className="mt-2 font-medium text-bone">{data.client}</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase text-muted-dark">Discipline</dt>
                <dd className="mt-2 font-medium text-bone">{data.discipline}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/projects" variant="lime">
                All Projects
              </Button>
              {project && (
                <Button href={data.detailsHref} variant="outline-light">
                  See Details
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
