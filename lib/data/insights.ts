import insightsData from "@/data/insights.json";
import type { Insight } from "@/types";
import { read } from "./_client";

const insights = insightsData as Insight[];

/** All insights, newest first. */
export async function getInsights(): Promise<Insight[]> {
  const all = await read(insights);
  return all.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** A single insight by slug, or null if not found. */
export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const all = await getInsights();
  return all.find((i) => i.slug === slug) ?? null;
}
