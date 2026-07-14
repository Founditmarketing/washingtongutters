import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import { LOCATIONS } from "../data/locations";
import { SITE } from "../data/site";

/*
 * Locations index — the hub the "Locations" nav item points at. Lists every
 * county service-area page with a short teaser and its cities.
 */
export default function LocationsPage() {
  document.title = `Service Areas — ${SITE.name}`;

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations/" },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="locations" />

      <PageHero
        eyebrow="Service Areas"
        title="Seamless gutters across Western Washington."
        accent="Western Washington."
        lead={`Veteran-owned, ${SITE.rating.label.toLowerCase()}, and trusted by ${SITE.customersServed}+ homeowners. We cover five counties across the Puget Sound — pick yours to see the cities we serve.`}
        chips={[`${SITE.countiesServed.length} counties`, "Veteran-Owned", `${SITE.customersServed}+ customers`]}
      />

      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}/`}
              className="haptic group relative flex flex-col bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-tile)] p-7 hover:border-[var(--color-copper)]/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-[var(--color-copper)] mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-[10px] tracking-[0.28em] uppercase font-bold">
                  Washington
                </span>
              </div>
              <h2 className="font-display-black text-2xl text-[var(--color-royal)] leading-tight mb-3">
                {loc.county}
              </h2>
              <p className="text-[var(--color-slate)]/70 text-[14.5px] leading-relaxed mb-5">
                {loc.cardTeaser}
              </p>
              <div className="text-[var(--color-slate)]/55 text-[12.5px] mb-6">
                {loc.cities.slice(0, 5).join(" · ")}
                {loc.cities.length > 5 ? " & more" : ""}
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[var(--color-royal)] group-hover:text-[var(--color-copper)] font-semibold text-sm transition-colors">
                View {loc.county}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}

          {/* CTA card */}
          <div className="flex flex-col justify-center bg-[var(--color-royal-deep)] rounded-[var(--radius-tile)] p-7 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-10 pointer-events-none" aria-hidden />
            <div className="relative">
              <h2 className="font-display-black text-2xl text-white leading-tight mb-3">
                Not sure if we<br />reach you?
              </h2>
              <p className="text-white/70 text-[14.5px] leading-relaxed mb-6">
                One call settles it. We'll confirm coverage and book a free same-week estimate.
              </p>
              <a
                href={SITE.phone.tel}
                className="haptic inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-5 py-3 rounded-none font-semibold text-sm shadow-lg shadow-[var(--color-copper)]/25"
              >
                <Phone className="w-4 h-4" /> {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
