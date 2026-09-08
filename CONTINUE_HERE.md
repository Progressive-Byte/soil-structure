# CONTINUE HERE — Soil & Structure (handoff guide)

Everything you need to move this project to another computer and keep working,
including how to run it, what's been done, and how to push to the same GitHub
repo. **Read this first.**

> This is the full‑stack app: **Next.js front end (repo root) + Express/MongoDB
> API (`server/`) + `/admin` panel.** All the design work so far has been
> **front end only** — the `server/` backend has not been modified.

---

## 0. Fastest path on the new computer

```bash
# 1. Put this whole folder on the new machine (USB / cloud / zip).
#    You can skip copying node_modules and .next — they're regenerated.

# 2. Install dependencies
npm install

# 3. Make sure the env file exists (see section 3). If you copied the folder
#    directly, .env came with it. If you cloned from GitHub instead:
cp .env.example .env        # PowerShell: Copy-Item .env.example .env
#    then edit .env and set a real MONGODB_URI (section 4).

# 4. Run it (see section 2 for options)
npm run dev:all             # front end :3000 + API :4000  (needs a database)
```

Open **http://localhost:3000**. Admin panel: **http://localhost:3000/admin**.

---

## 1. Prerequisites
- **Node.js 18.18+ / 20+** (built on Node 24) — https://nodejs.org
- **npm** (bundled with Node), a code editor, and **git**.
- A **MongoDB** connection — either MongoDB Atlas (recommended, persistent) or a
  local/in‑memory one (section 4).

---

## 2. Commands

```bash
npm run dev        # front end only, http://localhost:3000
npm run server     # API only (node server/index.js), http://localhost:4000
npm run server:dev # API with nodemon (auto-restart)
npm run dev:all    # front end + API together (concurrently)
npm run build      # production build (also type-checks + lints)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

Notes:
- The site fetches **Projects** from the API, so the home + `/projects` pages
  need the **API running and connected to MongoDB**. Everything else (services,
  team, about, mission-values, contact) is static and works with just `npm run dev`.
- The backend **exits if MongoDB can't connect**, so set up a database first.

---

## 3. Environment (`.env`)

One `.env` at the repo root serves both the Next.js app and the Express API.
It is **git-ignored** (never committed). Copy `.env.example` → `.env` and fill in:

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | front end | `http://localhost:4000/api` for local |
| `NEXT_PUBLIC_SITE_URL` | SEO/sitemap | `http://localhost:3000` for local |
| `PORT` | API | `4000` |
| `MONGODB_URI` | API | **Required.** Atlas string, or local (section 4) |
| `JWT_SECRET` | admin login | any long random string |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | admin login | default `admin@example.com` / `change-me` |
| `CORS_ORIGIN` | API | `http://localhost:3000` |
| `CLOUDINARY_*` | project image upload (admin) | optional for previewing |
| `SMTP_*`, `CONTACT_TO_EMAIL`, `MAIL_FROM` | contact form email | optional; contact form UI works without it, but sending needs real SMTP |

---

## 4. Getting a database

### Option A — MongoDB Atlas (recommended: data persists)
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Add a database user + allow network access (0.0.0.0/0 for dev).
3. Copy the connection string and set it in `.env`:
   ```
   MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/soil_structure?retryWrites=true&w=majority
   ```
4. `npm run dev:all` → the API logs "MongoDB connected".

### Option B — Temporary in‑memory MongoDB (preview only, data resets)
This is what was used during design. It needs a helper package and a launcher.

1. Install locally (does **not** touch package.json):
   ```bash
   npm install mongodb-memory-server --no-save
   ```
2. Create `scripts/mem-mongo.js` (or any path) with:
   ```js
   const { MongoMemoryServer } = require("mongodb-memory-server");
   (async () => {
     const server = await MongoMemoryServer.create({
       instance: { port: 27017, dbName: "soil_structure" },
     });
     console.log("MEM_MONGO_READY", server.getUri());
     process.stdin.resume(); // keep alive
   })().catch((e) => { console.error(e); process.exit(1); });
   ```
3. Run it in one terminal (leave it open):
   ```bash
   node scripts/mem-mongo.js
   ```
4. In `.env` set `MONGODB_URI=mongodb://127.0.0.1:27017/soil_structure`
5. In another terminal: `npm run dev:all`.

> ⚠️ The in‑memory DB and anything added via `/admin` **disappear when the
> launcher stops**. Use Atlas for anything you want to keep.

### Seeding sample projects (optional)
The Projects grid is empty until projects exist. To add samples via the admin
API (works with either database, while the API is running):

```js
// scripts/seed.js  — run with:  node scripts/seed.js
const BASE = "http://localhost:4000/api";
const projects = [
  {
    slug: "matarbari-road-project",
    title: "Ground Improvement at Matarbari Road Project",
    sector: "Infrastructure",
    summary: "Ground improvement works for the Matarbari road scheme.",
    description: "Ground improvement works carried out on the Matarbari road scheme, applying stabilised earth solutions and vertical drainage.",
    client: "Roads and Highways Department (RHD)",
    coverImage: { src: "/images/projects/matarbari-road-project.jpg", alt: "Engineers on the Matarbari road project" },
    featured: true, order: 1,
  },
  // add more objects with the same shape…
];
(async () => {
  const login = await fetch(BASE + "/auth/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@example.com", password: "change-me" }),
  });
  const { token } = await login.json();
  for (const p of projects) {
    const r = await fetch(BASE + "/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify(p),
    });
    console.log(r.status, p.title);
  }
})();
```
Required project fields: `title, sector, summary, description, coverImage.src, coverImage.alt`.

