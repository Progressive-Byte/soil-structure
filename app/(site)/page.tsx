import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { IntegratedPractice } from "@/components/sections/IntegratedPractice";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ValueApproach } from "@/components/sections/ValueApproach";
import { Team } from "@/components/sections/Team";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteConfig, getCompanyStats, getProcessSteps } from "@/lib/data/company";
import { getFeaturedServices } from "@/lib/data/services";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getTeam } from "@/lib/data/team";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Geotechnical and structural engineering consultants",
    path: "/",
  }),
  // The root layout and home page share the root segment, so the title template
  // does not apply here — set the full title (with brand) explicitly.
  title: { absolute: "Soil & Structure — Geotechnical and structural engineering consultants" },
};

export default async function HomePage() {
  const config = getSiteConfig();
  const [stats, services, projects, team, steps] = await Promise.all([
    getCompanyStats(),
    getFeaturedServices(),
    getFeaturedProjects(),
    getTeam(),
    getProcessSteps(),
  ]);

  return (
    <>
      <Hero eyebrow={config.tagline} stats={stats} projects={projects} />
      <Reveal><AboutIntro /></Reveal>
      <Reveal><IntegratedPractice /></Reveal>
      <ServicesGrid services={services} />
      <Reveal><ValueApproach steps={steps} /></Reveal>
      {/* <SelectedWork projects={projects} /> */}
      <Reveal><Team members={team} /></Reveal>
      <Reveal><CtaBand /></Reveal>
    </>
  );
}
