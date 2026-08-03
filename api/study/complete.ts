import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, methodGuard, requireEnrollment } from "../_shared/study.js";

// POST /api/study/complete  Body: { participantId: string }
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnrollment(res)) return;

  const participantId = String(req.body?.participantId ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(participantId)) {
    return res.status(400).json({ error: "bad_request" });
  }
  const { error } = await db()
    .from("study_participants")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", participantId)
    .eq("withdrawn", false);
  if (error) return res.status(500).json({ error: "complete_failed" });

  await db().from("study_events").insert({ participant_id: participantId, event: "completed" });
  return res.status(200).json({ ok: true });
}
