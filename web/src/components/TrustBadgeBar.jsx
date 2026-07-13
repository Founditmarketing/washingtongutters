import { Shield, CheckCircle2, Clock, Star } from "lucide-react";
import WAVeteranSeal from "./atoms/WAVeteranSeal";
import { SITE } from "../data/site";

/*
 * Below-hero credibility band. Hairline of dense, factual trust signals.
 * Restraint is the point: factual badges, monospace tracking, no marketing fluff.
 *
 * The Veteran-Owned badge uses the real Washington Certified Veteran-Owned
 * Business seal (state-issued, verifiable) instead of a generic Lucide
 * medal icon. Every other badge stays icon-only so the seal carries
 * disproportionate visual weight on the row — that's intentional.
 */

const BADGES = [
  {
    icon: Shield,
    label: "Licensed & Bonded",
    /* Show "WA #<number>" only when SITE.license is set. Until then the
     * sub line is just the bonding state — no placeholder, no fake digits. */
    sub: SITE.license ? `WA #${SITE.license}` : "Washington State",
  },
  { icon: Star, label: `${SITE.rating.value.toFixed(1)} ★ Rated`, sub: `${SITE.customersServed}+ customers` },
  {
    seal: "wa-veteran",
    label: "Veteran-Owned",
    sub: "WA-Certified, state-verified",
  },
  { icon: CheckCircle2, label: "Fully Insured", sub: "$2M liability" },
  { icon: Clock, label: "Same-Day Callback", sub: "We answer fast" },
];

export default function TrustBadgeBar() {
  return (
    <section
      className="bg-[var(--color-paper)] border-y border-[var(--color-line)]"
      aria-label="Credentials"
    >
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <ul className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-4 py-5">
          {BADGES.map(({ icon: Ic, seal, label, sub }) => (
            <li
              key={label}
              className="flex items-center gap-3 px-3 lg:px-5 lg:flex-1 lg:justify-center lg:border-l lg:border-[var(--color-line)] lg:first:border-l-0"
            >
              {seal === "wa-veteran" ? (
                <WAVeteranSeal size="sm" className="flex-shrink-0" />
              ) : (
                <Ic
                  className="w-5 h-5 text-[var(--color-copper)] flex-shrink-0"
                  strokeWidth={1.5}
                />
              )}
              <div className="leading-tight">
                <div className="text-[var(--color-royal)] text-[13px] font-semibold tracking-tight">
                  {label}
                </div>
                <div className="text-[var(--color-slate)]/55 text-[11px] tracking-wide">{sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
