"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanyStat } from "@/types";

/** Split a stat value like "400+" into its number (400) and suffix ("+"). */
function parseValue(value: string): { target: number; prefix: string; suffix: string } {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { target: NaN, prefix: value, suffix: "" };
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
}

/**
 * A single headline statistic: large value over a small label. The number
 * counts up from zero the first time it scrolls into view (skipped for
 * reduced-motion users and when the value isn't numeric).
 */
export function StatItem({ value, label }: CompanyStat) {
  const { target, prefix, suffix } = parseValue(value);
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(Number.isNaN(target) ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo for a quick-then-settle count.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-heading text-4xl font-bold leading-none text-lime tabular-nums md:text-5xl">
        {display}
      </span>
      <span className="text-xs uppercase tracking-wide text-muted-dark md:text-sm">{label}</span>
    </div>
  );
}
