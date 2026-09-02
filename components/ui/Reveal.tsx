"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Direction the content travels in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  as?: keyof JSX.IntrinsicElements;
};

const hiddenOffset: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

/**
 * Scroll-triggered reveal. Fades and slides its children into place the first
 * time they enter the viewport, then stays put. Honours prefers-reduced-motion
 * by rendering the content immediately with no motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion users see content immediately, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  const props = {
    ref,
    style: { transitionDelay: visible ? `${delay}ms` : "0ms" },
    className: cn(
      "transition-[opacity,transform] duration-700 ease-smooth will-change-transform motion-reduce:transition-none",
      visible ? "translate-x-0 translate-y-0 opacity-100" : cn("opacity-0", hiddenOffset[from]),
      className,
    ),
  };

  return <Component {...props}>{children}</Component>;
}
