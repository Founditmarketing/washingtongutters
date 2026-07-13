import { Star, Quote, ExternalLink, ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import HorizontalSnap from "./ios/HorizontalSnap";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../data/site";

/**
 * ReviewsMarquee — single, cohesive reviews section.
 *
 * Mobile (<lg): HorizontalSnap rail. ONE row, user-driven swipe (no
 *   auto-scroll), iOS-style snap, page-indicator dots. Cards are sized
 *   to fill ~84vw with a peek of the next, so the user always knows
 *   there's more. Card height is fixed so the rail doesn't wobble
 *   between cards of different copy lengths.
 *
 * Desktop (≥lg): one slow auto-scrolling marquee rail. Pauses on
 *   hover/focus-within. Edges fade with a CSS mask so cards drift in
 *   and out instead of clipping. Single direction — the previous
 *   two-rail / opposite-direction layout read as advertising chaff,
 *   not social proof.
 *
 * Both layouts share one stat header (5.0 ★ + count + Read-on-Google
 * CTA), so the brand evidence reads as a single artifact, not two
 * stacked sections.
 */

/* Authentic 4-color Google "G" mark, inline so we never wait on a network
   asset. Sized via className so callers can scale it. */
function GoogleMark({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.6 6.1 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C33.6 6.1 29 4 24 4 16.4 4 9.8 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5 0 9.5-1.9 12.9-5l-6-4.9C29 35.6 26.6 36.4 24 36.4c-5.3 0-9.7-3.4-11.3-8L6.1 33C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.1 4.1-3.9 5.5l6 4.9c-.4.4 6.6-4.8 6.6-14.4 0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

/* Mobile card. Width is ~84vw so the next card peeks; height fixed at
   320px so the rail doesn't wobble between cards of different lengths.
   Quote uses line-clamp-7 inside the fixed height — enough room for
   any of our reviews without truncation in 99% of cases. */
function ReviewCardMobile({ r }) {
  return (
    <article
      className="w-[84vw] max-w-[360px] h-[320px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-tile)] p-5 flex flex-col relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-[var(--color-slate)]/60 text-[10px] uppercase tracking-[0.18em] font-bold">
          <BadgeCheck className="w-3.5 h-3.5 text-[var(--color-copper)]" />
          Verified Review
        </div>
        <div className="flex" aria-hidden>
          {[...Array(r.rating)].map((_, j) => (
            <Star
              key={j}
              className="w-3.5 h-3.5 fill-[var(--color-copper)] text-[var(--color-copper)]"
            />
          ))}
        </div>
      </div>
      <Quote
        className="absolute -bottom-2 -right-1 w-20 h-20 text-[var(--color-copper)]/[0.06]"
        aria-hidden
      />
      <p className="relative text-[var(--color-slate)]/85 text-[14.5px] leading-[1.55] flex-1 line-clamp-7">
        "{r.text}"
      </p>
      <div className="flex items-center gap-3 pt-3 mt-3 border-t border-[var(--color-line)]">
        <div className="w-9 h-9 rounded-full bg-[var(--color-royal)] text-[var(--color-copper)] flex items-center justify-center font-display text-[14px] font-semibold shrink-0">
          {r.name.charAt(0)}
        </div>
        <div className="leading-tight min-w-0">
          <div className="font-display text-[14px] text-[var(--color-royal)] truncate">
            {r.name}
          </div>
          <div className="text-[var(--color-copper)] text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5 truncate">
            {r.city}, WA
          </div>
        </div>
      </div>
    </article>
  );
}

/* Desktop marquee card — fixed dims so the auto-scroll rail can't wobble. */
function ReviewCardDesktop({ r }) {
  return (
    <article
      className="shrink-0 w-[340px] h-[260px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 flex flex-col relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-[var(--color-slate)]/60 text-[10px] uppercase tracking-[0.18em] font-bold">
          <BadgeCheck className="w-3.5 h-3.5 text-[var(--color-copper)]" />
          Verified Review
        </div>
        <div className="flex" aria-hidden>
          {[...Array(r.rating)].map((_, j) => (
            <Star
              key={j}
              className="w-3.5 h-3.5 fill-[var(--color-copper)] text-[var(--color-copper)]"
            />
          ))}
        </div>
      </div>
      <Quote
        className="absolute -bottom-2 -right-1 w-16 h-16 text-[var(--color-copper)]/[0.07]"
        aria-hidden
      />
      <p className="relative text-[var(--color-slate)]/85 text-[14px] leading-[1.55] flex-1 line-clamp-5">
        "{r.text}"
      </p>
      <div className="flex items-center gap-3 pt-3 mt-3 border-t border-[var(--color-line)]">
        <div className="w-8 h-8 rounded-full bg-[var(--color-royal)] text-[var(--color-copper)] flex items-center justify-center font-display text-[13px] font-semibold shrink-0">
          {r.name.charAt(0)}
        </div>
        <div className="leading-tight min-w-0">
          <div className="font-display text-[14px] text-[var(--color-royal)] truncate">
            {r.name}
          </div>
          <div className="text-[var(--color-copper)] text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5 truncate">
            {r.city}, WA
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ReviewsMarquee() {
  /* Desktop rail duplicates the list once for a seamless -50% loop. */
  const desktopRow = [...REVIEWS, ...REVIEWS];

  /* If we don't have featured review text yet (e.g. between owner
   * approvals or before the Places API integration ships), fall back to
   * an empty-state CTA panel. The aggregate rating + count are still
   * real third-party signals, so the section keeps its credibility
   * weight without faking individual quotes. */
  const hasFeaturedReviews = REVIEWS.length > 0;

  return (
    <section
      id="reviews"
      className="bg-[var(--color-bone)] py-section-mobile lg:py-[var(--space-section-md)] relative overflow-hidden"
      aria-label="Customer reviews"
    >
      {/* === HEADER === one anchored stat block + CTA. */}
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] mb-8 lg:mb-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-3">
              <Star className="w-4 h-4 fill-[var(--color-copper)]" />
              What Neighbors Say
            </div>
            <h2 className="font-display-black uppercase text-display-sm lg:text-display-md text-[var(--color-royal)] leading-[0.95]">
              Five stars.
              <br />
              <span className="text-[var(--color-copper)]">Earned slowly.</span>
            </h2>
          </div>

          {/* Stat + CTA block — sits below H2 on mobile, beside it on desktop. */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 sm:items-center lg:items-start">
            <div className="flex items-center gap-3">
              <div className="font-display-black text-[44px] lg:text-[56px] text-[var(--color-royal)] leading-none">
                {SITE.rating.value.toFixed(1)}
              </div>
              <div className="leading-tight">
                <div className="flex" aria-label={`${SITE.rating.value} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--color-copper)] text-[var(--color-copper)]"
                    />
                  ))}
                </div>
                <div className="text-[var(--color-slate)]/70 text-[12px] mt-1 flex items-center gap-1.5">
                  {SITE.rating.label}
                </div>
              </div>
            </div>
            <Link
              to="/reviews/"
              className="haptic inline-flex items-center justify-center gap-2 self-start sm:self-auto bg-[var(--color-royal)] hover:bg-[var(--color-royal-deep)] text-white px-5 py-3 rounded-full text-[13px] font-semibold transition-colors shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)]"
            >
              Read all reviews
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {hasFeaturedReviews ? (
        <>
          {/* === MOBILE === user-driven snap rail with dots. No auto-scroll. */}
          <div className="lg:hidden px-[var(--space-page-x)]">
            <HorizontalSnap>
              {REVIEWS.map((r) => (
                <ReviewCardMobile key={r.name + r.city} r={r} />
              ))}
            </HorizontalSnap>
            <div className="mt-5 text-center text-[11px] uppercase tracking-[0.22em] font-bold text-[var(--color-slate)]/50">
              Swipe to read more
            </div>
          </div>

          {/* === DESKTOP === single slow auto-scroll, hover to pause. */}
          <div
            className="hidden lg:block reviews-marquee relative"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
              maskImage:
                "linear-gradient(90deg, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
            }}
          >
            <div
              className="reviews-marquee-track"
              style={{ "--rm-duration": "90s" }}
            >
              {desktopRow.map((r, i) => (
                <ReviewCardDesktop key={`d-${i}-${r.name}`} r={r} />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty state — full-width "Read on Google" panel takes the place
         * of the rail. Honest, not broken: surfaces the verifiable third-
         * party aggregate and lets visitors go read every individual
         * review on Google directly.  */
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <a
            href={SITE.social.google || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="haptic group block bg-white border border-[var(--color-line)] rounded-[var(--radius-card)] p-8 lg:p-10 hover:border-[var(--color-copper)]/50 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-5">
                <GoogleMark className="w-9 h-9 lg:w-12 lg:h-12 shrink-0 mt-1" />
                <div>
                  <div className="flex gap-1 mb-2" aria-label={`${SITE.rating.value} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[var(--color-copper)] text-[var(--color-copper)]"
                      />
                    ))}
                  </div>
                  <div className="font-display-bold uppercase text-xl lg:text-2xl text-[var(--color-royal)] leading-tight">
                    {SITE.rating.count}+ five-star customer reviews
                  </div>
                  <div className="text-[var(--color-slate)]/65 text-[14px] mt-2 max-w-lg">
                    Real homeowners across Pierce, King, and Snohomish counties.
                    Every review is from a real customer &mdash; verified and never edited.
                  </div>
                </div>
              </div>
              <div className="lg:shrink-0">
                <span className="inline-flex items-center gap-2 bg-[var(--color-royal)] group-hover:bg-[var(--color-royal-deep)] text-white px-6 py-3.5 rounded-full font-semibold text-[14px] transition-colors shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)]">
                  Read all reviews
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Footer microline — verifiable, not fluff. */}
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] mt-8 lg:mt-10 text-[12px] text-[var(--color-slate)]/55 text-center lg:text-left">
        Real customer reviews · never edited, never paid for.
      </div>
    </section>
  );
}
