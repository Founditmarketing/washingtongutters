import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";
import ResponsiveImg from "./atoms/ResponsiveImg";
import { SERVICES } from "../data/services";
import { useCarousel } from "../hooks/useCarousel";

/*
 * Services — a full-bleed poster carousel. The first card lines up with the
 * page's content gutter; the rest run off the right edge of the viewport so
 * there's always a card being cut off, inviting the swipe. One card component
 * serves every breakpoint: swipe + dots on mobile, arrows + dots on desktop.
 */
function ServicePoster({ s, i, total }) {
  const Ic = s.icon;
  return (
    <Link
      to={`/services/${s.slug}/`}
      data-slide
      className="haptic group relative block shrink-0 snap-start overflow-hidden bg-[var(--color-royal)] w-[80vw] sm:w-[360px] lg:w-[400px] aspect-[4/5]"
    >
      <ResponsiveImg
        base={s.image}
        alt={s.photoAlt}
        sizes="(max-width: 640px) 80vw, 400px"
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700"
      />
      {/* Navy scrim keeps the bottom text legible over any photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-ink)] via-[var(--color-royal-deep)]/45 to-[var(--color-royal-deep)]/5" />

      {/* Top row — index + icon chip */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-between p-5">
        <span className="font-mono text-[12px] tracking-[0.2em] text-white/85">
          {String(i + 1).padStart(2, "0")}
          <span className="text-white/40"> / {total}</span>
        </span>
        <span className="w-11 h-11 bg-[var(--color-copper)] flex items-center justify-center text-white shrink-0">
          <Ic className="w-5 h-5" />
        </span>
      </div>

      {/* Copper rule that wipes across the base on hover */}
      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--color-copper)] group-hover:w-full transition-all duration-500" />

      {/* Bottom — title + one-line pitch + arrow */}
      <div className="absolute bottom-0 inset-x-0 p-6 text-white">
        <h3 className="font-display tracking-tight text-[22px] lg:text-[26px] leading-[1.05] mb-2">
          {s.title}
        </h3>
        <p className="text-white/70 text-[14px] leading-snug line-clamp-2 mb-4">
          {s.short || s.desc}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[var(--color-copper)] font-display-bold uppercase tracking-tight text-[13px] group-hover:gap-2.5 transition-all">
          Learn more <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

const NAV_BTN =
  "haptic w-11 h-11 flex items-center justify-center border border-[var(--color-line-strong)] text-[var(--color-royal)] hover:bg-[var(--color-royal)] hover:text-white hover:border-[var(--color-royal)] transition-all disabled:opacity-30 disabled:pointer-events-none";

export default function Services() {
  const total = String(SERVICES.length).padStart(2, "0");
  const { trackRef, active, atStart, atEnd, step, goTo, syncState } = useCarousel();

  return (
    <section id="services" className="py-[var(--space-section-lg)] overflow-hidden">
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 lg:mb-12">
          <div className="max-w-2xl" data-reveal>
            <div className="mb-4">
              <Eyebrow>What We Do</Eyebrow>
            </div>
            <h2 className="font-display-black text-display-lg text-[var(--color-royal)] leading-[0.95]">
              What we <span className="text-[var(--color-copper)]">do.</span>
            </h2>
            <p className="text-[var(--color-slate)]/75 text-[16px] lg:text-lg leading-relaxed mt-5">
              Every job is custom-formed continuous aluminum, sized to move the volume of water the
              Pacific Northwest throws at your roof. No sectional kits. No subcontractors. We build it
              on your driveway and install it in a day.
            </p>
          </div>

          {/* Desktop nav arrows — mobile swipes instead. */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button onClick={() => step(-1)} disabled={atStart} aria-label="Previous services" className={NAV_BTN}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => step(1)} disabled={atEnd} aria-label="Next services" className={NAV_BTN}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed track — left-aligned to the content gutter, overflowing right. */}
      <div
        ref={trackRef}
        onScroll={syncState}
        className="no-scrollbar flex gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{
          paddingLeft: "var(--gutter-inline)",
          paddingRight: "var(--space-page-x)",
          scrollPaddingLeft: "var(--gutter-inline)",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServicePoster key={s.slug} s={s} i={i} total={total} />
        ))}
      </div>

      {/* Progress dots */}
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] mt-6 flex items-center justify-center gap-2">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to service ${i + 1}`}
            aria-current={i === active ? "true" : "false"}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-none transition-all ${
              i === active
                ? "w-7 bg-[var(--color-copper)]"
                : "w-2.5 bg-[var(--color-royal)]/25 hover:bg-[var(--color-royal)]/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
