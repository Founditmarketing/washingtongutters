import { Phone, ArrowRight, Plus } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../lib/schema";
import { FAQ_CATEGORIES, ALL_FAQS } from "../data/faqs";
import { SITE } from "../data/site";

/*
 * FAQ page — built for AI search / answer-engine visibility (GEO / AEO).
 *
 * The three levers that matter here:
 *   1. FAQPage JSON-LD (faqSchema) so Google/Bing/LLM search can extract
 *      Q&A pairs verbatim. Driven from the same data/faqs.js the page
 *      renders, so the structured data always matches the visible text.
 *   2. Semantic, always-in-DOM markup. Each Q&A is a native
 *      <details>/<summary>, so the full answer text is present in the HTML
 *      even when collapsed — crawlable without JS, and keyboard accessible.
 *   3. Self-contained, entity-rich answers (see data/faqs.js) that a model
 *      can quote without the surrounding page for context.
 */
export default function FaqPage() {
  document.title = `Gutter FAQ — Answers for Puget Sound Homeowners — ${SITE.name}`;

  const schemas = [
    localBusinessSchema(),
    faqSchema(ALL_FAQS),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq/" },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="faq" />

      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Gutter questions, straight answers."
        accent="straight answers."
        lead={`Everything Puget Sound homeowners ask us about seamless gutters — pricing, timelines, materials, service area, and more. Still stuck? Call ${SITE.phone.display} and talk to a real person.`}
        image="service-cleaning-real"
        imageAlt="Washington Gutters 4 Less crew member inspecting a freshly installed gutter run in the Pacific Northwest."
        chips={[
          `${ALL_FAQS.length} answers`,
          "Veteran-Owned",
          `${SITE.rating.value.toFixed(1)} ★ Google`,
          `${SITE.countiesServed.length} counties`,
        ]}
      />

      {/* ── CATEGORY JUMP NAV ── */}
      <section className="border-b border-[var(--color-line)] bg-[var(--color-paper)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] py-5">
          <nav className="flex flex-wrap gap-2.5" aria-label="FAQ categories">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="haptic inline-flex items-center px-3.5 py-1.5 rounded-full border border-[var(--color-line)] text-[13px] font-medium text-[var(--color-royal)] hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── FAQ SECTIONS ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <div
                key={cat.id}
                id={cat.id}
                className="lg:col-span-12 scroll-mt-28"
              >
                <div className="mb-6">
                  <Eyebrow>{`0${ci + 1}`.slice(-2)} · {cat.title}</Eyebrow>
                  <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-3">
                    {cat.title}
                  </h2>
                </div>

                <div className="divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                  {cat.items.map((item, i) => (
                    <details
                      key={i}
                      className="group py-2"
                    >
                      <summary className="haptic flex items-start justify-between gap-4 cursor-pointer list-none py-4">
                        <h3 className="font-display text-lg lg:text-xl text-[var(--color-royal)] leading-snug">
                          {item.q}
                        </h3>
                        <Plus className="w-5 h-5 mt-1 shrink-0 text-[var(--color-copper)] transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <div className="pb-5 pr-8 space-y-3 text-[var(--color-slate)]/75 leading-relaxed">
                        {item.a.map((para, pi) => (
                          <p key={pi}>{para}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-[var(--color-copper)] py-16">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white mb-4">
            Still have a question?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Talk to a real, local, veteran-owned crew — not a call center. Free written estimates and same-week scheduling across the Puget Sound.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-2 bg-white text-[var(--color-royal)] px-7 py-3.5 font-semibold rounded-full transition-all hover:shadow-xl"
            >
              <Phone className="w-4 h-4" /> {SITE.phone.display}
            </a>
            <a
              href="/contact/#estimate"
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
