import type { TeamMember } from "@/types";
import { read } from "./_client";

const team: TeamMember[] = [
  {
    _id: "65f1d0000000000000000401",
    slug: "morgan-hale",
    name: "Morgan Hale",
    role: "Managing Director",
    discipline: "Leadership",
    bio: "Placeholder bio. Morgan leads the practice and has spent over two decades bringing geotechnical and structural teams onto the same drawings. Replace with a real biography before launch.",
    order: 1,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1d0000000000000000402",
    slug: "elena-ford",
    name: "Elena Ford",
    role: "Head of Geotechnics",
    discipline: "Geotechnical",
    bio: "Placeholder bio. Elena directs ground investigation and foundation strategy across the practice's most challenging sites. Replace with a real biography before launch.",
    order: 2,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1d0000000000000000403",
    slug: "james-okoro",
    name: "James Okoro",
    role: "Head of Structures",
    discipline: "Structural",
    bio: "Placeholder bio. James leads structural design, keeping frames efficient, buildable and coordinated with the ground beneath them. Replace with a real biography before launch.",
    order: 3,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1d0000000000000000404",
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Associate Director, Seismic",
    discipline: "Geotechnical",
    bio: "Placeholder bio. Priya specialises in seismic risk and ground improvement, mitigating hazard on complex and reclaimed sites. Replace with a real biography before launch.",
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
