import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  methodGuard,
  reconveneEnabled,
  RECONVENE_VERSIONS,
} from "../_shared/reconvene.js";

// GET /api/reconvene/results
// Aggregate counts ONLY. No names, no contact details, no free text ever leaves
// this endpoint. Returns zeroes rather than inventing numbers.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "GET")) return;
  if (!reconveneEnabled()) return res.status(403).json({ error: "collection_closed" });

  const empty = {
    submissions: 0,
    originalVersion: RECONVENE_VERSIONS.original,
    proposedVersion: RECONVENE_VERSIONS.proposed,
    original: {} as Record<string, Record<string, number>>,
    proposed: {} as Record<string, Record<string, number>>,
    additions: 0,
    generatedAt: new Date().toISOString(),
  };

  const [{ count: subs }, { count: adds }, { data: rows, error }] = await Promise.all([
    db().from("reconvene_submissions").select("id", { count: "exact", head: true }),
    db().from("reconvene_additions").select("id", { count: "exact", head: true }),
    db().from("reconvene_answers").select("item_set, item_num, choice"),
  ]);

  if (error) return res.status(500).json({ error: "read_failed" });

  const tally = { original: empty.original, proposed: empty.proposed };
  for (const r of rows ?? []) {
    const set = r.item_set === "proposed" ? "proposed" : "original";
    const key = String(r.item_num);
    const bucket = (tally[set][key] ??= {});
    bucket[r.choice as string] = (bucket[r.choice as string] ?? 0) + 1;
  }

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.status(200).json({
    ...empty,
    submissions: subs ?? 0,
    additions: adds ?? 0,
    original: tally.original,
    proposed: tally.proposed,
  });
}
