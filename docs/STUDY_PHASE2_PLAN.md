# Phase 2 Plan — "Language, Identity, and the N-Word: A Study of Perception and Context"

**Status:** PLANNING ONLY. Nothing in this document has been built, deployed, or enabled.
No data is collected today; the live site runs the **Preview / Educational Demonstration**
experience (client-side, stores nothing). Phase 2 requires a backend **and** independent
ethical/institutional (IRB) review **before any recruitment**.

Part of the **Black Builders Toolbox**.

---

## 1. Study design & methodology

**Flow:** Neutral introduction & consent → **Baseline survey** → **Educational intervention
(learning module)** → **Knowledge check** → **Post-survey** → **Debrief**.

Language: use *educational intervention*, *learning module*, or *language and perception
study*. Do **not** use "reeducation."

### 1.1 Neutral framing (avoid demand characteristics)
At intake, tell participants only that the study **examines perceptions of the N-word across
different situations.** Do **not** disclose that the researcher expects attitudes to become
more favorable. The full hypothesis is revealed **only at debrief**. (The current instrument
already follows this — the intro is neutral; the hypothesis appears in Section 8 of the module
as an explicitly-labeled hypothesis and again in the debrief.)

### 1.2 The intervention is identical for every participant
The 8-section module is fixed content (versioned). No personalization, no branching by prior
answers.

### 1.3 Design arm — single-group vs. randomized comparison
- **Single-group (minimum viable):** everyone does baseline → module → post. You can *observe*
  change but **cannot attribute it to the module** — some change comes from seeing the same
  items twice (a retest/measurement effect) or from regression to the mean.
- **Randomized comparison (recommended for a formal pilot):** randomly assign each participant
  to one of two arms at enrollment:
  - **Intervention arm:** baseline → **study module** → post
  - **Comparison arm:** baseline → **neutral, unrelated language material** *(or a delayed
    module)* → post
  The between-arm difference separates the module's effect from the retest effect. Store the
  assigned `arm` and the randomization method/seed. Keep the comparison material prepared,
  balanced, and reviewed.

### 1.4 Outcomes — what "change" means
Per-participant, per-item: **Δ = post_score − baseline_score** (identical wording & scale).
Aggregate into subscales (proposed below; **validate/adjust under review** before analysis):

| Subscale | Draft item mapping (stable IDs) | Direction notes |
|---|---|---|
| Perceived harm | p01, p08; scenario `*_harmful` | higher = more harm |
| Context sensitivity | p02, p03, p04, p05, p10, p11 | higher = more context-dependent |
| Support for reclamation | p06, p07, p09, p14, p15 (reverse p08) | higher = more supportive |
| Offensiveness | scenario `*_offensive` | per-scenario |
| Acceptance | scenario `*_acceptable` | per-scenario |
| Confidence in judgment | scenario `*_confidence` | per-scenario |

Module-evaluation items (post-only, not outcomes): `pm1–pm7` + `overall_change`.

### 1.5 Analysis (document the method; do not auto-claim significance)
- Report **descriptive** change first: mean/median pre→post per subscale, sample size, and
  missing-response counts.
- Single-group: **paired** analysis appropriate to ordinal 7-point data (e.g., Wilcoxon
  signed-rank) with effect sizes and CIs.
- Two-arm: compare **Δ between arms** (e.g., Mann-Whitney on change scores or an ordinal
  mixed model), pre-registering the primary outcome.
- Segment by demographics **only when the group is large enough to protect privacy** (set a
  minimum cell size, e.g., n ≥ 10, and suppress smaller cells).
- Legitimate outcomes explicitly include **no change** and **increased opposition.**

### 1.6 Before recruitment
Have the design, consent, module, comparison material, and analysis plan **independently
reviewed** (ethics/IRB or a qualified researcher). Pre-register the primary hypothesis and
outcomes.

### 1.7 Focal population — multigenerational Black American lineage
The study centers the **historic, multigenerational Black American community established in the
United States before the major immigration changes of 1965** — a population shaped by family,
language, labor, segregation, migration, cultural creation, and resistance. It examines how
people **within and outside** this community understand the history, ownership, and possible
future of the N-word.

**Slavery is part of that historical background but is NOT an individual eligibility
requirement.** Family memory reaches parents, grandparents, and sharecroppers far more reliably
than it reaches a documented enslaved ancestor; requiring a direct account of slavery would
wrongly exclude people who clearly belong to the historic Black American community. Instead,
lineage is measured through several indicators (community identification, U.S.-born grandparents,
pre-1965 establishment, and a family-experiences checklist in which enslavement is one item among
many — sharecropping, Jim Crow, the Great Migration, Black churches and towns, military service,
civil-rights activism, free Black community, Indigenous connection, post-1965 immigration).

