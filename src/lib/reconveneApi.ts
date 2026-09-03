// ─────────────────────────────────────────────────────────────────────────────
// Client-side API wrapper for Reconvening the 34.
//
// Mirrors src/lib/studyApi.ts, but uses its OWN flag. This is community
// feedback, not the IRB-gated research study, so the two must not share a gate.
//
// With VITE_RECONVENE_ENABLED unset (the default) nothing is ever posted, and
// the UI says so plainly rather than pretending a static form stores anything.
// Turning it on additionally requires the server flag + Supabase secrets; absent
// those the server refuses every write.
// ─────────────────────────────────────────────────────────────────────────────
import type { Draft } from "./reconveneDraft";

// Cast rather than a global vite-env.d.ts, matching src/data/study.ts — this
// repo types import.meta.env locally at each use site.
export const RECONVENE_ENABLED =
  (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_RECONVENE_ENABLED === "true";

export type SubmitResult =
  | { ok: true; code: string }
  | { ok: false; reason: "disabled" | "offline" | "rejected" | "server" };

export interface AdditionPayload {
  kind: "revision" | "replacement" | "missing" | "source" | "example";
  targetSet?: "original" | "proposed";
  targetNumber?: number | null;
  body: string;
  sourceUrl?: string;
  name?: string;
  email?: string;
  consent: boolean;
}

async function post(path: string, body: unknown): Promise<Response | null> {
  try {
    return await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return null; // network failure / offline
  }
}

export const reconveneApi = {
  enabled: RECONVENE_ENABLED,

  async submit(draft: Draft, elapsedMs: number, honeypot: string): Promise<SubmitResult> {
    if (!RECONVENE_ENABLED) return { ok: false, reason: "disabled" };
    const r = await post("/api/reconvene?action=submit", { draft, elapsedMs, hp: honeypot });
    if (!r) return { ok: false, reason: "offline" };
    if (r.status === 403) return { ok: false, reason: "disabled" };
    if (r.status === 400 || r.status === 422 || r.status === 429) {
      return { ok: false, reason: "rejected" };
    }
    if (!r.ok) return { ok: false, reason: "server" };
    const data = (await r.json()) as { code?: string };
    return data?.code ? { ok: true, code: data.code } : { ok: false, reason: "server" };
  },

  async addition(payload: AdditionPayload, elapsedMs: number, honeypot: string): Promise<SubmitResult> {
    if (!RECONVENE_ENABLED) return { ok: false, reason: "disabled" };
    const r = await post("/api/reconvene?action=addition", { ...payload, elapsedMs, hp: honeypot });
    if (!r) return { ok: false, reason: "offline" };
    if (r.status === 403) return { ok: false, reason: "disabled" };
    if (r.status === 400 || r.status === 422 || r.status === 429) {
      return { ok: false, reason: "rejected" };
    }
    if (!r.ok) return { ok: false, reason: "server" };
    const data = (await r.json()) as { code?: string };
    return data?.code ? { ok: true, code: data.code } : { ok: false, reason: "server" };
  },

  /** Aggregate counts only. Returns null when collection is off or unreachable. */
  async results(): Promise<ResultsPayload | null> {
    if (!RECONVENE_ENABLED) return null;
    try {
      const r = await fetch("/api/reconvene?action=results");
      if (!r.ok) return null;
      return (await r.json()) as ResultsPayload;
    } catch {
      return null;
    }
  },
};

export interface ResultsPayload {
  submissions: number;
  originalVersion: string;
  proposedVersion: string;
  original: Record<string, Record<string, number>>;
  proposed: Record<string, Record<string, number>>;
  additions: number;
  generatedAt: string;
}
