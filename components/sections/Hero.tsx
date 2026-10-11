import { Button } from "@/components/ui/Button";
import { HeroPanel } from "@/components/sections/HeroPanel";
import type { CompanyStat } from "@/types";
import type { HeroSlide } from "@/components/sections/HeroCarousel";

type HeroProps = {
  eyebrow: string;
  stats: CompanyStat[];
};

/** Landing hero — the shared HeroPanel with the landing copy and CTAs. */
export function Hero({ eyebrow, stats }: HeroProps) {
  const slides: HeroSlide[] = [
    {
      image: {
        src: "/images/slide-1.webp",
        alt: "Modern multi-storey building at dusk reflected in a still pool",
      },
      title: "We are here to solve your problems.",
      intro:
        "Formed in 2017 by BUET graduates, we deliver complete engineering services — from feasibility through detailed design to construction management.",
    },
    {
      image: {
        src: "/images/slide-2.webp",
        alt: "Steel frame structure during construction",
      },
      title: "Engineering that builds with confidence.",
      intro:
        "We bring geotechnical and structural expertise together to turn complex site conditions into clear, buildable solutions.",
    },
    {
      image: {
        src: "/images/slide-3.webp",
        alt: "University campus buildings surrounded by greenery",
      },
      title: "From the ground up, we make it work.",
      intro:
        "Our team supports each project from early investigation and planning through design and construction.",
    },
  ];

  return (
    <HeroPanel
      eyebrow={eyebrow}
      slides={slides}
      stats={stats}
      actions={
        <>
          <Button href="/services" variant="lime" className="motion-safe:animate-btn-pulse">
            Our Services
          </Button>
          <Button href="/about" variant="outline-lime">
            About Us
          </Button>
        </>
      }
    />
  );
}