**Lineage cohorts (derived at analysis time, not a hard gate — subject to review).** The
"two-grandparent" idea is retained as an *eligibility proxy* for multigenerational American
roots, not as proof of any particular ancestry:

| Cohort | Working definition (draft — reviewer to finalize) |
|---|---|
| Historic-lineage | Identifies as Black American **and** ≥ 2 grandparents from families established in the U.S. before 1965 (`bg_black_american`=Yes, `bg_grandparents_pre1965` ≥ 2) |
| Partial-lineage | One qualifying grandparent, or mixed lineage |
| Recent-diaspora | Black participant whose family primarily immigrated after 1965 |
| Other comparison | Does not identify with the historic Black American lineage |
| Unknown-lineage | Cannot confidently determine family history (`bg_history_certainty` low / `Unsure` responses) |

Cohort assignment is computed from the responses during analysis and documented in the
pre-registration; it is deliberately **not** enforced in the participant flow, because the exact
boundaries are an analytic decision for the reviewer. A **provisional** default implementing this
table (`deriveCohort` in `api/_shared/study.ts`) labels rows in the admin summary (cohort counts)
and export (`cohort_provisional` column) for convenience only; every raw indicator is also
exported so the reviewer can override it without re-collecting data.

---

## 2. Data model (Supabase / Postgres)

Anonymous participant UUID only; **no name/email/phone/birthday-derived IDs.** Version every
instrument. Volunteer contact data is stored in a **separate table with no technical link** to
survey responses.

| Table | Purpose / key fields |
|---|---|
| `studies` | study_version, module_version, instrument_version, consent_version, enrollment_enabled, arms_enabled |
| `consent_versions` | version, text_hash, effective_from |
| `participants` | id (uuid), study_version, **arm** (`intervention`/`comparison`), anon_code, started_at, completed_at, withdrawn (bool), source_channel |
| `background_responses` | participant_id, question_id, value(s) (all optional) |
| `pre_responses` | participant_id, item_id, value (1–7), open_text (sanitized) |
| `scenario_responses` | participant_id, phase (`pre`/`post`), scenario_id, measure_id, value (1–7) |
| `module_progress` | participant_id, section_id, viewed_at |
| `reflection_responses` | participant_id, section_id/prompt_id, text — **stored separately from outcome measures** |
| `knowledge_checks` | participant_id, item_id, chosen_index, correct (bool), attempt |
| `post_responses` | participant_id, item_id, value; plus `pm1–pm7`, `overall_change` |
| `study_completions` | participant_id, completed_at, duration_seconds |
| `withdrawal_requests` | participant_id, requested_at, scope, status |
| `volunteer_contacts` | id (separate), interests[], contact — **no FK to participants** |
| `audit_events` | actor(role), action, target_table, at, minimal metadata |

Store: study/consent/module/question versions, arm, start/complete times, responses,
withdrawal status, and **minimal** security metadata. **Do not store raw IP addresses.** If
abuse prevention needs a technical identifier, **hash + salt + minimize + restrict access +
document retention.** Reflections and open-text are stored separately and are **not** sent to
any third-party AI service unless separately disclosed and approved.

---

## 3. Architecture & build plan

Fits the existing stack (Vite/React on Vercel + Supabase, which you already use elsewhere).

1. **Supabase project** with the tables above + **Row-Level Security** (participants can write
   only their own rows via a short-lived anonymous session token; no public reads).
2. **Serverless API** (`/api/*` functions on Vercel) for all writes — never write from the
   client directly to sensitive tables. Each endpoint: server-side validation, input
   sanitization, CSRF protection, and **rate limiting.**
3. **Arm assignment** endpoint (server-side randomization) called once at enrollment.
4. **Admin dashboard** (protected route) with secure authentication + role-based access:
   totals (starts/consents/pre/module/post/withdrawals), completion rate, median completion
   time, knowledge-check performance, aggregate & scenario-level pre/post, demographic
   segments **only above the min cell size**, CSV/JSON export, data-dictionary download,
   study-version filters, **preview/test-submission exclusion**, and the **enrollment toggle**.
   Labels are descriptive (mean/median difference, n, missing count) — **no automatic
   significance claims.**
5. **Preview isolation:** preview/test rows are flagged and excluded from all research
   aggregates and exports.
