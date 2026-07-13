import TradeStamp from "./atoms/TradeStamp";

/**
 * TradeStampRow — horizontal lockup of trade-stamp credentials.
 *
 * Renders a small constellation of state-issued and third-party trust
 * signals as a single visual block. Each stamp keeps its own native
 * shape (red oval, gold seal, scalloped circle) and they share a common
 * vertical rhythm via fixed display height plus the SITE_MAP scale on
 * the underlying atom.
 *
 * Two intentional design choices worth calling out:
 *
 * 1. No card wrapper around the row. The stamps are themselves the
 *    visual containers — boxing them with a tinted card adds a second
 *    layer of "container" with nothing to say, the kind of nesting the
 *    project's design laws explicitly call out as lazy.
 *
 * 2. The optional `caption` is set in the same monospaced label style
 *    we use for the contractor-license + recent-activity micro-text,
 *    so this lockup reads as another factual credential band rather
 *    than a marketing slot.
 */
export default function TradeStampRow({
  stamps = [
    { name: "wa-veteran-certified", label: "WA-Certified Veteran-Owned" },
    { name: "veteran-owned-business", label: "Veteran-Owned Business" },
    { name: "google-5-star-rating", label: "5.0 ★ Rated in WA" },
  ],
  size = "md",
  caption,
  className = "",
}) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10 md:gap-x-12">
        {stamps.map(({ name, label, alt }) => (
          <li
            key={name}
            className="group flex flex-col items-center text-center"
          >
            <TradeStamp
              name={name}
              size={size}
              alt={alt || label}
              className="flex-shrink-0"
            />
            {label && (
              <div className="mt-2 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold text-[var(--color-slate)]/70 max-w-[12ch]">
                {label}
              </div>
            )}
          </li>
        ))}
      </ul>
      {caption && (
        <p className="mt-5 text-center text-[12px] tracking-wide text-[var(--color-slate)]/55 max-w-[60ch] mx-auto">
          {caption}
        </p>
      )}
    </div>
  );
}
