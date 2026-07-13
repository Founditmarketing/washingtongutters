import { useEffect } from "react";

/*
 * iOS-style ActionSheet. Stack of choice buttons in a translucent material
 * panel anchored to the bottom, with a separate Cancel button below.
 * Backdrop dim, tap to dismiss.
 */

export default function ActionSheet({ open, onClose, title, message, actions = [] }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col justify-end p-3"
      role="dialog"
      aria-modal="true"
      style={{ paddingBottom: "calc(var(--safe-bottom) + 12px)" }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-[var(--color-slate)]/40 backdrop-blur-md cursor-default"
        style={{ animation: "sheetFade 240ms var(--ease-ios-spring) both" }}
      />

      <div
        className="relative space-y-2 sm:max-w-[420px] sm:mx-auto w-full"
        style={{ animation: "sheetUp 360ms var(--ease-ios-spring) both" }}
      >
        <div className="material-light rounded-[var(--radius-card)] overflow-hidden">
          {(title || message) && (
            <div className="text-center px-4 pt-4 pb-3 border-b border-[var(--color-line)]">
              {title && (
                <div className="text-[var(--color-slate)]/60 text-[13px] font-semibold">
                  {title}
                </div>
              )}
              {message && (
                <div className="text-[var(--color-slate)]/50 text-[12px] mt-0.5">{message}</div>
              )}
            </div>
          )}
          {actions.map((a, i) => {
            const isDestructive = a.destructive;
            const isLast = i === actions.length - 1;
            return (
              <a
                key={a.label}
                href={a.href}
                onClick={(e) => {
                  if (a.onSelect) {
                    a.onSelect(e);
                  }
                  onClose();
                }}
                className={`haptic block px-4 py-4 text-center text-[17px] font-semibold transition-colors ${
                  isDestructive
                    ? "text-red-600"
                    : "text-[var(--color-copper)]"
                } ${!isLast ? "border-b border-[var(--color-line)]" : ""}`}
              >
                {a.icon && (
                  <a.icon className="w-4 h-4 inline-block mr-2 -mt-0.5" />
                )}
                {a.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="haptic w-full material-light rounded-[var(--radius-card)] py-4 text-[17px] font-bold text-[var(--color-royal)]"
        >
          Cancel
        </button>
      </div>

      <style>{`
        @keyframes sheetFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp { from { transform: translateY(120%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}
