import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { SITE } from "../data/site";

export default function FinalCta({ onEstimate }) {
  return (
    <section className="py-section-mobile lg:py-[var(--space-section-lg)] bg-[var(--color-bone)]">
      <div className="max-w-[1100px] mx-auto px-[var(--space-page-x)] text-center">
        <span className="inline-flex items-center gap-2 text-[var(--color-copper)] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
          <span className="h-px w-8 bg-[var(--color-copper)]" /> Get Started{" "}
          <span className="h-px w-8 bg-[var(--color-copper)]" />
        </span>
        <h2 className="font-display-black text-display-lg text-[var(--color-royal)] mb-7">
          Ready when <span className="text-[var(--color-copper)]">you are.</span>
        </h2>
        <p className="text-[var(--color-slate)]/75 text-lg max-w-2xl mx-auto mb-10">
          Free written estimates, valid for 12 months. Most homeowners hear back within the same
          day, and we book installs within a week.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onEstimate}
            className="haptic inline-flex items-center gap-2.5 bg-[var(--color-royal)] hover:bg-[var(--color-royal-deep)] text-white px-7 py-3.5 font-semibold transition-all rounded-none shadow-xl shadow-black/10"
          >
            Request Free Estimate <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center gap-2.5 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-7 py-3.5 font-semibold transition-all rounded-none"
          >
            <Phone className="w-5 h-5" /> {SITE.phone.display}
          </a>
          <a
            href={SITE.phone.sms}
            className="haptic inline-flex items-center gap-2.5 border border-[var(--color-line-strong)] hover:border-[var(--color-royal)] text-[var(--color-royal)] px-7 py-3.5 font-semibold transition-all rounded-none"
          >
            <MessageSquare className="w-5 h-5" /> Text Us
          </a>
        </div>
      </div>
    </section>
  );
}
