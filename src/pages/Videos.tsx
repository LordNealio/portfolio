import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERIES, VIDEOS, Video, VideoVersion, shownVersions } from "../data/videos";
import { track } from "../lib/track";

// THE VIDEO LIBRARY — every video and reel, grouped by series. Each video shows
// at most its two most recent versions (see data/videos.ts).
function Player({ version, title }: { version: VideoVersion; title: string }) {
  if (version.src) {
    return (
      <video className="vl-media" src={version.src} poster={version.poster} controls playsInline preload="metadata" />
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

function VideoCard({ video }: { video: Video }) {
  const versions = shownVersions(video);
  const [active, setActive] = useState(0);
  const current = versions[active];

  return (
    <article className={`vl-card ${video.vertical ? "vl-card--vertical" : ""}`}>
      <div className="vl-frame">
        <Player key={active} version={current} title={video.title} />
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
  useEffect(() => {
    document.title = "Video Library — YoungBlesser";
    track("videos_view");
    return () => {
      document.title = "YoungBlesser";
    };
  }, []);

  const series = SERIES.map((s) => ({ ...s, videos: VIDEOS.filter((v) => v.series === s.name) })).filter(
    (s) => s.videos.length > 0
  );

  return (
    <section className="section page-top vl">
      <div className="wrap">
        <header className="vl-head">
          <p className="eyebrow">Videos &amp; reels</p>
          <h1 className="display">The Video Library</h1>
          <p className="lead">Every video and reel, grouped by series — the most recent cuts first.</p>
          <nav className="vl-jump" aria-label="Series">
            {series.map((s) => (
              <a key={s.name} href={`#${slug(s.name)}`} className="vl-chip">
                {s.name}
              </a>
            ))}
          </nav>
        </header>

        {series.map((s) => (
          <section key={s.name} id={slug(s.name)} className="vl-series">
            <div className="vl-series-head">
              <h2 className="h2">{s.name}</h2>
              <p className="muted">{s.blurb}</p>
            </div>
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

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
