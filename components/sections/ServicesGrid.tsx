import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/types";

type ServicesGridProps = {
  services: Service[];
};

/**
 * "What we do" — dark section with a tonal heading and a grid of icon cards, one
 * per service area.
 */
export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-bone py-16 md:py-22 lg:py-30">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionEyebrow>What we do</SectionEyebrow>
            <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              Complete solutions to complex problems.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg lg:pt-1">
            From project feasibility through detailed design and construction
            management — twelve service areas across eight engineering disciplines.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service, i) => (
            <Reveal key={service._id} delay={(i % 2) * 100}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/services" variant="outline">
            View All Twelve Service Areas
          </Button>
        </div>
      </Container>
    </section>
  );
}
