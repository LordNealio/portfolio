// ─────────────────────────────────────────────────────────────────────────────
// Reconvening the 34 — a SINGLE serverless function routing four actions.
//
// Vercel's Hobby plan caps a deployment at 12 serverless functions, and this
// project already runs 9. Four separate files here made 13 and the deploy was
// rejected at the "Deploying outputs" step, so the actions are dispatched on
// ?action= instead of by filename:
//
//   POST /api/reconvene?action=submit    — a completed review
//   POST /api/reconvene?action=addition  — a community contribution
//   GET  /api/reconvene?action=results   — aggregate counts only
//   GET  /api/reconvene?action=export    — admin CSV (bearer token)
//
// Everything remains gated by RECONVENE_ENABLED + the Supabase secrets; with
// those unset every write refuses and nothing is stored.
// ─────────────────────────────────────────────────────────────────────────────
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  adminAuthed,
  dbConfigured,
  reconveneEnabled,
  requireEnabled,
  looksAutomated,
  ipHash,
  overRateLimit,
  cleanText,
  validEmail,
  validHttpUrl,
  validItemNumber,
  confirmationCode,
  toCsv,
  ORIGINAL_CHOICES,
  PROPOSED_CHOICES,
  ADDITION_KINDS,
  CONTACT_METHODS,
  RECONVENE_VERSIONS,
} from "./_shared/reconvene.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = String(req.query.action ?? "");
  switch (action) {
    case "submit":
      return req.method === "POST" ? submit(req, res) : methodFail(res);
    case "addition":
      return req.method === "POST" ? addition(req, res) : methodFail(res);
    case "results":
      return req.method === "GET" ? results(req, res) : methodFail(res);
    case "export":
      return req.method === "GET" ? exportCsv(req, res) : methodFail(res);
    default:
      return res.status(400).json({ error: "unknown_action" });
  }
}

const methodFail = (res: VercelResponse) =>
  res.status(405).json({ error: "method_not_allowed" });

