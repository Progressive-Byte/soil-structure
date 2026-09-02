import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "../styles/globals.css";
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

// True root layout — just html/body/fonts. The public site's Header/Footer
// live in app/(site)/layout.tsx instead of here, so /admin/* (a sibling
// segment, not inside the (site) group) doesn't inherit them.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
