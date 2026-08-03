import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, adminAuthed, methodGuard, deriveCohort } from "../../_shared/study.js";

// GET /api/study/admin/summary   Header: Authorization: Bearer <STUDY_ADMIN_TOKEN>
// Descriptive aggregates only. Preview + withdrawn rows are excluded. Attitude
// change is reported as post − baseline per arm; NO significance is asserted.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "GET")) return;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: "not_configured" });
  }
  if (!adminAuthed(req)) return res.status(401).json({ error: "unauthorized" });

  const { data: parts } = await db()
    .from("study_participants")
    .select("id, arm, is_preview, consented, completed_at, withdrawn");
  const participants = (parts || []).filter((p) => !p.is_preview);
  const analyzable = participants.filter((p) => !p.withdrawn);
  const ids = analyzable.map((p) => p.id);
  const armOf = new Map(analyzable.map((p) => [p.id, p.arm as string]));

  const counts = {
    total: participants.length,
    consented: participants.filter((p) => p.consented).length,
    completed: participants.filter((p) => p.completed_at).length,
    withdrawn: participants.filter((p) => p.withdrawn).length,
    intervention: analyzable.filter((p) => p.arm === "intervention").length,
    comparison: analyzable.filter((p) => p.arm === "comparison").length,
  };

  // Lineage cohort distribution (PROVISIONAL rule — see deriveCohort/plan §1.7).
  const cohortCounts: Record<string, number> = {};
  if (ids.length) {
    const { data: bgRows } = await db()
      .from("study_responses")
      .select("participant_id, item_id, value_text")
      .in("participant_id", ids)
      .eq("phase", "background");
    const byPid: Record<string, Record<string, string>> = {};
    for (const r of bgRows || []) {
      if (r.value_text == null) continue;
      (byPid[r.participant_id] ||= {})[r.item_id] = r.value_text;
    }
    for (const pid of ids) {
      const c = deriveCohort(byPid[pid] || {});
      cohortCounts[c] = (cohortCounts[c] || 0) + 1;
    }
  }

  // Pull numeric responses for analyzable participants and compute pre/post means.
  const perception: Record<string, Record<string, { pre: number[]; post: number[] }>> = {
    intervention: {},
    comparison: {},
  };
  if (ids.length) {
    const { data: rows } = await db()
      .from("study_responses")
      .select("participant_id, item_id, value_num")
      .in("participant_id", ids)
      .not("value_num", "is", null);
    for (const r of rows || []) {
      const m = /^(pre|post)_(p(?:0[1-9]|1[0-5]))$/.exec(r.item_id);
      if (!m) continue;
      const arm = armOf.get(r.participant_id);
      if (!arm) continue;
      const bucket = (perception[arm][m[2]] ||= { pre: [], post: [] });
      bucket[m[1] as "pre" | "post"].push(r.value_num as number);
    }
  }

  const mean = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const attitudeChange = (["intervention", "comparison"] as const).map((arm) => ({
    arm,
    items: Object.entries(perception[arm])
      .sort()
      .map(([item, b]) => ({
        item,
        n_pre: b.pre.length,
        n_post: b.post.length,
        mean_pre: mean(b.pre),
        mean_post: mean(b.post),
        mean_delta: mean(b.pre) !== null && mean(b.post) !== null ? mean(b.post)! - mean(b.pre)! : null,
      })),
  }));

  return res.status(200).json({
    note: "Descriptive only. Δ = post − baseline. No significance is inferred. Preview and withdrawn records excluded. Cohort labels are PROVISIONAL (reviewer must finalize).",
    counts,
    cohortCounts,
    attitudeChange,
  });
}
