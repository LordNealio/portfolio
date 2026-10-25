// ─────────────────────────────────────────────────────────────────────────────
// GoatCounter — the owner's phone-friendly stats dashboard, independent of
// Vercel's plan limits: https://youngblesser.goatcounter.com
//
// Counts page views (every route change in this single-page app) and a small set
// of named events: linktree button clicks and video plays. Cookieless; no
// personal information is sent. GoatCounter's script skips localhost by itself.
// ─────────────────────────────────────────────────────────────────────────────

const ENDPOINT = "https://youngblesser.goatcounter.com/count";
const SCRIPT = "https://gc.zgo.at/count.js";

type GcCount = (vars: { path: string; title?: string; event?: boolean }) => void;

declare global {
  interface Window {
    goatcounter?: { count?: GcCount; no_onload?: boolean; [k: string]: unknown };
  }
}

const queue: Array<Parameters<GcCount>[0]> = [];
let loading = false;

function flush() {
  const count = window.goatcounter?.count;
  if (!count) return;
  while (queue.length) {
    try {
      count(queue.shift()!);
    } catch {
      /* stats must never break the site */
    }
  }
}

function load() {
  if (loading || typeof document === "undefined") return;
  loading = true;
  try {
    // We count route changes ourselves, so turn off the script's own first count.
    window.goatcounter = { ...(window.goatcounter || {}), no_onload: true };
    const s = document.createElement("script");
    s.async = true;
    s.src = SCRIPT;
    s.setAttribute("data-goatcounter", ENDPOINT);
    s.onload = flush;
    document.head.appendChild(s);
  } catch {
    /* ignore */
  }
}

function send(vars: Parameters<GcCount>[0]) {
  queue.push(vars);
  if (window.goatcounter?.count) flush();
  else load();
}

/** A page view for the current route (path plus query, e.g. /work?lens=build). */
export function gcPage(path: string) {
  send({ path });
}

/** A named event, shown in the dashboard's list of events. */
export function gcEvent(name: string) {
  send({ path: name, title: name, event: true });
}

// Readable names for the linktree buttons, so the dashboard reads plainly.
const LINKTREE_NAMES: Record<string, string> = {
  mindwrite: "Linktree → MindWrite (the journal)",
  mindvault: "Linktree → MindVault (the app)",
  videos: "Linktree → The Hamiltonian Solution",
  "video-34": "Linktree → The 34 video",
  home: "Linktree → Enter the site: Home",
  apps: "Linktree → Enter the site: Apps",
  archive: "Linktree → Enter the site: Archive",
};

/** Called from track(): forwards only the events worth seeing on the dashboard. */
export function gcFromTrack(event: string, props?: Record<string, unknown>) {
  if (event === "linktree_click") {
    const key = String(props?.key ?? "");
    gcEvent(LINKTREE_NAMES[key] ?? `Linktree → ${key || "other"}`);
  } else if (event === "video_play") {
    gcEvent(`Video played: ${String(props?.title ?? "untitled")}`);
  }
}
