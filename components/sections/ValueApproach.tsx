import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ProcessStep } from "@/types";

type ValueApproachProps = {
  steps: ProcessStep[];
};

/**
 * "Relationships, not transactions." — eyebrow rail + heading + intro across the
 * top, then the priorities as numbered columns each with their own top rule.
 */
export function ValueApproach({ steps }: ValueApproachProps) {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[140px_1.5fr_1fr] lg:items-start lg:gap-10">
        <div className="lg:pt-2">
          <SectionEyebrow>Our priorities</SectionEyebrow>
        </div>
        <h2 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
          Relationships, not transactions.
        </h2>
        <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
          Since 2017 we have built long-term relationships through a commitment to
          on-time and on-budget delivery.
        </p>
      </div>

      <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 180}
            className="border-t border-ink/20 pt-6"
          >
            <span className="font-heading text-5xl font-bold leading-none text-ink md:text-6xl">
              {step.number}
            </span>
            <h3 className="mt-6 font-heading text-lg font-bold tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-small leading-relaxed text-muted">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
