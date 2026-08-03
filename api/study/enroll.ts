import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  assignArm,
  STUDY_VERSIONS,
  methodGuard,
  requireEnrollment,
} from "../_shared/study";

// POST /api/study/enroll
// Body: { anonCode: string, isPreview?: boolean }
// Creates a participant, assigns a study arm server-side, returns the id + arm.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnrollment(res)) return;

  const anonCode = String((req.body?.anonCode ?? "")).slice(0, 32).trim();
  if (!/^NW-[A-Z0-9]{4,16}$/.test(anonCode)) {
    return res.status(400).json({ error: "bad_code" });
  }
  const isPreview = req.body?.isPreview === true;
  const arm = assignArm();

  const { data, error } = await db()
    .from("study_participants")
    .insert({
      anon_code: anonCode,
      arm,
      is_preview: isPreview,
      study_version: STUDY_VERSIONS.studyVersion,
      consent_version: STUDY_VERSIONS.consentVersion,
      module_version: STUDY_VERSIONS.moduleVersion,
      instrument_version: STUDY_VERSIONS.instrumentVersion,
    })
    .select("id, arm")
    .single();

  if (error || !data) {
    return res.status(500).json({ error: "enroll_failed" });
  }
  await db().from("study_events").insert({ participant_id: data.id, event: "started" });

  return res.status(200).json({ participantId: data.id, arm: data.arm });
}
