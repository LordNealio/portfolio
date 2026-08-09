import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, adminAuthed, methodGuard } from "../_shared/study.js";

// /api/comments/admin   Header: Authorization: Bearer <STUDY_ADMIN_TOKEN>
//   GET                       → all comments (pending first), for moderation
//   POST { id, action }       → action: "approve" | "hide" | "unhide" | "delete"
// Reuses the same admin token as the study dashboard (same site owner).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: "not_configured" });
  }
  if (!adminAuthed(req)) return res.status(401).json({ error: "unauthorized" });

  if (req.method === "GET") {
    const { data, error } = await db()
      .from("comments")
      .select("id, work_slug, author, body, approved, hidden, created_at")
      .order("approved", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) return res.status(500).json({ error: "read_failed" });
    return res.status(200).json({ comments: data || [] });
  }

  if (!methodGuard(req, res, "POST")) return;
  const id = Number(req.body?.id);
  const action = String(req.body?.action || "");
  if (!Number.isInteger(id) || !["approve", "hide", "unhide", "delete"].includes(action)) {
    return res.status(400).json({ error: "bad_request" });
  }

  if (action === "delete") {
    const { error } = await db().from("comments").delete().eq("id", id);
    if (error) return res.status(500).json({ error: "delete_failed" });
    return res.status(200).json({ ok: true });
  }
  const patch =
    action === "approve"
      ? { approved: true, hidden: false }
      : action === "hide"
      ? { hidden: true }
      : { hidden: false };
  const { error } = await db().from("comments").update(patch).eq("id", id);
  if (error) return res.status(500).json({ error: "update_failed" });
  return res.status(200).json({ ok: true });
}
