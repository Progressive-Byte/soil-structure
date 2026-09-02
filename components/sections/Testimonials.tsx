import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "@/types";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

/** "What our clients say." — three quote cards. */
export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <Section id="testimonials">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionEyebrow>Client voices</SectionEyebrow>
          <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            What our clients say.
          </h2>
        </div>
        <Button href="/about#testimonials" variant="outline" className="self-start md:self-end">
          View Full Testimonials
        </Button>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <li key={testimonial._id}>
            <Reveal delay={i * 110} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
