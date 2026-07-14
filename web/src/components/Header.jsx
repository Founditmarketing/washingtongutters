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

/* Desktop nav is split around the centered logo — first half left, rest right. */
const LEFT_NAV = NAV.slice(0, 4);
const RIGHT_NAV = NAV.slice(4);

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

  /* The header floats transparent over the hero on desktop, but keeps its
   * solid navy background on mobile at all times. We resolve the breakpoint in
   * JS (rather than a `lg:` CSS override) so the transparent state is a clean,
   * deterministic toggle — no cascade fights with the arbitrary bg color. */
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const transparentHeader = isDesktop && !scrolled;

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNav]);

  /* Close menu (and any open submenu) on route change. */
  useEffect(() => { setMobileNav(false); setOpenSub(null); }, [pathname]);

  /* One desktop nav item — Services/Locations dropdown or a plain link. */
  const renderNavItem = (n) => {
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
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-50">
            <div className="min-w-[248px] bg-[var(--color-paper)] border border-[var(--color-line)] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] p-2">
              {n.children.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className={`block px-4 py-2.5 text-[14px] font-medium transition-colors ${
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
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          transparentHeader
            ? "bg-transparent border-b border-transparent"
            : "bg-[var(--color-royal-ink)]/95 backdrop-blur-md border-b border-white/10 shadow-[0_2px_24px_-10px_rgba(0,0,0,0.6)]"
        }`}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div
          className={`w-full px-[var(--space-page-x)] grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20 lg:h-24"
          }`}
        >
          {/* LEFT — desktop nav (first half) / mobile call icon */}
          <div className="flex items-center justify-start">
            <nav
              className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm text-white/85"
              aria-label="Primary"
            >
              {LEFT_NAV.map(renderNavItem)}
            </nav>
            <a
              href={SITE.phone.tel}
              aria-label={`Call ${SITE.phone.display}`}
              className="haptic lg:hidden text-white p-2 -ml-2"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>

          {/* CENTER — logo */}
          <Link to="/" className="haptic justify-self-center" aria-label={`${SITE.name} home`}>
            <Brandmark compact={scrolled} />
          </Link>

          {/* RIGHT — desktop nav (second half) / mobile hamburger */}
          <div className="flex items-center justify-end">
            <nav
              className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm text-white/85"
              aria-label="More"
            >
              {RIGHT_NAV.map(renderNavItem)}
            </nav>
            <button
              onClick={() => setMobileNav((v) => !v)}
              className="haptic lg:hidden text-white p-2 -mr-2"
              aria-label={mobileNav ? "Close menu" : "Open menu"}
              aria-expanded={mobileNav}
            >
              {mobileNav ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu sheet — editorial indexed nav with an anchored
          action block at the bottom. */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-[var(--color-royal-ink)] flex flex-col overflow-y-auto transition-[opacity,transform] duration-400 ${
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

        {/* Top bar */}
        <div className="relative flex items-center justify-between px-[var(--space-page-x)]">
          <Brandmark compact />
          <button
            onClick={() => setMobileNav(false)}
            className="haptic w-10 h-10 -mr-1 flex items-center justify-center border border-white/20 text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Indexed nav list */}
        <nav className="relative px-[var(--space-page-x)] mt-6 flex-1" aria-label="Primary">
          <ul className="border-t border-white/10">
            {[{ label: "Home", href: "/" }, ...NAV].map((n, i) => {
              const idx = String(i + 1).padStart(2, "0");
              const active = n.href === "/" ? pathname === "/" : isActive(n, pathname);

              if (n.children) {
                const open = openSub === n.label;
                return (
                  <li key={n.label} className="border-b border-white/10">
                    <button
                      onClick={() => setOpenSub(open ? null : n.label)}
                      aria-expanded={open}
                      className="w-full flex items-center gap-4 py-2.5 text-left"
                    >
                      <span className="text-[var(--color-copper)] text-[11px] font-mono tracking-wider w-5 shrink-0">{idx}</span>
                      <span className={`flex-1 font-display uppercase tracking-tight text-xl ${active ? "text-[var(--color-copper)]" : "text-white/90"}`}>
                        {n.label}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180 text-[var(--color-copper)]" : "text-white/45"}`} />
                    </button>
                    <ul className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[560px] pb-3" : "max-h-0"}`}>
                      {n.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            to={c.href}
                            onClick={() => setMobileNav(false)}
                            className="flex items-center gap-2.5 py-2 pl-9 text-white/70 hover:text-[var(--color-copper)] text-[15px]"
                          >
                            <span className="w-1.5 h-1.5 bg-[var(--color-copper)]/70 shrink-0" />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={n.label} className="border-b border-white/10">
                  <Link
                    to={n.href}
                    onClick={() => setMobileNav(false)}
                    className="haptic group flex items-center gap-4 py-2.5"
                  >
                    <span className="text-[var(--color-copper)] text-[11px] font-mono tracking-wider w-5 shrink-0">{idx}</span>
                    <span className={`flex-1 font-display uppercase tracking-tight text-xl ${active ? "text-[var(--color-copper)]" : "text-white/90 group-hover:text-white"}`}>
                      {n.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Anchored action block */}
        <div className="relative px-[var(--space-page-x)] pt-4 space-y-2.5">
          <button
            onClick={() => { setMobileNav(false); onEstimate?.(); }}
            className="haptic-primary w-full inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white py-3.5 font-display-bold uppercase tracking-tight text-[15px]"
          >
            Get a Free Estimate <ArrowRight className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={SITE.phone.tel}
              onClick={() => setMobileNav(false)}
              className="haptic inline-flex items-center justify-center gap-2 border border-white/25 text-white py-3 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-[var(--color-copper)]" /> Call
            </a>
            <a
              href={SITE.phone.sms}
              onClick={() => setMobileNav(false)}
              className="haptic inline-flex items-center justify-center gap-2 border border-white/25 text-white py-3 font-semibold text-sm"
            >
              <MessageSquare className="w-4 h-4 text-[var(--color-copper)]" /> Text
            </a>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1">
            <a href={SITE.phone.tel} className="text-white text-[15px] font-display-bold uppercase tracking-tight">
              {SITE.phone.display}
            </a>
            <span className="text-white/45 text-[11px] text-right leading-snug">
              Serving {SITE.address.regionFull}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
