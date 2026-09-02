import { Suspense } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { getSiteConfig } from "@/lib/data/company";

/** Chrome for the public marketing site — everything except /admin/*. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
      >
        Skip to content
      </a>
      <Header nav={config.nav} />
      <Suspense fallback={null}>
        <RouteProgress />
      </Suspense>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer config={config} />
    </>
  );
}
