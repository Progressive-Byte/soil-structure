"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

type HeaderProps = {
  nav: NavLink[];
};

/**
 * Sticky site header with the primary navigation and CTA.
 * Client component: tracks scroll state and the mobile menu toggle.
 */
export function Header({ nav }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** href of the desktop submenu currently open, if any. */
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  /** hrefs of the submenus expanded in the mobile panel. */
  const [expanded, setExpanded] = useState<string[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    setExpanded([]);
  }, [pathname]);

  // Escape closes an open dropdown; a click outside the nav does the same.
  useEffect(() => {
    if (!openSubmenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSubmenu(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenSubmenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openSubmenu]);

  // Clear any pending close timer on unmount.
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  /** Hovering away closes after a short grace period so the pointer can travel
      from the trigger down into the panel without it vanishing. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenSubmenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /** A parent is highlighted when it, or any of its children, is the current page. */
  const isBranchActive = (link: NavLink) =>
    isActive(link.href) || (link.children?.some((c) => isActive(c.href)) ?? false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        scrolled ? "bg-bone/90 shadow-sm backdrop-blur" : "bg-bone",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block" ref={navRef}>
          <ul className="flex items-center gap-7">
            {nav.map((link) => {
              const linkClasses = cn(
                "relative py-1 text-base font-medium transition-colors hover:text-ink",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-300 after:ease-smooth hover:after:w-full",
                isBranchActive(link) ? "text-ink after:w-full" : "text-muted after:w-0",
              );

              if (!link.children?.length) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={linkClasses}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              const open = openSubmenu === link.href;
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenSubmenu(link.href);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={linkClasses}
                      onFocus={() => setOpenSubmenu(link.href)}
                    >
                      {link.label}
                    </Link>
                    {/* Separate control so the parent link stays navigable while
                        keyboard and touch users can still open the submenu. */}
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${link.label} submenu`}
                      onClick={() => setOpenSubmenu(open ? null : link.href)}
                      className="inline-flex h-6 w-4 items-center justify-center text-muted transition-colors hover:text-ink"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200 ease-smooth",
                          open && "rotate-180",
                        )}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  <ul
                    className={cn(
                      "absolute left-0 top-full z-50 min-w-[13rem] rounded-card border border-line bg-bone-50 p-2 shadow-card",
                      "origin-top transition-all duration-200 ease-smooth",
                      open
                        ? "visible translate-y-1 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                    onFocus={cancelClose}
                    onBlur={scheduleClose}
                  >
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          tabIndex={open ? undefined : -1}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                            isActive(child.href)
                              ? "bg-bone-200 text-ink"
                              : "text-muted hover:bg-bone-200 hover:text-ink",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="lime" size="md">
            Request a Consultation
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-bone lg:hidden"
        >
          <ul className="container-page flex flex-col py-4">
            {nav.map((link) => {
              const isOpen = expanded.includes(link.href);
              return (
                <li key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block flex-1 py-3 text-base font-medium",
                        isBranchActive(link) ? "text-ink" : "text-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children?.length ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${link.label} submenu`}
                        onClick={() =>
                          setExpanded((prev) =>
                            prev.includes(link.href)
                              ? prev.filter((h) => h !== link.href)
                              : [...prev, link.href],
                          )
                        }
                        className="inline-flex h-11 w-11 items-center justify-center text-muted"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                          className={cn(
                            "h-4 w-4 transition-transform duration-200 ease-smooth",
                            isOpen && "rotate-180",
                          )}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    ) : null}
                  </div>

                  {link.children?.length && isOpen ? (
                    <ul className="mb-2 ml-3 border-l border-line pl-4">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className={cn(
                              "block py-2.5 text-base font-medium",
                              isActive(child.href) ? "text-ink" : "text-muted",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
            <li className="pt-3">
              <Button href="/contact" variant="lime" size="lg" className="w-full">
                Request a Consultation
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
