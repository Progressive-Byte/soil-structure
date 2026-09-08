import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const disciplines = [
  "Structural",
  "Geotechnical",
  "Architectural",
  "Electrical",
  "Mechanical",
  "Environmental",
  "Water Resources",
  "Project Management",
];

/**
 * "We are integrators." — a dark rounded card inset in the page, with the eight
 * disciplines shown as bordered pills on the right.
 */
export function IntegratedPractice() {
  return (
    <section className="bg-bone py-6 md:py-10">
      <Container>
        <div className="rounded-[1.75rem] bg-ink px-6 py-12 text-bone md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <SectionEyebrow tone="bone">How we work</SectionEyebrow>
              <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
                We are integrators.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-dark md:text-lg">
                Our strengths and skills in Structural, Architectural, Electrical,
                Mechanical, Geotechnical, Environmental, Water Resources Engineering
                and Project Management allow us to deliver complete solutions to
                complex problems.
              </p>
              <p className="mt-4 max-w-2xl text-small leading-relaxed text-muted-dark/80">
                Our clients tell us that one of the best things about working with
                us is that we are able to adapt to the business needs and
                information flow of the companies we work for, meaning we can offer
                value and services at any point in the engineering process.
              </p>
            </div>

            <div>
              <h3 className="text-eyebrow font-semibold uppercase text-muted-dark">
                Eight disciplines, one team
              </h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {disciplines.map((item) => (
                  <li key={item}>
                    <span className="inline-flex rounded-full border border-bone/20 px-4 py-2 text-small font-medium text-bone">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
