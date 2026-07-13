import { useState } from "react";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import GalleryLightbox from "../components/GalleryLightbox";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import { GALLERY } from "../data/gallery";
import { SITE } from "../data/site";

const ALL_FILTERS = [
  { id: "all",          label: "All projects" },
  { id: "installation", label: "Installation" },
  { id: "replacement",  label: "Replacement" },
  { id: "guards",       label: "Gutter guards" },
  { id: "soffit",       label: "Soffit · Fascia" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  document.title = `Project Gallery — ${SITE.name}`;

  const filtered =
    filter === "all" ? GALLERY : GALLERY.filter((g) => g.service === filter);

  /* Hide filter pills that would produce a 0-result view. The "All"
   * tab always shows; service tabs only show if any current project
   * actually matches that service. This keeps the row from advertising
   * a "Gutter guards" category that returns nothing. */
  const FILTERS = ALL_FILTERS.filter(
    (f) => f.id === "all" || GALLERY.some((g) => g.service === f.id),
  );

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery/" },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="gallery" />
      <PageHero
        eyebrow="Recent Work"
        title="From the field."
        accent="field."
        lead="Real projects across the Puget Sound. Every photo is a Washington Gutters 4 Less job — never stock, never AI, never relabeled."
      />

      {/* Sticky filter row — horizontal-scroll on mobile so labels never wrap.
          Sticks under the fixed header so the user can swipe through cities,
          tap a category, see the grid update, all without losing their place. */}
      <div
        className="sticky z-30 bg-[var(--color-bone)]/95 backdrop-blur-md border-b border-[var(--color-line)]"
        style={{ top: "calc(var(--safe-top) + 56px)" }}
      >
        <div
          className="overflow-x-auto no-scrollbar -mx-[var(--space-page-x)] px-[var(--space-page-x)]"
          role="tablist"
          aria-label="Project filter"
        >
          <div className="flex gap-2 py-3 min-w-max">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`haptic whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold transition-all border ${
                    active
                      ? "bg-[var(--color-royal)] text-white border-[var(--color-royal)]"
                      : "bg-[var(--color-paper)] text-[var(--color-royal)]/80 border-[var(--color-line-strong)] hover:border-[var(--color-royal)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid — clickable tiles that open the lightbox at the right index
       *  in the currently-filtered subset. */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {filtered.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open project photo: ${item.alt}`}
              className="mob-card-tilt group relative overflow-hidden rounded-[var(--radius-tile)] bg-[var(--color-royal)] aspect-[4/5] text-left"
            >
              <ResponsiveImg
                base={item.image}
                alt={item.alt}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                widths={item.widths || [640, 1024]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-deep)]/60 via-[var(--color-royal-deep)]/15 to-transparent" />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--color-slate)]/60 py-16">
            No projects in this category yet. Check back soon.
          </p>
        )}
      </section>

      <GalleryLightbox items={filtered} index={openIndex} onIndex={setOpenIndex} />
    </>
  );
}
