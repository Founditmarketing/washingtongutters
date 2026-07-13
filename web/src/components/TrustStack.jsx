import { SITE } from "../data/site";

/**
 * "By the numbers" stat strip.
 *
 * Two compositions in one component:
 *  - Mobile (<md): vertical row list — each stat is a single line with the
 *    huge numeral on the left and the label running rightward. This avoids
 *    the previous bug where a long word like "Thousands" overflowed its
 *    column and collided with the rating in the adjacent cell.
 *  - Desktop (md+): editorial 4-column with the numerals stacked above the
 *    labels, separated by hairline rules.
 *
 * No counter animations — the prior version animated 0 → target and
 * screenshots routinely caught a mid-flight frame ("2.0 GOOGLE RATING")
 * which contradicted the hero copy and read as broken. Static numbers,
 * single source of truth (data/site.js).
 */
export default function TrustStack() {
  const counties = SITE.countiesServed.length;
  const rating   = SITE.rating.value.toFixed(1);

  const stats = [
    { val: `${SITE.customersServed}+`, label: "Trusted customers" },
    { val: rating, suffix: "★",        label: "Rated in Washington" },
    { val: counties,                   label: "Counties served" },
    { val: "0",                        label: "Subcontractors" },
  ];

  return (
    <section
      className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]"
      aria-label="By the numbers"
    >
      {/* MOBILE — single-column list. Stat numeral fills its width without
          ever overflowing because each row owns the full content width. */}
      <ul className="md:hidden divide-y divide-[var(--color-line-strong)]">
        {stats.map((s) => (
          <li
            key={s.label}
            className="flex items-baseline justify-between gap-6 py-5"
            data-reveal
          >
            <span className="font-display-black text-[40px] sm:text-[48px] text-[var(--color-royal)] leading-none tracking-[-0.025em] flex-shrink-0">
              {s.val}
              {s.suffix && (
                <span className="text-[var(--color-copper)] ml-1.5">{s.suffix}</span>
              )}
            </span>
            <span className="text-[var(--color-slate)]/65 text-[12px] tracking-[0.18em] uppercase font-semibold text-right leading-snug max-w-[150px]">
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      {/* DESKTOP — original 4-col editorial layout. */}
      <div className="hidden md:grid md:grid-cols-4 gap-y-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-8 ${i > 0 ? "border-l border-[var(--color-line-strong)]" : ""}`}
            data-reveal
          >
            <div className="font-display-black text-[68px] lg:text-[88px] text-[var(--color-royal)] leading-[0.85] tracking-[-0.025em] mb-3">
              {s.val}
              {s.suffix && (
                <span className="text-[var(--color-copper)] ml-1">{s.suffix}</span>
              )}
            </div>
            <div className="text-[var(--color-slate)]/65 text-[13px] tracking-[0.15em] uppercase font-semibold">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
