import type { CompanyStat, ProcessStep, SiteConfig } from "@/types";
import { read } from "./_client";

const stats: CompanyStat[] = [
  { value: "25+", label: "Years in practice" },
  { value: "400+", label: "Projects delivered" },
  { value: "60", label: "Engineers and geologists" },
  { value: "12", label: "Offices" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Site Investigation",
    description:
      "We start below the surface, building a ground model from desk study and intrusive site work before the frame is fixed.",
  },
  {
    number: "02",
    title: "Concept & Collaboration",
    description:
      "Ground model, structural concept and budget move together, with the client and wider design team involved early and often.",
  },
  {
    number: "03",
    title: "Value Engineering",
    description:
      "We test options against cost, programme and buildability, matching the foundation solution to the structure it carries.",
  },
  {
    number: "04",
    title: "Design Delivery",
    description:
      "Coordinated drawings and analysis carry the scheme from concept to completion, with support on site through construction.",
  },
];

const siteConfig: SiteConfig = {
  name: "Soil & Structure",
  tagline: "Geotechnical and structural engineering consultants",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerColumns: [
    {
      heading: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Leadership", href: "/about#leadership" },
        { label: "Community", href: "/about#community" },
      ],
    },
    {
      heading: "Our Work",
      links: [
        { label: "Projects", href: "/projects" },
        { label: "Services", href: "/services" },
        { label: "Sectors", href: "/projects#sectors" },
        { label: "Awards", href: "/about#awards" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "Testimonials", href: "/about#testimonials" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
  social: [
    { platform: "linkedin", href: "https://www.linkedin.com", label: "Soil & Structure on LinkedIn" },
    { platform: "facebook", href: "https://www.facebook.com", label: "Soil & Structure on Facebook" },
  ],
  contact: {
    addressLines: ["1200 Riverside Drive, Suite 400", "City, ST 00000"],
    phone: "(000) 000 0000",
    email: "hello@soilandstructure.example",
  },
};

/** Headline company statistics (25+ years, 400+ projects, …). */
export async function getCompanyStats(): Promise<CompanyStat[]> {
  return read(stats);
}

/** The four-step value / design approach. */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return read(processSteps);
}

/**
 * Site-wide configuration (nav, footer, contact details).
 * Synchronous because it is chrome, not content — used in layout/header/footer.
 */
export function getSiteConfig(): SiteConfig {
  return siteConfig;
}
