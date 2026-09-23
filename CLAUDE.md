# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Soil & Structure — a marketing site for a geotechnical and structural
engineering consultancy, plus an admin panel for managing its Projects.
Next.js 14 (App Router) + TypeScript + Tailwind CSS at the repo root, backed
by a separate Node/Express + MongoDB API in `server/`.

**Projects are dynamic** (stored in MongoDB, managed through the admin panel
at `/admin`); every other content type (services, team, testimonials, site
config, stats, process steps) is still static, authored directly as
TypeScript constants in `lib/data/*.ts` — there is no `/data` JSON directory.

There is no README.md. `CONTINUE_HERE.md` is a handoff/setup guide (moving the
project to a new machine, getting a database running, git push workflow) — read
it for onboarding steps; this file remains the source of architectural
guidance. See `.env.example` for the full list of env vars.

## Commands

Frontend (run from the repo root):
```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build — also type-checks and lints
npm run start      # serve production build (run build first)
npm run lint       # ESLint (next/core-web-vitals config)
npm run typecheck  # tsc --noEmit
```

Backend (the Express API in `server/`, port 4000):
```bash
npm run server:dev  # nodemon server/index.js
npm run server      # node server/index.js
```

Run both at once: `npm run dev:all`. There is no test runner configured —
before finishing a session, run `npm run build`, which type-checks and lints.

## Architecture

