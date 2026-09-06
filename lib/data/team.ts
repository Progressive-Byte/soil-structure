import type { TeamMember } from "@/types";
import { read } from "./_client";

const team: TeamMember[] = [
  {
    _id: "65f1d0000000000000000401",
    slug: "khandaker-khairul-alam",
    name: "Khandaker Khairul Alam",
    role: "BSc Engineering (Civil), BUET",
    discipline: "Structural & Geotechnical",
    bio: "Over twenty years of experience in Structural and Geotechnical Engineering.",
    bioParagraphs: [
      "Over twenty years of experience in Structural and Geotechnical Engineering. Extensive knowledge and experience in steel and RC structures including cement factories, bitumen production factories, food industry, dyeing factories, spinning mills, re-rolling mills and garments factories.",
      "He also has experience in the design of coffer dams, shore protection systems, river bank protection, slope protection and stability analysis. He is exceptional in design from the perspective of both hand calculation and software analysis.",
    ],
    skills: ["SteelPro", "Etabs", "SAP2000", "Safe", "RAM Connection", "Plaxis", "GeoStru", "Slide", "HEC-RAS"],
    order: 1,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1d0000000000000000402",
    slug: "fahmid-salman-shah",
    name: "Fahmid Salman Shah",
    role: "BSc Engineering (EEE), BUET · MBA, USA",
    discipline: "Electrical & Power",
    bio: "Extensive work experience in telecom and power engineering.",
    bioParagraphs: [
      "Mr. Fahmid Salman Shah completed his graduation in Electrical Engineering from BUET, then completed an MBA in the USA. He has extensive work experience in telecom and power engineering.",
      "He is well experienced in the design of electrical wiring, busbar systems, substations and complete power supply systems across many industrial sectors. He also has experience in installation, monitoring and quality control of telecom equipment and other electrical instruments in different industries.",
    ],
    skills: ["Power distribution", "Substation design", "Busbar systems", "Telecom QC"],
    order: 2,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1d0000000000000000403",
    slug: "md-matiur-rahman",
    name: "Md. Matiur Rahman",
    role: "BSc Engineering (Mechanical), BUET · MBA (Management)",
    discipline: "Mechanical & Piping",
    bio: "Over 20 years of experience in the field of mechanical engineering.",
    bioParagraphs: [
      "Mr. Matiur Rahman completed his graduation in Mechanical Engineering from BUET, then completed an MBA in Management. He has over 20 years of experience in the field of mechanical engineering.",
      "From the beginning he has worked in HVAC design, plumbing design, piping design and firefighting design. He has excellent knowledge of process design for industry.",
    ],
    skills: ["HVAC", "Plumbing", "Piping", "Fire fighting", "Process design"],
    order: 3,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1d0000000000000000404",
    slug: "md-ohidur-rahman",
    name: "Md. Ohidur Rahman",
    role: "BSc Engineering (Water Resource), BUET",
    discipline: "Water Resources",
    bio: "Over sixteen years of experience in Water Resources Engineering.",
    bioParagraphs: [
      "Over sixteen years of experience in Water Resources Engineering. He completed his graduation in 2004 and since then has been involved in the design and construction of several prestigious projects in Bangladesh.",
      "He is well experienced in the design of river bank protection systems, hydraulic structures, sluice gates, and water supply and distribution systems.",
    ],
    skills: ["River bank protection", "Hydraulic structures", "Sluice gates", "Water supply"],
    order: 4,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
];

/** All team members, ordered by their `order` field. */
export async function getTeam(): Promise<TeamMember[]> {
  const all = await read(team);
  return all.sort((a, b) => a.order - b.order);
}

/** A single team member by slug, or null if not found. */
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const all = await getTeam();
  return all.find((m) => m.slug === slug) ?? null;
}
