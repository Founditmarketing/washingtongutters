import { Calendar, Hammer, Check } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";

/*
 * Heritage trade direction: editorial split layout. Left half holds a
 * documentary photo of the gutter machine in action; right half holds
 * three sculptural step blocks with massive condensed numerals — like
 * a piece of a service manual.
 */

const STEPS = [
  {
    step: "01",
    title: "Free Written Estimate",
    body:
      "Submit online or call. Our estimator visits within 5 days, walks the property, and gives you a flat written quote — valid for 12 months.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Built On Your Driveway",
    body:
      "The morning of install, our truck-mounted gutter machine extrudes continuous runs to your exact lengths. No seams between corners.",
    icon: Hammer,
  },
  {
    step: "03",
    title: "Installed In A Day",
    body:
      "Most homes finish in 4–6 hours. Old gutters hauled away, downspouts tied to existing drains, every leaf and screw cleaned up.",
    icon: Check,
  },
];

export default function Process() {
  return (
    <section className="bg-[var(--color-royal)] text-white py-section-mobile lg:py-[var(--space-section-lg)] relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-10" />
      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-12 mb-10 lg:mb-14">
          <div className="lg:col-span-7" data-reveal>
            <div className="mb-4">
              <Eyebrow>The Process</Eyebrow>
            </div>
            {/* Pattern break: solid white headline with a copper underline rule
                under the last word, instead of the repeated amber-split-word
                treatment used by every other section. */}
            <h2 className="font-display-black text-display-lg leading-[0.92] tracking-[-0.015em]">
              Estimate to install
              <br />
              in{" "}
              <span className="relative inline-block">
                one week.
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[var(--color-copper)]"
                />
              </span>
            </h2>
            <p className="hidden lg:block text-white/85 text-[20px] font-medium leading-snug mt-5 max-w-md">
              Three honest steps, one written quote, no pressure.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end" data-reveal>
            <p className="text-white/75 leading-relaxed text-[15.5px]">
              No sales tactics. No "today only" pricing pressure. Just an honest written estimate
              that's good for a full year, and a crew that respects your home.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Documentary image of the gutter machine in action */}
          <div className="lg:col-span-6" data-reveal>
            <div className="relative aspect-[4/3] lg:aspect-[5/6] rounded-[var(--radius-tile)] overflow-hidden">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/process-real-640.avif 640w, /process-real-1024.avif 1024w"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <source
                  type="image/webp"
                  srcSet="/process-real-640.webp 640w, /process-real-1024.webp 1024w"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <img
                  src="/process-real-1024.jpg"
                  srcSet="/process-real-640.jpg 640w, /process-real-1024.jpg 1024w"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  alt="Washington Gutters 4 Less installer on a ladder working on a fresh white seamless gutter run along a residential roofline."
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={1228}
                  className="w-full h-full object-cover graded-warm"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-ink)]/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <div className="text-[var(--color-copper)] text-[10px] tracking-[0.3em] uppercase font-bold">
                    Field Note · Lakewood, WA
                  </div>
                  <div className="font-display-bold text-lg leading-tight mt-1">
                    160 ft of 6" K-style, formed on-site
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sculptural step stack — tighter mobile rhythm: 5/4 instead of 8/6.
              Each numeral overlaps the eye's path so the column reads as one
              composition, not three stacked cards. */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5 lg:gap-0">
            {STEPS.map((p, i) => {
              const Ic = p.icon;
              const isLast = i === STEPS.length - 1;
              return (
                <div
                  key={p.step}
                  data-reveal
                  className={`grid grid-cols-[auto_1fr] gap-4 lg:gap-7 ${
                    !isLast ? "pb-5 lg:pb-5 border-b border-white/10" : ""
                  }`}
                >
                  {/* Massive sculptural numeral, slightly tightened mobile size */}
                  <div className="font-display-black text-[76px] lg:text-[120px] leading-[0.8] text-white/95 tracking-tighter">
                    {p.step}
                  </div>
                  <div className="pt-1.5 lg:pt-2">
                    <div className="flex items-center gap-2 text-[var(--color-copper)] text-[11px] tracking-[0.25em] uppercase font-bold mb-1.5">
                      <Ic className="w-3.5 h-3.5" />
                      Step {p.step}
                    </div>
                    <h3 className="font-display-bold text-xl lg:text-[28px] leading-tight tracking-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-[14px] lg:text-[15px] max-w-md">
                      {p.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
