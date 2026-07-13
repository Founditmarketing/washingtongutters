import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { SITE } from "../data/site";
import { TOP_FOOTER_CITIES } from "../data/cities";
import { LOCATIONS } from "../data/locations";
import { SERVICES } from "../data/services";
import Stamp from "./atoms/Stamp";

const COMPANY_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Project Gallery", href: "/gallery/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-royal-ink)] text-white pt-16 md:pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] relative">
        {/* Top contact row — bold tradesman energy */}
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <div className="mb-6">
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
            </div>
            <p className="text-[var(--color-copper)] text-[13px] font-semibold mb-4">
              {SITE.tagline}
            </p>
            <p className="text-white/65 leading-relaxed text-[14px] mb-8 max-w-md">
              Veteran owned. Locally operated. Built for Pacific Northwest rain.
              Serving five counties across Washington. One number. Zero subcontractors.
            </p>

            <div className="space-y-3 text-[14px]">
              <a
                href={SITE.phone.tel}
                className="haptic flex items-center gap-3 text-white hover:text-[var(--color-copper)] font-display-bold uppercase tracking-wide text-[18px]"
              >
                <Phone className="w-4 h-4 text-[var(--color-copper)]" /> {SITE.phone.display}
              </a>
              <div className="flex items-center gap-3 text-white/85">
                <MapPin className="w-4 h-4 text-[var(--color-copper)]" /> Serving {SITE.address.regionFull} statewide
              </div>
            </div>

            {/* Trade stamps */}
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <Stamp primary="Veteran" secondary="Owned & Operated" divider rotate={-3} />
              <Stamp primary="Licensed" secondary="WA Bonded · Insured" divider variant="outline" rotate={2} />
              <Stamp primary="5★" secondary="Rated in WA" divider variant="solid" rotate={-2} />
            </div>
          </div>

          <div className="lg:col-span-2">
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

          <div className="lg:col-span-3">
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

          <div className="lg:col-span-2">
            <div className="text-[10px] tracking-[0.25em] text-[var(--color-copper)] uppercase font-bold mb-5">
              Company
            </div>
            <ul className="space-y-3 text-[14px] text-white/70">
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

        {/* MASSIVE WORDMARK MOMENT */}
        <div
          className="my-12 lg:my-16 select-none pointer-events-none"
          aria-hidden
        >
          <div className="font-display-black uppercase text-white/[0.08] leading-[0.82] tracking-[-0.04em] text-[18vw] lg:text-[14vw]">
            Washington
            <br />
            Gutters
            <br />
            <span className="text-[var(--color-copper)]/30">4 Less.</span>
          </div>
        </div>

        {/* Legal row */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/45">
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
