import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to all elements matching `selector`
 * within the ref container. Adds `is-visible` class when they scroll
 * into view.
 *
 * Mobile only — does nothing above 768px.
 */
export function useMobileReveal(selector = ".mob-reveal, .mob-reveal-left, .mob-reveal-scale, .mob-wipe, .mob-parallax-photo, .mob-service-card") {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    const container = ref.current || document;
    const targets = container.querySelectorAll(selector);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);

  return ref;
}
