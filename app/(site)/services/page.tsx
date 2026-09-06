import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { StatItem } from "@/components/ui/StatItem";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { getServiceAreas } from "@/lib/data/services";
import { getCompanyStats } from "@/lib/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Twelve service areas across eight engineering disciplines — from project feasibility through detailed design to construction management.",
  path: "/services",
});

/** Simple line icons keyed by service-area slug. */
const icons: Record<string, React.ReactNode> = {
  "project-management": <path d="M4 7h16v13H4zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 12h16" />,
  "architectural-design": (
    <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M5 21h14M15 21V10h4v11M8 8h2M8 12h2M8 16h2" />
  ),
  "structural-design": (
    <path d="M4 21h16M6 21V10m4 11V10m4 11V10m4 11V10M4 10h16L12 4 4 10Z" />
  ),
  "geotechnical-design": <path d="M3 18a9 9 0 0 1 18 0M3 18h18" />,
  "water-resources-engineering": <path d="M12 3s6 5.5 6 10a6 6 0 1 1-12 0c0-4.5 6-10 6-10Z" />,
  "environmental-engineering": (
    <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14ZM4 20c4-6 8-8 12-9" />
  ),
  "mechanical-piping-engineering": (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z" />
  ),
  "electrical-engineering": <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  "project-engineering": <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />,
  "procurement-contract-services": (
    <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v5h5M9 13h6M9 17h4" />
  ),
  "quality-assurance-control": <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3ZM9 12l2 2 4-4" />,
  "construction-management": (
    <path d="M4 18h16M6 18v-2a6 6 0 0 1 12 0v2M10 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" />
  ),
};

function Icon({ slug }: { slug: string }) {
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
      {icons[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

export default async function ServicesPage() {
  const [areas, stats] = await Promise.all([getServiceAreas(), getCompanyStats()]);

  return (
    <>
      {/* Heading + stats panel */}
      <section className="bg-bone pt-10 md:pt-14">
        <Container>
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Services</span>
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
            <h1 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              Twelve service areas across eight disciplines.
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
              We offer complete engineering services from project feasibility
              through to detailed design and construction management.
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-image bg-ink shadow-card-dark">
            <Image
              src="/images/hero-steel-frame.jpg"
              alt="Steel structural frame of a building under construction"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/65" aria-hidden="true" />
            <div className="relative flex min-h-[340px] flex-col justify-end p-6 md:min-h-[460px] md:p-10">
              <dl className="flex flex-wrap gap-y-8 text-bone">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="w-1/2 border-line-dark sm:w-auto sm:border-l sm:px-12 sm:first:border-l-0 sm:first:pl-0"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <StatItem value={stat.value} label={stat.label} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Service-area rows */}
      <section className="bg-bone py-14 md:py-20">
        <Container>
          <ul>
            {areas.map((area, i) => (
              <Reveal
                as="li"
                key={area.slug}
                delay={(i % 2) * 90}
                className="grid gap-8 border-t border-line py-10 md:grid-cols-[1fr_1.9fr] md:gap-12"
              >
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-lime-700 shadow-sm">
                    <Icon slug={area.slug} />
                  </span>
                  <h2 className="mt-6 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                    {area.title}
                  </h2>
                </div>
                <ul className="grid gap-x-10 self-center sm:grid-cols-2">
                  {area.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 border-b border-line py-3.5 text-sm text-ink"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-lime-700"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
