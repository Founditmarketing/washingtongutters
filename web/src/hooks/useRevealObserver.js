import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mounts a single IntersectionObserver that watches every element with
 * `data-reveal` and toggles `is-visible` when 15% of the element enters the
 * viewport. Re-scans on route change.
 *
 * One observer for the whole page, no React state, no per-component setup.
 * CSS in global.css owns the actual animation (opacity + translate, not layout
 * properties), and respects prefers-reduced-motion.
 */
export function useRevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!targets.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);
}
