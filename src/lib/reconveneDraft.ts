// ─────────────────────────────────────────────────────────────────────────────
// Local draft store for Reconvening the 34.
//
// The whole review is usable with no account and no network: choices, comments
// and contact details live in localStorage until the visitor chooses to submit.
// Nothing here leaves the device. If storage is unavailable (private mode, or a
// browser with site data blocked) every call degrades to an in-memory object so
// the review still works for the length of the session.
// ─────────────────────────────────────────────────────────────────────────────
import { RECONVENE_VERSIONS } from "../data/reconvening34";

const KEY = "reconvene34.draft.v1";

export interface ItemAnswer {
  choice?: string;
  comment?: string;
  /** Only used by the proposed set, for "Submit alternative wording". */
  alt?: string;
}

export interface ContactBlock {
  name: string;
  email: string;
  phone: string;
  preferred: string;
  city: string;
  state: string;
  interests: string[];
  consent: boolean;
  updates: boolean;
}

export interface Draft {
  v: 1;
  originalVersion: string;
  proposedVersion: string;
  original: Record<string, ItemAnswer>;
  proposed: Record<string, ItemAnswer>;
  missing: string;
  contact: ContactBlock;
  updatedAt: string;
}

export const emptyContact = (): ContactBlock => ({
  name: "",
  email: "",
  phone: "",
  preferred: "",
  city: "",
  state: "",
  interests: [],
  consent: false,
  updates: false,
});

export const emptyDraft = (): Draft => ({
  v: 1,
  originalVersion: RECONVENE_VERSIONS.original,
  proposedVersion: RECONVENE_VERSIONS.proposed,
  original: {},
  proposed: {},
  missing: "",
  contact: emptyContact(),
  updatedAt: new Date().toISOString(),
});

// Fallback when localStorage throws (private browsing, blocked site data).
let memory: Draft | null = null;

export function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return memory ?? emptyDraft();
    const parsed = JSON.parse(raw) as Partial<Draft>;
    if (parsed?.v !== 1) return emptyDraft();
    // A wording revision bumps the version id; old answers are not carried over
    // into a new version, because they answered different text.
    if (
      parsed.originalVersion !== RECONVENE_VERSIONS.original ||
      parsed.proposedVersion !== RECONVENE_VERSIONS.proposed
    ) {
      return emptyDraft();
    }
    return {
      ...emptyDraft(),
      ...parsed,
      original: parsed.original ?? {},
      proposed: parsed.proposed ?? {},
      contact: { ...emptyContact(), ...(parsed.contact ?? {}) },
    } as Draft;
  } catch {
    return memory ?? emptyDraft();
  }
}

export function saveDraft(d: Draft): Draft {
  const next = { ...d, updatedAt: new Date().toISOString() };
  memory = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* in-memory only for this session */
  }
  return next;
}

export function clearDraft() {
  memory = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export const reviewedCount = (d: Draft) =>
  Object.values(d.original).filter((a) => a.choice).length +
  Object.values(d.proposed).filter((a) => a.choice).length;
