import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/types";

type ServicesGridProps = {
  services: Service[];
};

/** "Ground up. Start to finish." — the four numbered service cards. */
export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div>
          <SectionEyebrow>What we do</SectionEyebrow>
          <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            Ground up. Start to finish.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg lg:pb-2">
          Placeholder copy describing the practice&rsquo;s guiding principles and
          the way it works alongside architects, developers and contractors.
        </p>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service._id} delay={(i % 2) * 100}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
