# Soil & Structure

Marketing/product website for **Soil & Structure**, a geotechnical and structural
engineering consultancy. Built from the Figma design *"S&S Landing Page — Warm
(Bone + Lime)"*.

The site is a fully responsive, multi-page build. It is currently in a **static
phase**: all content is served from mock JSON through an isolated data layer, so
that swapping in a real database-backed API later requires editing **only the
data layer** — never the components.

> New to the project or moving it to another machine? Start with
> **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)**.

---

## Tech stack

**Current (this repo):**
- **React** via **Next.js 14** (App Router) — runs on **Node.js**
- **TypeScript**
- **Tailwind CSS** (design tokens extracted from Figma)
- Content: mock **JSON** fixtures behind an async data layer (`/lib/data`)

**Planned backend (not in this repo yet):**
- **Node.js** API layer (Express-style) exposing the same data shapes
- **MongoDB** for persistence

> Note: this is a single Next.js application (React front end + Node runtime),
> **not** a separate client/server setup today. When the API is added it can live
> in this repo (e.g. a `/server` workspace) or a separate service; the front end
> already reads through `/lib/data/*` so only that layer changes. See
> [Backend integration](#backend-integration) below.

---

## Prerequisites

- **Node.js 18.18+ or 20+** (developed on Node 24) — https://nodejs.org
- **npm** (bundled with Node)

---

## Setup & running

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local          # Windows PowerShell: Copy-Item .env.example .env.local

# 3. Start the dev server (client + server render together via Next.js)
npm run dev
# → http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server at http://localhost:3000 (hot reload) |
| `npm run build` | Production build (also type-checks and lints) |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

> There is no separate "server" process to start in this phase — Next.js handles
> both rendering and routing. When the standalone Node/MongoDB API is introduced,
> its own `npm run dev`/`start` scripts and instructions will be added here.

---

## Environment variables

Copy `.env.example` → `.env.local` and set values as needed. `.env.local` is
git-ignored and must never be committed.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | later | Base URL of the future Node.js/MongoDB API. Unused in the static phase but read by the data layer, so switching to live data needs no code wiring. |
| `NEXT_PUBLIC_SITE_URL` | yes | Public site URL, used for canonical/Open Graph URLs and the generated sitemap. |

Share **`.env.example`** (variable names only, no secrets) with teammates — never
share `.env.local`.

---

## Project structure

```
app/            Routes & pages (Next.js App Router)
components/      ui/ (primitives) and sections/ (page blocks)
lib/
  data/         Async data-access functions — the single swap point for the API
  api/          Form handler stub (backend TODO marked inside)
  seo.ts        Metadata helper
data/            Mock JSON fixtures (MongoDB-shaped documents)
types/           Shared TypeScript interfaces
styles/          Global CSS + Tailwind layers
public/images/   Brand, project and service imagery
tailwind.config.ts   Design tokens (colours, type scale, spacing, animations)
```

See [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for a detailed edit map, design-token
guide, and animation reference.

---

## Backend integration

The data layer is the only place that knows where content comes from. To connect
the Node.js + MongoDB API later:

1. Replace the body of `read()` in `lib/data/_client.ts` with a `fetch()` against
   `NEXT_PUBLIC_API_URL` (or a direct DB call in a server context).
2. Point each `lib/data/*.ts` getter at the API, keeping the same function
   signatures (`getProjects`, `getProjectBySlug`, …).
3. Wire `lib/api/contact.ts` to the real `POST /contact` endpoint (marked
   `TODO(backend)`).

**No components or pages change** — they consume Promises of the interfaces in
`/types`, which are already shaped like MongoDB documents (`_id`, `createdAt`,
`updatedAt`). The JSON in `/data` doubles as seed data.

Suggested MongoDB collections: `projects`, `services`, `testimonials`, `team`,
`jobs`, `insights`, plus a `siteConfig` document for nav/footer/contact.
