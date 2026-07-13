import { useEffect, useRef, useState } from "react";

/*
 * Horizontal snap-scroll rail. Each direct child is one snap target.
 * - CSS scroll-snap (smooth on iOS Safari)
 * - Page indicator dots beneath, synced via IntersectionObserver
 * - Hides scrollbars
 * - Edge padding so first/last items reach the viewport edge gracefully
 */

export default function HorizontalSnap({ children, className = "", showDots = true }) {
  const railRef = useRef(null);
  const [active, setActive] = useState(0);
  const items = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observers = [];
    Array.from(rail.children).forEach((child, i) => {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio > 0.6) setActive(i);
        },
        { root: rail, threshold: [0.6] },
      );
      obs.observe(child);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [children]);

  return (
    <div className={className}>
      <div
        ref={railRef}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-[var(--space-page-x)] pb-2 -mx-[var(--space-page-x)]"
        style={{ scrollPaddingLeft: "var(--space-page-x)" }}
      >
        {items.map((c, i) => (
          <div key={i} className="snap-start flex-shrink-0">
            {c}
          </div>
        ))}
      </div>
      {showDots && items.length > 1 && (
        <div className="page-dots mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : "false"}
              onClick={() => {
                const rail = railRef.current;
                if (!rail) return;
                rail.children[i]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "start",
                  block: "nearest",
                });
              }}
              className={`page-dot ${i === active ? "is-active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
