# Content Needed

What's missing or unconfirmed before this portfolio should go public. Grouped by
priority. Nothing on the site is fabricated — these are the gaps currently filled
by honest placeholders, generative art, or `verified: false` flags.

## 🔴 Must resolve before publishing

1. **Confirm the two live URLs.** The site marks them `verified: false`:
   - MindVault → `https://mindvault-app-zeta.vercel.app`
   - Mirror → `https://mirror-app-green-omega.vercel.app`
   Confirm they're live and public, then set `verified: true` in
   `src/data/projects.ts`. If a URL is private/dead, remove the link.

2. **Decision: "Pimps' Paradise".** The working name likely doesn't belong on a
   public professional portfolio aimed at employers/investors. Options:
   (a) rename before showing, (b) keep archived-and-flagged as-is, or (c) remove
   the record entirely. Currently archived + flagged. **Your call.**

3. **Contact details.** Confirm the public contact set in `src/data/site.ts`:
   - Email `Neal.Justin@icloud.com` — is this the address you want public?
   - LinkedIn is wired. Phone is intentionally omitted from the public site.
   - Add a GitHub URL if you want repositories linked (`site.contact.github`).

4. **Domain.** All SEO/OG/sitemap URLs assume `https://justinneal.dev`. Replace
   with your real domain in `index.html`, `public/sitemap.xml`, and
   `public/robots.txt` (or tell me the domain and I'll swap them).

## 🟡 Strongly recommended (raises quality a lot)

5. **Real screenshots / device shots** for each app. Right now every project uses
   an elegant generative placeholder. One or two real screens per featured project
   (MindVault, Mirror, LegacyBridge, WorkWrite, 7 Temples, E.Manual) would
   transform the case-study pages. Drop images in `public/` and add a `heroImage`
   field (see README → "add a real screenshot").

6. **A headshot** for the About page (optional but humanizing). Add to `public/`.

7. **Live/demo links for prototypes.** If any of LegacyBridge, WorkWrite,
   E.Manual, SoundWorld, or S4US1McGamer have a shareable deploy or video demo,
   add them to that project's `links[]`.

8. **A real OG image.** `public/og-image.svg` is a clean generated card. A custom
   1200×630 image (with a screenshot montage) would look sharper when shared.

## 🟢 Nice to have

9. **Per-project "process" and "lessons"** are written for featured projects but
   thin or absent for some archived ones — expand if you want deeper case studies.
10. **Metrics** — the site deliberately avoids fabricated stats. If you have *real*
    numbers (pilot users, waitlist, downloads), they can be added honestly.
11. **Testimonials** — none included (none verified). Add only real, attributable ones.
12. **Résumé PDF** — an optional "Download résumé" button on the About page.
13. **A short intro video / Loom** for the hero, if you want motion beyond the
    generative art.

## Known honest caveats already surfaced on the site
- LegacyBridge, WorkWrite, E.Manual → labeled **Prototype** (built, not launched).
- 7 Temples, K-Source Vault, Pimps' Paradise → labeled **Concept**.
- Creation OS, RapGod, Everythang → labeled **Research**.
- MindWrite (origin) → labeled **Archive**.
- Each detail page shows an "Honest status" note where relevant.
