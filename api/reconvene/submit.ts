import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  methodGuard,
  requireEnabled,
  looksAutomated,
  ipHash,
  overRateLimit,
  cleanText,
  validEmail,
  validItemNumber,
  confirmationCode,
  ORIGINAL_CHOICES,
  PROPOSED_CHOICES,
  CONTACT_METHODS,
  RECONVENE_VERSIONS,
} from "../_shared/reconvene.js";

// POST /api/reconvene/submit
// Body: { draft: Draft, elapsedMs: number, hp: string }
//
// Writes are split across four tables so contact details are never stored in the
// same row as the answers, and the public tally can never be joined to a person
// by accident.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnabled(res)) return;

  const body = (req.body ?? {}) as Record<string, unknown>;
  if (looksAutomated(body)) return res.status(422).json({ error: "rejected" });

  const draft = body.draft as Record<string, unknown> | undefined;
  if (!draft || typeof draft !== "object") {
    return res.status(400).json({ error: "bad_request" });
  }

  // A response is only meaningful against the text it answered.
  if (
    draft.originalVersion !== RECONVENE_VERSIONS.original ||
    draft.proposedVersion !== RECONVENE_VERSIONS.proposed
  ) {
    return res.status(422).json({ error: "stale_version" });
  }

  const hash = ipHash(req);
  if (await overRateLimit("reconvene_submissions", hash)) {
    return res.status(429).json({ error: "rate_limited" });
  }

  const original = (draft.original ?? {}) as Record<string, Record<string, unknown>>;
  const proposed = (draft.proposed ?? {}) as Record<string, Record<string, unknown>>;
  const contact = (draft.contact ?? {}) as Record<string, unknown>;

  type AnswerRow = { submission_id: string; item_set: string; item_num: number; choice: string };
  type TextRow = {
    submission_id: string;
    item_set: string;
    item_num: number;
    kind: string;
    body: string;
  };

  const answers: Omit<AnswerRow, "submission_id">[] = [];
  const texts: Omit<TextRow, "submission_id">[] = [];

  const collect = (
    set: "original" | "proposed",
    src: Record<string, Record<string, unknown>>,
    allowed: string[]
  ): string | null => {
    for (const [key, raw] of Object.entries(src)) {
      const n = Number(key);
      if (!validItemNumber(n)) return "bad_item";
      const choice = typeof raw?.choice === "string" ? raw.choice : null;
      if (choice) {
        if (!allowed.includes(choice)) return "bad_choice";
        answers.push({ item_set: set, item_num: n, choice });
      }
      const comment = cleanText(raw?.comment, 2000);
      if (comment) texts.push({ item_set: set, item_num: n, kind: "comment", body: comment });
      const alt = cleanText(raw?.alt, 2000);
      if (alt) texts.push({ item_set: set, item_num: n, kind: "alternative", body: alt });
    }
    return null;
  };

  const e1 = collect("original", original, ORIGINAL_CHOICES);
  if (e1) return res.status(422).json({ error: e1 });
  const e2 = collect("proposed", proposed, PROPOSED_CHOICES);
  if (e2) return res.status(422).json({ error: e2 });

  const missing = cleanText(draft.missing);
  const email = cleanText(contact.email, 160);
  const phone = cleanText(contact.phone, 40);
  const consent = contact.consent === true;

  if (email && !validEmail(email)) return res.status(422).json({ error: "bad_email" });
  // Contact details are only ever stored with explicit consent.
  if ((email || phone) && !consent) return res.status(422).json({ error: "consent_required" });

  const preferred = cleanText(contact.preferred, 40) ?? "";
  if (!CONTACT_METHODS.includes(preferred)) {
    return res.status(422).json({ error: "bad_contact_method" });
  }

  const interests = Array.isArray(contact.interests)
    ? (contact.interests as unknown[])
        .map((x) => cleanText(x, 60))
        .filter((x): x is string => !!x)
        .slice(0, 20)
    : [];

  // Nothing at all to record.
  if (answers.length === 0 && texts.length === 0 && !missing && !email && !phone) {
    return res.status(422).json({ error: "empty_submission" });
  }

  const code = confirmationCode();

  const { data: sub, error: subErr } = await db()
    .from("reconvene_submissions")
    .insert({
      code,
      original_version: RECONVENE_VERSIONS.original,
      proposed_version: RECONVENE_VERSIONS.proposed,
      missing_text: missing,
      city: cleanText(contact.city, 80),
      state: cleanText(contact.state, 60),
      interests,
      answered_count: answers.length,
      ip_hash: hash,
    })
    .select("id")
    .single();

  if (subErr || !sub) return res.status(500).json({ error: "save_failed" });
  const submission_id = sub.id as string;

  if (answers.length) {
    const { error } = await db()
      .from("reconvene_answers")
      .insert(answers.map((a) => ({ ...a, submission_id })));
    if (error) return res.status(500).json({ error: "save_failed" });
  }
  if (texts.length) {
    const { error } = await db()
      .from("reconvene_texts")
      .insert(texts.map((t) => ({ ...t, submission_id })));
    if (error) return res.status(500).json({ error: "save_failed" });
  }
  if (email || phone) {
    const { error } = await db().from("reconvene_contacts").insert({
      submission_id,
      name: cleanText(contact.name, 80),
      email,
      phone,
      preferred,
      wants_updates: contact.updates === true,
      consented_at: new Date().toISOString(),
    });
    // A contact failure must not lose the review that was already recorded.
    if (error) return res.status(200).json({ code, contactStored: false });
  }

  return res.status(200).json({ code });
}
