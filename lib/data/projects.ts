import projectsData from "@/data/projects.json";
import type { Project, ProjectSector } from "@/types";
import { read } from "./_client";

const projects = projectsData as Project[];

/** All projects, ordered by their `order` field. */
export async function getProjects(): Promise<Project[]> {
  const all = await read(projects);
  return all.sort((a, b) => a.order - b.order);
}

/** Featured projects for the home "Selected work" grid. */
export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured).slice(0, limit);
}

/** A single project by slug, or null if not found. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

/** Projects filtered by sector. */
export async function getProjectsBySector(sector: ProjectSector): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.sector === sector);
}

/** Distinct sectors present in the data, for filter UIs. */
export async function getProjectSectors(): Promise<ProjectSector[]> {
  const all = await getProjects();
  return Array.from(new Set(all.map((p) => p.sector)));
}
