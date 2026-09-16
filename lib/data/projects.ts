import type { PaginationMeta, Project, ProjectSector } from "@/types";
import { fetchAPI } from "./_client";

/** All projects, ordered by their `order` field (the API already sorts this way). */
export async function getProjects(): Promise<Project[]> {
  const { projects } = await fetchAPI<{ projects: Project[] }>("/public/projects");
  return projects;
}

/** One page of projects, for the /projects list page's query-string pagination/search/filter. */
export async function getPaginatedProjects(
  page = 1,
  limit = 9,
  filters: { q?: string; sector?: string } = {},
): Promise<{ projects: Project[]; meta: PaginationMeta }> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (filters.q) params.set("q", filters.q);
  if (filters.sector) params.set("sector", filters.sector);
  return fetchAPI<{ projects: Project[]; meta: PaginationMeta }>(`/public/projects?${params}`);
}

/** Featured projects for the home "Selected work" grid. */
export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured).slice(0, limit);
}

/** A single project by slug, or null if not found. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { project } = await fetchAPI<{ project: Project }>(
      `/public/projects/${encodeURIComponent(slug)}`,
    );
    return project;
  } catch {
    return null;
  }
}

/** Projects filtered by sector. */
export async function getProjectsBySector(sector: ProjectSector): Promise<Project[]> {
  const { projects } = await fetchAPI<{ projects: Project[] }>(
    `/public/projects?sector=${encodeURIComponent(sector)}`,
  );
  return projects;
}

/** Distinct sectors present in the data, for filter UIs. */
export async function getProjectSectors(): Promise<ProjectSector[]> {
  const all = await getProjects();
  return Array.from(new Set(all.map((p) => p.sector)));
}
