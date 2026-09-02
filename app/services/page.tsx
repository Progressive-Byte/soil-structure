import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { getServices } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Geotechnical investigation, foundation design, structural engineering and ground improvement — delivered by one integrated team.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Ground up. Start to finish."
        intro="Four capabilities, one team. Site investigation, foundations, structures and ground improvement developed on the same drawings."
      />
      <Section flush className="py-16 md:py-22">
        {services.length === 0 ? (
          <div className="container-page">
            <EmptyState title="No services listed yet" />
          </div>
        ) : (
          <div className="container-page flex flex-col divide-y divide-line">
            {services.map((service) => (
              <article
                key={service._id}
                id={service.slug}
                className="grid scroll-mt-24 gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12 first:pt-0"
              >
                <div className={service.order % 2 === 0 ? "md:order-2" : undefined}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-image">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-heading text-lg font-bold text-muted">
                    {service.number}
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                    {service.description}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-ink">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-lime-600"
                          aria-hidden="true"
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button href={`/services/${service.slug}`} variant="outline">
                      Learn more
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
