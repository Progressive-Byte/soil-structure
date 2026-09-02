import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
};

/** Image card with a numbered service title and summary; links to detail. */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block transition-transform duration-300 ease-smooth hover:-translate-y-1 focus-visible:outline-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-image transition-shadow duration-500 group-hover:shadow-card-hover">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[600ms] ease-smooth group-hover:scale-[1.06]"
        />
      </div>
      <div className="mt-4 flex items-baseline gap-4">
        <span className="font-heading text-lg font-bold text-muted">{service.number}</span>
        <div>
          <h3 className="font-heading text-xl font-bold tracking-tight text-ink group-hover:text-ink/80 md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-1 text-sm text-muted md:text-base">{service.summary}</p>
        </div>
      </div>
    </Link>
  );
}
