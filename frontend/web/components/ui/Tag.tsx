import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  /** Visual style. */
  variant?: "solid" | "outline" | "muted";
  className?: string;
};

/** Small category / label pill (sectors, value words, article categories). */
export function Tag({ children, variant = "muted", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "solid" && "bg-lime text-ink",
        variant === "outline" && "border border-current text-current",
        variant === "muted" && "bg-ink/5 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
