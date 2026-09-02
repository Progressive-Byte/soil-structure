import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { IntegratedPractice } from "@/components/sections/IntegratedPractice";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ValueApproach } from "@/components/sections/ValueApproach";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteConfig, getCompanyStats, getProcessSteps } from "@/lib/data/company";
import { getFeaturedServices } from "@/lib/data/services";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getFeaturedTestimonials } from "@/lib/data/testimonials";
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
  const [stats, services, projects, testimonials, steps] = await Promise.all([
    getCompanyStats(),
    getFeaturedServices(),
    getFeaturedProjects(4),
    getFeaturedTestimonials(3),
    getProcessSteps(),
  ]);

  return (
    <>
      <Hero eyebrow={config.tagline} stats={stats} />
      <Reveal><AboutIntro /></Reveal>
      <Reveal><IntegratedPractice /></Reveal>
      <ServicesGrid services={services} />
      <SelectedWork projects={projects} />
      <Reveal><ValueApproach steps={steps} /></Reveal>
      <Testimonials testimonials={testimonials} />
      <Reveal><CtaBand /></Reveal>
    </>
  );
}
