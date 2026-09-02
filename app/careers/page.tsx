import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Tag } from "@/components/ui/Tag";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/sections/CtaBand";
import { getJobs } from "@/lib/data/jobs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join a practice where geotechnical and structural engineers work on the same drawings. Explore current openings.",
  path: "/careers",
});

// This page layout is not in the Figma; it reuses the landing page's system.
export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build what lies below and what rises above."
        intro="We hire curious engineers and geologists who want to work across the ground-to-frame boundary rather than either side of it."
      />

      <Section id="culture">
        <SectionEyebrow>Our culture</SectionEyebrow>
        <div className="mt-5 grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "One integrated team",
              body: "Geotechnical and structural engineers sit together and share one model from day one.",
            },
            {
              title: "Ground-up learning",
              body: "Structured development and real site exposure from your first project.",
            },
            {
              title: "Work that lasts",
              body: "Schools, hospitals, transit and civic buildings that communities rely on.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-line bg-bone-50 p-6">
              <h3 className="font-heading text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" id="openings">
        <SectionEyebrow tone="bone">Open roles</SectionEyebrow>
        <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
          Current openings
        </h2>

        {jobs.length === 0 ? (
          <div className="mt-10">
            <div className="rounded-card border border-dashed border-line-dark bg-ink-800 px-6 py-16 text-center">
              <p className="font-heading text-lg font-bold text-bone">No open roles right now</p>
              <p className="mx-auto mt-2 max-w-md text-muted-dark">
                We&rsquo;re always glad to hear from talented engineers — get in touch via our
                contact page.
              </p>
            </div>
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-line-dark border-t border-line-dark">
            {jobs.map((job) => (
              <li key={job._id}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-heading text-xl font-bold text-bone group-hover:text-lime">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-dark">
                      {job.department} · {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag variant="solid">{job.type}</Tag>
                    <span aria-hidden="true" className="text-lime">
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBand
        heading="Don't see the right role?"
        body="We're always interested in meeting engineers who think across the ground-to-frame boundary. Tell us about yourself."
      />
    </>
  );
}
