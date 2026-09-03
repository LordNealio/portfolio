# Reconvening the 34 — setup

A chapter of **The R Word** in the portfolio hub. Routes live under
`/study/r-word/34`.

Out of the box the experience is fully usable and stores **nothing on a server**:
reviews are kept in the visitor's own browser and the UI says so plainly. Turning
on collection is a deliberate, two-key action described below.

## Routes

| Route | Page |
| --- | --- |
| `/study/r-word/34` | Landing / context |
| `/study/r-word/34/original` | Original 34 explorer |
| `/study/r-word/34/proposed` | Proposed New 34 explorer |
| `/study/r-word/34/compare` | Compare (side-by-side desktop, stacked mobile) |
| `/study/r-word/34/review` | Review ballot |
| `/study/r-word/34/additions` | Community additions |
| `/study/r-word/34/results` | Results / accounting |
| `/study/r-word/34/assembly` | September 6 Assembly |
| `/study/r-word/34/sources` | Sources & method |
| `/study/r-word/34/admin` | CSV export (token, unlinked) |

## Turning collection on

Both keys are required. Either one alone writes nothing.

1. `VITE_RECONVENE_ENABLED=true` — client. Without it the app never calls the API.
2. `RECONVENE_ENABLED=true` **and** `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` —
   server. Without them every endpoint returns `403`.

Also set `RECONVENE_ADMIN_TOKEN` (a long random string) and `RECONVENE_IP_SALT`.
The service-role key is server-only and must never reach the browser.

## Schema

Run once in the Supabase SQL editor. Tables are deliberately split so contact
details never sit in the same row as answers, and the public tally can never be
joined to a person by accident.

```sql
create extension if not exists "pgcrypto";

create table if not exists reconvene_submissions (
  id                uuid primary key default gen_random_uuid(),
  code              text unique not null,
  original_version  text not null,
  proposed_version  text not null,
  answered_count    int  not null default 0,
  missing_text      text,
  city              text,
  state             text,
  interests         text[] default '{}',
  ip_hash           text,
  created_at        timestamptz not null default now()
);

create table if not exists reconvene_answers (
  id             bigserial primary key,
  submission_id  uuid not null references reconvene_submissions(id) on delete cascade,
  item_set       text not null check (item_set in ('original','proposed')),
  item_num       int  not null check (item_num between 1 and 34),
  choice         text not null,
  created_at     timestamptz not null default now()
);

create table if not exists reconvene_texts (
  id             bigserial primary key,
  submission_id  uuid not null references reconvene_submissions(id) on delete cascade,
  item_set       text not null check (item_set in ('original','proposed')),
  item_num       int  not null check (item_num between 1 and 34),
  kind           text not null check (kind in ('comment','alternative')),
  body           text not null,
  created_at     timestamptz not null default now()
);

create table if not exists reconvene_contacts (
  id             bigserial primary key,
  submission_id  uuid not null references reconvene_submissions(id) on delete cascade,
  name           text,
  email          text,
  phone          text,
  preferred      text,
  wants_updates  boolean not null default false,
  consented_at   timestamptz not null default now(),
  created_at     timestamptz not null default now()
);

create table if not exists reconvene_additions (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,
  kind           text not null,
  target_set     text,
  target_number  int,
  body           text not null,
  source_url     text,
  name           text,
  email          text,
  consented      boolean not null default false,
  ip_hash        text,
  created_at     timestamptz not null default now()
);

create index if not exists reconvene_answers_item_idx
  on reconvene_answers (item_set, item_num);
create index if not exists reconvene_submissions_ip_idx
  on reconvene_submissions (ip_hash, created_at);
create index if not exists reconvene_additions_ip_idx
  on reconvene_additions (ip_hash, created_at);

-- Nothing is reachable with the anon key; only the server's service-role key
-- touches these tables.
alter table reconvene_submissions enable row level security;
alter table reconvene_answers     enable row level security;
alter table reconvene_texts       enable row level security;
alter table reconvene_contacts    enable row level security;
alter table reconvene_additions   enable row level security;
```

## Versioning

Every submission records `original-1848-v1` and `proposed-2026-v1`. **When you
edit the wording of any resolution, bump the version id** in
`src/data/reconvening34.ts` (`RECONVENE_VERSIONS`) *and* in
`api/_shared/reconvene.ts`. Submissions carrying a stale version are rejected
with `422 stale_version`, and local drafts against the old text are discarded
rather than silently re-attributed to text their author never read.

## Assembly details

`src/data/reconveneAssembly.ts` is the only file to edit when the September 6
gathering is scheduled. Every field starts `null` and the page renders an honest
"not yet announced" state; fill in the real date, platform and join URL and
redeploy. **Never put a placeholder URL there** — the page is written so an empty
value is correct and a fake link is not.

## Privacy behaviour

- The whole review works with no account and no contact details.
- Contact rows are written **only** with an explicit consent checkbox; the API
  rejects contact data without it (`422 consent_required`).
- `/api/reconvene/results` returns aggregate counts only — never names, contact
  details, or free text.
- The admin export separates `contacts` from `submissions`/`answers`/`comments`,
  so response data and personal data are never handed out in one file by default.
- Raw IPs are never stored — only a salted hash, used for rate limiting.
- Analytics receive nothing from these forms.
- CSV cells beginning `=`, `+`, `-` or `@` are prefixed with `'` so a submitted
  string cannot execute as a spreadsheet formula.

## Spam controls

A hidden honeypot field, a minimum 3-second completion time, and a per-IP-hash
cap of 8 submissions an hour. All three are enforced server-side.
