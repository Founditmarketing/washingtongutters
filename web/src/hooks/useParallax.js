import { useEffect, useRef } from "react";

/*
 * Cheap, smooth scroll-driven parallax. Applies a translateY transform to a
 * single ref based on its scroll progress. Uses rAF; no scroll listener
 * thrash. Respects prefers-reduced-motion.
 */
export function useParallax(speed = 0.4) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        node.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        rafId = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
