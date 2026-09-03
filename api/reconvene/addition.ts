import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  db,
  methodGuard,
  requireEnabled,
  looksAutomated,
  ipHash,
  overRateLimit,
  cleanText,
  validEmail,
  validHttpUrl,
  validItemNumber,
  confirmationCode,
  ADDITION_KINDS,
} from "../_shared/reconvene.js";

// POST /api/reconvene/addition
// A proposed revision, replacement, missing subject, source, or practical example.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, "POST")) return;
  if (!requireEnabled(res)) return;

  const body = (req.body ?? {}) as Record<string, unknown>;
  if (looksAutomated(body)) return res.status(422).json({ error: "rejected" });

  const hash = ipHash(req);
  if (await overRateLimit("reconvene_additions", hash)) {
    return res.status(429).json({ error: "rate_limited" });
  }

  const kind = String(body.kind ?? "");
  if (!ADDITION_KINDS.includes(kind)) return res.status(422).json({ error: "bad_kind" });

  const text = cleanText(body.body);
  if (!text || text.length < 12) return res.status(422).json({ error: "too_short" });

  const targetSet = body.targetSet === "original" || body.targetSet === "proposed" ? body.targetSet : null;
  const targetNumber = body.targetNumber == null ? null : Number(body.targetNumber);
  if (targetNumber !== null && !validItemNumber(targetNumber)) {
    return res.status(422).json({ error: "bad_target" });
  }
  if ((kind === "revision" || kind === "replacement") && (!targetSet || targetNumber === null)) {
    return res.status(422).json({ error: "target_required" });
  }

  const sourceUrl = cleanText(body.sourceUrl, 500);
  if (sourceUrl && !validHttpUrl(sourceUrl)) return res.status(422).json({ error: "bad_url" });

  const email = cleanText(body.email, 160);
  if (email && !validEmail(email)) return res.status(422).json({ error: "bad_email" });
  if (email && body.consent !== true) return res.status(422).json({ error: "consent_required" });

  const code = confirmationCode("ADD");

  const { error } = await db().from("reconvene_additions").insert({
    code,
    kind,
    target_set: targetSet,
    target_number: targetNumber,
    body: text,
    source_url: sourceUrl,
    name: cleanText(body.name, 80),
    email,
    consented: body.consent === true,
    ip_hash: hash,
  });

  if (error) return res.status(500).json({ error: "save_failed" });
  return res.status(200).json({ code });
}
