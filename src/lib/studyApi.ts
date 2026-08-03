// ─────────────────────────────────────────────────────────────────────────────
// Client-side API wrapper for the N-Word study.
//
// EVERY function here is a no-op that returns null unless enrollment is enabled
// (VITE_RESEARCH_ENROLLMENT_ENABLED === "true"). With the flag off — its default,
// and its state on the live site today — the study page never calls the network
// and behaves exactly as the preview walkthrough. Turning it on additionally
// requires the server secrets + IRB sign-off; without those the server refuses.
// ─────────────────────────────────────────────────────────────────────────────
import { RESEARCH_ENROLLMENT_ENABLED } from "../data/study";

export const enrollmentEnabled = RESEARCH_ENROLLMENT_ENABLED;

export type Arm = "intervention" | "comparison";

export interface SavePayload {
  participantId: string;
  phase: string;
  numeric?: { item_id: string; value: number }[];
  enums?: { item_id: string; value: string }[];
  text?: { item_id: string; value: string }[];
  events?: string[];
  consent?: boolean;
}

async function post<T>(path: string, body: unknown): Promise<T | null> {
  if (!enrollmentEnabled) return null;
  try {
    const r = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export const studyApi = {
  enabled: enrollmentEnabled,

  enroll(anonCode: string, isPreview = false) {
    return post<{ participantId: string; arm: Arm }>("/api/study/enroll", { anonCode, isPreview });
  },

  save(payload: SavePayload) {
    return post<{ ok: boolean; saved: number }>("/api/study/save", payload);
  },

  complete(participantId: string) {
    return post<{ ok: boolean }>("/api/study/complete", { participantId });
  },

  withdraw(participantId: string) {
    return post<{ ok: boolean }>("/api/study/withdraw", { participantId });
  },

  volunteer(interests: string[], contact?: string) {
    return post<{ ok: boolean }>("/api/study/volunteer", { interests, contact });
  },
};
