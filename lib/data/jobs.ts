import jobsData from "@/data/jobs.json";
import type { Job } from "@/types";
import { read } from "./_client";

const jobs = jobsData as Job[];

/** All open roles. */
export async function getJobs(): Promise<Job[]> {
  return read(jobs);
}

/** A single role by slug, or null if not found. */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  const all = await getJobs();
  return all.find((j) => j.slug === slug) ?? null;
}
