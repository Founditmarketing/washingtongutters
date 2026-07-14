import { useEffect } from "react";
import { Check } from "lucide-react";

/*
 * iOS-style top banner. Slides down from the safe-area top edge, holds for
 * `duration` ms, then slides back up. Use for confirmation messages.
 */

export default function Toast({ open, onClose, title, message, duration = 3500 }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open) return null;

  return (
    <div
      className="fixed left-0 right-0 z-[80] flex justify-center px-3 pointer-events-none"
      style={{ top: "calc(var(--safe-top) + 8px)" }}
      role="status"
      aria-live="polite"
    >
      <div
        className="material-light pointer-events-auto rounded-[var(--radius-card)] shadow-2xl shadow-black/20 px-4 py-3 flex items-center gap-3 max-w-md w-full"
        style={{ animation: "toastIn 360ms var(--ease-ios-spring) both" }}
      >
        <div className="w-8 h-8 rounded-none bg-[var(--color-copper)] text-white flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[15px] text-[var(--color-royal)] leading-tight">
            {title}
          </div>
          {message && (
            <div className="text-[13px] text-[var(--color-slate)]/70 leading-tight mt-0.5 truncate">
              {message}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
