import { Button } from "@/components/ui/Button";
import { HeroPanel } from "@/components/sections/HeroPanel";
import type { CompanyStat } from "@/types";
import type { HeroSlide } from "@/components/sections/HeroCarousel";
import type { Project } from "@/types";

type HeroProps = {
  eyebrow: string;
  stats: CompanyStat[];
  projects: Project[];
};

/** Landing hero — the shared HeroPanel with the landing copy and CTAs. */
export function Hero({ eyebrow, stats, projects }: HeroProps) {
  const slides: HeroSlide[] = projects.map((project) => ({
    image: project.coverImage,
    title: project.title,
    href: `/projects/${project.slug}`,
    intro: project.summary,
  }));

  return (
    <HeroPanel
      eyebrow={eyebrow}
      slides={slides}
      stats={stats}
    />
  );
}
