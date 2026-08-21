import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useMode } from "../lib/mode";
import { track } from "../lib/track";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { mode, toggle: toggleMode } = useMode();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav-inner wrap">
        <Link to="/" className="brand" aria-label="NIL — Just Neal, home">
          <span className="brand-mark">NIL</span>
          <span className="brand-name">Just&nbsp;Neal</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => track("navigation_click", { label: l.label, to: l.to })}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            className="nav-cta"
            to="/connect"
            onClick={() => track("navigation_click", { label: "Connect", to: "/connect" })}
          >
            Connect <span className="arr">→</span>
          </Link>
        </nav>

        <div className="nav-tools">
          <Link className="nav-archive" to="/work">
            Archive <span className="arr">→</span>
          </Link>
          <button
            className="mode-toggle"
            onClick={toggleMode}
            aria-label="Toggle Supreme mode"
            title="Toggle Supreme mode"
          >
            <span className={mode === "nil" ? "on" : ""}>NIL</span>
            <span className={mode === "supreme" ? "on" : ""}>SUP</span>
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            {theme === "light" ? "☾" : "☀"}
          </button>
          <button
            className={`burger ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