// ── A completed review ───────────────────────────────────────────────────────
// Split across four tables so contact details never sit in the same row as the
// answers, and the public tally can never be joined to a person by accident.
async function submit(req: VercelRequest, res: VercelResponse) {
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

  const answers: { item_set: string; item_num: number; choice: string }[] = [];
  const texts: { item_set: string; item_num: number; kind: string; body: string }[] = [];

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

// ── A community contribution ─────────────────────────────────────────────────
async function addition(req: VercelRequest, res: VercelResponse) {
  if (!requireEnabled(res)) return;

  const body = (req.body ?? {}) as Record<string, unknown>;
  if (looksAutomated(body)) return res.status(422).json({ error: "rejected" });

  const hash = ipHash(req);
  if (await overRateLimit("reconvene_additions", hash)) {
    return res.status(429).json({ error: "rate_limited" });
  }

  const kind = String(body.kind ?? "");
  if (!ADDITION_KINDS.includes(kind)) return res.status(422).json({ error: "bad_kind" });

  const text = cleanText(body.body);
  if (!text || text.length < 12) return res.status(422).json({ error: "too_short" });

  const targetSet =
    body.targetSet === "original" || body.targetSet === "proposed" ? body.targetSet : null;
  const targetNumber = body.targetNumber == null ? null : Number(body.targetNumber);
  if (targetNumber !== null && !validItemNumber(targetNumber)) {
    return res.status(422).json({ error: "bad_target" });
  }
  if ((kind === "revision" || kind === "replacement") && (!targetSet || targetNumber === null)) {
    return res.status(422).json({ error: "target_required" });
  }

  const sourceUrl = cleanText(body.sourceUrl, 500);
  if (sourceUrl && !validHttpUrl(sourceUrl)) return res.status(422).json({ error: "bad_url" });

  const email = cleanText(body.email, 160);
  if (email && !validEmail(email)) return res.status(422).json({ error: "bad_email" });
  if (email && body.consent !== true) return res.status(422).json({ error: "consent_required" });

  const code = confirmationCode("ADD");

  const { error } = await db().from("reconvene_additions").insert({
    code,
    kind,
    target_set: targetSet,
    target_number: targetNumber,
    body: text,
    source_url: sourceUrl,
    name: cleanText(body.name, 80),
    email,
    consented: body.consent === true,
    ip_hash: hash,
  });

  if (error) return res.status(500).json({ error: "save_failed" });
  return res.status(200).json({ code });
}

// ── Aggregate results ────────────────────────────────────────────────────────
// Counts ONLY. No names, contact details, or free text ever leave here, and
// zeroes are returned rather than invented numbers.
async function results(_req: VercelRequest, res: VercelResponse) {
  if (!reconveneEnabled()) return res.status(403).json({ error: "collection_closed" });

  const [{ count: subs }, { count: adds }, { data: rows, error }] = await Promise.all([
    db().from("reconvene_submissions").select("id", { count: "exact", head: true }),
    db().from("reconvene_additions").select("id", { count: "exact", head: true }),
    db().from("reconvene_answers").select("item_set, item_num, choice"),
  ]);

  if (error) return res.status(500).json({ error: "read_failed" });

  const tally: Record<string, Record<string, Record<string, number>>> = {
    original: {},
    proposed: {},
  };
  for (const r of rows ?? []) {
    const set = r.item_set === "proposed" ? "proposed" : "original";
    const key = String(r.item_num);
    const bucket = (tally[set][key] ??= {});
    bucket[r.choice as string] = (bucket[r.choice as string] ?? 0) + 1;
  }

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.status(200).json({
    submissions: subs ?? 0,
    additions: adds ?? 0,
    originalVersion: RECONVENE_VERSIONS.original,
    proposedVersion: RECONVENE_VERSIONS.proposed,
    original: tally.original,
    proposed: tally.proposed,
    generatedAt: new Date().toISOString(),
  });
}

// ── Admin CSV export ─────────────────────────────────────────────────────────
// Contacts are a separate export so response data and personal data are never
// handed out in one file by default.
const TABLES: Record<string, { table: string; columns: string[] }> = {
  submissions: {
    table: "reconvene_submissions",
    columns: [
      "id",
      "code",
      "original_version",
      "proposed_version",
      "answered_count",
      "missing_text",
      "city",
      "state",
      "interests",
      "created_at",
    ],
  },
  answers: {
    table: "reconvene_answers",
    columns: ["submission_id", "item_set", "item_num", "choice"],
  },
  comments: {
    table: "reconvene_texts",
    columns: ["submission_id", "item_set", "item_num", "kind", "body"],
  },
  additions: {
    table: "reconvene_additions",
    columns: [
      "id",
      "code",
      "kind",
      "target_set",
      "target_number",
      "body",
      "source_url",
      "name",
      "email",
      "consented",
      "created_at",
    ],
  },
  contacts: {
    table: "reconvene_contacts",
    columns: [
      "submission_id",
      "name",
      "email",
      "phone",
      "preferred",
      "wants_updates",
      "consented_at",
    ],
  },
};

async function exportCsv(req: VercelRequest, res: VercelResponse) {
  if (!dbConfigured()) return res.status(503).json({ error: "not_configured" });
  if (!adminAuthed(req)) return res.status(401).json({ error: "unauthorized" });

  const kind = String(req.query.kind ?? "submissions");
  const spec = TABLES[kind];
  if (!spec) return res.status(400).json({ error: "bad_kind" });

  const { data, error } = await db()
    .from(spec.table)
    .select(spec.columns.join(","))
    .order("created_at", { ascending: true, nullsFirst: true })
    .limit(50000);

  if (error) return res.status(500).json({ error: "read_failed" });

  const csv = toCsv((data ?? []) as unknown as Record<string, unknown>[], spec.columns);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="reconvening-34-${kind}.csv"`);
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).send(csv);
}
