export interface Comment {
  id: number;
  author: string;
  body: string;
  created_at: string;
}

// Thin client for the comments API. Returns "unconfigured" when the backend
// (Supabase) isn't set up yet, so the UI can show a quiet state.
export const commentsApi = {
  async list(slug: string): Promise<{ status: "ok" | "unconfigured" | "error"; comments: Comment[] }> {
    try {
      const r = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      if (r.status === 503) return { status: "unconfigured", comments: [] };
      if (!r.ok) return { status: "error", comments: [] };
      const data = await r.json();
      return { status: "ok", comments: data.comments || [] };
    } catch {
      return { status: "error", comments: [] };
    }
  },

  async submit(slug: string, author: string, body: string, website = ""): Promise<{ ok: boolean; error?: string }> {
    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, author, body, website }),
      });
      if (r.ok) return { ok: true };
      const data = await r.json().catch(() => ({}));
      return { ok: false, error: data.error || `error_${r.status}` };
    } catch {
      return { ok: false, error: "network" };
    }
  },
};
