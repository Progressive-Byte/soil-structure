import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  /** Colour theme: warm bone (default) or dark ink. */
  tone?: "bone" | "ink";
  className?: string;
  /** Remove the default vertical padding when composing custom spacing. */
  flush?: boolean;
  /** Constrain content to the standard container (default true). */
  contained?: boolean;
  id?: string;
  "aria-labelledby"?: string;
};

/**
 * Page section wrapper handling background tone and vertical rhythm.
 * Dark sections flip text colour so children inherit sensible defaults.
 */
export function Section({
  children,
  tone = "bone",
  className,
  flush = false,
  contained = true,
  id,
  ...rest
}: SectionProps) {
  const body = contained ? <Container>{children}</Container> : children;
  return (
    <section
      id={id}
      className={cn(
        tone === "ink"
          ? "bg-gradient-to-b from-ink-800 to-ink text-bone"
          : "bg-bone text-ink",
        !flush && "py-16 md:py-22 lg:py-30",
        className,
      )}
      {...rest}
    >
      {body}
    </section>
  );
}
