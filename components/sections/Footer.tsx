import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SiteConfig } from "@/types";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";

type FooterProps = {
  config: SiteConfig;
};

/** Dark rounded footer card: brand + contact, three link columns, legal bar. */
export function Footer({ config }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bone pb-6 md:pb-10">
      <Container>
        <div className="rounded-[1.75rem] bg-ink px-6 py-12 text-bone md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
            {/* Brand + contact */}
            <div>
              <Link href="/" aria-label="Soil and Structure — home" className="inline-flex">
                <Image
                  src="/images/brand/logo-soil-structure-reversed.png"
                  alt="Soil and Structure"
                  width={786}
                  height={132}
                  className="h-11 w-auto"
                />
              </Link>
              <address className="mt-6 space-y-1 not-italic text-small text-muted-dark">
                {config.contact.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
              <div className="mt-5 space-y-1 text-small">
                <a
                  href={`tel:${config.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="block text-muted-dark hover:text-bone"
                >
                  {config.contact.phone}
                </a>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="block "
                >
                  {config.contact.email}
                </a>
                <li className="flex items-center gap-4">
                  <a href={config.social[1].href} className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-lime">
                    <BiLogoFacebook size={22} />
                  </a>
                  <a
                  //  href={config.social[1].href} 
                   className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-lime">
                    <BiLogoLinkedin size={22} />
                  </a>
                </li>
              </div>
            </div>

            {/* Link columns */}
            {config.footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-eyebrow font-semibold uppercase text-lime">{column.heading}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-small text-bone/85 hover:text-lime">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Legal bar */}
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line-dark pt-6 text-xs text-muted-dark md:flex-row md:items-center">
            <p>
              © {year} {config.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-bone">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-bone">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
