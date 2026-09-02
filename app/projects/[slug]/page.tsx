import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Tag } from "@/components/ui/Tag";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { getProjects, getProjectBySlug } from "@/lib/data/projects";
import { getServices } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

// Pre-render every project page at build time.
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return buildMetadata({ title: "Project not found", path: `/projects/${params.slug}` });
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.coverImage.src,
  });
}

export default async function ProjectDetailPage({ params }: Params) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const allServices = await getServices();
  const services = allServices.filter((s) => project.services.includes(s.slug));

  const allProjects = await getProjects();
  const otherProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <div className="bg-ink text-bone">
        <Container className="py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/projects" className="text-sm text-muted-dark hover:text-bone">
              ← Back to projects
            </Link>
            <Tag variant="solid">{project.sector}</Tag>
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-display-sm font-bold tracking-tight md:text-display-lg">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-dark md:text-lg">{project.summary}</p>
        </Container>
      </div>

      <Container className="py-8 md:py-12">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-image shadow-card">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {project.description}
            </p>

            {services.length > 0 && (
              <div className="mt-10">
                <h3 className="text-eyebrow font-semibold uppercase text-muted">
                  Services delivered
                </h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {services.map((service) => (
                    <li key={service._id}>
                      <Link href={`/services/${service.slug}`}>
                        <Tag variant="outline">{service.title}</Tag>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-10">
            <h2 className="text-eyebrow font-semibold uppercase text-muted">Project facts</h2>
            <dl className="mt-5 divide-y divide-line">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Client</dt>
                <dd className="text-right font-medium text-ink">{project.client}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Location</dt>
                <dd className="text-right font-medium text-ink">{project.location}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Completed</dt>
                <dd className="text-right font-medium text-ink">{project.year}</dd>
              </div>
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{stat.label}</dt>
                  <dd className="text-right font-medium text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
