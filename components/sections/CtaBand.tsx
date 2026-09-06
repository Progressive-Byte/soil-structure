import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type CtaBandProps = {
  heading?: string;
  body?: string;
};

/** Full-width lime call-to-action band above the footer. */
export function CtaBand({
  heading = "We are here to solve your problems.",
  body = "Tell us about your site, your structure or your schedule. We will tell you how we would approach it.",
}: CtaBandProps) {
  return (
    <section className="bg-bone pt-4 pb-16 md:pb-24">
      <Container>
        <div className="rounded-card bg-lime px-6 py-12 md:px-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-display-sm font-bold tracking-tight text-ink">
                {heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/80 md:text-lg">{body}</p>
            </div>
            <Button href="/contact" variant="dark" size="lg" withArrow className="self-start lg:self-auto">
              Start a Conversation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
