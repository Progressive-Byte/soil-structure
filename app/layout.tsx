import type { Metadata } from "next";
import { Suspense } from "react";
import { Archivo, Instrument_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { getSiteConfig } from "@/lib/data/company";
import { defaults, siteUrl } from "@/lib/seo";

// Headings: Archivo. Body: Instrument Sans. Exposed as CSS variables consumed
// by the Tailwind `font-heading` / `font-body` tokens.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${defaults.siteName} — ${defaults.description}`,
    template: `%s — ${defaults.siteName}`,
  },
  description: defaults.description,
  icons: { icon: "/images/brand/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig();

  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        <Header nav={config.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer config={config} />
      </body>
    </html>
  );
}
