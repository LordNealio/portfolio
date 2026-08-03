import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, adminAuthed, methodGuard, deriveCohort } from "../../_shared/study.js";

// GET /api/study/admin/export?format=json|csv&texts=1
//   Header: Authorization: Bearer <STUDY_ADMIN_TOKEN>
// Exports numeric/enum responses (long format). Free-text is only included when
// texts=1 is explicitly requested, since it is the most sensitive content.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "GET")) return;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: "not_configured" });
  }
  if (!adminAuthed(req)) return res.status(401).json({ error: "unauthorized" });

  const format = String(req.query.format || "json");
  const includeTexts = String(req.query.texts || "") === "1";

  const { data: parts } = await db()
    .from("study_participants")
    .select("id, arm, is_preview, withdrawn, completed_at, created_at");
  const keep = (parts || []).filter((p) => !p.is_preview);
  const meta = new Map(keep.map((p) => [p.id, p]));
  const ids = keep.map((p) => p.id);

  let responses: { participant_id: string; phase: string; item_id: string; value_num: number | null; value_text: string | null }[] = [];
  let texts: { participant_id: string; phase: string; item_id: string; value_text: string }[] = [];
  if (ids.length) {
    const r = await db()
      .from("study_responses")
      .select("participant_id, phase, item_id, value_num, value_text")
      .in("participant_id", ids);
    responses = r.data || [];
    if (includeTexts) {
      const t = await db()
        .from("study_texts")
        .select("participant_id, phase, item_id, value_text")
        .in("participant_id", ids);
      texts = t.data || [];
    }
  }

  // Provisional lineage cohort per participant, from their background answers.
  const bgByPid: Record<string, Record<string, string>> = {};
  for (const r of responses) {
    if (r.phase !== "background" || r.value_text == null) continue;
    (bgByPid[r.participant_id] ||= {})[r.item_id] = r.value_text;
  }
  const cohortOf = (pid: string) => deriveCohort(bgByPid[pid] || {});

  const rows = [
    ...responses.map((r) => ({
      participant_id: r.participant_id,
      arm: meta.get(r.participant_id)?.arm ?? "",
      cohort_provisional: cohortOf(r.participant_id),
      withdrawn: meta.get(r.participant_id)?.withdrawn ?? false,
      kind: "response",
      phase: r.phase,
      item_id: r.item_id,
      value_num: r.value_num,
      value_text: r.value_text,
    })),
    ...texts.map((t) => ({
      participant_id: t.participant_id,
      arm: meta.get(t.participant_id)?.arm ?? "",
      cohort_provisional: cohortOf(t.participant_id),
      withdrawn: meta.get(t.participant_id)?.withdrawn ?? false,
      kind: "text",
      phase: t.phase,
      item_id: t.item_id,
      value_num: null as number | null,
      value_text: t.value_text,
    })),
  ];

  if (format === "csv") {
    const cols = ["participant_id", "arm", "cohort_provisional", "withdrawn", "kind", "phase", "item_id", "value_num", "value_text"];
    const esc = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc((r as Record<string, unknown>)[c])).join(","))].join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="nword-study-export.csv"');
    return res.status(200).send(csv);
  }

  return res.status(200).json({ participants: keep.length, rows });
}
