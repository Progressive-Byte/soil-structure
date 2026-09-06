import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatItem } from "@/components/ui/StatItem";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { CompanyStat } from "@/types";

type HeroProps = {
  eyebrow: string;
  stats: CompanyStat[];
};

/**
 * Landing hero: oversized headline on the left, intro + CTAs on the right, and a
 * single dark rounded panel showing the steel-frame photo with the company
 * stats overlaid at the bottom-left (one unified container, per Figma).
 */
export function Hero({ eyebrow, stats }: HeroProps) {
  return (
    <section className="bg-bone pb-16 md:pb-22">
      <Container>
        {/* Eyebrow + headline + intro + CTAs */}
        <div className="grid gap-8 pt-10 md:pt-14 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
          <div>
            <div className="motion-safe:animate-rise" style={{ animationDelay: "60ms" }}>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </div>
            <h1
              className="mt-6 font-heading text-display-sm font-extrabold tracking-tight text-ink motion-safe:animate-rise md:text-display-md lg:text-display-lg"
              style={{ animationDelay: "140ms" }}
            >
              We are here to
              <br />
              solve your problems.
            </h1>
          </div>
          <div
            className="motion-safe:animate-rise lg:pt-8"
            style={{ animationDelay: "260ms" }}
          >
            <p className="text-base leading-relaxed text-muted md:text-lg">
              Formed in 2017 by BUET graduates, we deliver complete engineering
              services — from feasibility through detailed design to construction
              management.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href="/services"
                variant="dark"
                withArrow
                className="motion-safe:animate-btn-pulse"
              >
                Our Services
              </Button>
              <Button href="/about" variant="outline">
                About Us
              </Button>
            </div>
          </div>
        </div>

        {/* Single panel: steel-frame photo with stats overlaid at the bottom */}
        <div
          className="relative mt-10 overflow-hidden rounded-image bg-ink shadow-card-dark motion-safe:animate-rise md:mt-12"
          style={{ animationDelay: "360ms" }}
        >
          <Image
            src="/images/hero-steel-frame.jpg"
            alt="Steel structural frame of a building under construction against a dark sky"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          {/* Uniform navy tint keeps the steel frame visible while stats stay legible. */}
          <div
            className="absolute inset-0 bg-ink/65"
            aria-hidden="true"
          />

          <div className="relative flex min-h-[380px] flex-col justify-end p-6 md:min-h-[520px] md:p-12 lg:min-h-[560px]">
            <dl className="flex flex-wrap gap-y-8 text-bone">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="w-1/2 border-line-dark sm:w-auto sm:border-l sm:px-12 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <StatItem value={stat.value} label={stat.label} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
