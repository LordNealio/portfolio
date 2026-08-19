// ─────────────────────────────────────────────────────────────────────────────
// Lightweight, privacy-first event tracking for the user-test / seminar phase.
// Forwards to Vercel Web Analytics (cookieless, no PII) and to Plausible / GTM
// if either is ever present. Captures first-touch UTM + referrer so seminar
// traffic (?utm_source=seminar) can be isolated later — WITHOUT changing the
// experience based on it. No personal information is collected.
// ─────────────────────────────────────────────────────────────────────────────
import { track as vaTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    dataLayer?: unknown[];
  }
}

// First-touch context — captured once per browser session, then reused so every
// event can be attributed to a source/campaign without re-reading the URL.
function readContext(): Record<string, string> {
  try {
    const KEY = "yb.ctx.v1";
    const cached = sessionStorage.getItem(KEY);
    if (cached) return JSON.parse(cached);
    const params = new URLSearchParams(location.search);
    const ctx: Record<string, string> = {
      landing: location.pathname,
      referrer: document.referrer || "direct",
    };
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = params.get(k);
      if (v) ctx[k] = v;
    }
    sessionStorage.setItem(KEY, JSON.stringify(ctx));
    return ctx;
  } catch {
    return {};
  }
}

let CTX: Record<string, string> | null = null;

export function track(event: string, props?: Props) {
  try {
    if (!CTX) CTX = readContext();
    const merged: Props = { ...CTX, path: location.pathname, ...props };
    const clean: Record<string, string | number | boolean | null> = {};
    for (const [k, v] of Object.entries(merged)) if (v !== undefined) clean[k] = v as string | number | boolean | null;
    vaTrack(event, clean);
    window.plausible?.(event, { props: clean });
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...clean });
  } catch {
    /* analytics must never break the UI */
  }
}
