import testimonialsData from "@/data/testimonials.json";
import type { Testimonial } from "@/types";
import { read } from "./_client";

const testimonials = testimonialsData as Testimonial[];

/** All testimonials, ordered by their `order` field. */
export async function getTestimonials(): Promise<Testimonial[]> {
  const all = await read(testimonials);
  return all.sort((a, b) => a.order - b.order);
}

/** Featured testimonials for the home section (defaults to the first three). */
export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const all = await getTestimonials();
  return all.filter((t) => t.featured).slice(0, limit);
}
