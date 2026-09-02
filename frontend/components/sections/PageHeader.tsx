import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

/**
 * Consistent interior-page hero on the dark ink tone, reused across Projects,
 * Services, About and Contact. (Interior page layouts are not in the Figma;
 * this matches the landing page's system — see README.)
 */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <div className="bg-ink text-bone">
      <Container className="py-16 md:py-22">
        <SectionEyebrow tone="bone">{eyebrow}</SectionEyebrow>
        <h1 className="mt-5 max-w-3xl font-heading text-display-sm font-bold tracking-tight md:text-display-lg">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-dark md:text-lg">
            {intro}
          </p>
        )}
      </Container>
    </div>
  );
}
