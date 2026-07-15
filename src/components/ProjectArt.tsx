import type { Project } from "../data/projects";
import { STATUS_LABEL } from "../data/projects";

// Elegant generative placeholder art. No stock imagery — each project gets a
// deterministic "device frame" built from its accent, initials, and category.
// Swap in a real screenshot later by rendering an <img> in place of <ProjectArt>.

function initials(title: string) {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// A simple deterministic hash so each project's motif is stable.
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function ProjectArt({ project, variant = "card" }: { project: Project; variant?: "card" | "hero" }) {
  const a = project.accent ?? "var(--gold)";
  const h = hash(project.slug);
  const rings = 3 + (h % 3);
  const rot = h % 40;
  const isHero = variant === "hero";

  return (
    <div className="pa" style={{ ["--pa" as string]: a }} aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <radialGradient id={`g-${project.slug}`} cx="72%" cy="18%" r="90%">
            <stop offset="0%" stopColor={a} stopOpacity="0.42" />
            <stop offset="45%" stopColor={a} stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`l-${project.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} stopOpacity="0.9" />
            <stop offset="100%" stopColor={a} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#g-${project.slug})`} />
        {/* concentric arcs motif */}
        <g transform={`translate(300 44) rotate(${rot})`} opacity="0.5">
          {Array.from({ length: rings }).map((_, i) => (
            <circle
              key={i}
              r={26 + i * 26}
              fill="none"
              stroke={a}
              strokeOpacity={0.5 - i * 0.08}
              strokeWidth="1"
            />
          ))}
        </g>
        {/* baseline hairlines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={i}
            x1="34"
            x2="220"
            y1={200 + i * 16}
            y2={200 + i * 16}
            stroke={a}
            strokeOpacity={0.16 - i * 0.03}
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="pa-glyph" style={{ fontSize: isHero ? "clamp(3rem,8vw,6rem)" : "2.6rem" }}>
        {initials(project.title)}
      </div>
      <div className="pa-meta">
        <span className="pa-cat">{project.category}</span>
        <span className="pa-status">{STATUS_LABEL[project.status]}</span>
      </div>
    </div>
  );
}
