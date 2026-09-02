import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data/projects";
import { getServices } from "@/lib/data/services";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);

  const staticRoutes = ["", "/projects", "/services", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: new Date(p.updatedAt) })),
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, lastModified: new Date(s.updatedAt) })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
