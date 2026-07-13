import { useParams, Navigate } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, serviceSchema, breadcrumbSchema } from "../lib/schema";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site";

/*
 * Extended copy per service — sourced from original site content.
 * Each entry matches the slug from services.js.
 */
const SERVICE_CONTENT = {
  "gutter-installation": {
    metaTitle: "Gutter Installation — Washington Gutters 4 Less",
    metaDesc: "Precision gutter installation across Western Washington — done right, done fast, done for less. Free written estimates. Call (253) 399-0300.",
    hero: "Done Right, Done Fast, Done for Less.",
    intro: "Your gutters are your home's first line of defense against Washington rain. We install seamless aluminum gutters with surgical accuracy — custom-formed on-site to fit your roofline exactly, whether you're building new or replacing tired old runs. No franchise crews, no commission-hungry reps: just a local, family-owned team that measures twice, installs once, and cleans up before we leave.",
    benefits: [
      { title: "Formed On-Site, Fit Exactly", text: "Every run is custom-extruded on your driveway to your roofline's exact lengths — no store-bought sections, no seams to leak between the corners." },
      { title: "Built for Washington Seasons", text: "Proper sizing and heavy-gauge materials so your gutters shrug off months of Pacific Northwest rain instead of overflowing or pulling away." },
      { title: "No-Nonsense Pricing", text: "Honest, upfront written quotes with no hidden fees and no upsells you don't need. The price on paper is the price you pay." },
      { title: "Local Crew, Personal Touch", text: "Trained pros — never subcontractors — who show up on time, respect your property, and treat your home like their own." },
    ],
    process: [
      { step: "Free Written Estimate", text: "Call or request online. We walk your roofline, size the system, and hand you a flat written quote that's good for a full year." },
      { step: "Custom Fabrication On-Site", text: "The day of install, we extrude continuous seamless runs to your exact measurements right in your driveway." },
      { step: "Precision Install", text: "Every gutter is hand-fit and secured with hidden hangers, downspouts placed to carry water well clear of your foundation." },
      { step: "Water Test & Cleanup", text: "We flush the system to confirm clean flow, haul away the old gutters, and leave the site spotless." },
    ],
    materials: [
      { name: "Aluminum", desc: "Lightweight, rust-resistant, and cost-effective. Comes in a wide range of colors — the go-to choice for our wet climate." },
      { name: "Copper", desc: "A premium, long-lasting option that develops a natural patina over time. Adds real character to the right home." },
      { name: "Steel", desc: "Heavy-duty strength for homeowners who want the most durable system possible in the harshest exposures." },
    ],
  },
  "gutter-replacement": {
    metaTitle: "Gutter Replacement — Washington Gutters 4 Less",
    metaDesc: "Old gutters failing? We pull, dispose, and replace with seamless aluminum in a single day — cleanup included. Free quotes. (253) 399-0300.",
    hero: "Replacement Without the Runaround.",
    intro: "Sagging, leaking, or just plain worn out? We make replacing your gutters smooth, affordable, and stress-free — pulling the old system, fixing anything soft behind it, and hanging fresh seamless runs, usually in a single day. Flawless results, on time and on budget, from a local crew that does it right the first time.",
    benefits: [
      { title: "Same-Day Pull & Replace", text: "Old gutters out and new seamless runs up in one visit — no waiting around between demo and install." },
      { title: "We Haul It All Away", text: "Old gutters, hangers, and downspouts removed and disposed of. We leave your property cleaner than we found it." },
      { title: "Fascia Checked First", text: "Before we hang anything, we inspect the wood behind the line and repair soft spots so your new gutters mount solid." },
      { title: "Priced Straight", text: "One honest written quote, good for a full year. No surprise upcharges once the crew arrives." },
    ],
    process: [
      { step: "Free Inspection & Quote", text: "We assess your gutters, fascia, and drainage, then put a flat price in writing on the spot." },
      { step: "Remove & Dispose", text: "The old system is carefully detached and hauled away — no damage to your roof or siding." },
      { step: "Repair the Backing", text: "Any rotted fascia is replaced with primed cedar or composite before we install." },
      { step: "Install, Test, Clean Up", text: "Fresh seamless runs hung with hidden hangers, water-tested, and the jobsite left spotless." },
    ],
  },
  "gutter-repair": {
    metaTitle: "Gutter Repair — Washington Gutters 4 Less",
    metaDesc: "Leaks, sags, loose downspouts, and storm damage repaired right — often same-week. Veteran-owned, free written estimates. Call (253) 399-0300.",
    hero: "Fixed Right, Not Replaced Early.",
    intro: "A failing gutter is rarely a whole-system problem. Leaking seams, a sagging run, loose hangers, or a downspout that's pulled off the house can usually be repaired — saving you the cost of a full replacement. We find the real cause, fix it to last, and give you a straight answer on whether a repair is the smart call or whether replacement will cost you less over time.",
    benefits: [
      { title: "Honest Diagnosis", text: "We tell you the truth — whether a targeted repair solves it or a replacement is the better value. No upselling a whole system when a fix will do." },
      { title: "Leaks & Seams Sealed", text: "Old sectional gutters leak at every joint. We reseal, refasten, and re-pitch the problem sections so water reaches the downspouts instead of your fascia." },
      { title: "Sagging & Pull-Away Runs", text: "Overloaded or poorly hung gutters sag and peel off the fascia. We re-secure them with hidden hangers and rebuild the mount point so they hold." },
      { title: "Storm & Downspout Fixes", text: "Wind, ice, and falling limbs are part of life here. We reattach downspouts, straighten bent runs, and swap out damaged sections fast." },
    ],
    process: [
      { step: "Full Inspection", text: "We walk your whole roofline and find every leak, sag, and loose fastener — not just the one spot you called about." },
      { step: "Straight Answer", text: "You get a written quote and an honest recommendation: repair the sections that need it, or replace if that's the better long-term value." },
      { step: "The Repair", text: "We reseal seams, re-secure hangers, correct the pitch for proper flow, and replace any damaged sections or downspouts." },
      { step: "Water Test & Cleanup", text: "We flush the system to confirm it drains clean before we go, and leave your property spotless." },
    ],
  },
  "gutter-guards": {
    metaTitle: "Gutter Guards — Washington Gutters 4 Less",
    metaDesc: "Gutter guards that actually work — keep leaves, pine needles, PNW moss, and pests out for good. Honest options, fair pricing. (253) 399-0300.",
    hero: "Gutter Guards That Actually Work.",
    intro: "Say goodbye to clogged gutters — and to climbing a ladder every fall. Our top-tier guard systems keep leaves, pine needles, PNW moss, and pests out while water flows free. We'll show you honest options and the real trade-offs, then fit the right system to your roofline and your budget — no pressure, no gimmicks.",
    benefits: [
      { title: "Off the Ladder for Good", text: "No more risky seasonal cleanouts. Quality guards keep your gutters clear year-round." },
      { title: "Stops Overflow Damage", text: "Clogged gutters overflow onto fascia, siding, and foundations. Guards keep water moving where it should." },
      { title: "Sized for PNW Debris", text: "Fine micro-mesh options built to shed the fir needles, cones, and moss that defeat cheaper screens." },
      { title: "Honest Options, No Upsell", text: "We walk you through every guard type and recommend the right fit for your home — not the priciest one." },
    ],
    process: [
      { step: "Roofline Assessment", text: "We evaluate your existing gutters, roof pitch, and the tree cover around your home." },
      { step: "Right-Fit Recommendation", text: "We match a guard system — micro-mesh, screen, or reverse-curve — to your home and budget, and explain why." },
      { step: "Precision Install", text: "Guards are fit and secured to your gutters without piercing your roof or voiding your shingle warranty." },
      { step: "Flow Test", text: "We flush the system to confirm water passes freely while debris is rejected." },
    ],
  },
  "soffit-and-fascia-repair": {
    metaTitle: "Soffit or Fascia — Washington Gutters 4 Less",
    metaDesc: "Rotting soffit or fascia? We repair and replace with durable, primed materials, then re-hang your gutters clean. Free quotes. (253) 399-0300.",
    hero: "The Foundation Behind Every Gutter.",
    intro: "Rotting or damaged soffit and fascia are more than an eyesore — they're a structural risk, and they're where hidden water damage and pests get in. We repair and replace them with durable, primed cedar or composite that restores your home's integrity, then re-hang your gutters clean on solid wood.",
    benefits: [
      { title: "Stop Hidden Rot", text: "Damaged fascia behind the gutter line stays invisible until it's expensive. We catch it and fix it before it spreads." },
      { title: "Keep Pests Out", text: "Rotted soffit and fascia are open doors for wasps, birds, and rodents. Solid material seals them out." },
      { title: "Solid Mounting", text: "Your gutters are only as strong as what they hang on. Sound fascia means runs that don't sag or pull away." },
      { title: "Proper Ventilation", text: "Correctly vented soffit helps regulate attic moisture and prevents problems through our long wet season." },
    ],
    process: [
      { step: "Inspection", text: "We probe the fascia and soffit for rot, water damage, and anything that's compromised the structure." },
      { step: "Gutter Removal", text: "Existing gutters are carefully detached to expose the full board for replacement." },
      { step: "Wood Replacement", text: "Rotted sections are cut out and rebuilt with durable primed cedar or composite." },
      { step: "Gutter Re-hang", text: "Your gutters go back up clean on the fresh material with new hidden hangers." },
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/" replace />;

  const content = SERVICE_CONTENT[slug] || {};
  const Icon = service.icon;

  /* Update document title */
  document.title = content.metaTitle || `${service.title} — ${SITE.name}`;

  const schemas = [
    localBusinessSchema(),
    serviceSchema(service),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: `/services/${service.slug}/` },
      { name: service.title, path: `/services/${service.slug}/` },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id={`service-${service.slug}`} />
      {/* ── HERO BANNER ── photo-led, with the Service icon as a chip */}
      <section
        className="relative bg-[var(--color-royal-deep)] overflow-hidden"
        style={{ paddingTop: "calc(var(--safe-top) + 6.25rem)" }}
      >
        <div className="absolute inset-0">
          <ResponsiveImg
            base={service.image}
            alt={service.photoAlt}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-royal-deep)]/40 via-[var(--color-royal-deep)]/80 to-[var(--color-royal-deep)]" />
          <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none" />
        </div>
        <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] pb-12 lg:pb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex w-9 h-9 rounded-[10px] bg-[var(--color-copper)] text-white items-center justify-center">
              <Icon className="w-4 h-4" />
            </span>
            <Eyebrow color="white">{service.title}</Eyebrow>
          </div>
          <h1 className="font-display-black uppercase text-display-lg text-white max-w-3xl leading-[0.92] tracking-[-0.015em]">
            {content.hero || service.title}
          </h1>
          <p className="text-white/75 text-[16px] lg:text-lg leading-relaxed mt-5 max-w-2xl">
            {content.intro || service.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-6 py-3.5 font-display-bold uppercase tracking-tight rounded-full transition-all shadow-[0_18px_36px_-10px_oklch(0.62_0.10_42_/_0.55)]"
            >
              <Phone className="w-4 h-4" /> Call {SITE.phone.display}
            </a>
            <a
              href="/contact/#estimate"
              className="haptic inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white px-6 py-3.5 font-display-bold uppercase tracking-tight rounded-full transition-all"
            >
              Free written estimate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRO + PHOTO ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[var(--radius-tile)] overflow-hidden">
              <ResponsiveImg
                base={service.image}
                alt={service.photoAlt}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Why Choose Us</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              We Do One Thing<br />
              <span className="text-[var(--color-copper)]">Better Than Anyone.</span>
            </h2>
            <p className="text-[var(--color-slate)]/75 leading-relaxed mb-6">
              {content.intro || service.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-sm font-medium rounded-full">
                Local &amp; Family-Owned
              </span>
              <span className="px-3 py-1.5 bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-sm font-medium rounded-full">
                WA Licensed &amp; Insured
              </span>
              <span className="px-3 py-1.5 bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-sm font-medium rounded-full">
                {SITE.rating.value}★ Rated · {SITE.customersServed}+ Customers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      {content.benefits && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow color="white">Benefits</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-12">
              Why <span className="text-[var(--color-copper)]">{service.title}?</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.benefits.map((b, i) => (
                <div
                  key={i}
                  className="bg-white/[0.06] border border-white/10 rounded-[var(--radius-card)] p-6 hover:bg-white/[0.1] transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-[var(--color-copper)] mb-4" />
                  <h3 className="font-display text-lg text-white mb-2">{b.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OUR PROCESS ── */}
      {content.process && (
        <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow>Our Process</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-12">
            How it <span className="text-[var(--color-copper)]">works.</span>
          </h2>
          <div className="grid gap-8 lg:gap-6">
            {content.process.map((p, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-start pb-8 border-b border-[var(--color-line)] last:border-0"
              >
                <div className="lg:col-span-1">
                  <span className="font-display-black text-5xl text-[var(--color-royal)]/15">
                    0{i + 1}
                  </span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="font-display text-xl text-[var(--color-royal)]">{p.step}</h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-[var(--color-slate)]/75 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MATERIALS (installation only) ── */}
      {content.materials && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-paper)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow>Materials</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
              Premium <span className="text-[var(--color-copper)]">Options.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.materials.map((m, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-bone)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6"
                >
                  <h3 className="font-display text-xl text-[var(--color-royal)] mb-3">{m.name}</h3>
                  <p className="text-[var(--color-slate)]/70 text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICE AREAS ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>Service Areas</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-8">
          Serving <span className="text-[var(--color-copper)]">{SITE.countiesServed.length} Counties.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SITE.countiesServed.map((county) => (
            <div
              key={county}
              className="flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card-sm)] px-4 py-3"
            >
              <MapPin className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
              <span className="text-sm font-medium text-[var(--color-royal)]">{county}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-[var(--color-copper)] py-16">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Free estimates, fair pricing, and same-week scheduling. Call now or request your quote online.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-2 bg-white text-[var(--color-royal)] px-7 py-3.5 font-semibold rounded-full transition-all hover:shadow-xl"
            >
              <Phone className="w-4 h-4" /> {SITE.phone.display}
            </a>
            <a
              href="/#estimator"
              className="haptic inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white px-7 py-3.5 font-semibold rounded-full transition-all"
            >
              Free Estimate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
