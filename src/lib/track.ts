// ─────────────────────────────────────────────────────────────────────────────
// Tiny analytics shim. No platform is installed yet — this is a stable seam so
// conversion events can be wired later without touching every CTA.
//
// If/when analytics lands (Plausible, GA, Vercel Analytics, PostHog…), forward
// from here. Until then it no-ops in production and logs in dev.
// ─────────────────────────────────────────────────────────────────────────────
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, props?: Props) {
  try {
    // Plausible (custom events), if present.
    window.plausible?.(event, props ? { props } : undefined);
    // GA / GTM dataLayer, if present.
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
  } catch {
    /* analytics must never break the UI */
  }
}
