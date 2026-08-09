import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Comment moderation dashboard. Bearer-token gated (same token as the study
// admin). Inert until Supabase is configured. Not linked from site navigation.
interface Row {
  id: number;
  work_slug: string;
  author: string;
  body: string;
  approved: boolean;
  hidden: boolean;
  created_at: string;
}

export function CommentsAdmin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("nw_admin_token") || "");
  const [entered, setEntered] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Comment moderation — NIL";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const load = async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/comments/admin", { headers: { Authorization: `Bearer ${t}` } });
      if (r.status === 401) return setError("Unauthorized — check the token.");
      if (r.status === 503) return setError("Backend not configured (Supabase env not set).");
      if (!r.ok) return setError(`Request failed (${r.status}).`);
      setRows(((await r.json()).comments as Row[]) || []);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) void load(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const act = async (id: number, action: "approve" | "hide" | "unhide" | "delete") => {
    const r = await fetch("/api/comments/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, action }),
    });
    if (r.ok) void load(token);
    else setError(`Action failed (${r.status}).`);
  };

  const signIn = () => {
    sessionStorage.setItem("nw_admin_token", entered);
    setToken(entered);
    void load(entered);
  };

  const pending = rows.filter((r) => !r.approved && !r.hidden);
  const rest = rows.filter((r) => r.approved || r.hidden);

  const card = (c: Row) => (
    <li className="mod-item" key={c.id}>
      <div className="mod-meta">
        <strong>{c.author}</strong> · <span className="muted">{c.work_slug}</span>{" "}
        <span className="muted">{new Date(c.created_at).toLocaleString()}</span>{" "}
        {c.approved && <span className="mod-badge ok">approved</span>}
        {c.hidden && <span className="mod-badge hide">hidden</span>}
        {!c.approved && !c.hidden && <span className="mod-badge pend">pending</span>}
      </div>
      <p className="mod-body">{c.body}</p>
      <div className="mod-actions">
        {!c.approved && <button className="study-btn ghost" onClick={() => act(c.id, "approve")}>Approve</button>}
        {!c.hidden ? (
          <button className="study-btn ghost" onClick={() => act(c.id, "hide")}>Hide</button>
        ) : (
          <button className="study-btn ghost" onClick={() => act(c.id, "unhide")}>Unhide</button>
        )}
        <button className="study-btn ghost" onClick={() => { if (confirm("Delete this comment permanently?")) act(c.id, "delete"); }}>
          Delete
        </button>
      </div>
    </li>
  );

  return (
    <section className="section page-top study">
      <div className="wrap study-wrap">
        <div className="study-card">
          <p className="study-eyebrow">Moderation</p>
          <h1 className="study-h1">Comment moderation</h1>

          {!token && (
            <div className="reveal">
              <p className="study-p">Enter the admin token.</p>
              <input
                className="study-input"
                type="password"
                placeholder="Admin token"
                value={entered}
                onChange={(e) => setEntered(e.target.value)}
              />
              <div style={{ marginTop: 12 }}>
                <button className="study-btn primary" onClick={signIn} disabled={!entered}>
                  Sign in
                </button>
              </div>
            </div>
          )}

          {token && (
            <div className="reveal">
              <button
                className="study-btn ghost"
                onClick={() => {
                  sessionStorage.removeItem("nw_admin_token");
                  setToken("");
                  setRows([]);
                }}
              >
                Sign out
              </button>
              {loading && <p className="study-fine">Loading…</p>}
              {error && <p className="study-fine">{error}</p>}

              <h2 className="study-h2">Pending ({pending.length})</h2>
              {pending.length === 0 ? (
                <p className="study-fine">Nothing waiting.</p>
              ) : (
                <ul className="mod-list">{pending.map(card)}</ul>
              )}

              <h2 className="study-h2">Approved &amp; hidden ({rest.length})</h2>
              {rest.length === 0 ? (
                <p className="study-fine">None yet.</p>
              ) : (
                <ul className="mod-list">{rest.map(card)}</ul>
              )}
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <Link to="/work" className="study-btn ghost">
              ← Back to work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
