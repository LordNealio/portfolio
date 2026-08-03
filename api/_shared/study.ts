// ─────────────────────────────────────────────────────────────────────────────
// Server-side shared helpers for the N-Word study API (Vercel functions).
//
// Files/folders under /api that start with "_" are NOT turned into routes by
// Vercel, so this module is import-only. It never runs in the browser and holds
// the ONLY code path that can touch the database (via the service-role key).
// ─────────────────────────────────────────────────────────────────────────────
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const STUDY_VERSIONS = {
  studyVersion: "1.0.0",
  consentVersion: "1.0",
  moduleVersion: "1.0",
  instrumentVersion: "1.0",
};

// The master gate. Data collection is possible ONLY when the flag is explicitly
// "true" AND both Supabase secrets are present. Absent either, every endpoint
// refuses and writes nothing.
export function enrollmentEnabled(): boolean {
  return (
    process.env.RESEARCH_ENROLLMENT_ENABLED === "true" &&
    !!process.env.SUPABASE_URL &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

let _client: SupabaseClient | null = null;
export function db(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return _client;
}

// Constant-time-ish comparison for the admin bearer token.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function adminAuthed(req: VercelRequest): boolean {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const expected = process.env.STUDY_ADMIN_TOKEN || "";
  return expected.length > 0 && safeEqual(token, expected);
}

// Server-side randomization. Kept deliberately simple (50/50 simple random) for a
// pilot; a reviewer may prefer block/stratified randomization before recruitment.
export function assignArm(): "intervention" | "comparison" {
  return Math.random() < 0.5 ? "intervention" : "comparison";
}

// ── Lineage cohort (PROVISIONAL) ──────────────────────────────────────────────
// Mirrors the draft rule in docs/STUDY_PHASE2_PLAN.md §1.7. This is a DEFAULT for
// convenience only — a reviewer must finalize the boundaries before analysis. It
// is used solely on the read side (admin summary/export) to label rows; it never
// gates the participant flow. Because every raw indicator is also exported, any
// alternative rule can be re-applied later without re-collecting data.
export type Cohort =
  | "historic-lineage"
  | "partial-lineage"
  | "recent-diaspora"
  | "other-comparison"
  | "unknown-lineage";

export function deriveCohort(bg: Record<string, string>): Cohort {
  const black = bg.bg_black_american;
  const raceBlack = (bg.bg_race || "").includes("Black or African American");
  const identifiesBlack = black === "Yes" || raceBlack;
  const gp = /^[0-4]$/.test(bg.bg_grandparents_pre1965 || "")
    ? parseInt(bg.bg_grandparents_pre1965, 10)
    : null; // null = "Unsure"/PNA/missing
  const established = bg.bg_established_pre1965;
  const immigratedPost65 = (bg.bg_family_experiences || "").split("|").includes("Immigration after 1965");
  const lowCertainty = bg.bg_history_certainty === "Very uncertain";

  if (!identifiesBlack) return black === "No" ? "other-comparison" : "unknown-lineage";
  if (gp !== null && gp >= 2) return "historic-lineage";
  if (gp === 0 && (immigratedPost65 || established === "No")) return "recent-diaspora";
  if (gp === 1) return "partial-lineage";
  if (gp === null || lowCertainty) return "unknown-lineage";
  return "unknown-lineage";
}

// ── Validation ────────────────────────────────────────────────────────────────
// Whitelists MIRROR src/data/study.ts. Kept independent because study.ts uses
// Vite-only `import.meta.env` and must not be imported into a Node function.
const NUM_RANGES: { re: RegExp; min: number; max: number }[] = [
  { re: /^(pre|post)_p(0[1-9]|1[0-5])$/, min: 1, max: 7 },                                   // perception p01–p15
  { re: /^(pre|post)_sc[1-7]_(offensive|harmful|acceptable|confidence)$/, min: 1, max: 7 },   // scenarios
  { re: /^pm[1-7]$/, min: 1, max: 7 },                                                        // module-eval
  { re: /^k[1-5]$/, min: 0, max: 6 },                                                          // knowledge index
  { re: /^ck[1-5]$/, min: 0, max: 6 },                                                         // comparison-arm check
  { re: /^c_(age|voluntary|stop|distress|consent|quotes)$/, min: 0, max: 1 },                  // consent booleans
];

const TEXT_ALLOW: RegExp[] = [
  /^pre_open$/,
  /^reflect_m[1-8]$/,
  /^reflect_c[1-8]$/,          // comparison-arm reflections
  /^r[1-8]$/,
  /^elig_(age|understand|content)$/,
  /^bg_[a-z_]+$/,              // background single / multi / self-describe
  /^overall_change$/,
];

const MAX_TEXT = 5000;

export function validNum(item: string, v: unknown): boolean {
  if (!Number.isInteger(v)) return false;
  const r = NUM_RANGES.find((x) => x.re.test(item));
  return !!r && (v as number) >= r.min && (v as number) <= r.max;
}

export function validTextItem(item: string): boolean {
  return TEXT_ALLOW.some((re) => re.test(item));
}

// Strip control chars and clamp length. Values are stored as data and exported as
// CSV/JSON — any UI that later renders them must output-encode at render time.
export function cleanText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.replace(/[\x00-\x1f\x7f]/g, "").slice(0, MAX_TEXT).trim();
  return s.length ? s : null;
}

export function methodGuard(
  req: VercelRequest,
  res: VercelResponse,
  method: "GET" | "POST"
): boolean {
  if (req.method !== method) {
    res.status(405).json({ error: "method_not_allowed" });
    return false;
  }
  return true;
}

// Every write endpoint calls this first.
export function requireEnrollment(res: VercelResponse): boolean {
  if (!enrollmentEnabled()) {
    res.status(403).json({ error: "enrollment_closed" });
    return false;
  }
  return true;
}
