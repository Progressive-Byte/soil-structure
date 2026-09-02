import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Soil & Structure website.",
  path: "/terms",
});

// Placeholder legal page (not in the Figma) so the footer link resolves.
export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-16 md:py-22">
      <h1 className="font-heading text-display-sm font-bold tracking-tight">Terms of Use</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
        <p>
          Placeholder copy. This page will contain the practice&rsquo;s terms of use. Replace with
          reviewed legal content before launch.
        </p>
        <p>
          Placeholder copy covering acceptable use, intellectual property, disclaimers and limitation
          of liability.
        </p>
      </div>
    </Container>
  );
}
