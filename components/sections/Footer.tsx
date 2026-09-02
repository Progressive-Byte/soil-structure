import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SiteConfig } from "@/types";

type FooterProps = {
  config: SiteConfig;
};

/** Dark site footer: brand + contact, three link columns, social, legal bar. */
export function Footer({ config }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone">
      <div className="container-page pb-16 pt-[50px] md:pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Link
              href="/"
              aria-label="Soil & Structure — home"
              className="inline-flex rounded-[10px] bg-white p-[5px]"
            >
              <Image
                src="/images/brand/logo.png"
                alt="Soil & Structure"
                width={225}
                height={160}
                className="h-16 w-auto"
              />
            </Link>
            <address className="mt-6 space-y-1 not-italic text-sm text-muted-dark">
              {config.contact.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div className="pt-2">
                <a href={`tel:${config.contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-bone">
                  {config.contact.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${config.contact.email}`} className="hover:text-bone">
                  {config.contact.email}
                </a>
              </div>
            </address>
            <div className="mt-6 flex gap-3">
              {config.social.map((link) => (
                <SocialIcon key={link.platform} link={link} tone="bone" />
              ))}
            </div>
          </div>

          {/* Link columns */}
          {config.footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-eyebrow font-semibold uppercase text-muted-dark">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-bone/85 hover:text-lime">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-dark md:flex-row">
          <p>
            Copyright © {year} {config.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-bone">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-bone">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
