# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Soil & Structure — a marketing/content website for a geotechnical and structural
engineering consultancy. Next.js 14 (App Router) + TypeScript + Tailwind CSS,
currently in a **static content phase**: all content is served from JSON
fixtures in `/data` through an async data layer in `/lib/data`, so swapping in
a real Node.js + MongoDB API later requires editing only that layer.

For full detail beyond this file, read **README.md** (backend integration plan,
tech stack, env vars) and **PROJECT_GUIDE.md** (file-by-file edit map, design
token guide, animation reference, troubleshooting).

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build — also type-checks and lints
npm run start      # serve production build (run build first)
npm run lint       # ESLint (next/core-web-vitals config)
npm run typecheck  # tsc --noEmit
```

There is no test runner configured in this repo. Before finishing a session,
run `npm run build` — it type-checks and lints, so a clean build is the bar for
"done."

## Architecture

**Data layer is the single swap point.** Nothing outside `/lib/data` and
`/lib/api` should know that content currently comes from local JSON:

- `data/*.json` — mock content, shaped like MongoDB documents (every type in
  `types/index.ts` extends `BaseDocument` with `_id`/`createdAt`/`updatedAt`).
- `lib/data/_client.ts` — the `read()` primitive every getter calls. It
  currently `structuredClone`s a JSON import and wraps it in a Promise; the
  doc comment there shows the exact `fetch()` replacement for when the real
  API exists. Change `read()` here, not the callers.
- `lib/data/*.ts` (`projects.ts`, `services.ts`, `team.ts`, `testimonials.ts`,
  `company.ts`) — one file per content type, each exposing async getters
  (`getProjects`, `getProjectBySlug`, `getProjectsBySector`, etc.).
  Pages/components call these, never the JSON files directly.
- `lib/api/contact.ts` — contact form validation (`validateContactForm`) and
  submission (`submitContactForm`); the real backend call is a marked
  `TODO(backend)` inside `submitContactForm`.

When adding a new content type: add a JSON fixture in `/data`, a matching
interface in `types/index.ts` extending `BaseDocument`, and a getter file in
`/lib/data` that calls `read()` — following the pattern in `lib/data/projects.ts`.

**Routing.** `app/` uses the Next.js App Router. List pages
(`projects/`, `services/`, `insights/`, `careers/`) each pair with a
`[slug]/` detail route; `projects/` and `insights/` also have `loading.tsx`
skeleton states (the 600ms artificial delay in `submitContactForm` and the
`read()` Promise wrapping exist partly to exercise these). `sitemap.ts` and
`robots.ts` are generated from the same data layer.

**Components split by role**, not by page:
- `components/ui/` — generic primitives (Button, Container, Section, Field,
  Reveal, Skeleton, Tag, StatItem, …), reused across pages.
- `components/sections/` — page-specific blocks (Header, Footer, Hero,
  ServicesGrid, SelectedWork, Testimonials, ContactForm, PageHeader, …),
  each usually mapped to one content type from `/lib/data`.

**Design tokens live in `tailwind.config.ts`**, extracted from the source
Figma file ("S&S Landing Page — Warm (Bone + Lime)"). Components must use
token classes (`bg-bone`, `text-ink`, `bg-lime`, `bg-muted`, `border-line`,
`text-display-lg`, `rounded-card`, etc.) rather than arbitrary Tailwind values
— this keeps the palette/type-scale/radius centrally editable.

⚠️ **Editing `tailwind.config.ts` requires a dev server restart** — Tailwind
config is not hot-reloaded and will otherwise 500 briefly. Editing JSON, TSX,
or `styles/globals.css` does not require a restart.

Fonts are wired via `next/font` in `app/layout.tsx` (Archivo for headings,
Instrument Sans for body) into the `--font-heading`/`--font-body` CSS
variables that `fontFamily.heading`/`fontFamily.body` in the Tailwind config
consume.

**Animations are dependency-free** (CSS keyframes in `tailwind.config.ts` +
`components/ui/Reveal.tsx`'s IntersectionObserver), and respect
`prefers-reduced-motion` via Tailwind's `motion-safe:`/`motion-reduce:`
variants — don't reach for an animation library.

## Environment

`.env.local` (git-ignored, copy from `.env.example`) provides
`NEXT_PUBLIC_SITE_URL` (used in SEO metadata/sitemap via `lib/seo.ts`) and
`NEXT_PUBLIC_API_URL` (unused today, read by `lib/data/_client.ts` for the
future API).
