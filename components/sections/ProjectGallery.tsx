"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

type ProjectGalleryProps = {
  images: ImageAsset[];
};

/**
 * Cover image + gallery images as one sliding carousel (dependency-free —
 * a translateX track, per CLAUDE.md's animation guidance). Arrows/dots only
 * render when there's more than one slide.
 */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  if (images.length === 0) return null;

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-image shadow-card">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-smooth motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, i) => (
          <div key={i} className="relative h-full w-full flex-none">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-bone backdrop-blur transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
          >
            <GalleryArrow direction="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-bone backdrop-blur transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
          >
            <GalleryArrow direction="right" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  i === index ? "w-6 bg-lime" : "w-2 bg-bone/60 hover:bg-bone",
                )}
              />
            ))}
          </div>

          <p className="absolute right-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-bone backdrop-blur">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>
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
