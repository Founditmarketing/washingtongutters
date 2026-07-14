import { useCallback, useEffect, useRef, useState } from "react";

/*
 * useCarousel — drives a horizontal scroll-snap track.
 *
 * Returns a ref for the scroll container plus the derived UI state
 * (active slide, whether we're at either end) and the imperative controls
 * (step by one slide, jump to an index). The scroll position is the single
 * source of truth, so native touch/trackpad scrolling and the buttons stay
 * in sync automatically.
 *
 * Pass `resetDeps` (e.g. a filter value) to snap back to the start whenever
 * the underlying item set changes.
 */
export function useCarousel(resetDeps = []) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Width of one slide including the flex gap — the unit the arrows step by
   * and the dots divide the scroll position into. Read from the DOM so it
   * stays correct across breakpoints without hard-coded numbers. */
  const slideUnit = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector("[data-slide]");
    if (!track || !card) return track?.clientWidth ?? 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    // Snap the active index to the last slide at the end of the track — with
    // several slides visible the left-most index maxes out before the final
    // slide, so without this the last dot(s) would never light up.
    const count = track.querySelectorAll("[data-slide]").length;
    const idx = end
      ? Math.max(0, count - 1)
      : Math.round(track.scrollLeft / slideUnit());
    setActive((prev) => (prev === idx ? prev : idx));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(end);
  }, [slideUnit]);

  /* Reset to the start on mount, on resize, and whenever the item set changes. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0 });
    setActive(0);
    const id = requestAnimationFrame(syncState);
    window.addEventListener("resize", syncState);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", syncState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncState, ...resetDeps]);

  const behavior = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const step = useCallback(
    (dir) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({ left: dir * slideUnit(), behavior: behavior() });
    },
    [slideUnit],
  );

  const goTo = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: i * slideUnit(), behavior: behavior() });
    },
    [slideUnit],
  );

  return { trackRef, active, atStart, atEnd, step, goTo, syncState };
}
