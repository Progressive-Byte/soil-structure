import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { getServices, getServiceBySlug } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Params = { params: { slug: string } };

/** Line icons keyed by service slug. */
const icons: Record<string, React.ReactNode> = {
  "structural-design": <path d="M4 21h16M6 21V10m4 11V10m4 11V10m4 11V10M4 10h16L12 4 4 10Z" />,
  "geotechnical-design": <path d="M3 18a9 9 0 0 1 18 0M3 18h18" />,
  "water-resources-engineering": <path d="M12 3s6 5.5 6 10a6 6 0 1 1-12 0c0-4.5 6-10 6-10Z" />,
  "environmental-engineering": <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14ZM4 20c4-6 8-8 12-9" />,
  "mechanical-electrical-piping": <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  "project-construction-management": (
    <path d="M9 5H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM9 13l2 2 4-4" />
  ),
  "architectural-design": (
    <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M5 21h14M15 21V10h4v11M8 8h2M8 12h2M8 16h2" />
  ),
  "quality-assurance-control": <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3ZM9 12l2 2 4-4" />,
};

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

  const sections = service.sections ?? [
    {
      heading: service.deliverHeading ?? "What we deliver",
      description: service.description,
      capabilities: service.capabilities,
    },
  ];

  return (
    <>
      {/* Header + image */}
      <section className="bg-bone pt-10 md:pt-14">
        <Container>
          <p className="flex flex-wrap items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{service.title}</span>
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
              {icons[service.slug] ?? <circle cx="12" cy="12" r="8" />}
            </svg>
          </span>

          <h1 className="mt-6 font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
            {service.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted md:text-2xl">
            {service.summary}
          </p>

          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-image bg-ink">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* What we deliver */}
      <section className="bg-bone py-14 md:py-20">
        <Container>
          <div className="divide-y divide-line">
            {sections.map((section) => (
              <div
                key={section.heading}
                className="grid gap-8 py-12 first:pt-0 last:pb-0 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
              >
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                    {section.heading}
                  </h2>
                  {section.description && (
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted md:text-lg">
                      {section.description.split("\n\n").map((para, p) => (
                        <p key={p}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>

                <ul
                  className={cn(
                    "grid gap-x-10",
                    service.sectionColumns === 2 || section.capabilities.length > 12
                      ? "sm:grid-cols-2"
                      : "grid-cols-1",
                  )}
                >
                  {section.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 border-b border-line py-4 text-ink"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-700"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
