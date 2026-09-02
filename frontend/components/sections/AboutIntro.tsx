import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";

/** "Every structure begins below the surface" — intro block with image. */
export function AboutIntro() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionEyebrow>About Us</SectionEyebrow>
          <h2 className="mt-5 font-heading text-display-sm font-bold tracking-tight md:text-display-md">
            Every structure begins below the surface.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Placeholder copy. Soil &amp; Structure brings geotechnical
            investigation and structural design under one roof, so ground
            conditions shape the frame from the first sketch rather than the last
            revision. This paragraph is sample text and will be replaced with the
            client&rsquo;s own words.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="dark">
              More About Us
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-image">
          <Image
            src="/images/about-campus.jpg"
            alt="A completed campus building lit warmly at dusk"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
