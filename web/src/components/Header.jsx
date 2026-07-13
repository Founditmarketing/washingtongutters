import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ArrowRight, MessageSquare, ChevronDown } from "lucide-react";
import { SITE } from "../data/site";
import { SERVICES } from "../data/services";
import { LOCATIONS } from "../data/locations";
import { useScrolled } from "../hooks/useScrolled";

/* Primary nav. Items with `children` render a dropdown (desktop) / accordion
 * (mobile). Services and Locations pull their children from the data files so
 * the menus stay in sync with the actual pages. */
const NAV = [
  {
    label: "Services",
    href: "/services/gutter-installation/",
    base: "/services",
    children: SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}/` })),
  },
  {
    label: "Locations",
    href: "/locations/",
    base: "/locations",
    children: [
      { label: "All Service Areas", href: "/locations/" },
      ...LOCATIONS.map((l) => ({ label: l.county, href: `/locations/${l.slug}/` })),
    ],
  },
  { label: "Gallery",  href: "/gallery/" },
  { label: "Blog",     href: "/blog/" },
  { label: "Reviews",  href: "/reviews/" },
  { label: "About",    href: "/about/" },
  { label: "FAQ",      href: "/faq/" },
  { label: "Contact",  href: "/contact/" },
];

const isActive = (n, pathname) =>
  n.base ? pathname.startsWith(n.base) : pathname.startsWith(n.href.replace(/\/$/, ""));

/**
 * Brand lockup — the bitmap logo (which already contains the "Washington
 * Gutters 4 Less" wordmark). The drop-shadow gives the mark enough lift to
 * read on the navy header. `compact` trims it down once the user scrolls.
 */
function Brandmark({ compact = false, className = "" }) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <img
        src="/wg4l-logo-onDark.png"
        alt={SITE.name}
        width={500}
        height={150}
        decoding="async"
        fetchPriority="high"
        className={`w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] transition-[height] duration-300 ${
          compact ? "h-10 md:h-12" : "h-12 md:h-14 lg:h-16"
        }`}
      />
    </div>
  );
}

export default function Header({ onEstimate }) {
  const scrolled = useScrolled(80);
  const [mobileNav, setMobileNav] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const { pathname } = useLocation();

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNav]);

  /* Close menu (and any open submenu) on route change. */
  useEffect(() => { setMobileNav(false); setOpenSub(null); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "material-dark border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div
          className={`w-full pl-3 pr-[var(--space-page-x)] md:px-[var(--space-page-x)] flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20 lg:h-24"
          }`}
        >
          <Link to="/" className="haptic flex items-center gap-2.5 group" aria-label={`${SITE.name} home`}>
            <Brandmark compact={scrolled} />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm text-white/85"
            aria-label="Primary"
          >
            {NAV.map((n) => {
              const active = isActive(n, pathname);

              if (n.children) {
                return (
                  <div key={n.label} className="relative group">
                    <Link
                      to={n.href}
                      aria-haspopup="true"
                      className={`haptic inline-flex items-center gap-1 py-2 hover:text-[var(--color-copper)] transition-colors ${
                        active ? "text-[var(--color-copper)]" : ""
                      }`}
                    >
                      {n.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown. `pt-4` is inside the hoverable wrapper so there's
                        no dead gap between the trigger and the panel. */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-50">
                      <div className="min-w-[248px] rounded-[var(--radius-card)] bg-[var(--color-paper)] border border-[var(--color-line)] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] p-2">
                        {n.children.map((c) => (
                          <Link
                            key={c.href}
                            to={c.href}
                            className={`block px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors ${
                              pathname.startsWith(c.href.replace(/\/$/, "")) && c.href !== "/locations/"
                                ? "bg-[var(--color-royal)] text-white"
                                : "text-[var(--color-royal)] hover:bg-[var(--color-royal)] hover:text-white"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={n.label}
                  to={n.href}
                  className={`haptic hover:text-[var(--color-copper)] transition-colors relative group ${
                    active ? "text-[var(--color-copper)]" : ""
                  }`}
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-copper)] group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={SITE.phone.tel}
              className="haptic hidden md:flex items-center gap-2 text-white hover:text-white text-[15px]"
              style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", fontWeight: 700 }}
            >
              <Phone className="w-4 h-4" />
              {SITE.phone.display}
            </a>
            <button
              onClick={onEstimate}
              className="haptic-primary hidden md:inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-5 py-2.5 text-sm font-semibold rounded-full shadow-lg shadow-[var(--color-copper)]/20"
            >
              Free Estimate <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileNav((v) => !v)}
              className="haptic lg:hidden text-white p-2 -mr-2 rounded-full"
              aria-label={mobileNav ? "Close menu" : "Open menu"}
              aria-expanded={mobileNav}
            >
              {mobileNav ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu sheet. Opaque so hero text can't bleed through. */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-[var(--color-royal-deep)] flex flex-col overflow-y-auto transition-[opacity,transform] duration-400 ${
          mobileNav
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{
          paddingTop: "calc(var(--safe-top) + 0.75rem)",
          paddingBottom: "calc(var(--safe-bottom) + 1rem)",
        }}
        aria-hidden={!mobileNav}
        role="dialog"
        aria-label="Site menu"
      >
        <div className="absolute inset-0 grain opacity-10 pointer-events-none" aria-hidden />

        <div className="relative flex items-center justify-between px-[var(--space-page-x)]">
          <Brandmark compact />
          <button
            onClick={() => setMobileNav(false)}
            className="haptic text-white p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Quick actions — the three real conversion paths.  */}
        <div className="relative px-[var(--space-page-x)] mt-4 grid grid-cols-3 gap-2.5">
          <a
            href={SITE.phone.tel}
            className="haptic flex flex-col items-center gap-1.5 py-3 rounded-[var(--radius-card-sm)] bg-white/[0.06] border border-white/10 text-white"
            onClick={() => setMobileNav(false)}
          >
            <Phone className="w-5 h-5 text-[var(--color-copper)]" />
            <span className="text-[12px] font-semibold tracking-tight">Call</span>
          </a>
          <a
            href={SITE.phone.sms}
            className="haptic flex flex-col items-center gap-1.5 py-3 rounded-[var(--radius-card-sm)] bg-white/[0.06] border border-white/10 text-white"
            onClick={() => setMobileNav(false)}
          >
            <MessageSquare className="w-5 h-5 text-[var(--color-copper)]" />
            <span className="text-[12px] font-semibold tracking-tight">Text</span>
          </a>
          <button
            onClick={() => { setMobileNav(false); onEstimate?.(); }}
            className="haptic flex flex-col items-center gap-1.5 py-3 rounded-[var(--radius-card-sm)] bg-[var(--color-copper)] text-white shadow-lg shadow-[var(--color-copper)]/20"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-[12px] font-semibold tracking-tight">Estimate</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav
          className="relative px-[var(--space-page-x)] mt-4 flex-1"
          aria-label="Primary"
        >
          <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-2">
            Browse
          </div>
          <ul className="divide-y divide-white/10">
            {[{ label: "Home", href: "/" }, ...NAV].map((n) => {
              const active =
                n.href === "/" ? pathname === "/" : isActive(n, pathname);

              /* Items with children → accordion (tap the row to expand). */
              if (n.children) {
                const open = openSub === n.label;
                return (
                  <li key={n.label}>
                    <button
                      onClick={() => setOpenSub(open ? null : n.label)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between py-2"
                    >
                      <span
                        className={`font-display-bold uppercase tracking-tight text-xl ${
                          active ? "text-[var(--color-copper)]" : "text-white/90"
                        }`}
                      >
                        {n.label}
                      </span>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform duration-300 ${
                          open ? "rotate-180 text-[var(--color-copper)]" : "text-white/50"
                        }`}
                      />
                    </button>
                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        open ? "max-h-[560px] pb-4" : "max-h-0"
                      }`}
                    >
                      {n.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            to={c.href}
                            onClick={() => setMobileNav(false)}
                            className="flex items-center gap-2.5 py-2.5 pl-4 text-white/75 hover:text-[var(--color-copper)] text-[17px]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-copper)]/70 shrink-0" />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={n.label}>
                  <Link
                    to={n.href}
                    className={`haptic flex items-center justify-between py-2 ${
                      active ? "text-[var(--color-copper)]" : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => setMobileNav(false)}
                  >
                    <span className="font-display-bold uppercase tracking-tight text-xl">
                      {n.label}
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-60" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer NAP — compact single row so the menu fits without scrolling. */}
        <div className="relative px-[var(--space-page-x)] mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <a href={SITE.phone.tel} className="text-white text-[15px] font-display-bold uppercase tracking-tight">
            {SITE.phone.display}
          </a>
          <span className="text-white/50 text-[12px] text-right leading-snug">
            Serving {SITE.address.regionFull} · Free estimates
          </span>
        </div>
      </div>
    </>
  );
}
