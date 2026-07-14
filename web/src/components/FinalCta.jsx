import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { SITE } from "../data/site";
import RainCanvas from "./RainCanvas";

export default function FinalCta({ onEstimate }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-royal-ink)] text-white py-section-mobile lg:py-[var(--space-section-lg)]">
      {/* Depth glow behind the rain, then the rainfall, then a whisper of grain. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 75% at 50% 28%, oklch(0.26 0.10 262.5 / 0.6), oklch(0.13 0.06 262.5 / 0.9))",
        }}
        aria-hidden
      />
      <RainCanvas className="absolute inset-0" />
      <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay" aria-hidden />

      <div className="relative z-10 max-w-[1100px] mx-auto px-[var(--space-page-x)] text-center">
        <span className="inline-flex items-center gap-2 text-[var(--color-copper)] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
          <span className="h-px w-8 bg-[var(--color-copper)]" /> Get Started{" "}
          <span className="h-px w-8 bg-[var(--color-copper)]" />
        </span>
        <h2 className="font-display-black text-display-lg text-white mb-7 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          Ready when <span className="text-[var(--color-copper)]">you are.</span>
        </h2>
        <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10">
          Free written estimates, valid for 12 months. Most homeowners hear back within the same
          day, and we book installs within a week.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onEstimate}
            className="haptic inline-flex items-center gap-2.5 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-7 py-3.5 font-semibold transition-all rounded-none shadow-xl shadow-black/30"
          >
            Request Free Estimate <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center gap-2.5 bg-white text-[var(--color-royal)] hover:bg-white/90 px-7 py-3.5 font-semibold transition-all rounded-none"
          >
            <Phone className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.phone.display}
          </a>
          <a
            href={SITE.phone.sms}
            className="haptic inline-flex items-center gap-2.5 border border-white/40 hover:border-white text-white px-7 py-3.5 font-semibold transition-all rounded-none"
          >
            <MessageSquare className="w-5 h-5" /> Text Us
          </a>
        </div>
      </div>
    </section>
  );
}
