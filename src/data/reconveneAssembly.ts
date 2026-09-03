// ─────────────────────────────────────────────────────────────────────────────
// September 6 Assembly — the one file to edit when details are confirmed.
//
// Everything is null until it is real. The page renders an honest "not yet
// announced" state for each empty field, so no fabricated meeting URL, time, or
// platform ever appears. Fill these in and redeploy; no other file changes.
// ─────────────────────────────────────────────────────────────────────────────

export interface AssemblyDetails {
  /** e.g. 2026 — the year this configuration describes. */
  year: number | null;
  /** ISO date-time with offset, e.g. "2026-09-06T18:00:00-04:00". */
  startsAt: string | null;
  /** Human-readable timezone label, e.g. "Eastern". */
  timezone: string | null;
  /** e.g. "Zoom", "Google Meet". Null until decided. */
  platform: string | null;
  /** The real join URL. NEVER put a placeholder here. */
  joinUrl: string | null;
  /** Registration URL, if separate from joining. */
  registerUrl: string | null;
  /** Short agenda lines. Empty array is fine. */
  agenda: string[];
}

export const ASSEMBLY: AssemblyDetails = {
  year: null,
  startsAt: null,
  timezone: null,
  platform: null,
  joinUrl: null,
  registerUrl: null,
  agenda: [],
};

export const ASSEMBLY_PURPOSE = [
  "Collective study — read the record together before deciding anything.",
  "Accounting — report what was actually built, transferred, or abandoned since the last assembly.",
  "Correction — revise entries the evidence no longer supports.",
  "Future planning — examine several plausible futures rather than one prediction.",
  "Selection — choose a few bounded priorities, not thirty-four simultaneous assignments.",
];