---

## 5. Project structure (where to edit)

```
app/
  (site)/            Public marketing site (Header/Footer chrome via its layout)
    page.tsx         Home
    services/        Services listing + [slug] detail template
    projects/        Projects (dynamic, from the API)
    about/  mission-values/  team/  contact/
  admin/             Admin panel (login + protected project CRUD)
components/
  ui/                Primitives: Button, Container, Section, SectionEyebrow,
                     Field, Logo, StatItem, Reveal, Tag, EmptyState, Skeleton…
  sections/          Page blocks: Header, Footer, Hero, ServicesGrid, ServiceCard,
                     SelectedWork, ValueApproach, Team, ContactForm, CtaBand…
lib/
  data/              Static content getters (company, services, team) + the
                     projects getter that calls the API (_client.ts)
  api/contact.ts     Contact form → POST /contact
  seo.ts  utils.ts
types/index.ts       Shared TypeScript interfaces
styles/globals.css   Global CSS + Tailwind layers
tailwind.config.ts   Design tokens (colours, type, animations)
public/images/       Brand, project, service, team images
server/              Express + MongoDB API  ← DO NOT edit (backend teammate's)
```

### Editing content
- **Services / service detail pages** → `lib/data/services.ts`
  (the 8 services + their `sections`; also the 12 `serviceAreas` for the listing).
- **Team** → `lib/data/team.ts` (bios, skills, disciplines).
- **Nav / footer / contact details / stats** → `lib/data/company.ts`.
- **Projects** are dynamic — add/edit them in the **/admin** panel, not in code.

### Design tokens
`tailwind.config.ts` — colours (`bone`, `ink`, `lime`, **`lime-700` = #5E7A16**),
type scale, radii, animations. ⚠️ **Editing this file needs a dev-server restart**
(Tailwind config is not hot-reloaded). Editing `.tsx`/`.css` does not.

---

## 6. What's been done (front end)

All pages matched to the Figma designs (in `My Design/`, kept local, git-ignored):
- **Home** — hero, "Who we are", "How we work" (integrators), "What we do"
  (icon service cards), "Our priorities", "Project experience" (dynamic featured),
  Team, CTA.
- **Services** — listing of 12 service areas + **8 service detail pages**
  (`/services/[slug]`) with per‑service sections (MEP and Project & Construction
  Management have multiple grouped sections).
- **Projects** — dynamic featured project + dynamic grid (kept) + sectors.
- **About**, **Mission & Values**, **Team**, **Contact** — all built to design.
- **Branding** — new logo (+ reversed for footer), footer as a rounded dark card,
  olive **`lime-700`** accent, 2px line eyebrows, staggered reveal animations.

Backend: **untouched.**

---

## 7. Git — pushing from the same GitHub account

- **Repo:** https://github.com/Progressive-Byte/Soil-Structure
- **Branch:** `master`  •  **Remote:** `origin` → `.../soil-structure.git`

Everyday workflow:
```bash
git pull                     # get teammate's latest first (avoids conflicts)
git add -A
git commit -m "your message"
git push origin master
```

On the new computer you must **authenticate as the same GitHub account** once:
- Easiest: install GitHub CLI and run `gh auth login` (GitHub.com → HTTPS →
  login with browser), **or**
- On first `git push`, Windows Git Credential Manager will prompt you to sign in.

Set who commits show up as (optional):
```bash
git config --local user.name  "Your Name"
git config --local user.email "you@example.com"
```

**Git-ignored (won't transfer via GitHub — copy the folder if you need them):**
`.env`, `node_modules/`, `.next/`, `My Design/`, `Claude Design/`.
`package-lock.json` is also ignored in this repo.

---

## 8. Gotchas / troubleshooting

| Symptom | Fix |
| --- | --- |
| `next: command not found` / module errors | `npm install` |
| Home / `/projects` show errors or empty | API not running or no DB — start `dev:all` with a valid `MONGODB_URI` |
| API logs "MongoDB connection failed" then exits | fix `MONGODB_URI` (Atlas string or run the in‑memory launcher) |
| 500 right after editing `tailwind.config.ts` | restart the dev server (config isn't hot‑reloaded) |
| "Port 3000 in use" | close old terminal, or `npm run dev -- -p 3001` |
| Seeded projects vanished | in‑memory DB reset — use Atlas to persist |
| `mongodb-memory-server` / `sharp` missing after an install | they were `--no-save`; reinstall with `--no-save` |

---

## 9. Continuing with an AI assistant
1. Open this folder as the working directory.
2. Tell it: **"Read CONTINUE_HERE.md and CLAUDE.md first."**
3. Then give your task. Safe places to edit: `lib/data/*`, `components/*`,
   `app/(site)/*`, `tailwind.config.ts`. Leave `server/` alone unless doing
   backend work.
```
