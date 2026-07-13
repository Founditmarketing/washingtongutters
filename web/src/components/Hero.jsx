import { Phone, Star, Shield, Medal, ArrowRight } from "lucide-react";
import { SITE } from "../data/site";
import RecentActivity from "./RecentActivity";
import HeroLeadForm from "./HeroLeadForm";
import HeroRain from "./HeroRain";
import TradeStamp from "./atoms/TradeStamp";
import Eyebrow from "./atoms/Eyebrow";
import { useParallax } from "../hooks/useParallax";

/* Hero trust-badge row — two large marks sitting together: the 100%
 * satisfaction guarantee and the Washington Certified Veteran-Owned
 * credential. The row renders at two
 * different sizes:
 *   - Mobile / tablet (in the headline column): `md` = 112px per badge,
 *     because 3 lg badges + gaps would overflow a 375px viewport.
 *   - Desktop (in the right column above the form): `lg` = 180px per
 *     badge, giving the row real visual weight against the form below. */
function HeroTrustBadges({ size = "md", className = "", style }) {
  /* Gap is tighter on desktop so 3 lg badges (3 * 180 = 540) plus
   * gaps fit inside the 5/12-column width without overflowing. */
  const gap = size === "lg" ? "gap-3 sm:gap-4 lg:gap-3" : "gap-3 sm:gap-5 lg:gap-4";
  return (
    <div
      className={`flex items-center justify-center ${gap} ${className}`}
      style={style}
    >
      <TradeStamp name="satisfaction-guarantee" size={size} />
      <TradeStamp name="wa-veteran-certified"   size={size} />
    </div>
  );
}

const TRUST_PILLS = [
  { icon: Star,   label: `${SITE.rating.value.toFixed(1)} ★ Rated` },
  { icon: Shield, label: "Licensed WA" },
  { icon: Medal,  label: "Veteran-Owned" },
];

/**
 * Hero — gradient rebuild.
 *
 * Photograph backgrounds were swapped for a fully built atmospheric stage:
 *   1. Deep navy base (royal-ink → royal-deep linear)
 *   2. Two large radial bloom layers — copper (top-right), royal (bottom-left)
 *      to give the frame light direction without a literal photo.
 *   3. Conic accent at top-left for a metallic glint suggestion.
 *   4. Animated diagonal "rain" sheet (CSS, gpu-only transforms) — restrained,
 *      reads as Pacific Northwest atmosphere, not literal raindrops.
 *   5. Soft horizontal fog band low in the frame, then the grain layer.
 * The whole stack is drawn in CSS so there's no hero image fetch.
 *
 * Desktop is preserved — the lead form still appears in the right column.
 * Mobile keeps the single-CTA pattern with the lead form in its own section
 * directly below the hero.
 */
