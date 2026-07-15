import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/work", label: "Work" },
  { to: "/vision", label: "Vision" },
  { to: "/about", label: "About" },
  { to: "/now", label: "Now" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav-inner wrap">
        <Link to="/" className="brand" aria-label="Justin Neal — home">
          <span className="brand-mark">JN</span>
          <span className="brand-name">Justin Neal</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
          <Link className="nav-cta btn btn-primary" to="/contact">
            Get in touch
          </Link>
        </nav>

        <div className="nav-tools">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            {theme === "dark" ? "☾" : "☀"}
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
