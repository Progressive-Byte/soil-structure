import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { StatItem } from "@/components/ui/StatItem";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
import { HeroCarousel, type HeroSlide } from "@/components/sections/HeroCarousel";
import type { CompanyStat } from "@/types";

type HeroPanelBaseProps = {
  /** Small uppercase label above the headline. */
  eyebrow: React.ReactNode;
  /** Stats row rendered on the page background beneath the panel. Omit to hide it. */
  stats?: CompanyStat[];
  /** CTAs rendered under the intro, inside the panel. */
  actions?: React.ReactNode;
  compact?: boolean;
};

type HeroPanelProps = HeroPanelBaseProps & (
  | {
      slides: HeroSlide[];
      title?: never;
      intro?: never;
      image?: never;
    }
  | {
      slides?: never;
      /** Headline. Pass a fragment with <br /> to control the line break. */
      title: React.ReactNode;
      intro: string;
      image: { src: string; alt: string };
    }
);

/**
 * The shared hero: one dark rounded photo panel carrying the eyebrow, headline,
 * intro and (optionally) CTAs stacked at the left, with the company stats
 * sitting on the bone page background beneath it.
 *
 * Used by the landing page and the interior pages that share its treatment, so
 * the two stay identical — see Figma "Hero home page".
 */
export function HeroPanel(props: HeroPanelProps) {
  const { eyebrow, stats, actions, compact = false } = props;

  return (
    <section className="bg-bone pb-16 md:pb-22">
      <Container>
        {props.slides ? (
          <HeroCarousel
            eyebrow={eyebrow}
            slides={props.slides}
            actions={actions}
            compact={compact}
          />
        ) : (
          <div
            className="relative mt-6 overflow-hidden rounded-image bg-ink shadow-card-dark motion-safe:animate-rise md:mt-8"
            style={{ animationDelay: "60ms" }}
          >
            <Image
              src={props.image.src}
              alt={props.image.alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/45"
              aria-hidden="true"
            />

            <div
              className={`relative flex flex-col justify-center p-6 md:p-12 lg:p-16 ${
                compact
                  ? "min-h-[360px] md:min-h-[430px] lg:min-h-[480px]"
                  : "min-h-[440px] md:min-h-[560px] lg:min-h-[600px]"
              }`}
            >
              <div className="max-w-2xl">
                <div
                  className="motion-safe:animate-rise"
                  style={{ animationDelay: "180ms" }}
                >
                  <SectionEyebrow tone="bone">{eyebrow}</SectionEyebrow>
                </div>
                <h1
                  className={`mt-6 font-heading text-display-sm font-extrabold tracking-tight text-bone motion-safe:animate-rise md:text-display-md ${compact ? 'lg:text-display-md' : 'lg:text-display-lg'}`}
                  style={{ animationDelay: "260ms" }}
                >
                  {props.title}
                </h1>
                <p
                  className={`mt-6 max-w-xl text-base leading-relaxed text-bone/80 motion-safe:animate-rise ${compact ? 'md:text-md' : 'md:text-lg'}`}
                  style={{ animationDelay: "360ms" }}
                >
                  {props.intro}
                </p>
                {actions && (
                  <div
                    className="mt-8 flex flex-wrap gap-3 motion-safe:animate-rise"
                    style={{ animationDelay: "460ms" }}
                  >
                    {actions}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats row on the page background, split by hairline dividers */}
        {stats && stats.length > 0 && (
          <dl
            className="mt-10 grid grid-cols-2 gap-y-8 motion-safe:animate-rise md:mt-12 md:grid-cols-4"
            style={{ animationDelay: "560ms" }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  // A hairline rule separates the columns: on mobile (2 up) only
                  // the right-hand item is ruled; from md (4 up) every item but
                  // the first is.
                  "border-line pr-4 md:border-l md:pl-8 md:pr-6",
                  index % 2 === 1 && "border-l pl-6",
                  index === 0 && "md:border-l-0 md:pl-0",
                )}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatItem
                    value={stat.value}
                    label={stat.label}
                    tone="light"
                  />
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
