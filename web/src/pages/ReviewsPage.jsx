import { Star, Quote, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema, reviewSchema } from "../lib/schema";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../data/site";

export default function ReviewsPage() {
  document.title = `Reviews — ${SITE.name}`;

  /* Optional-chained destructure so the page survives an empty REVIEWS
   * array. While we're waiting on real review text, the page
   * still renders cleanly — hero + aggregate stats + big CTA panel —
   * instead of crashing on `featured.rating` of `undefined`. */
  const hasReviews = REVIEWS.length > 0;
  const [featured, ...rest] = REVIEWS;

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Reviews", path: "/reviews/" },
    ]),
    ...reviewSchema(REVIEWS),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="reviews" />
      <PageHero
        eyebrow="Customer Reviews"
        title="Five stars. Earned slowly."
        accent="Earned slowly."
        lead={`${SITE.customersServed}+ Washington homeowners trust us with their gutters. Real reviews, never edited, never paid for.`}
        chips={[
          `${SITE.rating.value.toFixed(1)} ★ Rated in WA`,
          `${SITE.customersServed}+ customers`,
          `${SITE.countiesServed.length} counties`,
        ]}
      />

      {/* Featured pull-quote (only when we have a real featured review). */}
      {hasReviews && (
        <section className="bg-[var(--color-royal)] text-white py-section-mobile lg:py-[var(--space-section-md)] relative overflow-hidden">
          <div className="absolute inset-0 grain opacity-10" aria-hidden />
          <Quote className="absolute top-6 right-6 lg:top-12 lg:right-16 w-24 h-24 lg:w-40 lg:h-40 text-[var(--color-copper)]/15" aria-hidden />
          <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <div className="flex mb-5" aria-hidden>
              {Array.from({ length: featured.rating }).map((_, j) => (
                <Star key={j} className="w-5 h-5 fill-[var(--color-copper)] text-[var(--color-copper)]" />
              ))}
            </div>
            <p className="font-display-bold uppercase text-2xl sm:text-3xl lg:text-[40px] leading-[1.1] tracking-tight max-w-3xl">
              "{featured.text}"
            </p>
            <div className="mt-7 pt-5 border-t border-white/15 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[var(--color-copper)] text-white flex items-center justify-center font-display-bold text-lg">
                {featured.name.charAt(0)}
              </div>
              <div>
                <div className="font-display-bold uppercase tracking-tight text-base">{featured.name}</div>
                <div className="text-[var(--color-copper)] text-[10px] tracking-[0.25em] uppercase font-semibold mt-0.5">
                  {featured.city ? `${featured.city}, WA · Verified customer review` : "Verified customer review"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compact aggregate band (no giant centered "5" counter). */}
      <section className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="font-display-black text-3xl lg:text-4xl text-[var(--color-royal)] leading-none">
              {SITE.rating.value.toFixed(1)}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--color-copper)] text-[var(--color-copper)]" />
                ))}
              </div>
              <div className="text-[12px] text-[var(--color-slate)]/60 mt-0.5">
                {SITE.rating.label}
              </div>
            </div>
          </div>
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center gap-2 bg-[var(--color-royal)] text-white px-4 py-2.5 rounded-full font-semibold text-[13px]"
          >
            Call {SITE.phone.display} <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Review grid OR empty-state CTA. While we wait on real review
       * text, the grid is replaced by a single big "Read every review on
       * Google" panel — keeps the aggregate proof honest without faking
       * individual quotes. */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        {hasReviews ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {rest.map((r, i) => (
              <div
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-5 lg:p-6"
              >
                <div className="flex gap-0.5 mb-3" aria-hidden>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[var(--color-copper)] text-[var(--color-copper)]" />
                  ))}
                </div>
                <p className="text-[var(--color-slate)]/85 leading-relaxed text-[14.5px] mb-5">
                  "{r.text}"
                </p>
                <div className="border-t border-[var(--color-line)] pt-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-royal)] text-[var(--color-copper)] flex items-center justify-center font-display-bold text-sm">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display-bold uppercase tracking-tight text-[13.5px] text-[var(--color-royal)]">{r.name}</div>
                    <div className="text-[var(--color-copper)] text-[10px] tracking-[0.2em] uppercase font-semibold">
                      {r.city ? `${r.city}, WA` : "Verified customer"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-8 lg:p-12 text-center">
            <div className="flex justify-center gap-1 mb-4" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[var(--color-copper)] text-[var(--color-copper)]" />
              ))}
            </div>
            <h3 className="font-display-bold uppercase text-2xl lg:text-3xl text-[var(--color-royal)] mb-3 leading-tight">
              {SITE.customersServed}+ satisfied customers
            </h3>
            <p className="text-[var(--color-slate)]/65 text-[15px] max-w-xl mx-auto mb-6">
              We've earned a five-star reputation across Washington &mdash; one honest job at a time. Call and we'll tell you about work we've done in your neighborhood.
            </p>
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-2 bg-[var(--color-royal)] hover:bg-[var(--color-royal-deep)] text-white px-6 py-3.5 rounded-full font-semibold text-[14px] transition-colors shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)]"
            >
              Call {SITE.phone.display}
              <Phone className="w-4 h-4" />
            </a>
          </div>
        )}

        <div className="text-center mt-10 lg:mt-14">
          <p className="text-[var(--color-slate)]/60 mb-4 text-[14.5px]">Had a great experience with us?</p>
          <a
            href={SITE.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="haptic inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-[var(--color-copper)]/20"
          >
            <Star className="w-4 h-4 fill-white" /> Leave us a review
          </a>
        </div>
      </section>
    </>
  );
}
