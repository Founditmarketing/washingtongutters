import Eyebrow from "./atoms/Eyebrow";

/**
 * Reusable hero for internal pages (Services / About / Gallery / Reviews /
 * Contact). One headline treatment, configurable photo, optional accent strip
 * — so every page gets a distinct identity instead of the previous
 * "navy block + amber-word headline" repeating slab.
 *
 * Mobile-tuned defaults: tighter top padding, photo-first vertical stack,
 * shorter prose width, a chip strip for stats so the fold isn't empty.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  image,
  imageAlt = "",
  chips = [],
  align = "left",
}) {
  const titleParts = (() => {
    if (!accent) return [{ text: title, accent: false }];
    const idx = title.toLowerCase().indexOf(accent.toLowerCase());
    if (idx === -1) return [{ text: title, accent: false }];
    return [
      { text: title.slice(0, idx), accent: false },
      { text: title.slice(idx, idx + accent.length), accent: true },
      { text: title.slice(idx + accent.length), accent: false },
    ];
  })();

  return (
    <section
      className="relative bg-[var(--color-royal-deep)] overflow-hidden"
      style={{ paddingTop: "calc(var(--safe-top) + 6.25rem)" }}
    >
      {/* Photo backdrop, deeply darkened so headline holds. */}
      {image && (
        <div className="absolute inset-0">
          <picture>
            <source
              type="image/avif"
              srcSet={`/${image}-640.avif 640w, /${image}-1024.avif 1024w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`/${image}-640.webp 640w, /${image}-1024.webp 1024w`}
              sizes="100vw"
            />
            <img
              src={`/${image}-1024.jpg`}
              srcSet={`/${image}-640.jpg 640w, /${image}-1024.jpg 1024w`}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover opacity-30 graded-warm"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-royal-deep)]/30 via-[var(--color-royal-deep)]/75 to-[var(--color-royal-deep)]" />
        </div>
      )}
      <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none" />

      <div className={`relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] pb-12 lg:pb-20 ${align === "center" ? "text-center" : ""}`}>
        {eyebrow && (
          <div className={align === "center" ? "flex justify-center" : ""}>
            <Eyebrow color="white">{eyebrow}</Eyebrow>
          </div>
        )}

        <h1 className="font-display-black uppercase text-display-lg text-white mt-4 max-w-3xl">
          {titleParts.map((part, i) =>
            part.accent ? (
              <span key={i} className="text-[var(--color-copper)]">{part.text}</span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </h1>

        {lead && (
          <p className={`text-white/75 text-[16px] lg:text-lg leading-relaxed mt-5 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
            {lead}
          </p>
        )}

        {/* Chip strip — useful, hard facts (years, counties, rating, etc.). */}
        {chips.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 mt-7 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-white/85 text-[12px] font-medium tracking-tight"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
