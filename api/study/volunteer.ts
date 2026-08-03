import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, methodGuard, requireEnrollment, cleanText } from "../_shared/study.js";

// POST /api/study/volunteer  Body: { interests: string[], contact?: string }
// Stored in study_volunteers, which has NO link to the participant's responses.
// We intentionally do NOT accept a participantId here — unlinkability is the point.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnrollment(res)) return;

  const interests = Array.isArray(req.body?.interests)
    ? req.body.interests.slice(0, 12).map((s: unknown) => String(s).slice(0, 120))
    : [];
  const contact = cleanText(req.body?.contact)?.slice(0, 200) ?? null;
  if (!interests.length && !contact) return res.status(200).json({ ok: true, skipped: true });

  const { error } = await db().from("study_volunteers").insert({ interests, contact });
  if (error) return res.status(500).json({ error: "volunteer_failed" });
  return res.status(200).json({ ok: true });
}
