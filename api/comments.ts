import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, cleanText } from "./_shared/study.js";

// /api/comments
//   GET  ?slug=<work>     → approved, non-hidden comments for a work (public)
//   POST { slug, author, body, website? } → submit a comment (held for approval)
// Requires Supabase env; otherwise returns 503 and the UI shows a quiet state.
function configured() {
  return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}
const SLUG = /^[a-z0-9-]{1,64}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!configured()) return res.status(503).json({ error: "not_configured" });

  if (req.method === "GET") {
    const slug = String(req.query.slug || "");
    if (!SLUG.test(slug)) return res.status(400).json({ error: "bad_slug" });
    const { data, error } = await db()
      .from("comments")
      .select("id, author, body, created_at")
      .eq("work_slug", slug)
      .eq("approved", true)
      .eq("hidden", false)
      .order("created_at", { ascending: true })
      .limit(500);
    if (error) return res.status(500).json({ error: "read_failed" });
    return res.status(200).json({ comments: data || [] });
  }

  if (req.method === "POST") {
    const slug = String(req.body?.slug || "");
    if (!SLUG.test(slug)) return res.status(400).json({ error: "bad_slug" });
    // Honeypot: real users never fill this hidden field. Pretend success.
    if (cleanText(req.body?.website)) return res.status(200).json({ ok: true, pending: true });

    const author = cleanText(req.body?.author)?.slice(0, 60);
    const body = cleanText(req.body?.body)?.slice(0, 2000);
    if (!author || !body) return res.status(422).json({ error: "missing_fields" });

    const { error } = await db().from("comments").insert({ work_slug: slug, author, body });
    if (error) return res.status(500).json({ error: "save_failed" });
    return res.status(200).json({ ok: true, pending: true });
  }

  return res.status(405).json({ error: "method_not_allowed" });
}
