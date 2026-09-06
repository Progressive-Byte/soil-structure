import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Formed in 2017 by BUET graduates — a multi-discipline engineering consultancy that gets things done through people.",
  path: "/about",
});

const blocks = [
  {
    title: "Who is Soil & Structure",
    paragraphs: [
      "Soil & Structure is a newly formed multi-discipline engineering company. It was formed in 2017. Since then it has been giving consultancy service to many industrial clients.",
      "The company fosters an innovative problem-solving environment that presents fast and flexible responses to client needs. The highly qualified team at Soil & Structure can offer complete engineering services from the project feasibility phase through to detailed design and construction management.",
    ],
  },
  {
    title: "People",
    paragraphs: [
      "At Soil & Structure we believe that the ultimate success of any project hinges primarily on the quality of the people involved.",
      "The company was formed on the initiative of a few BUET graduates with the aim of providing quality consultancy services. Later it made recruiting and retaining talented personnel a corporate priority. The group of dedicated personnel in the company is second to none.",
    ],
  },
  {
    title: "Priorities",
    paragraphs: [
      "Since 2017 Soil & Structure has been building long-term relationships with customers through a commitment to on-time and on-budget delivery of services. Most of our assignments are repeat business or come through referrals.",
      "We recognise that even though superior customer service is more than desirable, customer service alone cannot replace technical ability and experience in the consulting engineering field. As such, investment in personnel training and professional development is another high priority.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Heading + image band */}
      <section className="bg-bone pt-10 md:pt-14">
        <Container>
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">About</span>
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
            <h1 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              We get things done through people.
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
              Formed in 2017 on the initiative of a few BUET graduates, with the aim
              of providing quality consultancy services.
            </p>
          </div>

          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-image bg-ink">
            <Image
              src="/images/hero-steel-frame.jpg"
              alt="Steel structural frame of a building under construction"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
          </div>
        </Container>
      </section>

      {/* Content blocks */}
      <section className="bg-bone py-14 md:py-20">
        <Container>
          <div className="divide-y divide-line">
            {blocks.map((block, i) => (
              <Reveal
                key={block.title}
                delay={i * 120}
                className="grid gap-8 py-10 first:pt-0 last:pb-0 lg:grid-cols-[1fr_1.8fr] lg:gap-12"
              >
                <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {block.title}
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
                  {block.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
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
