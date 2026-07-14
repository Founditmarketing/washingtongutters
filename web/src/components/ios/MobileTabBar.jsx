import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Phone, MessageSquare, FileText } from "lucide-react";
import { SITE } from "../../data/site";

/**
 * Mobile bottom action bar — conversion-first, not a nav tab bar.
 *
 * Full navigation lives in the header hamburger; down here we only surface the
 * three actions that actually convert: a prominent "Free Estimate" button plus
 * round Call and Text buttons. Deep-navy translucent surface with a red top
 * hairline so it reads as the brand's action strip.
 *
 * Visibility: stays tucked away while the hero (`[data-hero]`) is on screen and
 * slides up once the visitor scrolls past it. Re-attaches its observer on route
 * change; on any page without a hero it just shows immediately.
 */
export default function MobileTabBar({ onEstimate }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <nav
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-copper)]/40 bg-[var(--color-royal-ink)]/95 backdrop-blur-xl transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Quick contact"
      aria-hidden={!visible}
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
