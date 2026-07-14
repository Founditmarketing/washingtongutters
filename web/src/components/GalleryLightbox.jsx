import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import ResponsiveImg from "./atoms/ResponsiveImg";

/**
 * GalleryLightbox — full-bleed photo viewer for the project gallery.
 *
 * Why a real lightbox instead of an <a href="/gallery">: the existing
 * thumbnail-grid sends users away from the home page to find out what
 * a photo is. That breaks the moment. A lightbox lets the visitor
 * inspect each install in detail without leaving the surface they came
 * to read about (hero, reviews, services).
 *
 * UX:
 *   - Click any gallery tile         → opens at that index.
 *   - Click backdrop / X / Escape    → closes.
 *   - Keyboard arrows / on-screen ←→ → prev/next, wraps both ends.
 *   - Body scroll is locked while open so the page underneath doesn't
 *     drift behind the photo.
 *   - 1920w source is requested, but ResponsiveImg's AVIF/WebP/JPG
 *     fallback chain still applies so older browsers degrade gracefully.
 *
 * Props:
 *   items    - GALLERY array (or filtered subset).
 *   index    - currently displayed index, or null when closed.
 *   onIndex  - (i: number | null) => void. Pass null to close.
 */
export default function GalleryLightbox({ items, index, onIndex }) {
  const isOpen = index !== null && index !== undefined;
  const item = isOpen ? items[index] : null;

  const close = useCallback(() => onIndex(null), [onIndex]);
  const next  = useCallback(() => {
    onIndex((index + 1) % items.length);
  }, [index, items.length, onIndex]);
  const prev  = useCallback(() => {
    onIndex((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndex]);

  /* Body-scroll lock + keyboard wiring while the lightbox is open. */
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape")      close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, next, prev]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[var(--color-royal-deep)]/95 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Project photo ${index + 1} of ${items.length}`}
      onClick={close}
      style={{ animation: "lightboxIn 280ms var(--ease-ios-spring) both" }}
    >
      {/* Top bar — meta on the left, close on the right. Pointer-events
          scoped so the bar itself doesn't swallow backdrop clicks. */}
      <div
        className="relative z-10 flex items-start justify-between gap-4 px-5 sm:px-8 pt-[max(env(safe-area-inset-top),1rem)] pb-4 pointer-events-none"
      >
        <div className="pointer-events-auto text-white" onClick={(e) => e.stopPropagation()}>
          {item.city && (
            <div className="flex items-center gap-1.5 text-[var(--color-copper)] text-[10px] tracking-[0.28em] uppercase font-bold mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {item.city}
            </div>
          )}
          {item.label && (
            <h2 className="font-display-bold uppercase tracking-tight text-lg sm:text-xl lg:text-2xl leading-tight max-w-xl">
              {item.label}
            </h2>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); close(); }}
          aria-label="Close gallery"
          className="haptic pointer-events-auto shrink-0 w-11 h-11 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Photo — centered, clamped to viewport, click stops backdrop dismiss. */}
      <div className="relative flex-1 flex items-center justify-center px-5 sm:px-12 pb-6">
        <div
          className="relative w-full max-w-[min(1280px,90vw)] max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <ResponsiveImg
            base={item.image}
            alt={item.alt}
            sizes="(max-width: 768px) 90vw, 80vw"
            widths={item.widths || [1024, 1920]}
            loading="eager"
            fetchPriority="high"
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-[var(--radius-card)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Arrow buttons — bottom corners on mobile, vertical-centered
            sides on desktop. Placed in flow so they stay touchable on
            phones while not crowding the photo on big screens. */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous photo"
          className="haptic absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next photo"
          className="haptic absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom rail — counter and the photo's full alt text (the most
          honest caption we have for now). */}
      <div
        className="relative z-10 px-5 sm:px-8 pb-[max(env(safe-area-inset-bottom),1.25rem)] pointer-events-none"
      >
        <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between gap-4 text-white/70 text-[12px]">
            <span className="font-mono tracking-wider">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline-block text-[var(--color-copper)] text-[10px] tracking-[0.25em] uppercase font-bold">
              Use ← / → to navigate
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
