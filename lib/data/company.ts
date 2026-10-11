import type { CompanyStat, ProcessStep, SiteConfig } from "@/types";
import { read } from "./_client";

const stats: CompanyStat[] = [
  { value: "2017", label: "Year founded" },
  { value: "25+", label: "Years accumulated experience" },
  { value: "8", label: "Disciplines under one roof" },
  { value: "12", label: "Service areas" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "On time, on budget",
    description:
      "A commitment to delivering services on schedule and within budget is what has kept clients coming back since our first year.",
  },
  {
    number: "02",
    title: "Most work is repeat or referred",
    description:
      "Most of our assignments are repeat business or come through referrals — the clearest measure we have of whether we are doing this well.",
  },
  {
    number: "03",
    title: "Technical ability first",
    description:
      "Superior customer service is more than desirable, but it cannot replace technical ability and experience. Investment in training and professional development is a high priority.",
  },
];

const siteConfig: SiteConfig = {
  name: "Soil & Structure",
  tagline: "Multidisciplinary engineering consultants · Dhaka, Bangladesh",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
      ],
    },
    {
      label: "Careers",
      href: "/careers",
    }
  ],
  footerColumns: [
    {
      heading: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Mission & Values", href: "/about#mission" },
        { label: "Our Team", href: "/team" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Architectural Design", href: "/services/architectural-design" },
        { label: "Structural Design", href: "/services/structural-design" },
        { label: "Geotechnical Design", href: "/services/geotechnical-design" },
        { label: "Water Resources", href: "/services/water-resources-engineering" },
        { label: "Environmental", href: "/services/environmental-engineering" },
        { label: "Mechanical, Electrical & Piping", href: "/services/mechanical-electrical-piping" },
        { label: "Project & Construction Management", href: "/services/project-construction-management" },
      ],
    },
    {
      heading: "Disciplines",
      links: [
        { label: "Structural", href: "/services/structural-design" },
        { label: "Geotechnical", href: "/services/geotechnical-design" },
        { label: "Architectural", href: "/services/architectural-design" },
        { label: "Electrical", href: "/services/mechanical-electrical-piping" },
        { label: "Mechanical", href: "/services/mechanical-electrical-piping" },
        { label: "Water Resources", href: "/services/water-resources-engineering" },
      ],
    },
  ],
  social: [
    { platform: "linkedin", href: "https://www.linkedin.com", label: "Soil & Structure on LinkedIn" },
    { platform: "facebook", href: "https://www.facebook.com/soilandstructurebd", label: "Soil & Structure on Facebook" },
  ],
  contact: {
    addressLines: [`House # 583 & 585, Road # 9, Avenue – 3, 3ʳᵈ Floor`, "Dhaka, Bangladesh"],
    phone: "+880 1771 965563, +880 1894 298265",
    email: "soilandstructure.bd@gmail.com",
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
