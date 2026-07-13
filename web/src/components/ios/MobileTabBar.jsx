import { Link, useLocation } from "react-router-dom";
import { Home, Wrench, Phone, FileText } from "lucide-react";
import { SITE } from "../../data/site";

/**
 * Native-iOS bottom tab bar.
 *
 * Rebuild rationale (mobile audit):
 *  - Translucent material with proper backdrop-blur so content reads through
 *    softly. Previously used a solid material-light that visually amputated
 *    every page's bottom 85px.
 *  - Estimate slot becomes the primary action, raised pill (copper) — distinct
 *    from the flat tab affordances.
 *  - "Quote" calculator icon was confusing (read as a calculator). Replaced
 *    with FileText for the Estimate primary, and the call action sits in the
 *    rightmost tab.
 *  - Active state uses a copper top-rule + filled icon, much closer to the
 *    iOS Human Interface guidelines.
 */

const TABS = [
  { id: "home",     label: "Home",     icon: Home,     to: "/",                                       match: (p) => p === "/" },
  { id: "services", label: "Services", icon: Wrench,   to: "/services/gutter-installation/", match: (p) => p.startsWith("/services") },
  { id: "gallery",  label: "Work",     icon: FileText, to: "/gallery/",                               match: (p) => p.startsWith("/gallery") },
];

export default function MobileTabBar({ onEstimate }) {
  const { pathname } = useLocation();

  return (
    <nav
      className="md:hidden fixed left-0 right-0 bottom-0 z-40 material-light tabbar-spring-in"
      style={{
        paddingBottom: "var(--safe-bottom)",
        boxShadow: "0 -1px 0 0 oklch(0.44 0.16 262.5 / 0.10)",
      }}
      aria-label="Primary"
    >
      <div className="grid grid-cols-5 h-[var(--tabbar-height)] items-stretch">
        {TABS.map((t) => {
          const Ic = t.icon;
          const isActive = t.match(pathname);
          return (
            <Link
              key={t.id}
              to={t.to}
              className={`haptic relative flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-[var(--color-copper)]" : "text-[var(--color-royal)]/60"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* iOS active rule across the top of the tab cell */}
              <span
                className={`absolute top-0 left-3 right-3 h-[2px] rounded-full bg-[var(--color-copper)] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />
              <Ic
                className="w-[22px] h-[22px]"
                strokeWidth={isActive ? 2 : 1.65}
                fill={isActive ? "currentColor" : "none"}
                fillOpacity={isActive ? 0.14 : 0}
              />
              <span className="text-[10.5px] font-semibold tracking-tight leading-none">
                {t.label}
              </span>
            </Link>
          );
        })}

        {/* Primary action — Estimate. Raised pill, distinctly NOT a flat tab. */}
        <button
          onClick={() => onEstimate?.()}
          className="haptic-primary relative flex items-center justify-center"
          aria-label="Get a free estimate"
        >
          <span className="absolute inset-x-2 -top-3 bottom-2 rounded-[18px] bg-[var(--color-copper)] shadow-[0_10px_24px_-6px_oklch(0.62_0.10_42_/_0.55)] flex flex-col items-center justify-center text-white">
            <FileText className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="text-[10.5px] font-display-bold uppercase tracking-tight mt-1">Estimate</span>
          </span>
        </button>

        {/* Tap-to-call action — uses the primary action's color cue (copper) but
            stays a flat tab so it never overshadows the central Estimate. */}
        <a
          href={SITE.phone.tel}
          className="haptic relative flex flex-col items-center justify-center gap-1 text-[var(--color-royal)]/75"
          aria-label={`Call ${SITE.phone.display}`}
        >
          <Phone className="w-[22px] h-[22px]" strokeWidth={1.75} />
          <span className="text-[10.5px] font-semibold tracking-tight leading-none">
            Call
          </span>
        </a>
      </div>
    </nav>
  );
}
