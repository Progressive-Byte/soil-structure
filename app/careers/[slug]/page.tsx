import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { getJobs, getJobBySlug } from "@/lib/data/jobs";
import { buildMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);
  if (!job) return buildMetadata({ title: "Role not found", path: `/careers/${params.slug}` });
  return buildMetadata({
    title: job.title,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: Params) {
  const job = await getJobBySlug(params.slug);
  if (!job) notFound();

  return (
    <>
      <div className="bg-ink text-bone">
        <Container className="py-12 md:py-16">
          <Link href="/careers" className="text-sm text-muted-dark hover:text-bone">
            ← Back to careers
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Tag variant="solid">{job.type}</Tag>
            <span className="text-sm text-muted-dark">
              {job.department} · {job.location}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-display-sm font-bold tracking-tight md:text-display-lg">
            {job.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-dark md:text-lg">{job.summary}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight">Responsibilities</h2>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-10">
            <div className="rounded-card border border-line bg-bone-50 p-6">
              <h2 className="font-heading text-lg font-bold text-ink">Apply for this role</h2>
              <p className="mt-2 text-sm text-muted">
                Send your CV and a short note about why this role interests you.
              </p>
              <div className="mt-5">
                <Button href={`/contact?role=${job.slug}`} variant="lime" className="w-full">
                  Apply now
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