**Two halves, one `.env`.** The root `.env` (copy from `.env.example`) is
loaded by both: Next.js reads it natively (it lives next to `next.config.mjs`
and `package.json`), and `server/bootstrap.js` loads it explicitly via
`dotenv`. `NEXT_PUBLIC_API_URL` is the frontend's only link to the backend
(it already ends in `/api`, so frontend paths are written as
`/public/projects`, not `/api/public/projects`) — everything else backend-related (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`/
`ADMIN_PASSWORD`, `CORS_ORIGIN`, `CLOUDINARY_*`) is read only by `server/`.

### Frontend data layer

- `lib/data/projects.ts` — the one dynamic content type. Every getter
  (`getProjects`, `getFeaturedProjects`, `getProjectBySlug`,
  `getProjectsBySector`, `getProjectSectors`, `getPaginatedProjects`) calls
  `fetchAPI()` (in `lib/data/_client.ts`) against the Express API's
  `/public/projects*` routes, `cache: "no-store"` so admin edits show up
  immediately.
- `lib/data/{services,team,testimonials,company}.ts` — static content,
  authored as typed array/object constants directly in these files (no JSON,
  no fetch). Each still returns a Promise (via `_client.ts`'s `read()`, a thin
  `structuredClone`-and-resolve wrapper) so call sites are uniform with the
  dynamic getters above.
- `lib/api/contact.ts` — validates client-side, then posts to the Express
  API's `POST /api/contact` (`server/routes/contact.js`), which re-validates
  and sends the message via SMTP (`server/config/mailer.js`, `nodemailer`) to
  `CONTACT_TO_EMAIL`. Point `SMTP_*` at a Mailtrap sandbox in dev.

When adding a new **static** content type, follow the pattern in
`lib/data/services.ts` (typed constant + `read()`), not `data/*.json` — that
directory doesn't exist anymore. When extending **Projects**, the schema lives
in `server/models/Project.js` and the shape is mirrored in `types/index.ts`'s
`Project` interface — keep them in sync.

### Routing (`app/`)

Two top-level groups under `app/`, both part of the same single Next.js app
(one build, one port):
- `app/(site)/` — the public marketing site (home, about, projects, services,
  team, contact, terms, privacy). Its `layout.tsx` renders the Header/Footer/
  `RouteProgress` chrome. `app/layout.tsx` (the true root, outside the group)
  is deliberately minimal — just `<html>`/`<body>`/fonts — specifically so
  `/admin/*` (a sibling segment, not inside `(site)`) doesn't inherit the
  public site's header/footer. The projects list lives under its own
  `app/(site)/projects/(list)/` group (`page.tsx` + `loading.tsx` +
  `_components/ProjectsFilters.tsx`), a sibling of `projects/[slug]/`, so the
  list gets its own loading state without one leaking into the detail route.
- `app/admin/` — the Projects admin panel. `/admin` itself (`page.tsx`) just
  redirects to `/admin/projects` or `/admin/login`. `login/` is the public login page;
  everything under `(protected)/` is gated by that group's `layout.tsx`,
  which checks for a token in `localStorage` on mount and redirects to
  `/admin/login` if missing (real enforcement is server-side — see below).
  `app/admin/_lib/adminApi.ts` is the fetch wrapper every admin page uses:
  it injects the bearer token and clears it on a 401.

`app/(site)/projects/(list)/page.tsx` and
`app/admin/(protected)/projects/page.tsx` both use query-string state (`?q=`,
`?page=`, `?sort=`/`?sector=`) rather than component state — the public list
via the Server Component's `searchParams` prop (filter UI split out into the
client component `ProjectsFilters`), the admin list via
`useSearchParams`/`router.replace` (wrapped in `Suspense`, which
`useSearchParams` requires). `sitemap.ts` and `robots.ts` sit outside the
`(site)` group at the true `app/` root (Next.js special-cases these).

### Backend (`server/`, plain CommonJS — no `"type": "module"` in package.json)

- `server/bootstrap.js` — must be the **first** `require` in `server/index.js`
  and in any standalone Node script (e.g. `scripts/seed.js`): it loads the
  root `.env`, and calls `net.setDefaultAutoSelectFamily(false)` on purpose
  (the host's resolver returns unreachable NAT64 IPv6 addresses that break
  Cloudinary/SMTP calls otherwise) — don't remove it.
- `server/index.js` — Express app: CORS (multi-origin via comma-separated
  `CORS_ORIGIN`), `express.json()`, mounts the routers below under `/api/*`
  (plus `GET /api/health`), one generic error handler, listens on `PORT`.
- `server/config/db.js` — `mongoose.connect()`, exits the process on failure
  (fail-fast, no retry loop). `server/config/mailer.js` and
  `server/config/cloudinary.js` lazily build their respective clients from env
  on first use, so missing SMTP/Cloudinary config only breaks the feature that
  needs it, not server startup.
- `server/models/Project.js` — the only Mongoose model. `toJSON` transform
  reshapes `_id`/`createdAt`/`updatedAt` to match `types/index.ts`'s `Project`
  exactly, so the frontend needs zero mapping.
- `server/middleware/auth.js` — `protect()` just verifies the JWT; there's no
  `Admin` collection to look up (see auth below).
- `server/routes/auth.js` — `POST /api/auth/login`, `GET /api/auth/me`.
- `server/routes/publicProjects.js` — `GET /api/public/projects` (no
  `page`/`limit` → returns everything, used by the homepage/sitemap/sector
  filter; pass `page`/`limit` → paginated with a `meta` block, used by the
  public `/projects` list) and `GET /api/public/projects/:slug`.
- `server/routes/adminProjects.js` — protected CRUD: paginated `GET /`
  (`page`, `limit`, `q` search, `sort` = `recent`/`oldest`/`az`/`za`, default
  is the manual `order` field), `GET /sectors` (distinct values, feeds the
  admin form's category-suggestion dropdown), `GET/POST/PUT/DELETE /:id`.
- `server/routes/upload.js` — protected, `multer` + `multer-storage-cloudinary`
  (`cloudinary@1.x` — pinned to v1 because `multer-storage-cloudinary@4` peer-
  depends on it; the `.v2` promise API is still used). Only the resulting
  Cloudinary URL is ever persisted, never a file path.
- `server/utils/pagination.js` — `parsePagination`/`buildMeta`, shared by both
  the admin and public paginated routes; response shape is always
  `{ page, limit, total, pages, hasPrev, hasNext }` (mirrored in
  `types/index.ts` as `PaginationMeta`).
- `server/utils/slug.js` — `toSlug`/`uniqueSlug` (appends `-2`, `-3`, … on
  collision). The admin form auto-fills the slug from the title (in both
  create and edit) until the admin manually edits the slug field themselves.
- `server/routes/contact.js` — `POST /api/contact` (public, unauthenticated):
  re-validates and emails the submission via `getTransporter()`; the frontend
  validation in `lib/api/contact.ts` is a UX short-circuit, not the source of
  truth.

### Local database

The backend exits immediately if `MONGODB_URI` doesn't connect (see above), so
Projects/admin pages need a real database even for local dev:
- **MongoDB Atlas** — the normal path; any Atlas connection string works.
- **`scripts/mem-mongo.js`** — an in-memory MongoDB for preview only (data
  resets when the process stops). It requires `mongodb-memory-server`
  installed with `--no-save` (deliberately absent from `package.json` — a
  fresh `npm install` won't bring it back).
- **`scripts/seed.js`** — POSTs sample projects through the live admin API
  (logs in with `ADMIN_EMAIL`/`ADMIN_PASSWORD` first) to populate either
  database. Run with `node scripts/seed.js`.

### Deployment

Pushing to the `deploy` branch (not `master`) triggers
`.github/workflows/deploy.yml`: it SSHes into the production host, does a hard
reset to that branch, `npm install && npm run build`, then restarts both PM2
processes defined in `ecosystem.config.js` (`soilstructurebd-web` running
`next start -p 2000` — port 2000 in production, not 3000 —
`soilstructurebd-api` running `server/index.js` on 4000). Production runs
Node 24 via nvm. There's no
staging environment — merging to `deploy` ships straight to production.

### Admin auth is intentionally minimal

One static credential pair in `.env` (`ADMIN_EMAIL`/`ADMIN_PASSWORD`) —
**not** a database-backed `Admin` collection, no roles, no invites. Login
compares the submitted email/password directly against those env vars and
signs a JWT (`role: "admin"`); `protect()` just verifies the JWT's signature
and role claim. The admin UI stores that JWT in `localStorage` (both the
login page and the protected-route guard live in the same single Next.js app
and origin, so this is simpler than a cookie).

### Design tokens

`tailwind.config.ts` holds the full palette/type-scale/radius extracted from
the source Figma file ("S&S Landing Page — Warm (Bone + Lime)") — use its
token classes (`bg-bone`, `text-ink`, `bg-lime`, `border-line`,
`text-display-lg`, `rounded-card`, …) rather than arbitrary values.
⚠️ Editing `tailwind.config.ts` requires a dev server restart (not
hot-reloaded); editing `.tsx`/`.ts` or `styles/globals.css` does not.

Fonts are wired via `next/font` in `app/(site)/layout.tsx` (Archivo/Instrument
Sans) into `--font-heading`/`--font-body`. The admin panel and login page
intentionally do **not** load these — they use system fonts, since they're a
utilitarian tool, not part of the branded site.

**Animations are dependency-free** (CSS keyframes in `tailwind.config.ts` +
`components/ui/Reveal.tsx`'s IntersectionObserver), respecting
`prefers-reduced-motion` via `motion-safe:`/`motion-reduce:` — don't reach for
an animation library.

**Components split by role**: `components/ui/` (generic primitives — Button,
Container, Field, Section, Reveal, Tag, StatItem, …) vs.
`components/sections/` (page-specific blocks — Header, Footer, Hero,
ServicesGrid, ProjectCard, ContactForm, …). The admin panel does **not** reuse
`components/sections/*` (those are public-site-specific) but does reuse
`components/ui/*` directly.
