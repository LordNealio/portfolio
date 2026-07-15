# Next Steps — Recommended Improvements

Ordered by impact-to-effort. The site is complete and deployable today; these make
it stronger over time.

## High impact
1. **Real screenshots for the six featured projects.** The single biggest quality
   jump. Add a `heroImage?: string` field to `Project`, drop images in `public/`,
   and render `<img>` in `ProjectCard`/`ProjectDetail` when present (falling back
   to `<ProjectArt>`). One hero + a 2–3 image gallery per featured project.
2. **Confirm & verify live links**, then flip `verified: true` — a green, working
   "Live app" button on MindVault and Mirror is the strongest proof you ship.
3. **Custom domain + real OG image.** `justinneal.dev` (or similar) plus a designed
   share card makes every link you send look intentional.

## Medium impact
4. **A "Project Galaxy" / constellation index** (the prompt's optional interactive
   idea). A canvas or filterable spatial view of all projects by theme/year — keep
   the current grid as the accessible fallback. Fun, on-brand, mobile-safe.
5. **Project gallery/lightbox** on detail pages once screenshots exist.
6. **Résumé PDF download** on the About page (you already have the .docx).
7. **Case-study depth** for 2–3 projects: add a short "process" narrative with the
   real decisions and trade-offs (MindVault's private-core tension, Mirror's
   "Do NOT build" list — both are already strong stories).
8. **MDX or a headless CMS** if you'd rather write long-form case studies in prose
   than in the typed data file. The current typed structure is deliberately simple;
   only add this if editing friction becomes real.

## Lower impact / polish
9. **Analytics** (Vercel Analytics or Plausible) to see what resonates.
10. **View-transition animations** between the card and its detail page.
11. **A `/press` or `/writing` section** if Everythang / RapGod essays get published.
12. **Contact form** (via a serverless function or Formspree) instead of `mailto:`
    if you want submissions tracked.
13. **Automated sitemap generation** from `projects.ts` at build time (currently
    hand-maintained in `public/sitemap.xml`).

## Content strategy
14. **Lead with the crossover story.** "Accountant + educator who ships AI products"
    is genuinely rare — the About page leans into it; consider a short LinkedIn post
    linking here that tells that story.
15. **Keep the honesty discipline.** The status labels are a feature. As projects
    graduate (prototype → live), update `status` — the whole site reflows.
16. **Revisit "Pimps' Paradise"** deliberately (see `CONTENT_NEEDED.md`) rather
    than by default.

## Maintenance
- Adding a project = one record in `src/data/projects.ts` + one line in
  `public/sitemap.xml`. Everything else is automatic.
- Re-run `npm run build` before each deploy; Vercel does this for you on push.
