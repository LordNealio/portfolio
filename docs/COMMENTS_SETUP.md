# Comments — setup & moderation

Public, **moderated** feedback on every work except the two research studies
(N-Word, R-Word). A comment is held until you approve it — nothing appears
publicly on its own.

Built but **dormant**: with no Supabase configured, each work shows a quiet
"Comments are opening soon." and the API returns 503. It goes live the moment
Supabase is set up — no code changes, no research-enrollment flag involved.

## What was built
- **DB:** [supabase/migrations/0002_comments.sql](../supabase/migrations/0002_comments.sql) — one `comments` table, RLS locked to the service role. No email or raw IP stored.
- **API:** `POST /api/comments` (submit — stored `approved:false`, honeypot + length/format validation), `GET /api/comments?slug=` (approved only), `GET|POST /api/comments/admin` (moderate).
- **UI:** `Comments` on each non-study work page (list + form; submitting shows "will appear once approved").
- **Moderation dashboard:** `/comments-admin` — bearer-token gated (reuses the study admin token). Approve / Hide / Unhide / Delete. Not linked in nav.

## Go live
It reuses the **same** Supabase project and admin token as the study backend
(see STUDY_PHASE2_SETUP.md). If that's already configured, comments are already
live — just run this migration. Otherwise:
1. Create a Supabase project; run `supabase/migrations/0002_comments.sql` (and `0001_study_schema.sql` if you also want the study).
2. In Vercel set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `STUDY_ADMIN_TOKEN` (a long random string), then redeploy.
3. Moderate at `/comments-admin` — sign in with the token; approve what should be public.

## Notes / hardening
- **Moderation is the main protection**; nothing is public until you approve it.
- The honeypot deters basic bots; for heavier spam add rate limiting (e.g. Upstash) to `POST /api/comments`.
- Comments are plain text and output-encoded by React on render (no HTML injection).
- To pause comments, unset the Supabase env (everything reverts to "opening soon"); existing data is untouched.
