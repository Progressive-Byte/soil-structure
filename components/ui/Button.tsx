import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "lime" | "dark" | "light" | "outline" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-[color,background-color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-colors";

/** Arrow that nudges to the right on hover — used when `withArrow` is set. */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover/btn:translate-x-1 motion-reduce:transform-none"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const variants: Record<Variant, string> = {
  // Primary CTA — lime pill on dark text.
  lime: "bg-lime text-ink hover:bg-lime-400 ring-offset-bone",
  // Solid dark pill for use on light backgrounds.
  dark: "bg-ink text-bone hover:bg-ink-800 ring-offset-bone",
  // Solid light pill for use on dark backgrounds.
  light: "bg-bone text-ink hover:bg-bone-200 ring-offset-ink",
  // Outline on light backgrounds.
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5 ring-offset-bone",
  // Outline on dark backgrounds.
  "outline-light":
    "border border-bone/30 text-bone hover:border-bone hover:bg-bone/10 ring-offset-ink",
};

const sizes: Record<Size, string> = {
  // Compact 14px pill — used by the admin panel's dense forms and toolbars.
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-small",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Append a right-arrow that nudges on hover. */
  withArrow?: boolean;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Polymorphic button/link. Renders a Next.js <Link> when `href` is provided
 * (internal or external), otherwise a native <button>.
 */
export function Button({
  variant = "lime",
  size = "md",
  className,
  withArrow = false,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && <ArrowIcon />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
