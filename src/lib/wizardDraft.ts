import { RECONVENE_VERSIONS } from "../data/reconvening34";

const KEY = "reconvene34.wizard.v1";

export type WizardChoice = "keep" | "update" | "retire";

export interface ResolutionReview {
  resolutionNumber: number;
  resolutionVersion: string;
  choice: WizardChoice | null;
  note: string;
  status: "reviewed" | "skipped" | "unanswered";
  updatedAt: string;
}

export interface NewProposal {
  id: string;
  title: string;
  wording: string;
  reasoning: string;
  affected: string;
  relatedNumbers: number[];
}

export interface WizardDraft {
  v: 1;
  originalVersion: string;
  wizardVersion: string;
  reviews: Record<number, ResolutionReview>;
  proposals: NewProposal[];
  startedAt: string;
  submitted: boolean;
  confirmationCode: string | null;
}

export const WIZARD_VERSION = "original-review-wizard-v1";

export function emptyReview(n: number): ResolutionReview {
  return {
    resolutionNumber: n,
    resolutionVersion: RECONVENE_VERSIONS.original,
    choice: null,
    note: "",
    status: "unanswered",
    updatedAt: new Date().toISOString(),
  };
}

export function emptyDraft(): WizardDraft {
  return {
    v: 1,
    originalVersion: RECONVENE_VERSIONS.original,
    wizardVersion: WIZARD_VERSION,
    reviews: {},
    proposals: [],
    startedAt: new Date().toISOString(),
    submitted: false,
    confirmationCode: null,
  };
}

let memory: WizardDraft | null = null;

export function loadWizardDraft(): WizardDraft {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return memory ?? emptyDraft();
    const parsed = JSON.parse(raw) as Partial<WizardDraft>;
    if (parsed?.v !== 1) return emptyDraft();
    if (parsed.originalVersion !== RECONVENE_VERSIONS.original) return emptyDraft();
    return { ...emptyDraft(), ...parsed, reviews: parsed.reviews ?? {} } as WizardDraft;
  } catch {
    return memory ?? emptyDraft();
  }
}

export function saveWizardDraft(d: WizardDraft): WizardDraft {
  memory = d;
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* in-memory only */
  }
  return d;
}

export function clearWizardDraft() {
  memory = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function reviewOf(d: WizardDraft, n: number): ResolutionReview {
  return d.reviews[n] ?? emptyReview(n);
}

export function setReview(d: WizardDraft, n: number, patch: Partial<ResolutionReview>): WizardDraft {
  const prev = reviewOf(d, n);
  const next: ResolutionReview = {
    ...prev,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  if (next.choice) next.status = "reviewed";
  return saveWizardDraft({ ...d, reviews: { ...d.reviews, [n]: next } });
}

export function skipReview(d: WizardDraft, n: number): WizardDraft {
  const prev = reviewOf(d, n);
  if (prev.status === "reviewed") return d;
  return saveWizardDraft({
    ...d,
    reviews: {
      ...d.reviews,
      [n]: { ...prev, status: "skipped", updatedAt: new Date().toISOString() },
    },
  });
}

export type PileCounts = { keep: number; update: number; retire: number; skipped: number; unanswered: number };

export function pileCounts(d: WizardDraft): PileCounts {
  const c: PileCounts = { keep: 0, update: 0, retire: 0, skipped: 0, unanswered: 0 };
  for (let n = 1; n <= 34; n++) {
    const r = reviewOf(d, n);
    if (r.choice === "keep") c.keep++;
    else if (r.choice === "update") c.update++;
    else if (r.choice === "retire") c.retire++;
    else if (r.status === "skipped") c.skipped++;
    else c.unanswered++;
  }
  return c;
}

export function reviewedCount(d: WizardDraft): number {
  return Object.values(d.reviews).filter((r) => r.choice).length;
}

export function generateConfirmationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "FRC-";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
    if (i === 3) code += "-";
  }
  return code;
}
