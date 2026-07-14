import { Star, Quote } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";
import HorizontalSnap from "./ios/HorizontalSnap";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../data/site";

/*
 * Mobile: HorizontalSnap rail, each review a tall iOS-style card.
 * Desktop: featured pull-quote on the left + supporting cards stacked right.
 */

function ReviewCardMobile({ r, featured = false }) {
  return (
    <article
      className={`w-[80vw] sm:w-[380px] rounded-[var(--radius-tile)] p-6 flex flex-col ${
        featured
          ? "bg-[var(--color-royal)] text-white"
          : "bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-slate)]"
      } relative overflow-hidden`}
      style={{ minHeight: "280px" }}
    >
      {featured && <Quote className="absolute top-3 right-3 w-16 h-16 text-[var(--color-copper)]/15" />}
      <div className="relative flex flex-col flex-1">
        <div className="flex mb-4" aria-hidden>
          {[...Array(r.rating)].map((_, j) => (
            <Star
              key={j}
              className="w-4 h-4 fill-[var(--color-copper)] text-[var(--color-copper)]"
            />
          ))}
        </div>
        {/* flex-1 makes the quote grow to push author to bottom */}
        <p
          className={`leading-relaxed flex-1 ${
            featured ? "font-display text-[19px] font-light" : "text-[14.5px]"
          }`}
        >
          "{r.text}"
        </p>
        <div className={`mt-5 pt-4 border-t flex items-center gap-3 ${featured ? "border-white/15" : "border-[var(--color-line)]"}`}>
          <div
            className={`w-9 h-9 rounded-none flex items-center justify-center font-display text-sm font-semibold shrink-0 ${
              featured
                ? "bg-[var(--color-copper)] text-white"
                : "bg-[var(--color-royal)] text-[var(--color-copper)]"
            }`}
          >
            {r.name.charAt(0)}
          </div>
          <div>
            <div className={`font-display text-[15px] ${featured ? "" : "text-[var(--color-royal)]"}`}>
              {r.name}
            </div>
            <div className="text-[var(--color-copper)] text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5">
              {r.city ? `${r.city}, WA` : "Verified customer"}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


export default function Reviews() {
  const [featured, ...rest] = REVIEWS;

  return (
    <section
      id="reviews"
      className="py-[var(--space-section-lg)] max-w-[var(--max-content)] mx-auto"
    >
      <div className="px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-6 mb-10 lg:mb-14">
          <div className="lg:col-span-7" data-reveal>
            <div className="mb-4">
              <Eyebrow>What Neighbors Say</Eyebrow>
            </div>
            <h2 className="font-display-black text-display-lg text-[var(--color-royal)]">
              Five stars.
              <br />
              <span className="text-[var(--color-copper)]">Earned slowly.</span>
            </h2>
            <p className="hidden lg:block text-[var(--color-slate)]/85 text-[20px] font-medium leading-snug mt-5 max-w-md">
              {SITE.customersServed}+ trusted customers. Every review written by a neighbor.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end" data-reveal>
            <div className="flex items-center gap-4">
              <div className="flex" aria-label={`${SITE.rating.value} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-[var(--color-copper)] text-[var(--color-copper)]"
                  />
                ))}
              </div>
              <div className="text-[var(--color-slate)]/75">
                <span className="font-display text-2xl text-[var(--color-royal)]">
                  {SITE.rating.value.toFixed(1)}
                </span>
                <span className="ml-2 text-sm">
                  · {SITE.rating.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — snap rail */}
      <div className="lg:hidden px-[var(--space-page-x)]">
        <HorizontalSnap>
          <ReviewCardMobile r={featured} featured />
          {rest.map((r) => (
            <ReviewCardMobile key={r.name} r={r} />
          ))}
        </HorizontalSnap>
      </div>

      {/* DESKTOP — featured pull-quote + 2 supporting */}
      <div className="hidden lg:grid grid-cols-12 gap-7 px-[var(--space-page-x)]">
        <article className="col-span-7 relative bg-[var(--color-royal)] text-white p-12 overflow-hidden rounded-[var(--radius-tile)]">
          <div className="absolute inset-0 grain opacity-10" />
          <Quote className="absolute top-6 right-6 w-24 h-24 text-[var(--color-copper)]/15" />
          <div className="relative">
            <div className="flex mb-6" aria-hidden>
              {[...Array(featured.rating)].map((_, j) => (
                <Star
                  key={j}
                  className="w-5 h-5 fill-[var(--color-copper)] text-[var(--color-copper)]"
                />
              ))}
            </div>
            <p className="font-display font-light text-2xl lg:text-[28px] leading-[1.35] mb-8">
              "{featured.text}"
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-white/15">
              <div className="w-11 h-11 rounded-none bg-[var(--color-copper)] text-white flex items-center justify-center font-display text-lg font-semibold">
                {featured.name.charAt(0)}
              </div>
              <div>
                <div className="font-display text-lg">{featured.name}</div>
                <div className="text-[var(--color-copper)] text-[11px] tracking-[0.2em] uppercase font-semibold mt-0.5">
                  {featured.city ? `${featured.city}, WA` : "Verified customer"}
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="col-span-5 grid gap-5">
          {rest.map((r) => (
            <article
              key={r.name + r.city}
              className="bg-[var(--color-paper)] border border-[var(--color-line)] p-7 rounded-[var(--radius-card)] hover:border-[var(--color-copper)]/40 transition-colors"
            >
              <div className="flex mb-4" aria-hidden>
                {[...Array(r.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-[var(--color-copper)] text-[var(--color-copper)]"
                  />
                ))}
              </div>
              <p className="text-[var(--color-slate)]/85 leading-relaxed mb-5 text-[14.5px]">
                "{r.text}"
              </p>
              <div className="pt-4 border-t border-[var(--color-line)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-none bg-[var(--color-royal)] text-[var(--color-copper)] flex items-center justify-center font-display text-sm font-semibold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-[15px] text-[var(--color-royal)]">{r.name}</div>
                  <div className="text-[var(--color-copper)] text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5">
                    {r.city ? `${r.city}, WA` : "Verified customer"}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 px-[var(--space-page-x)] flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <a
          href="/reviews/"
          className="text-[var(--color-copper)] font-semibold hover:underline inline-flex items-center gap-1.5"
        >
          Read all customer reviews →
        </a>
        <span className="text-[var(--color-slate)]/55 text-[13px]">
          · Real, never edited, never paid for.
        </span>
      </div>
    </section>
  );
}
