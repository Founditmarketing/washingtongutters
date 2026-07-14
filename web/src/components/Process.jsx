import { Calendar, Hammer, Check } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";

/*
 * Process — a vertical timeline. The intro sits in a sticky left column; the
 * three steps run down a connected rail on the right, each with a copper
 * numeral marker, an icon eyebrow, a title, and a short body. The connector
 * line lives inside each marker cell and flex-grows to the row's height, so
 * it always reaches the next marker regardless of how tall the copy runs.
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
  const last = STEPS.length - 1;

  return (
    <section className="bg-[var(--color-royal)] text-white py-section-mobile lg:py-[var(--space-section-lg)] relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-10" />
      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — intro (sticky on desktop) */}
          <div className="lg:col-span-5" data-reveal>
            <div className="lg:sticky lg:top-28">
              <div className="mb-4">
                <Eyebrow>The Process</Eyebrow>
              </div>
              {/* Solid white headline with a copper underline rule under the
                  last word — the section's signature pattern break. */}
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
              <p className="text-white/85 text-[18px] lg:text-[20px] font-medium leading-snug mt-5 max-w-md">
                Three honest steps, one written quote, no pressure.
              </p>
              <p className="text-white/70 leading-relaxed text-[15px] mt-4 max-w-md">
                No sales tactics. No "today only" pricing pressure. Just an honest written estimate
                that's good for a full year, and a crew that respects your home.
              </p>
            </div>
          </div>

          {/* RIGHT — vertical timeline */}
          <div className="lg:col-span-7 lg:col-start-6" data-reveal>
            <ol className="relative">
              {STEPS.map((p, i) => {
                const Ic = p.icon;
                const isLast = i === last;
                return (
                  <li
                    key={p.step}
                    className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4rem_1fr] gap-5 sm:gap-7"
                  >
                    {/* Marker + connector rail */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 shrink-0 bg-[var(--color-copper)] text-white flex items-center justify-center font-display-black text-2xl leading-none">
                        {p.step}
                      </div>
                      {!isLast && <span aria-hidden className="w-px flex-1 bg-white/20 my-2" />}
                    </div>

                    {/* Content */}
                    <div className={isLast ? "pb-1" : "pb-10 lg:pb-14"}>
                      <div className="flex items-center gap-2 text-[var(--color-copper)] text-[11px] tracking-[0.25em] uppercase font-bold mb-2">
                        <Ic className="w-3.5 h-3.5" /> Step {p.step}
                      </div>
                      <h3 className="font-display-bold text-xl lg:text-[26px] leading-tight tracking-tight mb-2">
                        {p.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-[14px] lg:text-[15px]">
                        {p.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
