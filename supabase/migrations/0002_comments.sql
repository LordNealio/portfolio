-- ─────────────────────────────────────────────────────────────────────────────
-- Public feedback / comments on works.
--
-- Moderated: a comment is created with approved = false and is NOT publicly
-- visible until the owner approves it from the moderation dashboard. Row-Level
-- Security is on with no anon policies, so only the server-side API functions
-- (service-role key) can read or write. No email or raw IP is stored.
-- Apply via `supabase db push` or the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists comments (
  id         bigint generated always as identity primary key,
  work_slug  text not null,
  author     text not null,
  body       text not null,
  approved   boolean not null default false, -- held until the owner approves
  hidden     boolean not null default false, -- soft-removed after the fact
  created_at timestamptz not null default now()
);

-- Fast public read path: approved, not hidden, by work.
create index if not exists idx_comments_public
  on comments (work_slug, created_at)
  where approved and not hidden;

alter table comments enable row level security;
-- No anon/authenticated policies → default-deny. The service-role key used by
-- the /api/comments functions bypasses RLS; the browser can reach none of this.
