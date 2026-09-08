import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { TeamMember } from "@/types";

type TeamProps = {
  members: TeamMember[];
};

/** Initials for the avatar, skipping honorifics like "Md." */
function initials(name: string): string {
  const words = name.split(" ").filter((w) => w && !w.endsWith("."));
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** "The people behind the work." — key personnel cards with initials avatars. */
export function Team({ members }: TeamProps) {
  return (
    <Section id="team">
      <div className="grid gap-6 lg:grid-cols-[150px_1fr_auto] lg:items-center lg:gap-10">
        <div>
          <SectionEyebrow>Key personnel</SectionEyebrow>
        </div>
        <h2 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
          The people behind the work.
        </h2>
        <Button href="/team" variant="outline" className="justify-self-start lg:justify-self-end">
          Meet the Team
        </Button>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => (
          <li key={member._id}>
            <Reveal delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-[1.5rem] bg-bone-200 p-6 md:p-8">
                {member.photo ? (
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    width={member.photo.width ?? 240}
                    height={member.photo.height ?? 240}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-heading text-sm font-bold text-lime">
                    {initials(member.name)}
                  </span>
                )}
                <h3 className="mt-6 font-heading text-lg font-bold tracking-tight text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-small text-muted">{member.role}</p>
                <span className="mt-6 inline-flex w-fit items-center rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-lime-700">
                  {member.discipline}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
