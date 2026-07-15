import { useState } from "react";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";
import ResponsiveImg from "./atoms/ResponsiveImg";
import GalleryLightbox from "./GalleryLightbox";
import { GALLERY } from "../data/gallery";
import { useCarousel } from "../hooks/useCarousel";

/* Curated home-page slice. The full gallery (all real installs) lives at
 * /gallery; on the home page we feature the strongest 9 — a mix of wide
 * hero-quality shots, a couple of customer-portrait moments, and the
 * authentically-Pierce variety of home styles. Same data shape as
 * GALLERY so the lightbox + ResponsiveImg components don't care. */
const FEATURED_BASES = [
  "photos/yellow-craftsman-porch",
  "photos/white-metal-garage",
  "photos/two-story-gray-maple",
  "photos/barn-gutter-run",
  "photos/blue-rancher",
  "photos/stone-rancher-downspout",
  "photos/doghouse-mini-gutter",
  "photos/gray-two-story-jobsite",
  "photos/splitlevel-ladder-install",
];
const FEATURED = FEATURED_BASES
  .map((b) => GALLERY.find((g) => g.image === b))
  .filter(Boolean);

/* Filter pills are derived from the FEATURED slice. Categories with zero
 * matches are dropped so the row never shows a dead pill. */
const ALL_FILTERS = [
  { id: "all",          label: "All" },
  { id: "installation", label: "Installation" },
  { id: "replacement",  label: "Replacement" },
  { id: "guards",       label: "Guards" },
  { id: "soffit",       label: "Soffit/Fascia" },
];

const ARROW_BTN =
  "haptic hidden lg:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--color-royal-ink)]/70 hover:bg-[var(--color-royal-ink)] backdrop-blur-sm text-white items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none ring-1 ring-white/15 z-10";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const { trackRef, active, atStart, atEnd, step, goTo, syncState } = useCarousel([filter]);

  const filters = ALL_FILTERS.filter(
    (f) => f.id === "all" || FEATURED.some((g) => g.service === f.id),
  );
  const items = filter === "all" ? FEATURED : FEATURED.filter((g) => g.service === filter);

  return (
    <section id="gallery" className="py-[var(--space-section-lg)] overflow-hidden">
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="mb-4">
              <Eyebrow>Recent Work</Eyebrow>
            </div>
            <h2 className="font-display-black text-display-lg text-[var(--color-royal)]">
              From the <span className="text-[var(--color-copper)]">field.</span>
            </h2>
          </div>
          {/* iOS-style segmented filter pills */}
          <div
            className="-mx-[var(--space-page-x)] lg:mx-0 px-[var(--space-page-x)] lg:px-0 overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Project filter"
          >
            <div className="flex flex-nowrap lg:flex-wrap gap-2 min-w-max lg:min-w-0">
              {filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`haptic px-4 py-2 text-sm font-medium rounded-none border transition-all whitespace-nowrap ${
                    filter === f.id
                      ? "bg-[var(--color-royal)] text-white border-[var(--color-royal)]"
                      : "bg-[var(--color-paper)] text-[var(--color-royal)] border-[var(--color-line-strong)] hover:border-[var(--color-royal)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH CAROUSEL — the track spans edge to edge; the first slide
          aligns to the content gutter, the rest run off the right of the
          viewport. Arrows step one slide; dots jump; a tap opens the lightbox. */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={syncState}
          className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-1"
          style={{
            paddingLeft: "var(--gutter-inline)",
            paddingRight: "var(--space-page-x)",
            scrollPaddingLeft: "var(--gutter-inline)",
          }}
        >
          {items.map((g, i) => (
            <button
              key={g.image}
              data-slide
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open project photo: ${g.alt}`}
              className="haptic group relative shrink-0 snap-start w-[82vw] sm:w-[460px] lg:w-[560px] overflow-hidden aspect-[4/3] bg-[var(--color-royal)] text-left"
            >
              <ResponsiveImg
                base={g.image}
                alt={g.alt}
                sizes="(max-width: 640px) 82vw, 560px"
                widths={g.widths || [640, 1024]}
                className="w-full h-full object-cover graded group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-deep)]/70 via-[var(--color-royal-deep)]/10 to-transparent" />
              <span className="absolute top-3 left-3 font-mono text-[11px] tracking-[0.2em] text-white/85">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute bottom-3 right-3 w-10 h-10 bg-[var(--color-copper)]/0 group-hover:bg-[var(--color-copper)] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </button>
          ))}
        </div>

        {/* Overlay arrows — desktop only; mobile swipes. Left arrow sits on the
            content gutter, right arrow near the viewport edge. */}
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous photos"
          className={ARROW_BTN}
          style={{ left: "var(--gutter-inline)" }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next photos"
          className={`${ARROW_BTN} right-[var(--space-page-x)]`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress dots */}
      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === active ? "true" : "false"}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-none transition-all ${
                i === active
                  ? "w-7 bg-[var(--color-copper)]"
                  : "w-2.5 bg-[var(--color-royal)]/25 hover:bg-[var(--color-royal)]/45"
              }`}
            />
          ))}
        </div>
      )}

      <GalleryLightbox items={items} index={openIndex} onIndex={setOpenIndex} />

      <div className="mt-8 text-center">
        <a
          href="/gallery"
          className="haptic inline-flex items-center gap-2 text-[var(--color-royal)] hover:text-[var(--color-copper)] font-semibold transition-colors group"
        >
          View full project archive{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
