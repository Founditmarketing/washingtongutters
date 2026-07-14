import { useState } from "react";
import { Phone, MessageSquare, FileText, MessageCircle, X } from "lucide-react";
import { SITE } from "../data/site";

/*
 * Desktop floating action button (bottom-right corner). Tapping it opens a
 * small panel with the three contact actions — Free Estimate, Call, Text.
 * Replaces the old right-edge rail. Desktop only; mobile has the bottom bar.
 */
export default function DesktopCallRail({ onEstimate }) {
  const [open, setOpen] = useState(false);

  const rowBase =
    "haptic flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-white transition-colors";

  return (
    <div className="hidden lg:block">
      {/* Click-away layer */}
      {open && (
        <button
          className="fixed inset-0 z-40 cursor-default"
          aria-label="Close contact menu"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
        {/* Options panel */}
        {open && (
          <div className="w-60 bg-[var(--color-royal-ink)] border border-white/10 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)] fade-up overflow-hidden">
            <div className="px-4 py-2.5 text-[10px] tracking-[0.28em] uppercase font-bold text-[var(--color-copper)] border-b border-white/10">
              Get in touch
            </div>
            <button
              onClick={() => { setOpen(false); onEstimate?.(); }}
              className={`${rowBase} bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)]`}
            >
              <FileText className="w-5 h-5" /> Free Estimate
            </button>
            <a
              href={SITE.phone.tel}
              onClick={() => setOpen(false)}
              className={`${rowBase} hover:bg-white/5`}
            >
              <Phone className="w-5 h-5 text-[var(--color-copper)]" /> Call {SITE.phone.display}
            </a>
            <a
              href={SITE.phone.sms}
              onClick={() => setOpen(false)}
              className={`${rowBase} hover:bg-white/5`}
            >
              <MessageSquare className="w-5 h-5 text-[var(--color-copper)]" /> Text Us
            </a>
          </div>
        )}

        {/* Floating button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close contact menu" : "Contact us"}
          className="haptic-primary w-14 h-14 flex items-center justify-center bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white shadow-[0_14px_34px_-8px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
        >
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
