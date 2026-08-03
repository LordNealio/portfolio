-- ─────────────────────────────────────────────────────────────────────────────
-- N-Word Study — Phase 2 schema (Supabase / Postgres)
--
-- Design principles:
--   • Participants are identified ONLY by a random UUID + a display code. No
--     name/email/phone/birthday-derived identifiers are ever stored here.
--   • Free-text answers live in their OWN table (study_texts), separate from the
--     numeric/enum outcome measures (study_responses).
--   • Volunteer contacts live in study_volunteers, which has NO foreign key to
--     participants — there is no technical link between who volunteered and their
--     survey answers.
--   • No raw IP addresses. If abuse prevention ever needs a technical signal,
--     store a salted hash with a documented retention window — not the raw value.
--   • Row-Level Security is ON with NO anon/authenticated policies, so the only
--     way in is the service-role key used by the server-side API functions.
--     Nothing is readable or writable from the browser.
--
-- This maps the conceptual 14-table model in STUDY_PHASE2_PLAN.md onto a
-- normalized 6-table design. Apply via: `supabase db push` or paste into the
-- Supabase SQL editor. NOTHING here collects data until the API is deployed with
-- RESEARCH_ENROLLMENT_ENABLED=true AND independent/IRB review is complete.
-- ─────────────────────────────────────────────────────────────────────────────

-- gen_random_uuid() is available in Supabase by default (pgcrypto).

-- 1. Participants ─────────────────────────────────────────────────────────────
create table if not exists study_participants (
  id                 uuid primary key default gen_random_uuid(),
  anon_code          text not null,                       -- display code (e.g. NW-XXXXXXXX)
  arm                text not null check (arm in ('intervention','comparison')),
  arm_method         text not null default 'simple_random_0.5',
  study_version      text not null,
  consent_version    text not null,
  module_version     text not null,
  instrument_version text not null,
  is_preview         boolean not null default false,      -- test runs, excluded from analysis
  consented          boolean not null default false,
  consented_at       timestamptz,
  completed_at       timestamptz,
  withdrawn          boolean not null default false,
  withdrawn_at       timestamptz,
  created_at         timestamptz not null default now()
);

-- 2. Numeric / enum answers (Likert 1–7, scenario ratings, knowledge indices,
--    consent booleans, single-choice enums). One row per (participant, phase, item).
create table if not exists study_responses (
  id             bigint generated always as identity primary key,
  participant_id uuid not null references study_participants(id) on delete cascade,
  phase          text not null,                            -- consent|eligibility|background|pre|post|postmodule|knowledge
  item_id        text not null,                            -- stable instrument id (p01, sc1_offensive, k1, c_age, …)
  value_num      integer,                                  -- numeric answers
  value_text     text,                                     -- enum / short single-choice answers
  created_at     timestamptz not null default now(),
  unique (participant_id, phase, item_id)
);
create index if not exists idx_responses_participant on study_responses(participant_id);

-- 3. Free-text answers — SEPARATE table (open-ended pre, per-section reflections,
--    written reflections). Never sent to any third-party AI service.
create table if not exists study_texts (
  id             bigint generated always as identity primary key,
  participant_id uuid not null references study_participants(id) on delete cascade,
  phase          text not null,                            -- pre|module|reflection
  item_id        text not null,                            -- pre_open, reflect_m1…, r1…
  value_text     text not null,
  created_at     timestamptz not null default now(),
  unique (participant_id, item_id)
);
create index if not exists idx_texts_participant on study_texts(participant_id);

-- 4. Progress / audit events (module sections viewed, started, completed).
create table if not exists study_events (
  id             bigint generated always as identity primary key,
  participant_id uuid not null references study_participants(id) on delete cascade,
  event          text not null,                            -- started|module_view:m1|completed…
  created_at     timestamptz not null default now()
);
create index if not exists idx_events_participant on study_events(participant_id);

-- 5. Volunteer interest — DELIBERATELY unlinked from participants (no FK).
create table if not exists study_volunteers (
  id         bigint generated always as identity primary key,
  interests  text[] not null default '{}',
  contact    text,
  created_at timestamptz not null default now()
);

-- 6. Withdrawal requests (audit; withdrawal FLAGS data, never hard-deletes it).
create table if not exists study_withdrawals (
  id             bigint generated always as identity primary key,
  participant_id uuid not null references study_participants(id) on delete cascade,
  scope          text not null default 'all',
  created_at     timestamptz not null default now()
);

-- ── Row-Level Security: lock everything to the service role ───────────────────
alter table study_participants enable row level security;
alter table study_responses    enable row level security;
alter table study_texts        enable row level security;
alter table study_events       enable row level security;
alter table study_volunteers   enable row level security;
alter table study_withdrawals  enable row level security;
-- No policies are created for anon/authenticated roles: default-deny. The
-- service-role key (server-only) bypasses RLS. The browser can reach none of this.
