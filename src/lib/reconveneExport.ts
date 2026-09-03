// ─────────────────────────────────────────────────────────────────────────────
// Getting a finished review OUT of the browser without a backend.
//
// Until collection is switched on, a completed review would otherwise be stuck
// in one person's localStorage. These helpers turn it into something a human can
// actually read, keep, print, or send back: plain text, a file, the clipboard,
// or an email.
// ─────────────────────────────────────────────────────────────────────────────
import {
  ORIGINAL_34,
  ORIGINAL_OPTIONS,
  PROPOSED_34,
  PROPOSED_OPTIONS,
  RECONVENE_VERSIONS,
} from "../data/reconvening34";
import type { Draft } from "./reconveneDraft";

const label = (opts: { value: string; label: string }[], v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "—";

/** A readable transcript of a review. Plain text on purpose: it survives email,
 *  printing, and being pasted anywhere. */
export function formatReview(draft: Draft): string {
  const L: string[] = [];
  const rule = "=".repeat(66);

  L.push("RECONVENING THE 34 — MY REVIEW");
  L.push(rule);
  L.push(`Completed: ${new Date().toLocaleString()}`);
  L.push(`Versions reviewed: ${RECONVENE_VERSIONS.original} / ${RECONVENE_VERSIONS.proposed}`);
  L.push("");
  L.push("This is community feedback, not an official election.");
  L.push("");

  const section = (
    heading: string,
    items: { n: number; title: string }[],
    answers: Draft["original"],
    opts: { value: string; label: string }[]
  ) => {
    const answered = items.filter((r) => answers[String(r.n)]?.choice);
    L.push(rule);
    L.push(`${heading} — ${answered.length} of ${items.length} reviewed`);
    L.push(rule);
    if (answered.length === 0) L.push("(nothing reviewed in this set)");
    for (const r of answered) {
      const a = answers[String(r.n)];
      L.push("");
      L.push(`${r.n}. ${r.title}`);
      L.push(`   Choice: ${label(opts, a.choice)}`);
      if (a.alt?.trim()) L.push(`   Alternative wording: ${a.alt.trim()}`);
      if (a.comment?.trim()) L.push(`   Comment: ${a.comment.trim()}`);
    }
    L.push("");
  };

  section("THE ORIGINAL 34 (Ohio, 1848)", ORIGINAL_34, draft.original, ORIGINAL_OPTIONS);
  section("THE PROPOSED NEW 34 (2026–2076)", PROPOSED_34, draft.proposed, PROPOSED_OPTIONS);

  L.push(rule);
  L.push("WHAT IS MISSING FROM BOTH SETS");
  L.push(rule);
  L.push(draft.missing.trim() || "(no answer given)");
  L.push("");

  const c = draft.contact;
  if (c.name || c.email || c.phone || c.city || c.state || c.interests.length) {
    L.push(rule);
    L.push("ABOUT ME");
    L.push(rule);
    if (c.name) L.push(`Name: ${c.name}`);
    if (c.email) L.push(`Email: ${c.email}`);
    if (c.phone) L.push(`Phone: ${c.phone}`);
    if (c.preferred) L.push(`Preferred contact: ${c.preferred}`);
    if (c.city || c.state) L.push(`Location: ${[c.city, c.state].filter(Boolean).join(", ")}`);
    if (c.interests.length) L.push(`Interests: ${c.interests.join("; ")}`);
    L.push(`Wants updates: ${c.updates ? "yes" : "no"}`);
    L.push("");
  }

  return L.join("\n");
}

/** Short enough to survive a mailto: URL in any mail client. */
export function formatSummary(draft: Draft): string {
  const oc = Object.values(draft.original).filter((a) => a.choice).length;
  const pc = Object.values(draft.proposed).filter((a) => a.choice).length;
  const comments = [
    ...Object.values(draft.original),
    ...Object.values(draft.proposed),
  ].filter((a) => a.comment?.trim() || a.alt?.trim()).length;
  return [
    "My review of Reconvening the 34.",
    "",
    `Original 34 reviewed: ${oc} of 34`,
    `Proposed New 34 reviewed: ${pc} of 34`,
    `Comments written: ${comments}`,
    `Note on what is missing: ${draft.missing.trim() ? "yes" : "no"}`,
    `Versions: ${RECONVENE_VERSIONS.original} / ${RECONVENE_VERSIONS.proposed}`,
    "",
  ].join("\n");
}

export function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or a page without clipboard permission.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** mailto: URLs are length-limited in practice (~2000 chars, less in some
 *  clients). A full review will not fit, so above the cap we send a short
 *  summary and hand the reader the full transcript as a file to attach. */
const MAILTO_BODY_CAP = 1400;

export type MailOutcome = "full" | "summary-with-file";

export interface AdditionText {
  kind: string;
  targetSet?: string;
  targetNumber?: number | null;
  body: string;
  sourceUrl?: string;
  name?: string;
  email?: string;
}

export function formatAddition(a: AdditionText): string {
  const L = ["RECONVENING THE 34 — A CONTRIBUTION", "=".repeat(50), ""];
  L.push(`Kind: ${a.kind}`);
  if (a.targetSet && a.targetNumber) {
    const set = a.targetSet === "original" ? "The Original 34 (1848)" : "The Proposed New 34 (2026)";
    L.push(`Concerns: ${set}, entry ${a.targetNumber}`);
  }
  L.push("");
  L.push("Contribution:");
  L.push(a.body);
  if (a.sourceUrl) L.push("", `Source: ${a.sourceUrl}`);
  if (a.name) L.push("", `From: ${a.name}`);
  if (a.email) L.push(`Email: ${a.email}`);
  L.push("");
  return L.join("\n");
}

export function emailAddition(a: AdditionText, to: string): MailOutcome {
  const full = formatAddition(a);
  let body = full;
  let outcome: MailOutcome = "full";
  if (encodeURIComponent(full).length > MAILTO_BODY_CAP * 3) {
    body =
      "My contribution to Reconvening the 34 was too long for an email body, so it is in the attached file (it just downloaded to this device — please attach it before sending).\n";
    outcome = "summary-with-file";
    downloadText(full, "reconvening-34-my-contribution.txt");
  }
  window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    "Reconvening the 34 — a contribution"
  )}&body=${encodeURIComponent(body)}`;
  return outcome;
}

export function emailReview(draft: Draft, to: string): MailOutcome {
  const full = formatReview(draft);
  const subject = "Reconvening the 34 — my review";
  let body = full;
  let outcome: MailOutcome = "full";

  if (encodeURIComponent(full).length > MAILTO_BODY_CAP * 3) {
    body =
      formatSummary(draft) +
      "\nMy full responses are in the attached file (it just downloaded to this device — please attach it before sending).\n";
    outcome = "summary-with-file";
    downloadText(full, "reconvening-34-my-review.txt");
  }

  const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return outcome;
}
