import { Button } from "@/components/ui/Button";
import { HeroPanel } from "@/components/sections/HeroPanel";
import type { CompanyStat } from "@/types";

type HeroProps = {
  eyebrow: string;
  stats: CompanyStat[];
};

/** Landing hero — the shared HeroPanel with the landing copy and CTAs. */
export function Hero({ eyebrow, stats }: HeroProps) {
  return (
    <HeroPanel
      eyebrow={eyebrow}
      title={
        <>
          We are here to
          <br />
          solve your problems.
        </>
      }
      intro="Formed in 2017 by BUET graduates, we deliver complete engineering services — from feasibility through detailed design to construction management."
      image={{
        src: "/images/hero-home.webp",
        alt: "Modern multi-storey building at dusk reflected in a still pool",
      }}
      stats={stats}
      actions={
        <>
          <Button href="/services" variant="lime" className="motion-safe:animate-btn-pulse">
            Our Services
          </Button>
          <Button href="/about" variant="outline-light">
            About Us
          </Button>
        </>
      }
    />
  );
}
