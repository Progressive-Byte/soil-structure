import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getInsights, getInsightBySlug } from "@/lib/data/insights";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) return buildMetadata({ title: "Article not found", path: `/insights/${params.slug}` });
  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    image: insight.coverImage?.src,
  });
}

export default async function InsightDetailPage({ params }: Params) {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) notFound();

  return (
    <article className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <Link href="/insights" className="text-sm text-muted hover:text-ink">
          ← Back to insights
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <Tag variant="muted">{insight.category}</Tag>
          <span className="text-xs text-muted">{insight.readingMinutes} min read</span>
        </div>
        <h1 className="mt-4 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
          {insight.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {insight.author} · {formatDate(insight.publishedAt)}
        </p>
      </Container>

      {insight.coverImage && (
        <Container className="mt-8 max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-image">
            <Image
              src={insight.coverImage.src}
              alt={insight.coverImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="mt-10 max-w-3xl">
        <div className="space-y-5 text-base leading-relaxed text-ink md:text-lg">
          {insight.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
