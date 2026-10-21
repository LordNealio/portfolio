import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERIES, VIDEOS, Video, VideoVersion, getSeries, shownVersions } from "../data/videos";
import { track } from "../lib/track";
import { NotFound } from "./NotFound";

// THE VIDEO LIBRARY — every video and reel, grouped by series (/videos), or a
// single series on its own page (/videos/:series). Each video shows at most its
// two most recent versions; a video with none yet shows "Coming soon".
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
    <article className={`vl-card ${video.vertical ? "vl-card--vertical" : ""} ${current ? "" : "vl-card--soon"}`}>
      <div className="vl-frame">
        {current ? (
          <Player key={active} version={current} title={video.title} />
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
