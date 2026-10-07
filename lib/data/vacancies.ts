
import { fetchAPI, read } from "./_client";

export interface Vacancy {
  _id: string;
  slug: string;
  number: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  benefits?: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const vacancies: Vacancy[] = [
  {
    _id: "65f1b0000000000000000301",
    slug: "senior-structural-engineer",
    number: "01",
    title: "Senior Structural Engineer",
    department: "Structural Engineering",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    experience: "5+ years",
    summary:
      "Lead structural engineering design and analysis for industrial, commercial and infrastructure projects.",
    description:
      "We are looking for a Senior Structural Engineer to join our structural engineering team. The successful candidate will be responsible for structural analysis, design, documentation and coordination across a range of projects.",
    responsibilities: [
      "Lead structural analysis and design for reinforced concrete and steel structures.",
      "Prepare structural calculations, drawings and technical documentation.",
      "Coordinate structural works with architectural, geotechnical, mechanical and electrical teams.",
      "Review design drawings, calculations and technical submissions.",
      "Provide technical support during construction and site activities.",
      "Ensure designs comply with applicable codes, standards and project requirements.",
    ],
    requirements: [
      "Bachelor's degree in Civil Engineering or a related discipline.",
      "Minimum 5 years of relevant structural engineering experience.",
      "Strong knowledge of reinforced concrete and steel structure design.",
      "Experience with STAAD.Pro, ETABS, SAP2000 or similar structural analysis software.",
      "Good understanding of engineering codes and standards.",
      "Strong communication and technical documentation skills.",
    ],
    preferredQualifications: [
      "Experience with industrial and infrastructure projects.",
      "Professional engineering certification is an advantage.",
      "Experience coordinating multidisciplinary engineering teams.",
    ],
    benefits: [
      "Competitive salary",
      "Professional development opportunities",
      "Exposure to multidisciplinary projects",
      "Collaborative working environment",
    ],
    featured: true,
    order: 1,
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },

  {
    _id: "65f1b0000000000000000302",
    slug: "geotechnical-engineer",
    number: "02",
    title: "Geotechnical Engineer",
    department: "Geotechnical Engineering",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    experience: "3+ years",
    summary:
      "Work on ground investigation, foundation engineering, slope stability and ground improvement projects.",
    description:
      "We are seeking a Geotechnical Engineer to support the investigation, analysis and design of foundations, earth-retaining systems and ground improvement solutions.",
    responsibilities: [
      "Interpret geotechnical investigation and laboratory test results.",
      "Carry out foundation and soil stability analyses.",
      "Assist with retaining wall, excavation protection and ground improvement design.",
      "Prepare technical reports, calculations and design documentation.",
      "Coordinate with structural and civil engineering teams.",
      "Support field investigation and construction activities when required.",
    ],
    requirements: [
      "Bachelor's degree in Civil Engineering or Geotechnical Engineering.",
      "Minimum 3 years of relevant experience.",
      "Understanding of soil mechanics and foundation engineering.",
      "Experience with geotechnical analysis and design software.",
      "Ability to prepare clear technical reports and calculations.",
      "Good communication and teamwork skills.",
    ],
    preferredQualifications: [
      "Experience with PLAXIS, GeoStudio or similar software.",
      "Experience in infrastructure or industrial projects.",
      "Postgraduate qualification in Geotechnical Engineering.",
    ],
    featured: true,
    order: 2,
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },

  {
    _id: "65f1b0000000000000000303",
    slug: "architectural-engineer",
    number: "03",
    title: "Architectural Engineer",
    department: "Architecture",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    experience: "2+ years",
    summary:
      "Develop architectural concepts, layouts and construction documentation for multidisciplinary projects.",
    description:
      "We are looking for an Architectural Engineer to work alongside our structural and engineering teams on industrial, commercial and institutional projects.",
    responsibilities: [
      "Develop architectural concepts and schematic designs.",
      "Prepare space planning and functional layouts.",
      "Produce detailed architectural drawings and construction documentation.",
      "Coordinate architectural drawings with structural and MEP disciplines.",
      "Assist with facade, interior and building envelope design.",
      "Support project teams during design development and construction stages.",
    ],
    requirements: [
      "Bachelor's degree in Architecture or a related field.",
      "Minimum 2 years of relevant experience.",
      "Proficiency in AutoCAD and relevant architectural design software.",
      "Strong understanding of architectural drawings and construction documentation.",
      "Good knowledge of building codes and regulations.",
      "Strong visual, communication and coordination skills.",
    ],
    preferredQualifications: [
      "Experience with Revit or BIM workflows.",
      "Experience with 3D modelling and rendering.",
      "Experience working on industrial or commercial projects.",
    ],
    featured: true,
    order: 3,
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },

  {
    _id: "65f1b0000000000000000304",
    slug: "project-engineer",
    number: "04",
    title: "Project Engineer",
    department: "Project Management",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    experience: "3+ years",
    summary:
      "Coordinate engineering, procurement and construction activities across multidisciplinary projects.",
    description:
      "The Project Engineer will support project planning, engineering coordination, procurement and construction activities from project initiation through completion.",
    responsibilities: [
      "Coordinate engineering activities across project disciplines.",
      "Monitor project schedules, deliverables and milestones.",
      "Coordinate with consultants, contractors, suppliers and project stakeholders.",
      "Review technical submissions and project documentation.",
      "Assist with procurement and tendering activities.",
      "Support project reporting, progress monitoring and site coordination.",
    ],
    requirements: [
      "Bachelor's degree in Engineering.",
      "Minimum 3 years of relevant project engineering experience.",
      "Understanding of project planning and engineering coordination.",
      "Strong technical documentation and reporting skills.",
      "Good knowledge of MS Office and project management tools.",
      "Strong communication and coordination abilities.",
    ],
    preferredQualifications: [
      "Experience in engineering consultancy or construction projects.",
      "Experience with project scheduling software.",
      "Knowledge of procurement and contract processes.",
    ],
    featured: false,
    order: 4,
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },

  {
    _id: "65f1b0000000000000000305",
    slug: "electrical-engineer",
    number: "05",
    title: "Electrical Engineer",
    department: "Electrical Engineering",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    experience: "2+ years",
    summary:
      "Design electrical systems, power distribution networks and building electrical services.",
    description:
      "We are seeking an Electrical Engineer to contribute to electrical system design and coordination for industrial, commercial and infrastructure projects.",
    responsibilities: [
      "Prepare electrical layouts and design documentation.",
      "Design low and medium voltage power distribution systems.",
      "Carry out electrical load calculations and system studies.",
      "Coordinate electrical designs with architectural and MEP disciplines.",
      "Review technical specifications and equipment requirements.",
      "Provide technical support during project implementation.",
    ],
    requirements: [
      "Bachelor's degree in Electrical and Electronic Engineering.",
      "Minimum 2 years of relevant experience.",
      "Knowledge of electrical system design and power distribution.",
      "Experience with electrical design software and AutoCAD.",
      "Understanding of applicable electrical codes and standards.",
      "Good communication and technical documentation skills.",
    ],
    preferredQualifications: [
      "Experience with industrial electrical systems.",
      "Knowledge of power system analysis software.",
      "Experience with multidisciplinary engineering projects.",
    ],
    featured: false,
    order: 5,
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },

  {
    _id: "65f1b0000000000000000306",
    slug: "mechanical-engineer",
    number: "06",
    title: "Mechanical Engineer",
    department: "Mechanical & Piping",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    experience: "2+ years",
    summary:
      "Design mechanical, piping and building service systems for industrial and infrastructure projects.",
    description:
      "We are looking for a Mechanical Engineer to support the design and coordination of HVAC, piping, pumping and other mechanical systems.",
    responsibilities: [
      "Prepare mechanical and piping design documentation.",
      "Design HVAC, plumbing and firefighting systems.",
      "Assist with pipe stress and pumping system analysis.",
      "Develop equipment layouts and mechanical system arrangements.",
      "Coordinate mechanical designs with other engineering disciplines.",
      "Support technical reviews and project documentation.",
    ],
    requirements: [
      "Bachelor's degree in Mechanical Engineering.",
      "Minimum 2 years of relevant experience.",
      "Knowledge of HVAC, piping and mechanical systems.",
      "Experience with AutoCAD or relevant engineering software.",
      "Understanding of engineering codes and standards.",
      "Strong analytical and communication skills.",
    ],
    preferredQualifications: [
      "Experience with industrial process systems.",
      "Knowledge of CFD or finite element analysis.",
      "Experience with 3D modelling and plant design software.",
    ],
    featured: false,
    order: 6,
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },
];

/** All vacancies, ordered by their `order` field. */
export async function getVacancies(): Promise<Vacancy[]> {
  try {
    const { vacancies: live } = await fetchAPI<{ vacancies: Vacancy[] }>("/public/careers");
    return live.sort((a, b) => a.order - b.order);
  } catch {
    const all = await read(vacancies);
    return all.sort((a, b) => a.order - b.order);
  }
}

/** Featured vacancies for the careers page. */
export async function getFeaturedVacancies(): Promise<Vacancy[]> {
  const all = await getVacancies();
  return all.filter((vacancy) => vacancy.featured);
}

/** A single vacancy by slug, or null if not found. */
export async function getVacancyBySlug(
  slug: string
): Promise<Vacancy | null> {
  try {
    const { vacancy } = await fetchAPI<{ vacancy: Vacancy }>(`/public/careers/${encodeURIComponent(slug)}`);
    return vacancy;
  } catch {
  const all = await getVacancies();
  return all.find((vacancy) => vacancy.slug === slug) ?? null;
  }
}
