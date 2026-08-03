import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Researcher dashboard for the N-Word study. Reads /api/study/admin/* using a
// bearer token. On the live site with no Supabase configured, the API returns
// 503 and this page simply shows "not configured" — it is inert until Phase 2 is
// provisioned and enabled. Not linked from site navigation.
// ─────────────────────────────────────────────────────────────────────────────

interface ItemStat {
  item: string;
  n_pre: number;
  n_post: number;
  mean_pre: number | null;
  mean_post: number | null;
  mean_delta: number | null;
}
interface Summary {
  note: string;
  counts: Record<string, number>;
  cohortCounts: Record<string, number>;
  attitudeChange: { arm: string; items: ItemStat[] }[];
}

const fmt = (v: number | null) => (v === null ? "—" : v.toFixed(2));

export function StudyAdmin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("nw_admin_token") || "");
  const [entered, setEntered] = useState("");
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Study admin — NIL";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const auth = () => ({ Authorization: `Bearer ${token}` });

  const load = async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/study/admin/summary", { headers: { Authorization: `Bearer ${t}` } });
      if (r.status === 401) return setError("Unauthorized — check the token.");
      if (r.status === 503) return setError("Backend not configured (Supabase env not set). Nothing to show yet.");
      if (!r.ok) return setError(`Request failed (${r.status}).`);
      setData((await r.json()) as Summary);
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

  const signIn = () => {
    sessionStorage.setItem("nw_admin_token", entered);
    setToken(entered);
    void load(entered);
  };

  const download = async (format: "json" | "csv", texts: boolean) => {
    const qs = new URLSearchParams({ format, ...(texts ? { texts: "1" } : {}) });
    const r = await fetch(`/api/study/admin/export?${qs}`, { headers: auth() });
    if (!r.ok) return setError(`Export failed (${r.status}).`);
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nword-study-export.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="section page-top study">
      <div className="wrap study-wrap">
        <div className="study-card">
          <p className="study-eyebrow">Researcher access</p>
          <h1 className="study-h1">N-Word study — dashboard</h1>

          {!token && (
            <div className="reveal">
              <p className="study-p">Enter the admin token to view aggregates.</p>
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
                  setData(null);
                }}
              >
                Sign out
              </button>
              {loading && <p className="study-fine">Loading…</p>}
              {error && <p className="study-fine">{error}</p>}

              {data && (
                <>
                  <p className="study-fine">{data.note}</p>
                  <h2 className="study-h2">Counts</h2>
                  <div className="chips">
                    {Object.entries(data.counts).map(([k, v]) => (
                      <span className="chip on" key={k}>
                        {k}: {v}
                      </span>
                    ))}
                  </div>

                  {data.cohortCounts && (
                    <>
                      <h2 className="study-h2">Lineage cohorts (provisional)</h2>
                      <div className="chips">
                        {Object.entries(data.cohortCounts).map(([k, v]) => (
                          <span className="chip on" key={k}>
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                      <p className="study-fine">
                        Cohort labels are a provisional default and must be finalized by your
                        reviewer. Raw indicators are in the export so any rule can be re-applied.
                      </p>
                    </>
                  )}

                  {data.attitudeChange.map((arm) => (
                    <div key={arm.arm}>
                      <h2 className="study-h2" style={{ textTransform: "capitalize" }}>
                        {arm.arm} — attitude change (Δ = post − baseline)
                      </h2>
                      {arm.items.length === 0 ? (
                        <p className="study-fine">No data yet.</p>
                      ) : (
                        <div style={{ overflowX: "auto" }}>
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>n</th>
                                <th>Pre</th>
                                <th>Post</th>
                                <th>Δ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arm.items.map((it) => (
                                <tr key={it.item}>
                                  <td>{it.item}</td>
                                  <td>{it.n_post}</td>
                                  <td>{fmt(it.mean_pre)}</td>
                                  <td>{fmt(it.mean_post)}</td>
                                  <td>{fmt(it.mean_delta)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}

                  <h2 className="study-h2">Export</h2>
                  <div className="chips">
                    <button className="study-btn ghost" onClick={() => download("csv", false)}>
                      CSV (no free-text)
                    </button>
                    <button className="study-btn ghost" onClick={() => download("json", false)}>
                      JSON (no free-text)
                    </button>
                    <button className="study-btn ghost" onClick={() => download("csv", true)}>
                      CSV + free-text
                    </button>
                  </div>
                  <p className="study-fine">
                    Free-text is the most sensitive content — include it only when necessary and handle it
                    per your retention policy.
                  </p>
                </>
              )}
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <Link to="/work/the-n-word" className="study-btn ghost">
              ← Back to the project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
