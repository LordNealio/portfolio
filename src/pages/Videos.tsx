import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERIES, VIDEOS, Video, VideoVersion, getSeries, shownVersions, unlockSrc } from "../data/videos";
import { track } from "../lib/track";
import { NotFound } from "./NotFound";

// THE VIDEO LIBRARY — every video and reel, grouped by series (/videos), or a
// single series on its own page (/videos/:series). Each video shows at most its
// two most recent versions; a video with none yet shows "Coming soon".
function Player({ version, title, fallbackPoster }: { version: VideoVersion; title: string; fallbackPoster?: string }) {
  if (version.src) {
    return (
      <video
        className="vl-media"
        src={version.src}
        poster={version.poster ?? fallbackPoster}
        controls
        playsInline
        preload="metadata"
        onPlay={(e) => {
          // Count the first play only, not every resume after a pause.
          const el = e.currentTarget;
          if (el.dataset.counted) return;
          el.dataset.counted = "1";
          track("video_play", { title: version.label ? `${title} (${version.label})` : title });
        }}
      />
    );
  }
  return (
    <iframe
      className="vl-media"
      src={version.embed}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

const keyFor = (id: string) => `vl-unlock-${id}`;
function savedPassword(id: string): string {
  try {
    return sessionStorage.getItem(keyFor(id)) ?? "";
  } catch {
    return "";
  }
}

function LockForm({ video, onUnlock }: { video: Video; onUnlock: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [wrong, setWrong] = useState(false);
  const first = video.versions[0]?.src ?? "";
  return (
    <form
      className="vl-lock"
      onSubmit={(e) => {
        e.preventDefault();
        if (unlockSrc(first, pw.trim())) {
          try {
            sessionStorage.setItem(keyFor(video.id), pw.trim());
          } catch {
            /* private mode: unlock for this view only */
          }
          track("video_unlock", { id: video.id });
          onUnlock(pw.trim());
        } else setWrong(true);
      }}
    >
      <span className="vl-lock-title">Locked preview</span>
      <label className="vl-lock-label" htmlFor={`pw-${video.id}`}>
        Enter the password to watch
      </label>
      <div className="vl-lock-row">
        <input
          id={`pw-${video.id}`}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setWrong(false);
          }}
        />
        <button type="submit">Watch</button>
      </div>
      {wrong && <span className="vl-lock-err">That's not it — try again.</span>}
    </form>
  );
}

function VideoCard({ video }: { video: Video }) {
  const allVersions = shownVersions(video);
  const [active, setActive] = useState(0);
  const [pw, setPw] = useState(() => (video.locked ? savedPassword(video.id) : ""));
  const unlocked = !video.locked || (pw !== "" && !!unlockSrc(allVersions[0]?.src ?? "", pw));
  const versions = video.locked
    ? unlocked
      ? allVersions.map((v) => ({ ...v, src: v.src ? unlockSrc(v.src, pw) ?? undefined : undefined }))
      : []
    : allVersions;
  const current = versions[active];

  return (
    <article
      className={`vl-card ${video.vertical ? "vl-card--vertical" : ""} ${current || video.cover ? "" : "vl-card--soon"}`}
    >
      <div className="vl-frame">
        {video.locked && !unlocked ? (
          <>
            {video.cover && <img className="vl-media vl-cover vl-cover--locked" src={video.cover} alt="" loading="lazy" />}
            <LockForm video={video} onUnlock={setPw} />
          </>
        ) : current ? (
          <Player key={active} version={current} title={video.title} fallbackPoster={video.cover} />
        ) : video.cover ? (
          <>
            <img className="vl-media vl-cover" src={video.cover} alt="" loading="lazy" />
            <span className="vl-soon-badge">Coming soon</span>
          </>
        ) : (
          <div className="vl-soon">Coming soon</div>
        )}
      </div>
      <div className="vl-body">
        <h3 className="vl-title">{video.title}</h3>
        <p className="vl-desc">{video.desc}</p>
        {versions.length > 1 && (
          <div className="vl-versions" role="tablist" aria-label="Versions">
            {versions.map((v, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                className={`vl-version ${i === active ? "on" : ""}`}
                onClick={() => {
                  setActive(i);
                  track("video_version", { id: video.id, version: v.label });
                }}
              >
                {i === 0 ? "Latest" : "Previous"} · {v.label}
                {v.date && <span className="vl-date"> · {v.date}</span>}
              </button>
            ))}
          </div>
        )}
        {video.page && (
          <Link className="vl-page" to={video.page.to}>
            {video.page.label} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export function Videos() {
  const { series: seriesSlug } = useParams();
  const only = getSeries(seriesSlug);

  useEffect(() => {
    document.title = `${only ? only.name : "Video Library"} — YoungBlesser`;
    track("videos_view", only ? { series: only.slug } : undefined);
    return () => {
      document.title = "YoungBlesser";
    };
  }, [only]);

  if (seriesSlug && !only) return <NotFound />;

  const series = (only ? [only] : SERIES)
    .map((s) => ({ ...s, videos: VIDEOS.filter((v) => v.series === s.name) }))
    .filter((s) => s.videos.length > 0);

  return (
    <section className="section page-top vl">
      <div className="wrap">
        {only ? (
          <header className="vl-head">
            <Link to="/videos" className="back-link">
              ← All videos
            </Link>
            <p className="eyebrow">A video series</p>
            <h1 className="display">{only.name}</h1>
            <p className="lead">{only.blurb}</p>
          </header>
        ) : (
          <header className="vl-head">
            <p className="eyebrow">Videos &amp; reels</p>
            <h1 className="display">The Video Library</h1>
            <p className="lead">Every video and reel, grouped by series — the most recent cuts first.</p>
            <nav className="vl-jump" aria-label="Series">
              {series.map((s) => (
                <a key={s.slug} href={`#${s.slug}`} className="vl-chip">
                  {s.name}
                </a>
              ))}
            </nav>
          </header>
        )}

        {series.map((s) => (
          <section key={s.slug} id={s.slug} className="vl-series">
            {!only && (
              <div className="vl-series-head">
                <h2 className="h2">
                  <Link className="vl-series-link" to={`/videos/${s.slug}`}>
                    {s.name}
                  </Link>
                </h2>
                <p className="muted">{s.blurb}</p>
              </div>
            )}
            <div className="vl-grid">
              {s.videos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
