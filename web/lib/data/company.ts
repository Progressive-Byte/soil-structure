import statsData from "@/data/stats.json";
import processData from "@/data/process.json";
import siteData from "@/data/site.json";
import type { CompanyStat, ProcessStep, SiteConfig } from "@/types";
import { read } from "./_client";

/** Headline company statistics (25+ years, 400+ projects, …). */
export async function getCompanyStats(): Promise<CompanyStat[]> {
  return read(statsData as CompanyStat[]);
}

/** The four-step value / design approach. */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return read(processData as ProcessStep[]);
}

/**
 * Site-wide configuration (nav, footer, contact details).
 * Synchronous because it is chrome, not content — used in layout/header/footer.
 */
export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}
