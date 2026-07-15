# Project Inventory

Audited from the workspace (Desktop project folders + `mindvault-app` junctions),
the persistent project memory, and Justin Neal's résumé. Ranked by portfolio
strength. Nothing below is invented; unknowns are flagged.

Legend — **Status:** Live · Prototype · Concept · Research · Archive.
**Strength:** ★ portfolio-readiness.

| # | Project | One-line | Status | Category | On the site? | Strength |
|---|---------|----------|--------|----------|--------------|----------|
| 1 | **MindVault** | Local-first AI journaling → habits, publishing, collective inquiry | Live | Featured Products | **Featured** | ★★★★★ |
| 2 | **Mirror** | Private iPhone PWA that mirrors your own relationship patterns | Live | AI & Knowledge Tools | **Featured** | ★★★★★ |
| 3 | **LegacyBridge** | AI oral-history platform → printable family book | Prototype | Nonprofit & Community | **Featured** | ★★★★★ |
| 4 | **WorkWrite** | AI journaling for restaurant staff; Din Tai Fung pilot | Prototype | Featured Products | **Featured** | ★★★★☆ |
| 5 | **The 7 Temples Tour** | Cinematic Korea festival "digital pilgrimage" concept | Concept | Creative Media & Music | **Featured** | ★★★★☆ |
| 6 | **E.Manual** | 30-day education-first men's life-skills app | Prototype | Education & Learning | **Featured** | ★★★★☆ |
| 7 | **Creation OS** | Unifying symbolic-memory architecture behind the apps | Research | AI & Knowledge Tools | Vision + archive | ★★★★☆ |
| 8 | **K-Source Vault** | AI bilingual Korean textile sourcing marketplace | Concept | Business & Operations | Archive | ★★★☆☆ |
| 9 | **SoundWorld Studio** | Music "worlds", reels, and portfolio creation MVP | Prototype | Creative Media & Music | Archive | ★★★☆☆ |
| 10 | **S4US1McGamer** | 9-game browser arcade, no engine/backend | Prototype | Games & Interactive | Archive | ★★★☆☆ |
| 11 | **RapGod** | Neal/Nil/Kneel documented music-symbolism archive | Research | Research & Writing | Archive | ★★★☆☆ |
| 12 | **MindWrite (origin)** | The founding journaling nonprofit — plan, budget, fundraising | Archive | Nonprofit & Community | Archive | ★★★☆☆ |
| 13 | **Everythang** | Long-form WYRD-framework writing project | Research | Research & Writing | Archive | ★★☆☆☆ |
| 14 | **Pimps' Paradise** | Early harm-reduction / dignity concept for adults | Concept | Nonprofit & Community | Archive (flagged) | ★★☆☆☆ |
| — | **Throne Talk** | Socratic collective-inquiry mode | Live (module) | — | Folded into MindVault | — |

**On-site total:** 14 project records (`src/data/projects.ts`). Throne Talk is
presented as a MindVault feature rather than a separate card.

---

## Per-project detail

### 1. MindVault — Live · Featured
- **Location:** `MindWrite/mindvault-app` (working repo).
- **What:** Local-first AI journaling with a Habit Atomizer, a Publish module
  (idea → IG/LinkedIn/X/newsletter/blog), Throne Talk collective inquiry, Vault
  search, box breathing, games.
- **Tech:** React 18, Vite, IndexedDB, Claude via secure server proxy, Vercel.
- **Role:** Founder, product architect, prompt architect, creative director.
- **Distinctive:** Private local-first core with a labeled, opt-in outbound AI layer.
- **Reported live:** `mindvault-app-zeta.vercel.app` (confirm — `verified:false`).

### 2. Mirror — Live · Featured
- **Location:** `MindWrite/mirror-app`.
- **What:** Client-only PWA; Reflect / Prepare / Work-things-out-together. Nine
  non-negotiable principles; a "Do NOT build" list.
- **Tech:** React, TS, Vite, PWA, IndexedDB (idb), Claude (direct, key in-browser only).
- **Distinctive:** Privacy by architecture; the AI mirrors the writer, never profiles others.
- **Reported live:** `mirror-app-green-omega.vercel.app` (confirm — `verified:false`).

### 3. LegacyBridge — Prototype · Featured
- **Location:** `Desktop/LegacyBridge` (junctioned into mindvault-app).
- **What:** Guided AI interviews, transcription, timeline extraction, family
  invites, book export. All routes built over 8 live Supabase tables with RLS.
- **Tech:** Next.js 15, TS, Tailwind, Framer Motion, Supabase, Claude + Whisper, react-pdf.
- **Gap:** Production AI keys not set → functional prototype.

