/*
 * Heritage trade-badge stamp. Mimics the look of a tool-stamped or
 * ink-stamped credential mark you'd find on Filson canvas, a Carhartt
 * tag, or an inspector's trade card. Used for "EST. 1994", "LICENSED WA",
 * "TACOMA · WA", etc.
 *
 * Variants:
 *  - "outline"  : copper outline, transparent fill (default; floats over images)
 *  - "solid"    : copper background, white text
 *  - "ink"      : forest border, slate text on bone
 *  - "warning"  : dark with copper text — for serious trade-stamp feel
 *
 * Shapes:
 *  - "rect"     : default rectangular badge
 *  - "round"    : circular seal
 */

export default function Stamp({
  primary,
  secondary,
  divider,
  variant = "outline",
  shape = "rect",
  rotate = -3,
  className = "",
}) {
  const variantStyles = {
    outline:
      "bg-transparent border-[1.5px] border-[var(--color-copper)] text-[var(--color-copper)]",
    solid: "bg-[var(--color-copper)] text-white border-[1.5px] border-[var(--color-copper)]",
    ink:
      "bg-[var(--color-bone)] border-[1.5px] border-[var(--color-royal)] text-[var(--color-royal)]",
    warning:
      "bg-[var(--color-royal-deep)] border-[1.5px] border-[var(--color-copper)]/80 text-[var(--color-copper)]",
  }[variant];

  const shapeStyles = shape === "round" ? "rounded-full px-5 py-5 aspect-square" : "rounded-sm px-3 py-1.5";

  return (
    <div
      className={`inline-flex flex-col items-center justify-center font-stamp uppercase leading-[0.95] tracking-tight ${variantStyles} ${shapeStyles} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="text-[10px] font-bold tracking-[0.18em]">{primary}</span>
      {divider && (
        <span className="block w-6 h-px bg-current opacity-60 my-1" aria-hidden />
      )}
      {secondary && (
        <span className="text-[8px] tracking-[0.22em] opacity-90 font-medium">{secondary}</span>
      )}
    </div>
  );
}
