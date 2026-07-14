import { Link } from "react-router-dom";
import { Phone, MapPin, ShieldCheck, BadgeCheck, Star } from "lucide-react";
import { SITE } from "../data/site";
import { TOP_FOOTER_CITIES } from "../data/cities";
import { LOCATIONS } from "../data/locations";
import { SERVICES } from "../data/services";

const COMPANY_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Project Gallery", href: "/gallery/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

/* Footer trust badges — sharp credential chips (icon + two-line label). */
const BADGES = [
  { icon: ShieldCheck, primary: "Veteran-Owned", secondary: "& Operated" },
  { icon: BadgeCheck, primary: "Licensed", secondary: "Bonded · Insured" },
  { icon: Star, primary: "5-Star", secondary: "Rated in WA", fill: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-royal-ink)] text-white pt-16 md:pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        {/* Brand + contact band — logo & story on the left, a prominent
            contact block anchored to the right. */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-12">
          <div className="max-w-md">
            <img
              src="/wg4l-logo-onDark.png"
              alt={SITE.name}
              width={500}
              height={150}
              decoding="async"
              className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]"
            />
            <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mt-3">
              Veteran Owned
            </div>
            <p className="text-[var(--color-copper)] text-[13px] font-semibold mt-4">
              {SITE.tagline}
            </p>
            <p className="text-white/65 leading-relaxed text-[14px] mt-4">
              Veteran owned. Locally operated. Built for Pacific Northwest rain.
              Serving five counties across Washington. One number. Zero subcontractors.
            </p>
          </div>

          {/* Contact block */}
          <div className="lg:text-right shrink-0">
            <div className="text-[10px] tracking-[0.28em] text-white/45 uppercase font-bold mb-3">
              Get in touch
            </div>
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-3 lg:flex-row-reverse text-white hover:text-[var(--color-copper)] font-display-bold uppercase tracking-wide text-[22px] lg:text-[26px] transition-colors"
            >
              <Phone className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.phone.display}
            </a>
            <div className="flex items-center gap-2 lg:justify-end text-white/85 text-[14px] mt-3">
              <MapPin className="w-4 h-4 text-[var(--color-copper)]" /> Serving {SITE.address.regionFull} statewide
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap lg:justify-end items-stretch gap-2.5 mt-7">
              {BADGES.map(({ icon: Ic, primary, secondary, fill }) => (
                <div
                  key={primary}
                  className="inline-flex items-center gap-3 border border-white/15 bg-white/[0.04] px-4 py-2.5 transition-colors hover:border-[var(--color-copper)]/50"
                >
                  <Ic
                    className={`w-5 h-5 text-[var(--color-copper)] shrink-0 ${fill ? "fill-[var(--color-copper)]" : ""}`}
                  />
                  <div className="leading-tight">
                    <div className="text-white font-display-bold uppercase text-[12.5px] tracking-wide">
                      {primary}
                    </div>
                    <div className="text-white/50 text-[9.5px] uppercase tracking-[0.18em] mt-0.5">
                      {secondary}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link columns — even three-across row, the section's single divider
            sits beneath it. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-[var(--color-copper)] uppercase font-bold mb-5">
              Services
            </div>
            <ul className="space-y-3 text-[14px] text-white/70">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}/`} className="hover:text-white">
                    {s.title.replace("Seamless Gutter ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.25em] text-[var(--color-copper)] uppercase font-bold mb-5">
              <Link to="/locations/" className="hover:text-white transition-colors">
                Service Areas
              </Link>
            </div>
            <ul className="space-y-3 text-[14px] text-white/70 mb-5">
              {LOCATIONS.map((l) => (
                <li key={l.slug}>
                  <Link to={`/locations/${l.slug}/`} className="hover:text-white">
                    {l.county}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-[11px] text-white/45 leading-relaxed">
              {TOP_FOOTER_CITIES.slice(0, 8).join(" · ")} & more
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-[0.25em] text-[var(--color-copper)] uppercase font-bold mb-5">
              Company
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-6 text-[14px] text-white/70">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/45">
          <div className="font-display-bold uppercase tracking-wider">
            © {year} {SITE.legalName}
            {SITE.license && ` · WA Lic #${SITE.license}`}
          </div>
          {/* Sitemap is the only legal-row link until real Terms/Privacy
              pages exist. Sitemap is a static file in /public so it has to
              be an <a> — react-router would swallow the navigation. */}
          <div className="flex gap-5">
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
