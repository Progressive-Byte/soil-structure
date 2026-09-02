import type { Metadata } from "next";

const siteName = "Soil & Structure";
const description =
  "Geotechnical and structural engineering consultants. Ground investigation and structural design, engineered as one system.";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Build per-route metadata using the Next.js Metadata API, with sensible
 * defaults and Open Graph / Twitter cards. Pass a page title and description;
 * the site name is appended via the template in the root layout.
 */
export function buildMetadata({
  title,
  description: desc = description,
  path = "/",
  image = "/images/hero-steel-frame.jpg",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${siteName}`,
      description: desc,
      url,
      siteName,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteName}`,
      description: desc,
      images: [image],
    },
  };
}

export const defaults = { siteName, description };
