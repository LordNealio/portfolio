# Deployment Checklist

Static Vite build → Vercel (or any static host). No server, no env vars required.

## Before you deploy
- [ ] `npm run build` passes clean (typecheck + build). ✅ verified in this build.
- [ ] Resolve 🔴 items in `CONTENT_NEEDED.md`:
  - [ ] Confirm MindVault & Mirror live URLs → set `verified: true`.
  - [ ] Decide on "Pimps' Paradise" (rename / keep flagged / remove).
  - [ ] Confirm public contact email; add GitHub if wanted.
  - [ ] Set the real domain in `index.html`, `public/sitemap.xml`, `public/robots.txt`.
- [ ] Skim each project detail page for typos / tone.
- [ ] (Optional) Add real screenshots for featured projects.

## Deploy to Vercel
1. Push this folder to a Git repo (GitHub `LordNealio/...` fits the existing pattern).
2. In Vercel: **New Project → import the repo**.
   - Framework preset: **Vite** (auto-detected).
   - Build command: `npm run build` · Output dir: `dist`.
   - `vercel.json` already rewrites all routes to `/index.html` for client routing.
3. Deploy. Assign the custom domain.

CLI alternative:
```bash
npm run build
npx vercel --prod
```

## Immediately after deploy
- [ ] Load `/`, `/work`, `/vision`, `/about`, `/now`, `/contact`.
- [ ] Hard-refresh a deep link (e.g. `/work/mindvault`) → must load (SPA rewrite).
- [ ] Click through every featured project detail page.
- [ ] Test the status filters on `/work`.
- [ ] Toggle light/dark; toggle the mobile menu on a phone.
- [ ] Confirm external links (live apps, LinkedIn) open in a new tab.
- [ ] Verify `mailto:` opens a mail client.
- [ ] Check `/robots.txt` and `/sitemap.xml` resolve.
- [ ] Share the URL in Slack/iMessage/LinkedIn → confirm the OG card renders.

## Performance & SEO (already in place)
- [x] Single ~72 kB gzipped JS bundle; fonts preconnected.
- [x] Per-page `<title>` set on project detail pages.
- [x] Open Graph + Twitter card meta in `index.html`.
- [x] `robots.txt` + `sitemap.xml` shipped in `public/`.
- [x] Semantic HTML, focus states, reduced-motion support.
- [ ] (Optional) Add analytics — the structure is analytics-ready; drop a snippet
      in `index.html` or use Vercel Analytics.

## Rollback
Vercel keeps every deployment. If a release looks wrong, promote the previous
deployment from the dashboard — instant rollback, no rebuild.