export default function Hero({ onEstimate }) {
  const parallaxRef = useParallax(0.18);

  return (
    <section
      id="top"
      /* Desktop now vertically centers the headline + form rather than
       * anchoring them to the bottom of a 100svh frame. The previous
       * items-end on a tall section left a tall navy void between the
       * header and the H1, which the owner flagged as too much dead
       * space. Mobile stays items-end — it works there because the
       * viewport is short and the form lives in its own section below
       * the hero. Min-height eased to 92svh on lg so the section still
       * feels hero-sized but doesn't fill more viewport than it earns. */
      className="relative min-h-[86svh] lg:min-h-[92svh] flex items-end lg:items-center pt-20 md:pt-24 lg:pt-28 overflow-hidden pb-tabbar md:pb-0 bg-[var(--color-royal-ink)]"
      aria-label="Puget Sound seamless gutter installation"
    >
      {/* === ATMOSPHERIC STAGE — no image, all CSS === */}
      <div ref={parallaxRef} className="absolute inset-0 -z-0 will-change-transform">
        {/* 1. Base navy gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-royal-ink) 0%, var(--color-royal-deep) 55%, var(--color-royal-ink) 100%)",
          }}
        />
        {/* 2a. Copper bloom — top-right glow */}
        <div
          className="absolute -top-[20%] -right-[15%] w-[70vw] h-[70vw] max-w-[1100px] max-h-[1100px] rounded-full opacity-55"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.531 0.212 29.2 / 0.42) 0%, oklch(0.531 0.212 29.2 / 0.18) 35%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />
        {/* 2b. Royal bloom — bottom-left depth */}
        <div
          className="absolute -bottom-[25%] -left-[15%] w-[80vw] h-[80vw] max-w-[1300px] max-h-[1300px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.44 0.16 262.5 / 0.45) 0%, oklch(0.44 0.16 262.5 / 0.12) 45%, transparent 75%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        {/* 3. Conic glint — subtle metallic sweep top-left */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] opacity-[0.18]"
          style={{
            background:
              "conic-gradient(from 200deg at 50% 50%, transparent 0deg, oklch(0.531 0.212 29.2 / 0.6) 60deg, transparent 140deg)",
            filter: "blur(80px)",
          }}
          aria-hidden
        />

        {/* 4. CANVAS RAIN — three depth layers, wind drift, splash ripples,
              occasional distant lightning. See HeroRain.jsx for details. */}
        <HeroRain />

        {/* 5. Low horizontal fog band — sits ABOVE the rain so far drops
              dissolve into the ground haze before they "land", and so the
              ripples read as catching light only in the band where wet
              surfaces would actually be. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, oklch(0.19 0.09 262.5 / 0.55) 60%, oklch(0.19 0.09 262.5 / 0.92) 100%)",
          }}
          aria-hidden
        />

        {/* 6. Grain — keeps gradient from feeling plasticky */}
        <div className="absolute inset-0 grain opacity-[0.08] mix-blend-overlay pointer-events-none" aria-hidden />

        {/* 7. Hairline copper rule along the bottom — signature trim */}
        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-50 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-copper) 20%, var(--color-copper) 80%, transparent)" }}
          aria-hidden
        />
      </div>

      <div className="relative max-w-[var(--max-content)] w-full mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          {/* LEFT: bold tradesman copy. Logo lives in the persistent header
              only — duplicating it here was a second brand mark fighting the
              headline for attention. */}
          <div className="lg:col-span-7">
            <div className="fade-up" style={{ animationDelay: "0.15s" }}>
              <Eyebrow color="copper">Veteran-Owned · 5-Star Rated</Eyebrow>
            </div>

            <h1
              className="font-display-black uppercase text-white text-[clamp(2.875rem,12.5vw,9rem)] md:text-[clamp(4rem,6.2vw,5.5rem)] leading-[0.95] md:leading-[0.92] mt-3 fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <span className="md:hidden">
                <span className="mob-hero-word inline-block">Gutters</span>{" "}
                <span className="mob-hero-word inline-block">Done</span>{" "}
                <span className="mob-hero-word inline-block">Right.</span>{" "}
                <span className="mob-hero-word inline-block text-[var(--color-copper)]">The</span>{" "}
                <span className="mob-hero-word inline-block text-[var(--color-copper)]">First</span>{" "}
                <span className="mob-hero-word inline-block text-[var(--color-copper)]">Time.</span>
              </span>
              {/* Desktop: exactly two lines — one sentence per line. */}
              <span className="hidden md:block whitespace-nowrap">
                Gutters Done Right.
                <br />
                <span className="text-[var(--color-copper)]">The First Time.</span>
              </span>
            </h1>

            <p
              className="text-white/90 text-[16px] md:text-lg lg:text-[19px] mt-5 md:mt-8 max-w-xl leading-relaxed fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              Custom seamless aluminum gutters, formed on your driveway and hung
              the same day by our own veteran-led crew — never a subcontractor.
              Free same-week estimates across five Washington counties.
            </p>

            {/* Mobile-only CTA stack — primary copper button + tap-to-call link.
                The lead form lives in its own section directly below the hero. */}
            <div
              className="md:hidden mt-6 flex flex-col gap-3 fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <button
                onClick={() => onEstimate?.()}
                className="haptic-primary inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-6 py-4 rounded-full font-display-bold uppercase tracking-tight text-[15px] shadow-[0_18px_36px_-10px_oklch(0.62_0.10_42_/_0.6)]"
              >
                Get a free estimate
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={SITE.phone.tel}
                className="haptic inline-flex items-center justify-center gap-2.5 text-white text-[20px] tracking-tight"
                style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", fontWeight: 800 }}
              >
                <Phone className="w-5 h-5 text-[var(--color-copper)]" />
                Or tap to call · {SITE.phone.display}
              </a>
            </div>

            {/* Trust pills — mobile uses 3-up grid so they don't clip off the
                viewport's right edge. Desktop keeps the inline flex row. */}
            <div
              className="mt-6 md:mt-7 fade-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:items-center md:gap-x-5 md:gap-y-2.5">
                {TRUST_PILLS.map(({ icon: Ic, label }) => (
                  <div
                    key={label}
                    className="flex items-center justify-center md:justify-start gap-1.5 text-white/90 text-[12px] md:text-sm leading-tight rounded-[10px] md:rounded-none bg-white/[0.06] md:bg-transparent border border-white/10 md:border-0 px-2.5 md:px-0 py-2 md:py-0 text-center md:text-left"
                  >
                    <Ic className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-copper)] flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
                <a
                  href={SITE.phone.tel}
                  className="hidden md:inline-flex haptic items-center gap-2.5 text-white hover:text-[var(--color-copper)] text-[26px] lg:text-[30px] tracking-wide ml-auto pr-1 transition-colors"
                  style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", fontWeight: 800 }}
                >
                  <Phone className="w-6 h-6 lg:w-7 lg:h-7" />
                  {SITE.phone.display}
                </a>
              </div>
            </div>

            {/* Mobile/tablet trust-badge row. On desktop the same three
                badges sit in the right column directly above the lead
                form (see below); here they live in the headline column
                because the form isn't rendered above the fold on small
                viewports. */}
            <HeroTrustBadges
              className="lg:hidden mt-7 fade-up"
              style={{ animationDelay: "0.85s" }}
            />

            {/* Recent-activity rail — desktop-only social-proof feed.
                Sits below the trust pills and above the fold. */}
            <div
              className="hidden md:block mt-7 md:mt-10 fade-up"
              style={{ animationDelay: "0.95s" }}
            >
              <RecentActivity />
            </div>
          </div>

          {/* RIGHT: trust-badge row + lead capture (desktop only).
              On mobile both pieces sit in the headline column above.
              Badges sit ABOVE the form because the owner wants them as
              the first thing visible in the "open space to the right of
              Built for the Puget Sound" — pure trust signal, no copy. */}
          <div
            className="hidden lg:flex lg:col-span-5 flex-col items-stretch gap-7 fade-up lg:justify-end"
            style={{ animationDelay: "0.5s" }}
          >
            <HeroTrustBadges size="lg" className="self-end" />
            <HeroLeadFormDesktop />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLeadFormDesktop() {
  return <HeroLeadForm />;
}
