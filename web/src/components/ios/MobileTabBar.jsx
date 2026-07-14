import { Phone, MessageSquare, FileText } from "lucide-react";
import { SITE } from "../../data/site";

/**
 * Mobile bottom action bar — conversion-first, not a nav tab bar.
 *
 * Full navigation lives in the header hamburger; down here we only surface the
 * three actions that actually convert: a prominent "Free Estimate" button plus
 * round Call and Text buttons. Deep-navy translucent surface with a red top
 * hairline so it reads as the brand's action strip.
 */
export default function MobileTabBar({ onEstimate }) {
  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-40 tabbar-spring-in border-t border-[var(--color-copper)]/40 bg-[var(--color-royal-ink)]/95 backdrop-blur-xl"
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Quick contact"
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <button
          onClick={() => onEstimate?.()}
          className="haptic-primary flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white rounded-none py-3 font-display-bold uppercase tracking-tight text-[14px] shadow-lg shadow-[var(--color-copper)]/30"
        >
          <FileText className="w-[18px] h-[18px]" strokeWidth={2} />
          Free Estimate
        </button>
        <a
          href={SITE.phone.tel}
          aria-label={`Call ${SITE.phone.display}`}
          className="haptic w-[46px] h-[46px] flex-shrink-0 rounded-none bg-white/[0.08] border border-white/15 text-white flex items-center justify-center"
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href={SITE.phone.sms}
          aria-label="Text us"
          className="haptic w-[46px] h-[46px] flex-shrink-0 rounded-none bg-white/[0.08] border border-white/15 text-white flex items-center justify-center"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
}
