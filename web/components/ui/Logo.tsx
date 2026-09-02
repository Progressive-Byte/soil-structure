import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Rendered height of the logo in pixels (defaults to 44). */
  height?: number;
};

/**
 * Brand lockup — the supplied logo PNG (gradient shield above the
 * "Soil & Structure" wordmark, 288×205). Rendered as-is; width scales from the
 * chosen height to preserve the original proportions.
 */
export function Logo({ className, height = 44 }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Soil & Structure — home"
      className={cn("inline-flex items-center rounded-[10px] bg-white p-[5px]", className)}
    >
      <Image
        src="/images/brand/logo.png"
        alt="Soil & Structure"
        width={Math.round((288 / 205) * height)}
        height={height}
        priority
        className="w-auto"
        style={{ height }}
      />
    </Link>
  );
}
