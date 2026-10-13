"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export type HeroSlide = {
  image: { src: string; alt: string };
  title: string;
  intro: string;
  href: string;
};

type HeroCarouselProps = {
  eyebrow: React.ReactNode;
  slides: HeroSlide[];
  compact?: boolean;
};

export function HeroCarousel({
  eyebrow,
  slides,
  compact = false,
}: HeroCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  if (slides.length === 0) return null;

  return (
    <div
      className="hero-copy-carousel relative  overflow-hidden rounded-image bg-ink shadow-card-dark motion-safe:animate-rise md:mt-8"
      style={{ animationDelay: "60ms" }}
    >
      <Swiper
        className="hero-panel-carousel"
        modules={[A11y, Autoplay, Pagination]}
        slidesPerView={1}
        loop={slides.length > 1}
        pagination={{ clickable: true }}
        autoplay={
          slides.length > 1
            ? {
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
            : false
        }
        onSwiper={setSwiper}
        a11y={{
          enabled: true,
          paginationBulletMessage: "Go to slide {{index}}",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.title}-${index}`}>
            <div
              className={`relative flex flex-col justify-end items-start p-6 pb-20 md:p-12 md:pb-12 lg:p-16 ${compact
                ? "min-h-[360px] md:min-h-[430px] lg:min-h-[480px]"
                : "min-h-[540px] md:min-h-[560px] lg:min-h-[600px]"
                }`}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/50 to-ink/25 md:bg-gradient-to-r md:from-ink/80 md:via-ink/60 md:to-ink/35"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-2xl">
                <h1
                  className={`mt-6 font-heading text-display-sm font-extralight uppercase tracking-tighter text-bone motion-safe:animate-rise md:text-display-md ${compact ? "lg:text-display-md" : "lg:text-display-lg"
                    }`}
                  style={{ animationDelay: "260ms" }}
                >
                  {slide.title}
                </h1>
                  <div
                    className="md:mt-6 mt-4 flex flex-wrap gap-3 motion-safe:animate-rise"
                    style={{ animationDelay: "460ms" }}
                  >
                      <Button
                        href={slide.href}
                        variant="lime" className="motion-safe:animate-btn-pulse">
                        View Details
                      </Button>
                  </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2 md:bottom-6 md:right-6">
          <Button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiper?.slidePrev()}
            variant="outline-lime"
            size="sm"
            className="h-10 w-10 !p-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m7 7-7-7 7-7"
              />
            </svg>
          </Button>

          <Button
            type="button"
            aria-label="Next slide"
            onClick={() => swiper?.slideNext()}
            variant="outline-lime"
            size="sm"
            className="h-10 w-10 !p-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7 7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
