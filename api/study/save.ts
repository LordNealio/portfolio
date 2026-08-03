import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  methodGuard,
  requireEnrollment,
  validNum,
  validTextItem,
  cleanText,
} from "../_shared/study.js";

// POST /api/study/save
// Body: {
//   participantId: string,
//   phase: string,
//   numeric?: { item_id: string, value: number }[],   // Likert / scenarios / knowledge / consent
//   text?:    { item_id: string, value: string }[],    // open-ended / reflections (stored separately)
//   enums?:   { item_id: string, value: string }[],    // single-choice text answers (eligibility/background/overall)
//   events?:  string[],                                 // module_view:m3, etc.
//   consent?: boolean,                                  // marks participant consented
// }
// Idempotent: re-saving the same phase upserts by (participant, phase, item).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnrollment(res)) return;

  const participantId = String(req.body?.participantId ?? "");
  const phase = String(req.body?.phase ?? "").slice(0, 32);
  if (!/^[0-9a-f-]{36}$/i.test(participantId) || !phase) {
    return res.status(400).json({ error: "bad_request" });
  }

  // Participant must exist and not have withdrawn.
  const { data: p } = await db()
    .from("study_participants")
    .select("id, withdrawn")
    .eq("id", participantId)
    .single();
  if (!p) return res.status(404).json({ error: "unknown_participant" });
  if (p.withdrawn) return res.status(409).json({ error: "withdrawn" });

  const numeric = Array.isArray(req.body?.numeric) ? req.body.numeric : [];
  const enums = Array.isArray(req.body?.enums) ? req.body.enums : [];
  const text = Array.isArray(req.body?.text) ? req.body.text : [];
  const events = Array.isArray(req.body?.events) ? req.body.events : [];

  // Numeric + enum answers → study_responses
  const respRows: { participant_id: string; phase: string; item_id: string; value_num?: number; value_text?: string }[] = [];
  for (const r of numeric) {
    const item = String(r?.item_id ?? "");
    if (!validNum(item, r?.value)) return res.status(422).json({ error: "bad_numeric", item });
    respRows.push({ participant_id: participantId, phase, item_id: item, value_num: r.value });
  }
  for (const r of enums) {
    const item = String(r?.item_id ?? "");
    if (!validTextItem(item)) return res.status(422).json({ error: "bad_enum", item });
    const v = cleanText(r?.value);
    if (v) respRows.push({ participant_id: participantId, phase, item_id: item, value_text: v });
  }

  // Free-text answers → study_texts (SEPARATE table)
  const textRows: { participant_id: string; phase: string; item_id: string; value_text: string }[] = [];
  for (const r of text) {
    const item = String(r?.item_id ?? "");
    if (!validTextItem(item)) return res.status(422).json({ error: "bad_text", item });
    const v = cleanText(r?.value);
    if (v) textRows.push({ participant_id: participantId, phase, item_id: item, value_text: v });
  }

  if (respRows.length) {
    const { error } = await db()
      .from("study_responses")
      .upsert(respRows, { onConflict: "participant_id,phase,item_id" });
    if (error) return res.status(500).json({ error: "save_failed" });
  }
  if (textRows.length) {
    const { error } = await db()
      .from("study_texts")
      .upsert(textRows, { onConflict: "participant_id,item_id" });
    if (error) return res.status(500).json({ error: "save_failed" });
  }
  if (events.length) {
    await db().from("study_events").insert(
      events.slice(0, 40).map((e: unknown) => ({
        participant_id: participantId,
        event: String(e).slice(0, 64),
      }))
    );
  }
  if (req.body?.consent === true) {
    await db()
      .from("study_participants")
      .update({ consented: true, consented_at: new Date().toISOString() })
      .eq("id", participantId);
  }

  return res.status(200).json({ ok: true, saved: respRows.length + textRows.length });
}
