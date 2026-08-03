# Phase 2 — Setup & Go-Live Runbook (N-Word study)

The Phase 2 backend is **built but dormant**. With no env vars set, the site stays
in preview and collects nothing; every API endpoint refuses. This is the checklist
to make it live **after** independent/IRB review.

> Do not complete step 5 (enable) until the study, consent, module, comparison
> material, and analysis plan have been independently reviewed and any placeholders
> in `src/data/study.ts` (researcher/participant-concerns/IRB contacts, support
> resources) are filled in.

## What was built
- **DB schema:** [supabase/migrations/0001_study_schema.sql](../supabase/migrations/0001_study_schema.sql) — 6 tables, RLS locked to the service role. Free-text is stored separately (`study_texts`); volunteer contacts are unlinked (`study_volunteers`); no raw IPs.
- **API (Vercel serverless, `/api/study/*`):** `enroll`, `save`, `complete`, `withdraw`, `volunteer`, and `admin/summary`, `admin/export`. All writes go through the server using the service-role key — the browser never holds a secret. Every write endpoint refuses unless enrollment is enabled.
- **Randomization:** server-side 50/50 arm assignment on enroll (`intervention` vs `comparison`). The comparison arm sees a neutral, length-matched reading (active control) defined in `src/data/study.ts`.
- **Client wiring:** [src/lib/studyApi.ts](../src/lib/studyApi.ts) + guarded calls in [src/pages/Study.tsx](../src/pages/Study.tsx). Off by default → no network, identical to today's preview.
- **Dashboard:** `/study/n-word/admin` ([src/pages/StudyAdmin.tsx](../src/pages/StudyAdmin.tsx)) — bearer-token gated, descriptive stats (Δ = post − baseline per arm), CSV/JSON export.

## Steps
1. **Create a Supabase project** (free tier is fine for a pilot). Copy the Project URL and the **service-role** key (Project Settings → API).
2. **Apply the schema:** open the SQL editor and run `supabase/migrations/0001_study_schema.sql` (or `supabase db push` with the CLI).
3. **Set env vars in Vercel** (Project → Settings → Environment Variables), Production scope:
   - `SUPABASE_URL` = project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = service-role key (server-only; never `VITE_`-prefixed)
   - `STUDY_ADMIN_TOKEN` = a long random string
   - Leave `RESEARCH_ENROLLMENT_ENABLED` and `VITE_RESEARCH_ENROLLMENT_ENABLED` **unset or `false`** for now.
4. **Verify while still OFF:** deploy, open `/study/n-word/admin`, sign in with the token — you should see zero counts (proves the DB + token work). Walk `/study/n-word` — it must still say "Preview" and write nothing.
   - Public production URL: `https://portfolio-nine-zeta-0rmcnv0m3r.vercel.app`. While dormant, the API correctly refuses: write endpoints → `403 enrollment_closed`, admin → `503 not_configured`, wrong method → `405`. (The `*-justins-projects-*.vercel.app` alias has Vercel deployment protection and will 401 — use the public alias above.)
5. **Go live (only after review):** set both `RESEARCH_ENROLLMENT_ENABLED=true` (server) and `VITE_RESEARCH_ENROLLMENT_ENABLED=true` (client), redeploy. The banner switches to "enrollment open," arms are assigned, and responses save.
6. **To pause enrollment:** set both flags back to `false` and redeploy. Existing data is untouched.

## Test runs
When testing live, mark a run as a preview/test so it's excluded from analysis: the
enroll call accepts `isPreview: true` (wire a query flag or a hidden control before
inviting real participants). Admin summary/export already exclude `is_preview` rows.

## Hardening TODO before real recruitment
- **Rate limiting / abuse control** on the write endpoints (e.g. Upstash Redis). The
  current functions validate and cap sizes but do not throttle. If you add any
  technical identifier for abuse control, use a salted hash with a documented
  retention window — never a raw IP.
- **Admin auth**: the shared bearer token is adequate for a single researcher pilot;
  move to per-user auth if more people need access.
- **Retention/deletion policy**: define it, and note that `withdraw` flags data
  rather than hard-deleting; implement a reviewed deletion job separately.
- **Backups / access log review** on the Supabase project.
- Finalize randomization (block/stratified?) and the subscale definitions with the
  reviewer; pre-register the primary outcome.
