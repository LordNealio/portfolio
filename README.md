# Justin Neal — Portfolio

The central hub for everything Justin Neal has created: apps, tools, nonprofit
initiatives, research, games, and creative-media concepts. Built to feel like a
product launch and a founder portfolio — not a developer template.

**Positioning:** Founder · Creative Technologist · Systems Thinker — a finance
leader and educator who builds AI-native products.

---

## Stack

- **Vite + React 18 + TypeScript** — fast, fully controllable, static output.
- **Hand-built CSS design system** (`src/styles/`) — no UI framework, one accent
  color, dark/light theme-aware. See `DESIGN_SYSTEM.md`.
- **react-router-dom** — client routing with dynamic project pages.
- **No heavy animation library** — scroll reveals use `IntersectionObserver` and
  respect `prefers-reduced-motion`.

Total shipped JS is ~72 kB gzipped.

## Run it

```bash
npm install
npm run dev        # local dev server (http://localhost:4137)
npm run build      # typecheck + production build to /dist
npm run preview    # serve the built /dist
```

> On this machine, the folder is junctioned into `mindvault-app/portfolio` so the
> Claude preview server can reach it (`portfolio` entry in
> `mindvault-app/.claude/launch.json`, port 4137). That junction is only for
> previewing — it is not needed to build or deploy.

## Project structure

```
src/
├── main.tsx              # entry — mounts App, imports both stylesheets
├── App.tsx               # routes + scroll-to-top
├── data/
│   ├── projects.ts       # ← SINGLE SOURCE OF TRUTH for every project
│   └── site.ts           # personal facts, experience, capabilities, contact
├── components/           # Nav, Footer, ProjectCard, ProjectArt (generative art)
├── pages/                # Home, Work, ProjectDetail, Vision, About, Now, Contact
├── lib/useReveal.ts      # scroll-reveal hook
└── styles/               # global.css (tokens) + components.css
public/                   # favicon, og-image, robots.txt, sitemap.xml
```

## Add a new project (the only file you need)

Open `src/data/projects.ts`, copy any record in the `projects` array, and fill in
the fields. The card, the filterable archive, the dynamic detail page, the "Now"
status board, and the sitemap-worthy route all appear automatically.

Minimum useful fields: `slug`, `title`, `subtitle`, `summary`, `category`,
`status`, `year`, `featured`, `role`, `audience`, `problem`, `solution`,
`features[]`, `technology[]`, `links[]`.

- Set `featured: true` to promote it to the homepage "Selected Work" grid.
- `status` drives the honest labels (`live`, `prototype`, `in-development`,
  `concept`, `research`, `archived`) used across the site.
- `links` with `verified: false` are reported-but-unconfirmed — confirm before
  publishing (see `CONTENT_NEEDED.md`).
- Add the new `/work/<slug>` line to `public/sitemap.xml`.

To drop in a **real screenshot** instead of the generative placeholder art, render
an `<img>` in place of `<ProjectArt>` inside `ProjectCard.tsx` /
`ProjectDetail.tsx` (a `heroImage?` field is the natural next addition).

## Edit personal content

`src/data/site.ts` holds your title, tagline, positioning, experience timeline,
education, certifications, capabilities, and **contact links** — edit there.

## Deploy

Static site — deploys to Vercel with zero config (`vercel.json` already handles
SPA routing). See `DEPLOYMENT_CHECKLIST.md`.

```bash
npm run build
npx vercel --prod   # or connect the repo in the Vercel dashboard
```

---

## Deliverable docs

- `PROJECT_INVENTORY.md` — every project found, ranked.
- `FEATURED_PROJECTS.md` — the featured set and why.
- `CONTENT_NEEDED.md` — what's missing before publishing.
- `DESIGN_SYSTEM.md` — tokens, type, motion, components.
- `DEPLOYMENT_CHECKLIST.md` — pre-launch checklist.
- `NEXT_STEPS.md` — recommended improvements.

**Credibility note:** Every project is labeled for exactly what it is. Concepts are
never shown as launched. The work was built through AI-assisted development, with
Justin as the originator, product definer, prompt architect, and creative director
— stated honestly in the About page and footer.
