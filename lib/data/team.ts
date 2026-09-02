import teamData from "@/data/team.json";
import type { TeamMember } from "@/types";
import { read } from "./_client";

const team = teamData as TeamMember[];

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
