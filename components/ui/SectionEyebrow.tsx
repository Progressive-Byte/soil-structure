import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  /** Colour tone: muted (light bg), bone (dark bg → lime accent), or ink. */
  tone?: "ink" | "bone" | "muted";
  className?: string;
};

const textTone = {
  muted: "text-muted",
  bone: "text-lime",
  ink: "text-ink",
} as const;

/** Small uppercase label with a short 3px olive line marker above it. */
export function SectionEyebrow({ children, tone = "muted", className }: SectionEyebrowProps) {
  return (
    <span className={cn("block", className)}>
      <span className="block h-[2px] w-8 bg-lime-700" aria-hidden="true" />
      <span className={cn("mt-3 block text-eyebrow font-semibold uppercase", textTone[tone])}>
        {children}
      </span>
    </span>
  );
}