6. **Enable flow:** set `VITE_RESEARCH_ENROLLMENT_ENABLED=true` **only after IRB review**, wire
   the client to the API, and turn arm assignment on.

### Security & privacy controls (Phase 2)
HTTPS; server-side validation; sanitization; CSRF; rate limiting; secure admin auth + RBAC;
platform encryption at rest/in transit; **no survey responses in client analytics**; **no ad
trackers / session-replay** on study pages; **no PII in logs**; accessible withdrawal;
configurable retention/deletion policy.

### Environment variables
| Var | Meaning |
|---|---|
| `VITE_RESEARCH_ENROLLMENT_ENABLED` | `false` (default, preview) → `true` only post-IRB |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | client session (RLS-guarded) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server-only** (API functions; never shipped to client) |
| `STUDY_ADMIN_*` | admin auth secret(s) |

### Migrations & testing
- Migrations in `supabase/migrations/` (schema + RLS + seed of instrument versions).
- Tests (Phase 2): eligibility rejection, consent-required gating, preview-not-stored, anon-ID
  generation, survey validation, save-and-return, volunteer-data separation, admin-access
  protection, export, withdrawal/deletion, mobile nav, accessibility basics.

---

## 4. Codebook (current instrument v1.0 — stable IDs)

- **Eligibility:** `elig_age`, `elig_understand`, `elig_content` (Yes/No; all Yes required).
- **Consent (required):** `c_age`, `c_voluntary`, `c_stop`, `c_distress`, `c_consent`;
  optional `c_quotes`. Records consent_version + timestamp; **no typed signature** unless a
  future approved protocol requires it.
- **Background (all optional, incl. "Prefer not to answer"):** `bg_age`, `bg_race` (multi +
  self-describe), `bg_gender` (+ self-describe), `bg_region`, `bg_black_american`,
  `bg_black_american`; **lineage block** → `bg_community_identify`, `bg_grandparents_us_born`,
  `bg_grandparents_pre1965` (proxy), `bg_established_pre1965`, `bg_family_experiences` (multi;
  enslavement is one option among many), `bg_earliest_known`, `bg_history_certainty`,
  `bg_self_terms` (free text); `bg_familiarity`, `bg_frequency`, `bg_contexts` (multi),
  `bg_targeted`, `bg_uses_reclaimed`.
- **Perception statements (pre & post, 7-pt agree):** `p01`–`p15`. Open-ended: `pre_open`.
- **Scenarios:** `sc1`–`sc7` × measures `offensive`, `harmful`, `acceptable`, `confidence`
  (7-pt "Not at all"→"Extremely"), keyed `phase_scenario_measure`.
- **Module:** sections `m1`–`m8`; reflections `reflect_m1`–`reflect_m8` (stored separately).
- **Knowledge check:** `k1`–`k5` (correct indices in `src/data/study.ts`).
- **Post-only:** `pm1`–`pm7`; `overall_change` (5-pt more negative→more positive).
- **Written reflection:** `r1`–`r8`.
- **Volunteer:** `volunteer[]`, `volunteer_contact` — **separate table, no link to responses.**

---

## 5. Placeholders you must supply before recruitment
Researcher contact · participant-concerns contact · IRB/review reference · support resources ·
final consent wording · retention/deletion policy · comparison-arm material.

## 6. Decisions requiring professional review
IRB/ethics approval; consent language; the disputed-etymology framing (kept as "not settled");
whether/how anonymized quotes may be used; subscale definitions; the analysis/pre-registration
plan; minimum cell size for demographic reporting; and any abuse-prevention identifiers.

## 7. Build status
The Phase 2 backend is now **built but dormant** (enrollment OFF). See
[STUDY_PHASE2_SETUP.md](STUDY_PHASE2_SETUP.md) for the go-live runbook and exact file list.
Implementation notes vs. the plan above:
- The conceptual 14-table model is normalized into **6 tables** (schema in
  `supabase/migrations/0001_study_schema.sql`); the separation guarantees (free-text apart from
  measures, unlinked volunteer contacts, no raw IPs) are preserved.
- Writes go through **server-side serverless functions using the service-role key** (not client
  RLS-token writes) — simpler and keeps every secret off the browser. RLS is still on (default-deny)
  as defense in depth.
- With no env vars set, the live site is byte-for-byte the preview experience: no network calls,
  nothing stored. Turning it on requires the Supabase secrets **and** `RESEARCH_ENROLLMENT_ENABLED=true`
  **and** independent/IRB review.

Not done / intentionally deferred: creating the Supabase project, setting any env var, enabling
enrollment, collecting data, or deleting anything. Those wait on your explicit approval and review.
