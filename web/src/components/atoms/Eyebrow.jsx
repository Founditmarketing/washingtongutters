/**
 * Eyebrow — the small label above section titles. Redesigned as a sharp,
 * boxed tag with a square marker (was a thin rule + text). `color` picks the
 * copper (light backgrounds) or white (dark backgrounds) treatment.
 */
export default function Eyebrow({ children, color = "copper", icon: Icon }) {
  const isWhite = color === "white";
  const text = isWhite ? "text-white/90" : "text-[var(--color-copper)]";
  const border = isWhite ? "border-white/25" : "border-[var(--color-copper)]/45";

  return (
    <span
      className={`inline-flex items-center gap-2 border ${border} ${text} px-3 py-1.5 text-[10px] sm:text-[10.5px] tracking-[0.26em] uppercase font-bold leading-none`}
    >
      {Icon ? (
        <Icon className="w-3.5 h-3.5" />
      ) : (
        <span className="w-1.5 h-1.5 bg-[var(--color-copper)]" aria-hidden />
      )}
      {children}
    </span>
  );
}
