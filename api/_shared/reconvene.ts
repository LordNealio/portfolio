// ─────────────────────────────────────────────────────────────────────────────
// Server-side shared helpers for Reconvening the 34 (Vercel functions).
//
// Files/folders under /api starting with "_" are NOT turned into routes, so this
// module is import-only. It holds the only code path that touches the database.
//
// This is community feedback, NOT the IRB-gated research study, so it uses its
// own flag (RECONVENE_ENABLED) and its own tables. The two must never share a
// gate: turning the study on must not open this, and vice versa.
// ─────────────────────────────────────────────────────────────────────────────
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const RECONVENE_VERSIONS = {
  original: "original-1848-v1",
  proposed: "proposed-2026-v1",
} as const;

/** Writes are possible ONLY with the flag explicitly "true" and both secrets present. */
export function reconveneEnabled(): boolean {
  return (
    process.env.RECONVENE_ENABLED === "true" &&
    !!process.env.SUPABASE_URL &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function dbConfigured(): boolean {
  return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

let _client: SupabaseClient | null = null;
export function db(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return _client;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function adminAuthed(req: VercelRequest): boolean {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const expected = process.env.RECONVENE_ADMIN_TOKEN || process.env.STUDY_ADMIN_TOKEN || "";
  return expected.length > 0 && safeEqual(token, expected);
}

export function methodGuard(
  req: VercelRequest,
  res: VercelResponse,
  method: "GET" | "POST"
): boolean {
  if (req.method !== method) {
    res.status(405).json({ error: "method_not_allowed" });
    return false;
  }
  return true;
}

export function requireEnabled(res: VercelResponse): boolean {
  if (!reconveneEnabled()) {
    res.status(403).json({ error: "collection_closed" });
    return false;
  }
  return true;
}

// ── Identity-free abuse control ──────────────────────────────────────────────
// The raw IP is never stored. Only a salted hash, used to rate-limit and then
// discarded on export. Without a salt configured, hashing still happens but the
// value is not portable across deployments — which is fine, it is disposable.
export function ipHash(req: VercelRequest): string {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = fwd || String(req.headers["x-real-ip"] || "") || "unknown";
  const salt = process.env.RECONVENE_IP_SALT || "reconvene";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/** Rejects bots: a filled honeypot, or a form completed impossibly fast. */
export function looksAutomated(body: Record<string, unknown>): boolean {
  if (typeof body.hp === "string" && body.hp.trim() !== "") return true;
  const elapsed = Number(body.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < 3000) return true;
  return false;
}

const HOURLY_CAP = 8;

export async function overRateLimit(table: string, hash: string): Promise<boolean> {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await db()
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", hash)
    .gte("created_at", since);
  if (error) return false; // never block on an infrastructure hiccup
  return (count ?? 0) >= HOURLY_CAP;
}

// ── Validation ───────────────────────────────────────────────────────────────
export const ORIGINAL_CHOICES = [
  "carry_forward",
  "modernize",
  "merge",
  "achieved",
  "retire",
  "unsure",
];
export const PROPOSED_CHOICES = [
  "support",
  "support_revised",
  "combine",
  "exclude",
  "more_info",
  "alternative",
];
export const ADDITION_KINDS = ["revision", "replacement", "missing", "source", "example"];
export const CONTACT_METHODS = ["Email", "Phone", "Either", "No follow-up", ""];

const MAX_TEXT = 5000;

/** Strips control characters and clamps length. Stored as data; encode at render. */
export function cleanText(v: unknown, max = MAX_TEXT): string | null {
  if (typeof v !== "string") return null;
  const s = v.replace(/[\x00-\x1f\x7f]/g, "").slice(0, max).trim();
  return s.length ? s : null;
}

export function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 160;
}

export function validHttpUrl(v: string): boolean {
  try {
    const u = new URL(v);
    return (u.protocol === "http:" || u.protocol === "https:") && v.length <= 500;
  } catch {
    return false;
  }
}

export function validItemNumber(n: unknown): n is number {
  return Number.isInteger(n) && (n as number) >= 1 && (n as number) <= 34;
}

/** Public, non-identifying confirmation code. */
export function confirmationCode(prefix = "R34"): string {
  const raw = randomBytes(6).toString("hex").toUpperCase();
  return `${prefix}-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

// ── CSV ──────────────────────────────────────────────────────────────────────
// Values are quoted and any leading =, +, -, @ is prefixed with a single quote so
// a spreadsheet cannot interpret a submitted string as a formula.
function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '""';
  let s = Array.isArray(v) ? v.join("; ") : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export function toCsv(rows: Record<string, unknown>[], columns?: string[]): string {
  if (rows.length === 0) return columns?.length ? columns.join(",") + "\n" : "";
  const cols = columns ?? Object.keys(rows[0]);
  const head = cols.join(",");
  const body = rows.map((r) => cols.map((c) => csvCell(r[c])).join(",")).join("\n");
  return `${head}\n${body}\n`;
}
