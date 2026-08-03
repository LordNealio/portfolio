import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, methodGuard, requireEnrollment } from "../_shared/study.js";

// POST /api/study/withdraw  Body: { participantId: string }
// Withdrawal FLAGS the record (and stops further saves). It never hard-deletes
// data — permanent deletion is handled separately under the retention policy.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnrollment(res)) return;

  const participantId = String(req.body?.participantId ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(participantId)) {
    return res.status(400).json({ error: "bad_request" });
  }
  const { error } = await db()
    .from("study_participants")
    .update({ withdrawn: true, withdrawn_at: new Date().toISOString() })
    .eq("id", participantId);
  if (error) return res.status(500).json({ error: "withdraw_failed" });

  await db().from("study_withdrawals").insert({ participant_id: participantId, scope: "all" });
  return res.status(200).json({ ok: true });
}
