import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { ProcessStep } from "@/types";

type ValueApproachProps = {
  steps: ProcessStep[];
};

const values = ["Integrity", "Open Communications", "Responsiveness"];

/** "Our Value Design Approach" — four numbered steps plus value tags. */
export function ValueApproach({ steps }: ValueApproachProps) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
        <div>
          <SectionEyebrow>Our process</SectionEyebrow>
          <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            Our Value Design Approach
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-10">
          <span className="mb-3 block font-medium text-ink">
            Collaborative from first borehole to final sign off
          </span>
          Placeholder copy. We involve clients and the wider design team early and
          often, which keeps the ground model, the structural concept and the
          budget moving together rather than in sequence.
        </p>
      </div>

      <ol className="mt-14 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number}>
            <span className="font-heading text-4xl font-bold text-ink md:text-5xl">
              {step.number}
            </span>
            <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-start gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-3">
          {values.map((value) => (
            <li key={value}>
              <Tag variant="muted">{value}</Tag>
            </li>
          ))}
        </ul>
        <Button href="/about" variant="outline">
          Learn More
        </Button>
      </div>
    </Section>
  );
}
