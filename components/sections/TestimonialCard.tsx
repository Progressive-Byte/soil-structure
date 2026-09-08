import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

/** A quote card with a large quotation mark, quote and attribution. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-bone-50 p-6 md:p-8">
      <span className="font-heading text-5xl leading-none text-lime-600" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-1 text-small leading-relaxed text-ink">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <div className="font-heading font-bold text-ink">{testimonial.authorName}</div>
        <div className="text-small text-muted">
          {testimonial.authorRole}, {testimonial.company}
        </div>
      </figcaption>
    </figure>
  );
}
