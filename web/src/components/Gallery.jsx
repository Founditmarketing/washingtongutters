import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";
import ResponsiveImg from "./atoms/ResponsiveImg";
import GalleryLightbox from "./GalleryLightbox";
import { GALLERY } from "../data/gallery";

/* Curated home-page slice. The full gallery (all real installs) lives at
 * /gallery; on the home page we feature the strongest 9 — a mix of wide
 * hero-quality shots, a couple of customer-portrait moments, and the
 * authentically-Pierce variety of home styles. Same data shape as
 * GALLERY so the lightbox + ResponsiveImg components don't care. */
const FEATURED_INDICES = [0, 1, 2, 3, 4, 8, 9, 17, 18];
const FEATURED = FEATURED_INDICES.map((i) => GALLERY[i]).filter(Boolean);

/* Filter pills are derived from the FEATURED slice. Categories with zero
 * matches are dropped so the row never shows a dead pill. */
const ALL_FILTERS = [
  { id: "all",          label: "All" },
  { id: "installation", label: "Installation" },
  { id: "replacement",  label: "Replacement" },
  { id: "guards",       label: "Guards" },
  { id: "soffit",       label: "Soffit/Fascia" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const filters = ALL_FILTERS.filter(
    (f) => f.id === "all" || FEATURED.some((g) => g.service === f.id),
  );
  const items = filter === "all" ? FEATURED : FEATURED.filter((g) => g.service === filter);

  return (
    <section
      id="gallery"
      className="py-[var(--space-section-lg)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
        <div>
          <div className="mb-4">
            <Eyebrow>Recent Work</Eyebrow>
          </div>
          <h2 className="font-display-black uppercase text-display-lg text-[var(--color-royal)]">
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

      {/* Uniform grid — every tile is the same 4:5 aspect (matching the
          gallery page) so the images all render at the same size. */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {items.map((g, i) => {
          return (
            <button
              key={g.image}
              type="button"
              onClick={() => setOpenIndex(i)}
              data-reveal
              aria-label={`Open project photo: ${g.alt}`}
              className="haptic group relative overflow-hidden aspect-[4/5] bg-[var(--color-royal)] rounded-[var(--radius-card)] sm:rounded-[var(--radius-tile)] text-left"
            >
              <ResponsiveImg
                base={g.image}
                alt={g.alt}
                sizes="(max-width: 1024px) 50vw, 33vw"
                widths={g.widths || [640, 1024]}
                className="w-full h-full object-cover graded group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-deep)]/60 via-[var(--color-royal-deep)]/15 to-transparent" />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-none bg-[var(--color-copper)]/0 group-hover:bg-[var(--color-copper)] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </button>
          );
        })}
      </div>

      <GalleryLightbox items={items} index={openIndex} onIndex={setOpenIndex} />

      <div className="mt-10 text-center">
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
