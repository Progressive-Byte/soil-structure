import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { HeroPanel } from "@/components/sections/HeroPanel";
import { getCompanyStats } from "@/lib/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Formed in 2017 by BUET graduates — a multi-discipline engineering consultancy that gets things done through people. Our mission, vision and the ten principles we work to.",
  path: "/about",
});

const blocks = [
  {
    title: "What is Soil & Structure",
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

/* Line icons -------------------------------------------------------------- */
const paths: Record<string, React.ReactNode> = {
  mission: (
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01" />
  ),
  vision: (
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  ),
  people: (
    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M16 3.5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-5-5.9" />
  ),
  innovation: (
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
  ),
  quality: <path d="M12 3l2.5 6L21 9.5l-4.5 4 1.3 6.5L12 17l-5.8 3 1.3-6.5L3 9.5 9.5 9 12 3Z" />,
  integrity: <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3ZM9 12l2 2 4-4" />,
  inspiration: (
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  ),
  efficiency: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2" />,
  commitment: <path d="M5 21V4M5 4h12l-2 4 2 4H5" />,
  diversity: (
    <path d="M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 6v5a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V6M12 15v3" />
  ),
  loyalty: <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 3C19 16.5 12 21 12 21Z" />,
  environment: <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14ZM4 20c4-6 8-8 12-9" />,
};

function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

const values = [
  { icon: "people", title: "People", description: "Our clients, staff and the communities shall always come first and we shall treat them with the utmost respect." },
  { icon: "innovation", title: "Innovation", description: "We shall approach our projects with the highest innovation standards so that our solutions are the most appropriate and most cost-effective for the project." },
  { icon: "quality", title: "Quality", description: "Our end product shall meet the highest quality standards." },
  { icon: "integrity", title: "Integrity", description: "We shall professionally conduct our business, uphold high ethical values and abide by the legislative requirements of our country." },
  { icon: "inspiration", title: "Inspiration", description: "We shall conduct our business in a manner that will inspire those around us." },
  { icon: "efficiency", title: "Efficiency", description: "We shall deliver our service on time, on budget and to the best quality standards." },
  { icon: "commitment", title: "Commitment", description: "To our projects, our clients and the communities we serve." },
  { icon: "diversity", title: "Diversity", description: "Our expertise spans eight engineering disciplines, brought together on every project." },
  { icon: "loyalty", title: "Loyalty", description: "To our clients, our employees and the communities we work in." },
  { icon: "environment", title: "Environment", description: "We shall always consider the long-term implications for the environment of our project solutions and business practice." },
];

export default async function AboutPage() {
  const stats = await getCompanyStats();

  return (
    <>
      <HeroPanel
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Link href="/" className="text-bone/70 transition-colors hover:text-lime">
              Home
            </Link>
            <span aria-hidden="true" className="text-bone/40">
              /
            </span>
            <span>About</span>
          </span>
        }
        title="We get things done through people."
        intro="Formed in 2017 on the initiative of a few BUET graduates, with the aim of providing quality consultancy services."
        image={{
          src: "/images/about-us-hero.webp",
          alt: "Modern multi-storey building at dusk reflected in a still pool",
        }}
        stats={stats}
      />

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

      {/* Mission + Vision */}
      <section id="mission" className="scroll-mt-24 bg-bone py-10 md:py-14">
        <Container>
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12 md:mb-12">
            <h2 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              Mission, vision and the values that carry them.
            </h2>
            <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
              Our business is driven by the core principles below, which we believe
              are the main contributors to the success of our practice.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Mission (dark) */}
            <div className="rounded-[1.75rem] bg-ink p-8 text-bone md:p-12">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lime">
                <Icon name="mission" />
              </span>
              <p className="mt-8 text-eyebrow font-semibold uppercase text-lime">Mission</p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                What we set out to do
              </h2>
              <p className="mt-4 leading-relaxed text-muted-dark">
                To provide the highest innovative and quality consulting engineering
                and project management services that will ensure client
                satisfaction, long-term benefits to beneficiaries and society; the
                upliftment of communities, maximised equity and skills transfer — by
                adding value through the employment and application of world-class
                resources, practices and technologies.
              </p>
            </div>

            {/* Vision (light) */}
            <div className="rounded-[1.75rem] bg-bone-200 p-8 md:p-12">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white text-lime-700 shadow-sm">
                <Icon name="vision" />
              </span>
              <p className="mt-8 text-eyebrow font-semibold uppercase text-muted">Vision</p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Where we are going
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                To provide engineering solutions that satisfy the needs of our
                clients, to improve the quality of life of our people, to be a
                leading consulting civil and structural engineering firm and to be a
                consulting civil and structural engineering and project management
                company of choice for employers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-bone py-10 md:py-16">
        <Container>
          <SectionEyebrow>Our values</SectionEyebrow>
          <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
            Ten principles we work to.
          </h2>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((value, i) => (
              <Reveal
                as="li"
                key={value.title}
                delay={(i % 2) * 90}
                className="rounded-[1.5rem] bg-bone-200 p-8"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-lime-700 shadow-sm">
                  <Icon name={value.icon} className="h-5 w-5" />
                </span>
                <p className="mt-6 font-heading text-xs font-bold text-lime-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-small leading-relaxed text-muted">{value.description}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
