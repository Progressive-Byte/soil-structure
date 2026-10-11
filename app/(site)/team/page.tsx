import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { getTeam } from "@/lib/data/team";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description:
    "The key personnel behind Soil & Structure — engineers with quality consulting experience across structural, geotechnical, electrical, mechanical and water resources disciplines.",
  path: "/team",
});

/** Initials for the avatar, skipping honorifics like "Md." */
function initials(name: string): string {
  const words = name.split(" ").filter((w) => w && !w.endsWith("."));
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      {/* Heading + intro + group image */}
      <section className="bg-bone pt-10 md:pt-14">
        <Container>
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about" className="hover:text-ink">
              About
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Team</span>
          </p>

          {/* <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
            <h1 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              Key personnel.
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
              Our personnel have acquired quality consulting civil and structural
              engineering experience from recognised national practices over an
              accumulated period in excess of 25 years.
            </p>
          </div>

          <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
            In order to achieve our mission, vision and values we believe we have to
            recruit the best talent in the technical fields. This experience has been
            acquired through direct and active involvement on projects from inception
            through to commissioning. In addition, our personnel continue to develop
            their professional and technical skills through postgraduate studies and
            short courses, most of which are CPD accredited.
          </p>

          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-image bg-ink">
            <Image
              src="/images/team-group.jpg"
              alt="The Soil & Structure team"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div> */}
        </Container>
      </section>

      {/* Member cards */}
      <section className="bg-bone py-14 md:py-20">
        <Container>
          <div className="divide-y divide-line">
            {team.map((member, i) => (
              <Reveal
                key={member._id}
                delay={(i % 2) * 100}
                className="grid gap-8 py-12 first:pt-0 last:pb-0 lg:grid-cols-[1fr_2fr] lg:gap-12"
              >
                {/* Identity */}
                <div>
                  {member.photo ? (
                    <Image
                      src={member.photo.src}
                      alt={member.photo.alt}
                      width={member.photo.width ?? 240}
                      height={member.photo.height ?? 240}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ink font-heading text-2xl font-bold text-lime">
                      {initials(member.name)}
                    </span>
                  )}
                  <h2 className="mt-6 font-heading text-xl font-bold tracking-tight text-ink">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-small text-muted">{member.role}</p>
                  <p className="mt-1 text-small text-muted">{member.education}</p>
                  <p className="mt-1 text-small text-muted">{member.professionalMembership}</p>
                  <span className="mt-4 inline-flex w-fit items-center rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-lime-700">
                    {member.discipline}
                  </span>
                </div>

                {/* Bio + skills */}
                <div>
                  <div className="space-y-4 text-base leading-relaxed text-muted">
                    {(member.bioParagraphs ?? [member.bio]).map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {member.skills && member.skills.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2.5">
                      {member.skills.map((skill) => (
                        <li key={skill}>
                          <span className="inline-flex rounded-full border border-line bg-bone-200 px-3 py-1 text-xs font-medium text-ink">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
