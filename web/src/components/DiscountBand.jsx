import { Users, Award } from "lucide-react";

/* The new business leads with "local, family-owned" and "honest pricing"
 * (per washingtongutters4less.com) — not the recycled template's specific
 * 10% discount offers, which the brand doesn't advertise. */
const DISCOUNTS = [
  {
    tag: "Local & Family-Owned",
    body:
      "Not a franchise. Not a national chain. A local crew that treats your home like our own.",
    icon: Users,
  },
  {
    tag: "Honest, Upfront Pricing",
    body:
      "No games. No hidden fees. No upsells. Just honest work at a fair price — done right the first time.",
    icon: Award,
  },
];

export default function DiscountBand() {
  return (
    <section
      className="bg-[var(--color-royal)] py-[var(--space-section-md)] relative overflow-hidden"
      aria-label="Discounts"
    >
      <div className="absolute inset-0 grain opacity-10" />
      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] grid md:grid-cols-2 gap-10 lg:gap-20">
        {DISCOUNTS.map(({ tag, body, icon: Ic }) => (
          <div key={tag} className="flex items-start gap-6 text-white">
            <div className="w-14 h-14 border border-[var(--color-copper)] text-[var(--color-copper)] flex items-center justify-center flex-shrink-0 rounded-none">
              <Ic className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[var(--color-copper)] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                {tag}
              </div>
              <p className="font-display-bold uppercase text-xl md:text-[26px] leading-[1.1] tracking-tight">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
