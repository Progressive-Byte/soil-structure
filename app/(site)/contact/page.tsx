import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { getSiteConfig } from "@/lib/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to our engineers about your site and we'll tell you what the ground is likely to ask of your structure.",
  path: "/contact",
});

// This page layout is not in the Figma; it reuses the landing page's system.
export default function ContactPage() {
  const config = getSiteConfig();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="What's beneath your next project?"
        intro="Tell us about your site and what you're planning to build. We'll get back to you with a first read on what the ground is likely to ask of your structure."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <ContactForm />
          </div>
          <aside className="lg:border-l lg:border-line lg:pl-10">
            <h2 className="text-eyebrow font-semibold uppercase text-muted">Get in touch</h2>
            <address className="mt-5 space-y-1 not-italic text-ink">
              {config.contact.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm text-muted">Phone</dt>
                <dd>
                  <a
                    href={`tel:${config.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="font-medium text-ink hover:text-lime-600"
                  >
                    {config.contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="font-medium text-ink hover:text-lime-600"
                  >
                    {config.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
