import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { getServices, getServiceBySlug } from "@/lib/data/services";
import { getProjects } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return buildMetadata({ title: "Service not found", path: `/services/${params.slug}` });
  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: service.image.src,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  // Related projects: those that used this service.
  const allProjects = await getProjects();
  const related = allProjects.filter((p) => p.services.includes(service.slug)).slice(0, 3);

  return (
    <>
      <div className="bg-ink text-bone">
        <Container className="py-12 md:py-16">
          <Link href="/services" className="text-sm text-muted-dark hover:text-bone">
            ← Back to services
          </Link>
          <span className="mt-6 block font-heading text-lg font-bold text-lime">
            {service.number}
          </span>
          <h1 className="mt-2 max-w-3xl font-heading text-display-sm font-bold tracking-tight md:text-display-lg">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-dark md:text-lg">{service.summary}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-image">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
              {service.description}
            </p>
          </div>
          <aside className="lg:border-l lg:border-line lg:pl-10">
            <h2 className="text-eyebrow font-semibold uppercase text-muted">What&rsquo;s included</h2>
            <ul className="mt-5 space-y-3">
              {service.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-ink">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-600"
                    aria-hidden="true"
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="ink">
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            Related projects
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project) => (
              <ProjectCard key={project._id} project={project} tone="ink" />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
