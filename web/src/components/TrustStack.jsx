import { SITE } from "../data/site";

/**
 * "By the numbers" stat band — a compact strip on a faint brand tint that sits
 * just under the Process timeline. Kept small (modest numerals + tight
 * padding) so it reads as a quiet proof point, not a headline moment.
 *
 * Layout: a 2×2 grid on mobile, a single 4-across row on desktop with hairline
 * dividers. No counter animations — static numbers from a single source of
 * truth (data/site.js).
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
      className="bg-[var(--color-royal-tint)]/45 border-y border-[var(--color-line)]"
      aria-label="By the numbers"
    >
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] py-7 lg:py-9">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-7 md:gap-y-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`text-center px-4 ${
                i > 0 ? "md:border-l md:border-[var(--color-line-strong)]" : ""
              }`}
            >
              <div className="font-display-black text-[34px] sm:text-[40px] lg:text-[48px] text-[var(--color-royal)] leading-none tracking-[-0.025em]">
                {s.val}
                {s.suffix && (
                  <span className="text-[var(--color-copper)] ml-1">{s.suffix}</span>
                )}
              </div>
              <div className="text-[var(--color-slate)]/60 text-[11px] lg:text-[12px] tracking-[0.15em] uppercase font-semibold mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
