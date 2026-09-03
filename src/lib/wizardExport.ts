import { ORIGINAL_34, RECONVENE_VERSIONS } from "../data/reconvening34";
import { reviewOf, pileCounts, type WizardDraft } from "./wizardDraft";
import { downloadText } from "./reconveneExport";

const choiceLabel = (c: string | null) =>
  c === "keep" ? "Keep It" : c === "update" ? "Update It" : c === "retire" ? "Retire It" : "—";

export function formatWizardReview(draft: WizardDraft): string {
  const L: string[] = [];
  const rule = "=".repeat(66);
  const counts = pileCounts(draft);

  L.push("REVIEW THE ORIGINAL 34 — MY REVIEW");
  L.push(rule);
  L.push(`Completed: ${new Date().toLocaleString()}`);
  L.push(`Version: ${RECONVENE_VERSIONS.original}`);
  L.push(`Wizard: ${draft.wizardVersion}`);
  L.push("");
  L.push("This is community feedback, not an official election.");
  L.push("");
  L.push(`Keep: ${counts.keep}  |  Update: ${counts.update}  |  Retire: ${counts.retire}`);
  L.push(`Skipped: ${counts.skipped}  |  Unanswered: ${counts.unanswered}`);
  L.push(`New proposals: ${draft.proposals.length}`);
  L.push("");

  L.push(rule);
  L.push("RESOLUTIONS");
  L.push(rule);

  for (const r of ORIGINAL_34) {
    const rv = reviewOf(draft, r.n);
    L.push("");
    L.push(`${r.n}. ${r.title}`);
    L.push(`   Choice: ${choiceLabel(rv.choice)}`);
    if (rv.note?.trim()) L.push(`   Note: ${rv.note.trim()}`);
    if (!rv.choice && rv.status === "skipped") L.push("   (Skipped)");
  }
  L.push("");

  if (draft.proposals.length > 0) {
    L.push(rule);
    L.push("NEW PROPOSALS");
    L.push(rule);
    for (const p of draft.proposals) {
      L.push("");
      L.push(`Title: ${p.title || "(untitled)"}`);
      L.push(`Wording: ${p.wording}`);
      L.push(`Reasoning: ${p.reasoning}`);
      L.push(`Affected: ${p.affected}`);
      if (p.relatedNumbers.length)
        L.push(`Related to Original: ${p.relatedNumbers.join(", ")}`);
    }
    L.push("");
  }

  if (draft.confirmationCode) {
    L.push(rule);
    L.push(`Confirmation: ${draft.confirmationCode}`);
    L.push("");
  }

  return L.join("\n");
}

export { downloadText, copyText } from "./reconveneExport";

const MAILTO_BODY_CAP = 1400;

export type MailOutcome = "full" | "summary-with-file";

export function emailWizardReview(draft: WizardDraft, to: string): MailOutcome {
  const full = formatWizardReview(draft);
  const subject = "Review the Original 34 — my review";
  let body = full;
  let outcome: MailOutcome = "full";

  if (encodeURIComponent(full).length > MAILTO_BODY_CAP * 3) {
    const counts = pileCounts(draft);
    body = [
      "My review of the Original 34.",
      "",
      `Keep: ${counts.keep}  |  Update: ${counts.update}  |  Retire: ${counts.retire}`,
      `New proposals: ${draft.proposals.length}`,
      "",
      "Full responses are in the attached file.",
    ].join("\n");
    outcome = "summary-with-file";
    downloadText(full, "original-34-my-review.txt");
  }

  window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  return outcome;
}
