import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Rendered height of the logo in pixels (defaults to 44). */
  height?: number;
};

/**
 * Brand lockup — the "SOIL and STRUCTURE" horizontal logo (lime rounded-square
 * monogram + wordmark, 659×176). Rendered as-is; width scales from the chosen
 * height to preserve the original proportions.
 */
export function Logo({ className, height = 40 }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Soil and Structure — home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/images/brand/logo-soil-structure.png"
        alt="Soil and Structure"
        width={Math.round((659 / 176) * height)}
        height={height}
        priority
        className="w-auto"
        style={{ height }}
      />
    </Link>
  );
}
