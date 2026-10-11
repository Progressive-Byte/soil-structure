import type { TeamMember } from "@/types";
import { read } from "./_client";

const team: TeamMember[] = [
  {
    _id: "65f1d0000000000000000401",
    slug: "khandaker-khairul-alam",
    name: "Khandaker Khairul Alam",
    role: "Managing Director",
    education: "B.Sc in civil Engg(BUET)",
    professionalMembership:"FIEB, DMINB",
    discipline: "Structural & Geotechnical",
    bio: "Over twenty years of experience in Structural and Geotechnical Engineering.",
    bioParagraphs: [
      "Over twenty years of experience in Structural and Geotechnical Engineering. Extensive knowledge and experience in steel and RC structures including cement factories, bitumen production factories, food industry, dyeing factories, spinning mills, re-rolling mills and garments factories.",
      "He also has experience in the design of coffer dams, shore protection systems, river bank protection, slope protection and stability analysis. He is exceptional in design from the perspective of both hand calculation and software analysis.",
    ],
    skills: ["SteelPro", "Etabs", "SAP2000", "Safe", "RAM Connection", "Plaxis", "GeoStru", "Slide", "HEC-RAS"],
    photo: {
      src: "/images/team/khandaker-khairul-alam.jpg",
      alt: "Portrait of Khandaker Khairul Alam",
      width: 240,
      height: 240,
    },
    order: 1,
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
