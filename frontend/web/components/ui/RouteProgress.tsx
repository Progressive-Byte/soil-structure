"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Slim progress bar shown under the sticky navbar while navigating between
 * pages. Starts on any left-click of an internal <a> (all nav/links render
 * next/link, so this covers the whole site from one place) and completes
 * once the route actually changes; there is no App Router navigation-start
 * event to hook into directly, so the click is the trigger.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevRouteKeyRef = useRef(routeKey);

  useEffect(() => {
    if (prevRouteKeyRef.current === routeKey) return;
    prevRouteKeyRef.current = routeKey;

    if (tickRef.current) clearInterval(tickRef.current);
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 200);
  }, [routeKey]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      const isSamePage =
        url.origin !== window.location.origin ||
        (url.pathname === window.location.pathname && url.search === window.location.search);
      if (isSamePage) return;

      if (hideRef.current) clearTimeout(hideRef.current);
      if (tickRef.current) clearInterval(tickRef.current);

      setVisible(true);
      setProgress(15);
      tickRef.current = setInterval(() => {
        setProgress((current) => (current >= 90 ? current : current + (90 - current) / 8));
      }, 200);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (tickRef.current) clearInterval(tickRef.current);
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      // top-20 tracks the h-20 navbar row in components/sections/Header.tsx.
      className="pointer-events-none fixed inset-x-0 top-20 z-40 h-[2px] w-full"
    >
      <div
        className="h-full bg-lime transition-[width,opacity] duration-200 ease-smooth motion-reduce:transition-opacity"
        style={{ width: `${progress}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
