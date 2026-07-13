import { useEffect, useState } from "react";
import { Phone, MessageSquare, Calculator } from "lucide-react";
import { SITE } from "../data/site";

/*
 * Always-on right-edge contact rail (desktop only). Appears after the user
 * scrolls past the hero. Subtle, vertical, copper-ringed. Never obscures
 * content; positioned in the gutter outside the 1400px content cap.
 */

export default function DesktopCallRail({ onEstimate }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 transition-all duration-500 ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
      aria-label="Quick contact"
    >
      <a
        href={SITE.phone.tel}
        className="group bg-[var(--color-royal)] hover:bg-[var(--color-royal-deep)] text-white w-12 h-12 flex items-center justify-center transition-all hover:w-auto hover:px-4 hover:gap-2 shadow-lg shadow-black/30"
        aria-label={`Call ${SITE.phone.display}`}
      >
        <Phone className="w-5 h-5" />
        <span 
          className="hidden group-hover:inline whitespace-nowrap text-[15px]"
          style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", fontWeight: 700 }}
        >
          {SITE.phone.display}
        </span>
      </a>
      <a
        href={SITE.phone.sms}
        className="group bg-[var(--color-royal)] hover:bg-[var(--color-royal-deep)] text-white w-12 h-12 flex items-center justify-center transition-all hover:w-auto hover:px-4 hover:gap-2 shadow-lg shadow-black/30"
        aria-label="Text us"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden group-hover:inline whitespace-nowrap text-sm font-semibold">Text</span>
      </a>
      <button
        onClick={onEstimate}
        className="group bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white w-12 h-12 flex items-center justify-center transition-all hover:w-auto hover:px-4 hover:gap-2 shadow-lg shadow-black/30"
        aria-label="Open estimate form"
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden group-hover:inline whitespace-nowrap text-sm font-semibold">
          Free Estimate
        </span>
      </button>
    </div>
  );
}
