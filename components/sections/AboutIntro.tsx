import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";

/**
 * "Who we are" — narrow eyebrow rail, a wide heading spanning the top, then a
 * two-column row of body copy (+ CTA) beside the image, matching the design.
 */
export function AboutIntro() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[150px_1fr] lg:gap-10">
        {/* Left rail: eyebrow */}
        <div className="lg:pt-3">
          <SectionEyebrow>Who we are</SectionEyebrow>
        </div>

        {/* Main: heading spanning wide, then copy + image below */}
        <div>
          <h2 className="max-w-4xl font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            A young firm built on two decades of experience.
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className="text-base leading-relaxed text-muted md:text-lg">
                Soil &amp; Structure is a multi-discipline engineering company
                formed in 2017. Since then it has provided consultancy services to
                many industrial clients. The company fosters an innovative
                problem-solving environment that gives fast and flexible responses
                to client needs.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                The company was formed on the initiative of a few BUET graduates
                with the aim of providing quality consultancy services. Recruiting
                and retaining talented personnel has been a corporate priority ever
                since — we believe the ultimate success of any project hinges
                primarily on the quality of the people involved.
              </p>
              <div className="mt-8">
                <Button href="/about" variant="dark">
                  More About Us
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-image">
              <Image
                src="/images/about-us-hero.webp"
                alt="A completed campus building lit warmly at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
