import { useEffect, useRef, useState, useCallback } from "react";

/*
 * iOS-style BottomSheet. Slides up from the bottom over a dim/blur backdrop.
 * - Tap backdrop or press Esc to dismiss
 * - Drag handle (or anywhere on the title strip) downward to dismiss
 * - Snap points: optional `medium` (60vh) and `full` (95vh)
 * - Body scroll lock while open
 * - Safe-area aware (respects home indicator inset)
 *
 * Pure React + pointer events. No framer-motion, no rdnd.
 */

const DISMISS_VELOCITY = 0.6; // px/ms — flick speed that triggers dismiss
const DISMISS_DISTANCE = 0.25; // fraction of sheet height dragged that dismisses

export default function BottomSheet({
  open,
  onClose,
  children,
  snap = "medium", // "medium" | "full"
  title,
}) {
  const sheetRef = useRef(null);
  const dragStateRef = useRef({ startY: 0, startTime: 0, dragging: false, lastY: 0 });
  const [translateY, setTranslateY] = useState(0);
  const [animating, setAnimating] = useState(true);

  // Body scroll lock + Esc key
  useEffect(() => {
    if (!open) {
      setTranslateY(0);
      return;
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const onPointerDown = useCallback((e) => {
    setAnimating(false);
    dragStateRef.current = {
      startY: e.clientY,
      startTime: performance.now(),
      dragging: true,
      lastY: e.clientY,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragStateRef.current.dragging) return;
    const dy = Math.max(0, e.clientY - dragStateRef.current.startY);
    dragStateRef.current.lastY = e.clientY;
    setTranslateY(dy);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragStateRef.current.dragging) return;
    const { startY, startTime, lastY } = dragStateRef.current;
    const dy = lastY - startY;
    const dt = Math.max(1, performance.now() - startTime);
    const velocity = dy / dt;
    const sheetHeight = sheetRef.current?.getBoundingClientRect().height || 1;
    dragStateRef.current.dragging = false;
    setAnimating(true);

    if (velocity > DISMISS_VELOCITY || dy / sheetHeight > DISMISS_DISTANCE) {
      onClose();
    } else {
      setTranslateY(0);
    }
  }, [onClose]);

  if (!open) return null;

  const heightClass = snap === "full" ? "max-h-[95dvh]" : "max-h-[88dvh] sm:max-h-[78dvh]";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Sheet"}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-[var(--color-slate)]/55 backdrop-blur-md cursor-default"
        style={{ animation: "sheetFade 280ms var(--ease-ios-spring) both" }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`relative w-full sm:max-w-[480px] bg-[var(--color-bone)] rounded-t-[var(--radius-tile)] shadow-[0_-12px_60px_-12px_rgba(0,0,0,0.4)] ${heightClass} flex flex-col overflow-hidden`}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: animating ? "transform 380ms var(--ease-ios-spring)" : "none",
          paddingBottom: "var(--safe-bottom)",
          animation: "sheetUp 420ms var(--ease-ios-spring) both",
        }}
      >
        {/* Drag handle area (whole title strip catches drag) */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="cursor-grab active:cursor-grabbing select-none flex flex-col items-center pt-2.5 pb-1"
        >
          <div className="w-10 h-1 rounded-none bg-[var(--color-royal)]/25" />
          {title && (
            <div className="font-display text-[var(--color-royal)] text-base font-semibold mt-2.5">
              {title}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </div>

      <style>{`
        @keyframes sheetFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}
