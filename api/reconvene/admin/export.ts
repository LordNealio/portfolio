import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  methodGuard,
  adminAuthed,
  dbConfigured,
  toCsv,
} from "../../_shared/reconvene.js";

// GET /api/reconvene/admin/export?kind=submissions|answers|comments|additions|contacts
// Bearer token required. Contacts are a SEPARATE export so response data and
// personal data are never handed out in one file by default.
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "GET")) return;
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
