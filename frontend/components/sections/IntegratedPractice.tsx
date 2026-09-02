import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";

const capabilities = [
  "Site Investigation",
  "Laboratory Testing",
  "Foundation Design",
  "Structural Engineering",
  "Ground Improvement",
];

/** Dark "engineered as one system" section with an in-house capabilities list. */
export function IntegratedPractice() {
  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <SectionEyebrow tone="bone">Our integrated practice</SectionEyebrow>
          <h2 className="mt-5 max-w-2xl font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            Soil and structure, engineered as one system
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-dark md:text-lg">
            <p>
              Placeholder copy. Most projects treat the ground and the frame as
              separate problems, handed between separate consultants. We do not.
              Site investigation, foundation design and structural engineering sit
              in the same team, on the same drawings, from day one. This paragraph
              is sample text.
            </p>
            <p>
              Placeholder copy. The result is fewer assumptions, fewer late
              surprises and a foundation solution matched to the structure it
              carries. Replace this paragraph with the client&rsquo;s own
              description of their approach and differentiators.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/about" variant="light">
              More About Our Practice
            </Button>
          </div>
        </div>

        <div className="lg:border-l lg:border-line-dark lg:pl-10">
          <h3 className="text-eyebrow font-semibold uppercase text-muted-dark">
            Capabilities in house
          </h3>
          <ul className="mt-5 divide-y divide-line-dark">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-3 py-3.5 text-bone">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-lime" aria-hidden="true" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
