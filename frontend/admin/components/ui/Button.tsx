import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "lime" | "dark" | "light" | "outline" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-[color,background-color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-ink hover:bg-lime-400 ring-offset-bone",
  dark: "bg-ink text-bone hover:bg-ink-800 ring-offset-bone",
  light: "bg-bone text-ink hover:bg-bone-200 ring-offset-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5 ring-offset-bone",
  "outline-light": "border border-bone/30 text-bone hover:border-bone hover:bg-bone/10 ring-offset-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
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

/** Polymorphic button/link, mirroring the public site's Button component. */
export function Button({ variant = "lime", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
