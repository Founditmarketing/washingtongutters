import { TreePine, Droplets, Wind, CloudRain } from "lucide-react";
import Eyebrow from "./atoms/Eyebrow";
import ResponsiveImg from "./atoms/ResponsiveImg";

const POINTS = [
  {
    icon: TreePine,
    title: "Pine needles & moss",
    body: "Clog faster and rot faster than any debris in dry climates.",
  },
  {
    icon: Droplets,
    title: "Sustained downpour volume",
    body: 'Most PNW homes need 6" gutters to keep up — not the standard 5".',
  },
  {
    icon: Wind,
    title: "Soft cedar fascia",
    body: "Wet PNW air destroys backing wood. We replace it before re-hanging.",
  },
];

export default function WhyPnw() {
  return (
    <section className="bg-[var(--color-bone)] py-[var(--space-section-lg)] relative overflow-hidden">
      <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative" data-reveal>
          <div className="aspect-[4/5] relative overflow-hidden rounded-[var(--radius-tile)]">
            <ResponsiveImg
              base="whypnw-real"
              alt="Dark-bronze seamless gutters and downspout on a Pacific Northwest craftsman home with brick facade and clean fascia detail."
              sizes="(max-width: 1024px) 90vw, 540px"
              widths={[640, 1024, 1600]}
              className="w-full h-full object-cover graded-warm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-deep)]/55 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-[var(--color-copper)] text-white p-8 max-w-xs hidden md:block rounded-[var(--radius-card)]">
            <CloudRain className="w-8 h-8 mb-4" />
            <div className="font-display text-3xl font-light mb-2 leading-tight">35–60"</div>
            <div className="text-sm text-white/90 leading-relaxed">
              annual rainfall across our service area — among the wettest in the lower 48.
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <div className="mb-4">
            <Eyebrow>Why It Matters</Eyebrow>
          </div>
          {/* Pattern break: lockup of three trade nouns, no amber-word split,
              no period-period treatment. Different from every other section. */}
          <h2 className="font-display-black uppercase text-display-md text-[var(--color-royal)] mb-3 leading-[0.92] tracking-[-0.015em]">
            Rain. Moss. Cedar.
          </h2>
          <p className="font-editorial text-[var(--color-slate)]/65 text-[20px] lg:text-[22px] leading-[1.35] mb-6 max-w-md">
            Three reasons standard gutter installs fail in the Pacific Northwest.
          </p>
          <p className="text-[var(--color-slate)]/75 leading-relaxed mb-8 text-[17px]">
            Between October and April, our region absorbs sustained, days-long downpours under
            massive Doug fir and cedar canopies. The result: clog rates and gutter volumes most
            national contractors aren't sized for.
          </p>
          <div className="space-y-5">
            {POINTS.map(({ icon: Ic, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-none bg-[var(--color-royal)] text-[var(--color-copper)] flex items-center justify-center flex-shrink-0">
                  <Ic className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-lg text-[var(--color-royal)] mb-1">{title}</div>
                  <p className="text-[var(--color-slate)]/70 text-[15px] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
