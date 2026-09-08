"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ImageAsset } from "@/types";

type ProjectGalleryProps = {
  images: ImageAsset[];
};

/** Thumbnails shown inline before the strip collapses into a "+N" tile. */
const MAX_THUMBS = 4;

/**
 * Small thumbnail strip that opens a full-screen lightbox on click —
 * matches the compact "Gallery: N images" pattern (thumbnails + zoom-to-view
 * modal with prev/next) rather than an inline slider.
 */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  const visibleThumbs = images.slice(0, MAX_THUMBS);
  const extraCount = images.length - visibleThumbs.length;

  return (
    <div>
      <p className="text-eyebrow font-semibold uppercase text-muted">
        Gallery: {images.length} {images.length === 1 ? "image" : "images"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {visibleThumbs.map((image, i) => {
          const isLastWithExtra = extraCount > 0 && i === visibleThumbs.length - 1;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open image ${i + 1} of ${images.length}`}
              className="group relative h-20 w-28 flex-none overflow-hidden rounded-lg border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="112px"
                className="object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/40">
                <ZoomIcon className="h-6 w-6 text-bone opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
              {isLastWithExtra && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/60 text-small font-semibold text-bone">
                  +{extraCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 md:left-8"
              >
                <GalleryArrow direction="left" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 md:right-8"
              >
                <GalleryArrow direction="right" />
              </button>
            </>
          )}

          <div
            className="flex max-h-full w-full max-w-4xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <p className="text-small text-bone/70">
              Image {activeIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className={className}>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function GalleryArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
      />
    </svg>
  );
}
