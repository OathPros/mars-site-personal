import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/build", label: "Build with MARS" },
  { to: "/inventory", label: "Plugin Inventory" },
  { to: "/committee", label: "Development Committee" },
  { to: "/resources", label: "Resources" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-light-grey bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center font-semibold tracking-tight">
          <img
            src={`${import.meta.env.BASE_URL}yorku-logo.png`}
            alt="York University"
            className="h-7 w-auto object-contain sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-york-red ${
                  isActive ? "text-york-red" : "text-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/find-my-path"
            className="hidden rounded-none bg-york-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-york-red-dark sm:inline-flex"
          >
            Find my next step →
          </Link>
          <button
            className="inline-flex items-center justify-center border border-light-grey p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-light-grey bg-white lg:hidden" aria-label="Mobile">
          <ul className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 text-base font-medium ${isActive ? "text-york-red" : "text-ink"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/find-my-path"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center bg-york-red px-4 py-3 text-sm font-semibold text-white"
              >
                Find my next step →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="rule mt-24 bg-ink py-12 text-white">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-lg font-semibold text-york-red">MARS</div>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            York University's AI Prototype-to-Production process. Build quickly. Prove value. Scale responsibly.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-white">Full process map</Link></li>
            <li><Link to="/find-my-path" className="hover:text-white">Find my path</Link></li>
            <li><Link to="/inventory" className="hover:text-white">Plugin inventory</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Governance</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link to="/committee" className="hover:text-white">Development Committee</Link></li>
            <li><Link to="/resources" className="hover:text-white">Production readiness</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Support</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link to="/build" className="hover:text-white">Build with MARS</Link></li>
            <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
        This is a prototype experience for the MARS process. Links marked as placeholders will be supplied by the MARS service team.
      </div>
    </footer>
  );
}
