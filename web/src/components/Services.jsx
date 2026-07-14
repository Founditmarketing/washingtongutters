import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";
import ResponsiveImg from "./atoms/ResponsiveImg";
import HorizontalSnap from "./ios/HorizontalSnap";
import { SERVICES } from "../data/services";

/*
 * Mobile: native iOS-style horizontal snap rail with page-indicator dots.
 * Each card has tile radii (22px) and feels like a Photos app cell.
 * Desktop: asymmetric editorial — 1 featured full-bleed + 3 dense side-stacked.
 */

function ServiceCardMobile({ s, i }) {
  const Ic = s.icon;
  return (
    <Link
      to={`/services/${s.slug}/`}
      className="haptic group block w-[78vw] sm:w-[400px] bg-[var(--color-paper)] rounded-[var(--radius-tile)] overflow-hidden border border-[var(--color-line)] mob-service-card mob-shimmer"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[var(--color-royal)]">
        <ResponsiveImg
          base={s.image}
          alt={s.photoAlt}
          sizes="78vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal)]/85 via-[var(--color-royal)]/15 to-transparent" />
        <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-none bg-[var(--color-copper)] flex items-center justify-center text-white shadow-lg shadow-black/20">
          <Ic className="w-5 h-5" />
        </div>
        <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-none bg-white/15 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-semibold">
          0{i + 1}
        </div>
        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <h3 className="font-display text-xl font-light leading-tight">{s.title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[var(--color-slate)]/70 text-[14px] leading-relaxed">
          {s.short || s.desc}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[var(--color-copper)] font-semibold text-[13px]">
          Learn more <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function Services() {
  const featured = SERVICES;
  const [primary, ...rest] = featured;
  const total = String(featured.length).padStart(2, "0");
  const PrimaryIcon = primary.icon;

  return (
    <section
      id="services"
      className="py-[var(--space-section-lg)] max-w-[var(--max-content)] mx-auto"
    >
      <div className="px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 mb-10 lg:mb-14">
          <div className="lg:col-span-5" data-reveal>
            <div className="mb-4">
              <Eyebrow>What We Do</Eyebrow>
            </div>
            <h2 className="font-display-black uppercase text-display-lg text-[var(--color-royal)]">
              What we
              <br />
              <span className="text-[var(--color-copper)]">do.</span>
            </h2>
            {/* Kicker: bridges the display headline and the long body. Same
                family as body but heavier weight + slightly larger so the eye
                lands here next, not on the body block directly. */}
            <p className="hidden lg:block text-[var(--color-slate)]/85 text-[20px] font-medium leading-snug mt-5 max-w-md">
              Five things we install. Five things we install well.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end" data-reveal>
            <p className="text-[var(--color-slate)]/75 text-[16px] lg:text-lg leading-relaxed">
              Every job is custom-formed continuous aluminum, sized to actually move the volume of
              water the Pacific Northwest throws at your roof. We don't sell sectional kits. We
              don't subcontract. We show up, build it on your driveway, and install it in a day.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE scroll hint — shown only below lg breakpoint */}
      <div className="lg:hidden px-[var(--space-page-x)] mb-3 flex items-center gap-2">
        <span className="text-[var(--color-copper)] text-[11px] tracking-[0.25em] uppercase font-semibold">
          Swipe to explore
        </span>
        <div style={{ animation: "swipeNudge 1.6s cubic-bezier(0.16,1,0.3,1) 0.5s infinite" }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M1 7h14M11 2l5 5-5 5" stroke="var(--color-copper)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <style>{`
          @keyframes swipeNudge {
            0%   { transform: translateX(0);     opacity: 1; }
            40%  { transform: translateX(6px);   opacity: 0.5; }
            60%  { transform: translateX(-2px);  opacity: 1; }
            100% { transform: translateX(0);     opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes swipeNudge { from {} to {} }
          }
        `}</style>
      </div>

      {/* MOBILE — horizontal snap rail */}
      <div className="lg:hidden px-[var(--space-page-x)]">
        <HorizontalSnap>
          {featured.map((s, i) => (
            <ServiceCardMobile key={s.slug} s={s} i={i} />
          ))}
        </HorizontalSnap>
      </div>


      {/* DESKTOP — asymmetric editorial layout */}
      <div className="hidden lg:grid grid-cols-12 gap-5 px-[var(--space-page-x)]">
        <Link
          to={`/services/${primary.slug}/`}
          className="group col-span-7 relative overflow-hidden bg-[var(--color-royal)] rounded-[var(--radius-tile)] aspect-[4/3] lg:aspect-auto lg:min-h-[560px] block"
        >
          <ResponsiveImg
            base={primary.image}
            alt={primary.photoAlt}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-deep)] via-[var(--color-royal)]/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-between p-7 lg:p-10 text-white">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-none bg-[var(--color-copper)] flex items-center justify-center">
                <PrimaryIcon className="w-6 h-6" />
              </div>
              <div className="text-white/70 text-[10px] tracking-[0.25em] uppercase font-semibold">
                01 / {total} · Featured
              </div>
            </div>
            <div className="max-w-md">
              <h3 className="font-display text-3xl lg:text-4xl font-light leading-[1.1] mb-3">
                {primary.title}
              </h3>
              <p className="text-white/80 leading-relaxed text-[15px] mb-5">{primary.desc}</p>
              <span className="inline-flex items-center gap-2 text-[var(--color-copper)] font-semibold text-sm group-hover:gap-3 transition-all">
                Learn more <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        <div className="col-span-5 grid gap-5">
          {rest.map((s, i) => {
            const Ic = s.icon;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}/`}
                className="group relative overflow-hidden bg-[var(--color-paper)] border border-[var(--color-line)] hover:border-[var(--color-copper)]/40 rounded-[var(--radius-card)] transition-all duration-500 grid grid-cols-5"
              >
                <div className="col-span-2 relative overflow-hidden bg-[var(--color-royal)]">
                  <ResponsiveImg
                    base={s.image}
                    alt={s.photoAlt}
                    sizes="240px"
                    className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-none bg-[var(--color-copper)] flex items-center justify-center text-white">
                    <Ic className="w-4 h-4" />
                  </div>
                </div>
                <div className="col-span-3 p-5 lg:p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-[var(--color-slate)]/45 text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
                      0{i + 2} / {total}
                    </div>
                    <h3 className="font-display text-xl lg:text-[22px] text-[var(--color-royal)] mb-2 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-[var(--color-slate)]/70 leading-relaxed text-[13.5px]">
                      {s.short || s.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[var(--color-copper)] font-semibold text-[13px] mt-4 group-hover:gap-2.5 transition-all">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
