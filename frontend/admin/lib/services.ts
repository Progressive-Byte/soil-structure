// Services are still static content owned by the public site (see
// frontend/web/lib/data/services.ts) — this is just the slug/title pairs the
// Projects form needs for its "services delivered" checkboxes, kept here
// since admin/ is a fully separate app with no import access into web/.
export const SERVICE_OPTIONS = [
  { slug: "geotechnical-investigation", title: "Geotechnical Investigation" },
  { slug: "foundation-design", title: "Foundation Design" },
  { slug: "structural-engineering", title: "Structural Engineering" },
  { slug: "seismic-ground-improvement", title: "Seismic & Ground Improvement" },
] as const;
