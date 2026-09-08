import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { getSiteConfig } from "@/lib/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Let's talk about your project. Reach Soil & Structure by phone, by email, or send us the details of your site.",
  path: "/contact",
});

const icons = {
  office: (
    <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  ),
  phone: (
    <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L21 15v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  ),
  email: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
};

function InfoIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export default function ContactPage() {
  const config = getSiteConfig();
  const tel = config.contact.phone.replace(/[^\d+]/g, "");

  return (
    <>
      <section className="bg-bone pb-10 pt-10 md:pb-16 md:pt-14">
        <Container>
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Contact</span>
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
            <h1 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">
              Let&rsquo;s talk about your project.
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg lg:pt-2">
              We are here to solve your problems. Reach us by phone, by email, or
              send us the details of your site.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
            {/* Form card */}
            <div className="rounded-[1.75rem] bg-bone-200 p-8 md:p-10">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-ink">
                Send us a message
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact info card */}
            <div className="rounded-[1.75rem] bg-ink p-8 text-bone md:p-10">
              <p className="text-eyebrow font-semibold uppercase text-lime">
                Dhaka, Bangladesh
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                {config.name}
              </h2>

              <ul className="mt-8 space-y-7">
                <li className="flex gap-4">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-lime">
                    <InfoIcon name="office" />
                  </span>
                  <div>
                    <p className="text-eyebrow font-semibold uppercase text-muted-dark">Office</p>
                    <address className="mt-1 space-y-0.5 not-italic text-small text-bone">
                      {config.contact.addressLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </address>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-lime">
                    <InfoIcon name="phone" />
                  </span>
                  <div>
                    <p className="text-eyebrow font-semibold uppercase text-muted-dark">Phone</p>
                    <a href={`tel:${tel}`} className="mt-1 block text-small text-bone hover:text-lime">
                      {config.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-lime">
                    <InfoIcon name="email" />
                  </span>
                  <div>
                    <p className="text-eyebrow font-semibold uppercase text-muted-dark">Email</p>
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="mt-1 block break-all text-small text-bone hover:text-lime"
                    >
                      {config.contact.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
