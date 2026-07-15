# Design System — "Quiet Intelligence"

Dark-first, editorial, museum-paced. Restraint over decoration. One accent color,
strong type, generous space, purposeful motion. Tokens live in
`src/styles/global.css`; component styles in `src/styles/components.css`.

## Principles
1. **Editorial, not startup.** Big serif headlines, wide margins, few elements per view.
2. **One accent.** Ecosystem gold does all the emphasis. Everything else is ink and paper.
3. **Honesty is visible.** Status pills and "Honest status" notes are part of the design.
4. **Motion serves story.** Reveals and micro-interactions only; never decorative loops.
5. **Accessible by default.** Contrast, focus rings, keyboard nav, reduced-motion.

## Color tokens
| Token | Dark (default) | Role |
|-------|----------------|------|
| `--ink` | `#0A0A0A` | Page background |
| `--panel` / `--panel-2` | `#171613` / `#1E1C18` | Cards, raised surfaces |
| `--paper` | `#FAF7F0` | Highest-contrast text / glyphs |
| `--text` / `--text-2` / `--text-3` | `#ECE7DD` / `#B3AB9C` / `#7C7566` | Text hierarchy |
| `--gold` | `#E8B84B` | **The accent** (shared with MindVault/WorkWrite) |
| `--gold-soft` / `--gold-dim` | `#F0CD77` / gold @14% | Hover / tint |
| `--line` / `--line-strong` | white @10% / @18% | Hairlines, borders |

**Light mode** is fully supported — `:root[data-theme="light"]` remaps every token
(gold darkens to `#A9781A` for AA contrast on light). The nav toggle (☾/☀) stamps
`data-theme` on `<html>`. Default follows the dark aesthetic.

## Typography
- **Display / headings:** **Fraunces** — a variable optical serif. Museum-grade,
  used at `340–400` weight with tight tracking. Italic (`.serif-i`) for accent words.
- **Body / UI:** **Plus Jakarta Sans** — the ecosystem body font. 300–800.
- **Scale:** fluid `clamp()` — `.display` (2.9→7rem), `.h1`, `.h2`, `.h3`, `.lead`,
  `.eyebrow` (uppercase, tracked, gold tick). Line-length capped (`max-width: ~40ch`
  on leads) for readability.

## Spacing & layout
- `--maxw: 1180px`, fluid `--gutter: clamp(20px, 5vw, 64px)`.
- `.section` vertical rhythm: `clamp(64px, 11vw, 150px)`.
- Radii: `--radius: 18px`, `--radius-lg: 26px`.
- Grids: featured work = 2-col; archive = `auto-fill minmax(300px,1fr)`;
  detail/about = content + sticky sidebar, collapsing to one column ≤900px.

## Components
- **Status pill** (`.pill[data-s]`) — Live pulses gold (no pulse under
  reduced-motion); other statuses are quiet.
- **ProjectCard** — `feature` (large editorial) vs `index` (grid tile).
- **ProjectArt** — deterministic generative placeholder (accent gradient +
  concentric arcs + hairlines + initials glyph). No stock imagery; swappable for
  real screenshots.
- **Buttons** — `.btn-primary` (gold), `.btn-ghost` (outline→gold on hover),
  arrow nudges on hover.
- **Nav** — transparent → blurred solid on scroll; mobile burger → full overlay.
- **Filters, timeline, layers list, now-board, invite list** — all token-driven.

## Motion
- **Scroll reveals** via `IntersectionObserver` (`.reveal` → `.in`), 0.9s ease.
- **Micro:** hover lift on cards, arrow translate, hero word rotation, scroll hint.
- **Easing:** `--ease: cubic-bezier(0.22, 1, 0.36, 1)`.
- **`prefers-reduced-motion: reduce`** disables reveals, pulses, rotation, scroll
  hint, and smooth-scroll — content shows immediately.

## Accessibility
- Skip-to-content link; semantic landmarks (`header`/`main`/`footer`/`nav`).
- Visible focus ring (`:focus-visible` gold outline).
- Filter tabs use `role="tab"` + `aria-selected`; menu button uses `aria-expanded`.
- Decorative SVG marked `aria-hidden`; links have descriptive text.
- Contrast targets AA on both themes.

## What we deliberately avoided
Gradient-heavy startup look · glassmorphism overload · dashboards · tiny text ·
constant animation · stock photography · generic illustration · fake metrics ·
unverified testimonials · inflated claims · walls of text on the home page.
