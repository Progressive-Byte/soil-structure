import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  /** Colour tone of the label. */
  tone?: "ink" | "bone" | "muted";
  className?: string;
};

/** Small uppercase, letter-spaced label shown above section headings. */
export function SectionEyebrow({ children, tone = "muted", className }: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "muted" && "text-muted",
        tone === "ink" && "text-ink",
        tone === "bone" && "text-muted-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
