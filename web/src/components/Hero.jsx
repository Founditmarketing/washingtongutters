import { useEffect, useState } from "react";
import { Phone, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE } from "../data/site";
import ResponsiveImg from "./atoms/ResponsiveImg";
import TradeStamp from "./atoms/TradeStamp";
import Eyebrow from "./atoms/Eyebrow";

/* Three real project photos rotate behind the hero. */
const HERO_IMAGES = [
  { base: "photos/two-story-gray-maple", alt: "Two-story home with fresh seamless gutters and a red maple." },
  { base: "photos/yellow-craftsman-porch", alt: "Yellow craftsman farmhouse with a wraparound porch and new seamless gutters." },
  { base: "photos/blue-rancher", alt: "Blue rancher with a white garage and new seamless gutters." },
  { base: "photos/navy-rancher", alt: "Navy-gray rancher with a clean new gutter run along the roofline." },
];

/**
 * Hero — centered, single-column composition over a sliding photo carousel.
 * The two credential seals sit in the bottom-left corner; slider navigation
 * (prev / dots / next) sits bottom-right. Auto-advances unless the visitor
 * prefers reduced motion.
 */
export default function Hero({ onEstimate }) {
  const count = HERO_IMAGES.length;
  const mod = (n) => ((n % count) + count) % count;

  /* Sliding carousel. Each photo is absolutely stacked and offset horizontally
   * by its *wrapped* distance from the current slide (−1 = just off to the
   * left, 0 = on screen, +1 = just off to the right), so the current photo is
   * always at 0 and the neighbours wait one screen-width to either side.
   *
   * `cur` is always a real index (0..count-1) — we never let it run past the
   * ends, so it can't drift off the track or blank out. `prev` records where we
   * just came from; only the outgoing (`prev`) and incoming (`cur`) photos get
   * a transition, so the third photo can re-cross to the opposite side while
   * off-screen without visibly sliding across. */
  const [{ cur, prev }, setPos] = useState({ cur: 0, prev: 0 });
  const [reduced, setReduced] = useState(false);

  const change = (next) =>
    setPos((p) => ({ prev: p.cur, cur: mod(typeof next === "function" ? next(p.cur) : next) }));
  const advance = (dir) => change((c) => c + dir);
  const go = (i) => change(i);

  /* Nearest wrapped offset of slide `i` from the current slide, in screen
   * widths (−1, 0, or +1 for a three-photo set). */
  const offsetOf = (i) => {
    let d = i - cur;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  /* Track the reduced-motion preference (and react if it changes). */
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  /* Auto-advance forward — paused for reduced-motion visitors. */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => change((c) => c + 1), 6000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="top"
      data-hero
      className="relative min-h-[88svh] flex items-center justify-center overflow-hidden bg-[var(--color-royal-ink)] text-center pt-24 md:pt-28 pb-[calc(var(--tabbar-offset)+4.5rem)] md:pb-28"
      aria-label="Washington seamless gutter installation"
    >
      {/* === CAROUSEL BACKGROUND === */}
      <div className="absolute inset-0 -z-0 overflow-hidden" aria-hidden>
        {HERO_IMAGES.map((img, i) => {
          /* Animate only the two photos swapping places; the third re-crosses
           * off-screen instantly so it never streaks across the viewport. */
          const moving = i === cur || i === prev;
          return (
            <div
              key={img.base}
              className="absolute inset-0"
              style={{
                transform: `translate3d(${offsetOf(i) * 100}%, 0, 0)`,
                transition: moving && !reduced
                  ? "transform 800ms cubic-bezier(0.65, 0, 0.35, 1)"
                  : "none",
              }}
            >
              <ResponsiveImg
                base={img.base}
                alt={img.alt}
                sizes="100vw"
                loading="eager"
                fetchPriority={i === 0 ? "high" : undefined}
                className="w-full h-full object-cover graded"
              />
            </div>
          );
        })}
        {/* Navy overlay + gradient so white text stays readable over any photo */}
        <div className="absolute inset-0 bg-[var(--color-royal-ink)]/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 80% at 50% 42%, oklch(0.19 0.09 262.5 / 0.45), oklch(0.14 0.07 262.5 / 0.78))",
          }}
        />
        <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(180deg, transparent, var(--color-royal-ink))" }}
        />
      </div>

      {/* === CONTENT (vertically centered) === */}
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] flex flex-col items-center">
        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <Eyebrow color="white">Veteran-Owned · 5-Star Rated in WA</Eyebrow>
        </div>

        <h1
          className="font-display-black text-white text-[clamp(2.75rem,8.5vw,6.25rem)] leading-[0.95] tracking-[-0.02em] mt-5 max-w-[20ch] fade-up drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
          style={{ animationDelay: "0.2s" }}
        >
          Gutters Done Right.{" "}
          <span className="text-[var(--color-copper)]">The First Time.</span>
        </h1>

        <p
          className="text-white/90 text-[16px] md:text-lg lg:text-[19px] mt-6 max-w-2xl leading-relaxed fade-up drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: "0.35s" }}
        >
          Custom seamless aluminum gutters, formed on your driveway and hung the same day by our
          own veteran-led crew — never a subcontractor. Free same-week estimates across five
          Washington counties.
        </p>

        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={() => onEstimate?.()}
            className="haptic-primary inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-7 py-4 rounded-none font-display-bold uppercase tracking-tight text-[15px] shadow-lg shadow-[var(--color-copper)]/30 w-full sm:w-auto"
          >
            Get a Free Estimate <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white bg-white/5 backdrop-blur-sm text-white px-7 py-4 rounded-none font-display-bold uppercase tracking-tight text-[15px] transition-colors w-full sm:w-auto"
          >
            <Phone className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.phone.display}
          </a>
        </div>
      </div>

      {/* === CREDENTIAL SEALS — bottom-left corner === */}
      <div className="absolute z-10 left-[var(--space-page-x)] bottom-6 fade-up" style={{ animationDelay: "0.7s" }}>
        <div className="flex items-center gap-2 origin-bottom-left scale-[0.6] sm:scale-75 lg:scale-90 drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]">
          <TradeStamp name="satisfaction-guarantee" size="md" />
          <TradeStamp name="wa-veteran-certified" size="md" />
          <TradeStamp name="google-5-star" size="md" />
        </div>
      </div>

      {/* === SLIDER NAV — bottom-right. On mobile the bottom band is tight
          (CTAs above, credential seals to the left), so we show only the dots
          there — they tuck into the free space beside the seals and never
          cover the call button or the badges. Full arrows return at sm+. === */}
      <div className="absolute z-20 right-[var(--space-page-x)] bottom-6 flex items-center gap-3">
        <button
          onClick={() => advance(-1)}
          aria-label="Previous slide"
          className="haptic w-9 h-9 hidden sm:flex items-center justify-center border border-white/30 hover:border-white text-white bg-black/20 backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose slide">
          {HERO_IMAGES.map((img, i) => (
            <button
              key={img.base}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              aria-selected={i === cur}
              role="tab"
              className={`h-1.5 transition-all duration-300 ${
                i === cur ? "w-6 bg-[var(--color-copper)]" : "w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => advance(1)}
          aria-label="Next slide"
          className="haptic w-9 h-9 hidden sm:flex items-center justify-center border border-white/30 hover:border-white text-white bg-black/20 backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