### 4. WorkWrite — Prototype · Featured
- **Location:** `MindWrite/workwrite-app`.
- **What:** Pre-shift check-in, in-shift voice logging w/ stress detection,
  end-of-shift debrief; anonymized manager dashboard. Pilot: Din Tai Fung.
- **Tech:** Next.js 15, Supabase (RLS), Claude, Vercel. Clean build.
- **Gap:** No public pilot URL yet.

### 5. The 7 Temples Tour — Concept · Featured
- **Location:** `Desktop/7-temples-tour` (junctioned as `seven-temples`).
- **What:** Bilingual EN/KO festival concept — 7 cities × 7 temples, artist
  journey with verbatim setlists, founder essay. Phase 1 browser-verified.
- **Tech:** Next.js 14, TS, Tailwind, Framer Motion. Draws from RapGod archive.
- **Honest framing:** Concept presentation for an unconfirmed event.

### 6. E.Manual — Prototype · Featured
- **Location:** `mindvault-app/emanual`.
- **What:** 30-day, 5-track life-skills path; field guides, quizzes, habit
  tracker, budget calculator, 90-day plan engine; non-shaming tone + crisis safety.
- **Tech:** Expo SDK 57, React Native, TS, Expo Router, Zustand, Supabase (cloud mode).
- **Gap:** Complete in local demo mode; awaits a live Supabase project.

### 7. Creation OS — Research (the thesis)
- **Location:** `Desktop/creation-os`.
- **What:** Five-layer shared intelligence architecture (Intake → Structuring →
  Meaning Graph → Synthesis → Output). White paper written.
- **Use on site:** Powers the **Vision** page + appears in the archive.
- **Open decision:** standalone app vs. shared backend vs. MindVault-as-primary.

### 8. K-Source Vault — Concept
- **Location:** `Desktop/k-source-vault`.
- **What:** Verified Korean mills ↔ U.S. brands; AI profile generator + matching
  engine; verification badges; sample tracking. Specced, not built.
- **Tech:** Next.js 14, TS, Tailwind, Supabase, Claude.

### 9. SoundWorld Studio — Prototype
- **Location:** `Desktop/soundworld-studio`.
- **What:** Auth, "worlds", composition sessions with uploads, reel builder,
  portfolio. Functional MVP.
- **Tech:** Next.js, TS, Tailwind, Supabase, Framer Motion.

### 10. S4US1McGamer — Prototype
- **Location:** `Desktop/s4us1mcgamer`.
- **What:** 9 original browser games (runner, clicker, memory, dodge, Snake,
  invaders, caterpillar platformer, fighter, fruit slicer). Local high scores.
- **Tech:** React, Vite, TS, CSS, localStorage.

### 11. RapGod — Research archive
- **Location:** `Documents/New Ideas/RapGod/RapGod Foundation`.
- **What:** NEAL/NIL/KNEEL framework; 50+ songs with verbatim documented notes;
  18 concepts; ~111 connections. Verbatim-only rule.
- **Tech:** Next.js 14, CSV data model.

### 12. MindWrite (origin) — Archive · circa 2023
- **Location:** `Desktop/MindWrite` (exec summary, business-model canvas,
  fundraising, marketing, research, budget).
- **What:** The founding journaling nonprofit — the origin story of the ecosystem.
- **Role:** Full operating foundation, drawing on finance + nonprofit experience.

### 13. Everythang — Research/writing
- **Location:** `Desktop/Everythang`.
- **What:** Long-form writing around the WYRD framework (fate, revelation).
- **Status:** In-progress raw material, not a finished publication.

### 14. Pimps' Paradise — Concept (flagged)
- **Location:** `MindWrite/pimps-paradise`.
- **What:** Early harm-reduction / dignity empowerment concept for adults.
- **⚠ Flag:** The working name likely doesn't suit a public professional
  portfolio. Included in the archive but marked; see `CONTENT_NEEDED.md` for the
  naming/scope decision. Trivial to hide (`featured:false` already; can remove).

---

## Professional spine (from résumé — the differentiator)
- **Master of Accountancy** & B.Acc, Miami University.
- **Assistant Director of Finance / Finance Manager, Arizona PBS** — $20MM, 70k+
  members, 3-year strategy, two US GAAP audits, $1.9MM federal grants.
- **Staff Accountant, 3CDC** — $20MM portfolio month-end close.
- **English Teacher, South Korea** (Neungin Middle School / Moonkang) — 1,500+ students.
- **Graduate Assistant, Miami University** — taught financial accounting.
- **Certified Kaizen Facilitator (Lean)**, Scrum, GenAI for marketers.
