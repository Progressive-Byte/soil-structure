import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { StatItem } from "@/components/ui/StatItem";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { getCompanyStats } from "@/lib/data/company";
import { getTeam } from "@/lib/data/team";
import { getTestimonials } from "@/lib/data/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "One team of engineers and geologists bringing ground investigation and structural design under a single roof.",
  path: "/about",
});

// This page layout is not in the Figma; it reuses the landing page's system.
export default async function AboutPage() {
  const [stats, team, testimonials] = await Promise.all([
    getCompanyStats(),
    getTeam(),
    getTestimonials(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Every structure begins below the surface."
        intro="Placeholder copy. Soil & Structure brings geotechnical investigation and structural design under one roof, so ground conditions shape the frame from the first sketch rather than the last revision."
      />

      {/* Stats */}
      <div className="bg-ink text-bone">
        <div className="container-page grid grid-cols-2 gap-y-8 border-t border-line-dark py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Story */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionEyebrow>Our practice</SectionEyebrow>
            <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
              Engineered as one system
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Placeholder copy. Most projects treat the ground and the frame as
              separate problems, handed between separate consultants. We do not.
              Site investigation, foundation design and structural engineering sit
              in the same team, on the same drawings, from day one.
            </p>
            <p>
              Placeholder copy. The result is fewer assumptions, fewer late
              surprises and a foundation solution matched to the structure it
              carries. Replace this text with the client&rsquo;s own words.
            </p>
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="ink" id="leadership">
        <SectionEyebrow tone="bone">Leadership</SectionEyebrow>
        <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
          The people behind the practice
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member._id}>
              <div className="relative aspect-square overflow-hidden rounded-image bg-ink-700">
                {member.photo ? (
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center font-heading text-4xl font-bold text-lime/70"
                    aria-hidden="true"
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold">{member.name}</h3>
              <p className="text-sm text-muted-dark">{member.role}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Testimonials testimonials={testimonials} />
      <CtaBand />
    </>
  );
}
