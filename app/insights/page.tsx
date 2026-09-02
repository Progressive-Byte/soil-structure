import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { EmptyState } from "@/components/ui/EmptyState";
import { getInsights } from "@/lib/data/insights";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Notes on ground investigation, foundation design and integrated structural engineering from the Soil & Structure team.",
  path: "/insights",
});

// This page layout is not in the Figma; it reuses the landing page's system.
export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes from the ground up."
        intro="Thinking on site investigation, foundations and the value of designing soil and structure as one system."
      />
      <Section>
        {insights.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description="Insights and articles from the team will appear here."
          />
        ) : (
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <li key={insight._id}>
                <Link href={`/insights/${insight.slug}`} className="group block">
                  {insight.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-image">
                      <Image
                        src={insight.coverImage.src}
                        alt={insight.coverImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-3">
                    <Tag variant="muted">{insight.category}</Tag>
                    <span className="text-xs text-muted">{insight.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight text-ink group-hover:text-ink/80">
                    {insight.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{insight.excerpt}</p>
                  <p className="mt-3 text-xs text-muted">
                    {insight.author} · {formatDate(insight.publishedAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
