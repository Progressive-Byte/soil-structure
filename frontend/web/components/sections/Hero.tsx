import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatItem } from "@/components/ui/StatItem";
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
            <p
              className="inline-flex items-center gap-2.5 text-eyebrow font-semibold uppercase text-muted motion-safe:animate-rise"
              style={{ animationDelay: "60ms" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-lime-600 motion-safe:animate-dot-pulse"
                aria-hidden="true"
              />
              {eyebrow}
            </p>
            <h1
              className="mt-6 font-heading text-display-md font-extrabold tracking-tight text-ink motion-safe:animate-rise md:text-display-lg xl:text-display-xl"
              style={{ animationDelay: "140ms" }}
            >
              Solid ground.
              <br />
              Sound structures.
            </h1>
          </div>
          <div
            className="motion-safe:animate-rise lg:pt-8"
            style={{ animationDelay: "260ms" }}
          >
            <p className="text-base leading-relaxed text-muted md:text-lg">
              A multidisciplinary consultancy pairing ground investigation with
              structural design, so what sits above and what lies below are
              engineered as one.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href="/projects"
                variant="dark"
                withArrow
                className="motion-safe:animate-btn-pulse"
              >
                View Our Projects
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
          {/* Darken toward the bottom so the stats stay legible over the photo. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10"
            aria-hidden="true"
          />

          <div className="relative flex min-h-[380px] flex-col justify-end p-6 md:min-h-[520px] md:p-10 lg:min-h-[560px]">
            <dl className="flex flex-wrap gap-y-8 text-bone">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="w-1/2 border-line-dark sm:w-auto sm:border-l sm:px-10 sm:first:border-l-0 sm:first:pl-0"
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
