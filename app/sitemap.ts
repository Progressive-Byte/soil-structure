import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data/projects";
import { getServices } from "@/lib/data/services";
import { getInsights } from "@/lib/data/insights";
import { getJobs } from "@/lib/data/jobs";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, insights, jobs] = await Promise.all([
    getProjects(),
    getServices(),
    getInsights(),
    getJobs(),
  ]);

  const staticRoutes = [
    "",
    "/projects",
    "/services",
    "/about",
    "/careers",
    "/insights",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: new Date(p.updatedAt) })),
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, lastModified: new Date(s.updatedAt) })),
    ...insights.map((i) => ({ url: `${siteUrl}/insights/${i.slug}`, lastModified: new Date(i.publishedAt) })),
    ...jobs.map((j) => ({ url: `${siteUrl}/careers/${j.slug}`, lastModified: new Date(j.updatedAt) })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
