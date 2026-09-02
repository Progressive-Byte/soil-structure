import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for the Soil & Structure website.",
  path: "/privacy",
});

// Placeholder legal page (not in the Figma) so the footer link resolves.
export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 md:py-22">
      <h1 className="font-heading text-display-sm font-bold tracking-tight">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
        <p>
          Placeholder copy. This page will describe how the practice collects, uses and protects
          personal data. Replace with reviewed legal content before launch.
        </p>
        <p>
          Placeholder copy covering data collected via the contact form, cookies, third-party
          processors and your rights.
        </p>
      </div>
    </Container>
  );
}
