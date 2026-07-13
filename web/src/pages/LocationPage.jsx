import { useParams, Navigate, Link } from "react-router-dom";
import { Phone, ArrowRight, MapPin, CheckCircle, Star, ShieldCheck } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../lib/schema";
import { getLocation } from "../data/locations";
import { SERVICES } from "../data/services";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../data/site";

/*
 * County service-area landing page. Data-driven by the :slug param off the
 * LOCATIONS list (data/locations.js). Every county shares this template but
 * renders its own original, locally-specific copy.
 */
export default function LocationPage() {
  const { slug } = useParams();
  const loc = getLocation(slug);

  if (!loc) return <Navigate to="/locations/" replace />;

  document.title = loc.metaTitle || `${loc.county} Seamless Gutters — ${SITE.name}`;

  /* Prefer reviews from cities inside this county; backfill with the rest so
   * we always show three. */
  const inCounty = REVIEWS.filter((r) => loc.cities.includes(r.city));
  const localReviews = [
    ...inCounty,
    ...REVIEWS.filter((r) => !inCounty.includes(r)),
  ].slice(0, 3);

  const stats = [
    { value: SITE.customersServed + "+", label: "Customers served" },
    { value: SITE.rating.value.toFixed(1) + "★", label: "Rated in WA" },
    { value: SITE.countiesServed.length, label: "Counties served" },
    { value: "0", label: "Subcontractors" },
  ];

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations/" },
      { name: loc.county, path: `/locations/${loc.slug}/` },
    ]),
    faqSchema(loc.faqs),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id={`location-${loc.slug}`} />

      <PageHero
        eyebrow="Service Area"
        title={loc.h1}
        accent={loc.accent}
        lead={loc.heroLead}
        image={loc.heroImage}
        imageAlt={`Seamless gutters installed by Washington Gutters 4 Less in ${loc.county}, Washington.`}
        chips={loc.chips}
      />

      {/* ── CALL / ESTIMATE STRIP ── */}
      <section className="bg-[var(--color-royal)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/90 font-display-bold uppercase tracking-tight text-lg text-center sm:text-left">
            Free same-week estimates across {loc.county}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-5 py-3 rounded-full font-semibold text-sm shadow-lg shadow-[var(--color-copper)]/25"
            >
              <Phone className="w-4 h-4" /> {SITE.phone.display}
            </a>
            <a
              href="/contact/#estimate"
              className="haptic inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-3 rounded-full font-semibold text-sm"
            >
              Free estimate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRO + STATS ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Eyebrow>{loc.county}</Eyebrow>
            <div className="mt-4 space-y-4 text-[var(--color-slate)]/80 leading-relaxed text-[16px] lg:text-[17px]">
              {loc.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-5 text-center"
                >
                  <div className="font-display-black text-4xl lg:text-5xl text-[var(--color-royal)] leading-none">
                    {s.value}
                  </div>
                  <div className="text-[var(--color-slate)]/60 text-[11px] uppercase tracking-[0.15em] font-semibold mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow color="white">What We Do</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-10">
            Gutter services in <span className="text-[var(--color-copper)]">{loc.county}.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}/`}
                  className="haptic group bg-white/[0.06] border border-white/10 rounded-[var(--radius-card)] p-6 hover:bg-white/[0.1] transition-colors"
                >
                  <Icon className="w-6 h-6 text-[var(--color-copper)] mb-4" />
                  <h3 className="font-display text-lg text-white mb-2 flex items-center gap-1.5">
                    {s.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{s.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CITIES SERVED ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>Cities We Serve</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-8">
          Across <span className="text-[var(--color-copper)]">{loc.county}.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {loc.cities.map((city) => (
            <div
              key={city}
              className="flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card-sm)] px-4 py-3"
            >
              <MapPin className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
              <span className="text-sm font-medium text-[var(--color-royal)]">{city}, WA</span>
            </div>
          ))}
        </div>
        <p className="text-[var(--color-slate)]/60 text-sm mt-6">
          Don't see your town? We cover all of {loc.county} — call{" "}
          <a href={SITE.phone.tel} className="text-[var(--color-copper)] font-semibold hover:underline">
            {SITE.phone.display}
          </a>{" "}
          to confirm your neighborhood.
        </p>
      </section>

      {/* ── WHY US ── */}
      <section className="py-[var(--space-section-md)] bg-[var(--color-bone)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow>Why Homeowners Choose Us</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10 max-w-3xl">
            {loc.why.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {loc.why.points.map((pt, i) => (
              <div
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-7"
              >
                <ShieldCheck className="w-7 h-7 text-[var(--color-copper)] mb-5" />
                <h3 className="font-display text-xl text-[var(--color-royal)] mb-3">{pt.title}</h3>
                <p className="text-[var(--color-slate)]/70 leading-relaxed text-[15px]">{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL REVIEWS ── */}
      {localReviews.length > 0 && (
        <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow>What Neighbors Say</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
            Trusted around <span className="text-[var(--color-copper)]">the Sound.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {localReviews.map((r) => (
              <div
                key={r.name + r.city}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6"
              >
                <div className="flex gap-0.5 mb-3" aria-hidden>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[var(--color-copper)] text-[var(--color-copper)]" />
                  ))}
                </div>
                <p className="text-[var(--color-slate)]/85 leading-relaxed text-[14.5px] mb-5">
                  "{r.text}"
                </p>
                <div className="border-t border-[var(--color-line)] pt-3">
                  <div className="font-display-bold uppercase tracking-tight text-[13.5px] text-[var(--color-royal)]">
                    {r.name}
                  </div>
                  <div className="text-[var(--color-copper)] text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5">
                    {r.city}, WA
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── LOCAL FAQ ── */}
      <section className="py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
        <div className="max-w-[var(--max-prose)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow color="white">{loc.county} FAQ</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-8">
            Good <span className="text-[var(--color-copper)]">questions.</span>
          </h2>
          <div className="divide-y divide-white/10">
            {loc.faqs.map((f, i) => (
              <div key={i} className="py-5">
                <h3 className="font-display text-lg text-white mb-2 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--color-copper)] shrink-0 mt-0.5" />
                  {f.q}
                </h3>
                <p className="text-white/70 leading-relaxed text-[15px] pl-7">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-[var(--space-section-lg)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
        <h2 className="font-display-black uppercase text-display-md text-[var(--color-royal)] leading-[0.95]">
          {loc.ctaHeading}
        </h2>
        <p className="text-[var(--color-slate)]/70 mt-5 max-w-xl mx-auto text-[16px] lg:text-lg leading-relaxed">
          {loc.ctaText}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-7 py-4 rounded-full font-display-bold uppercase tracking-tight shadow-lg shadow-[var(--color-copper)]/25"
          >
            <Phone className="w-4 h-4" /> Call {SITE.phone.display}
          </a>
          <a
            href="/contact/#estimate"
            className="haptic inline-flex items-center justify-center gap-2 border border-[var(--color-line-strong)] hover:border-[var(--color-royal)] text-[var(--color-royal)] px-7 py-4 rounded-full font-display-bold uppercase tracking-tight transition-colors"
          >
            Get a free estimate <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
