import { ClipboardList, Check } from "lucide-react";
import EstimatorWidget from "./EstimatorWidget";

const BULLETS = [
  "No spam, no pressure",
  "We'll contact you soon to discuss your project",
  "Final quote is always written, flat, and good for 12 months",
];

export default function EstimatorSection({ onEstimate }) {
  return (
    <section className="bg-[var(--color-bone)] py-[var(--space-section-lg)] relative overflow-hidden">
      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 text-[var(--color-copper)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <ClipboardList className="w-3.5 h-3.5" /> Free Estimate
          </span>
          <h2 className="font-display-black text-display-lg text-[var(--color-royal)] mb-6">
            Get a Free
            <br />
            <span className="text-[var(--color-copper)]">Estimate.</span>
          </h2>
          <p className="text-[var(--color-slate)]/75 leading-relaxed mb-8">
            Leave your contact info below and we will reach out soon to schedule a free in-person estimate.
          </p>
          <ul className="space-y-3 text-[var(--color-slate)]/70 text-[15px]">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 items-start">
                <Check className="w-4 h-4 text-[var(--color-copper)] flex-shrink-0 mt-1" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <EstimatorWidget />
        </div>
      </div>
    </section>
  );
}
