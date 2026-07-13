import { Phone, MapPin, Shield, Award, Users } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import Stamp from "../components/atoms/Stamp";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import WAVeteranSeal from "../components/atoms/WAVeteranSeal";
import TradeStampRow from "../components/TradeStampRow";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import { SITE } from "../data/site";

export default function AboutPage() {
  document.title = `About — ${SITE.name}`;

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="about" />
      <PageHero
        eyebrow="About Us"
        title="Local, family-owned, and all-in on gutters."
        accent="all-in on gutters."
        lead="We're not weekend warriors, and we're not a national chain with call centers and commission-hungry reps. We've built our reputation doing one thing better than anyone else — gutters, done right the first time — for homeowners all across Western Washington."
        image="process-real"
        imageAlt="Washington Gutters 4 Less installer working on a fresh gutter run."
        chips={[
          `Veteran- & Family-Owned`,
          `Local & Independent`,
          `${SITE.countiesServed.length} counties`,
          `${SITE.customersServed}+ customers`,
          `${SITE.rating.value.toFixed(1)} ★ Rated`,
        ]}
      />

      <p className="text-center text-[var(--color-copper)] font-semibold tracking-wide text-sm md:text-base py-8 px-[var(--space-page-x)]">
        {SITE.tagline}
      </p>

      {/* ── OUR STORY ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[var(--radius-tile)] overflow-hidden">
              {/* Real owner-supplied photo. The yellow Craftsman with the
               * American flag is the most "established home, established
               * company" shot in the set, which is exactly the tone of the
               * "Our Story" block beside it. */}
              <ResponsiveImg
                base="photos/two-story-gray-maple"
                alt="Established two-story home with fresh white seamless gutters installed by Washington Gutters 4 Less."
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              Not a Franchise.<br />
              <span className="text-[var(--color-copper)]">Not a Chain.</span>
            </h2>
            <div className="space-y-4 text-[var(--color-slate)]/75 leading-relaxed">
              <p>
                Washington Gutters 4 Less is a local, family-owned business — not a national outfit with call centers and commission-hungry reps. We've spent years perfecting our craft so you don't have to worry about water damage, rot, or foundation problems. From installation and repair to gutter guards and soffit &amp; fascia work, we do it all, and we do it right the first time.
              </p>
              <p>
                We don't cut corners. We don't upsell services you don't need. And we don't leave until the job is done right. Every system is installed by our own trained crew — never a subcontractor — because the people who quote your job should be the same people who stand behind it.
              </p>
              <p>
                When your gutters fail, it's not just water that spills — it's your peace of mind. Protecting your home and your investment with honest, precise work, season after Washington season, is the whole reason we exist.
              </p>
            </div>

            {/* WA Certified Veteran-Owned seal — state-issued credential.
                Lives here, in the "Our Story" block, because that's where
                visitors are evaluating who we are. */}
            <div className="mt-8 flex items-center gap-5 p-5 rounded-[var(--radius-card)] bg-[var(--color-paper)] border border-[var(--color-line)]">
              <WAVeteranSeal size="md" className="flex-shrink-0" />
              <div className="leading-tight">
                <div className="text-[var(--color-copper)] text-[10px] tracking-[0.28em] uppercase font-bold mb-1.5">
                  Washington Certified
                </div>
                <div className="font-display-bold text-[var(--color-royal)] text-lg sm:text-xl uppercase tracking-tight">
                  Veteran-Owned Business
                </div>
                <div className="text-[var(--color-slate)]/65 text-[13px] mt-1">
                  Proudly veteran-owned. We bring the same discipline, respect,
                  and follow-through to your home that we brought to the uniform.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow color="white">Our Values</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-12">
            What We <span className="text-[var(--color-copper)]">Stand For.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Honest Pricing", text: "Every quote is in writing. Fair, upfront pricing from the start — no hidden fees, no pressure tactics, no games." },
              { icon: Award, title: "Real Craftsmanship", text: "We don't subcontract. Every gutter is formed on-site and installed by our own trained crew, built to last through Washington's toughest seasons." },
              { icon: Users, title: "Local & Loyal", text: "Veteran- and family-owned, and part of this community. We show up on time, respect your home, and treat every job like it's our own." },
            ].map((v, i) => (
              <div key={i} className="bg-white/[0.06] border border-white/10 rounded-[var(--radius-card)] p-7">
                <v.icon className="w-7 h-7 text-[var(--color-copper)] mb-5" />
                <h3 className="font-display text-xl text-white mb-3">{v.title}</h3>
                <p className="text-white/65 leading-relaxed text-[15px]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS LOCKUP ──
          Real third-party / state-issued seals. Sits between the Values
          band and the stats grid so the visual order reads:
            who we believe  →  who's verified us  →  what we've shipped. */}
      <section className="pt-section-mobile lg:pt-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="text-center mb-10">
          <Eyebrow>Recognized &amp; Certified</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-3">
            Credentials, not <span className="text-[var(--color-copper)]">claims.</span>
          </h2>
        </div>
        <TradeStampRow
          stamps={[
            { name: "veteran-owned-business", label: "Veteran-Owned Business" },
            { name: "satisfaction-guarantee", label: "100% Satisfaction" },
          ]}
          size="lg"
          caption="Real, verifiable trust signals — a Washington Certified Veteran-Owned designation and our 100% satisfaction guarantee. Every job is backed by our own crew."
        />
      </section>

      {/* ── TYPOGRAPHIC STAMPS + STATS ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center">
          {[
            { value: `${SITE.customersServed}+`, label: "Trusted customers" },
            { value: `${SITE.rating.value.toFixed(1)}★`, label: "Rated in Washington" },
            { value: SITE.countiesServed.length, label: "Counties served" },
            { value: "0", label: "Subcontractors" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display-black text-[44px] sm:text-5xl lg:text-6xl text-[var(--color-royal)] leading-[0.85]">
                {s.value}
              </div>
              <div className="text-[var(--color-slate)]/60 text-[11px] sm:text-sm uppercase tracking-[0.15em] font-semibold mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Stamp primary="Veteran" secondary="Owned & Operated" divider rotate={-3} />
          <Stamp primary="Licensed" secondary="WA Bonded · Insured" divider variant="outline" rotate={2} />
          <Stamp primary="5★" secondary="Rated in WA" divider variant="solid" rotate={-2} />
        </div>
      </section>

      {/* ── SUPPLIERS ── */}
      <section className="py-[var(--space-section-sm)] bg-[var(--color-paper)] border-t border-[var(--color-line)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow>Our Partners</Eyebrow>
          <h2 className="font-display text-xl text-[var(--color-royal)] mt-3 mb-6">Gutter & Material Suppliers</h2>
          <div className="flex flex-wrap gap-6 text-[var(--color-slate)]/70 text-sm">
            <a href="https://lansingbp.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-copper)]">Lansing Building Products</a>
            <a href="https://senox.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-copper)]">Senox</a>
            <a href="https://www.spectraguttersystems.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-copper)]">Spectra Gutter Systems</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              Get in <span className="text-[var(--color-copper)]">Touch.</span>
            </h2>
            <div className="space-y-4">
              <a href={SITE.phone.tel} className="flex items-center gap-3 text-lg font-display text-[var(--color-royal)] hover:text-[var(--color-copper)]">
                <Phone className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.phone.display}
              </a>
              <div className="flex items-center gap-3 text-[var(--color-slate)]/80">
                <MapPin className="w-5 h-5 text-[var(--color-copper)]" /> Serving {SITE.address.regionFull} — five counties across the Puget Sound
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-[var(--color-royal)] mb-4">Counties We Serve</h3>
            <div className="grid grid-cols-2 gap-3">
              {SITE.countiesServed.map((county) => (
                <div key={county} className="flex items-center gap-2 text-[var(--color-slate)]/75">
                  <MapPin className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
                  <span className="text-sm">{county}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
