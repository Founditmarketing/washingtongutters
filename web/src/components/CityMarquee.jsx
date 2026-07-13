import { Fragment } from "react";
import { MapPin } from "lucide-react";
import { SITE } from "../data/site";

/*
 * Service-area trust banner. Scrolls the counties we serve in one continuous,
 * seamless loop.
 *
 * Seamless loop: the track is TWO identical halves and the CSS animates it
 * 0 -> -50%, so the moment it would "reset" it's already showing the second
 * (identical) half — no visible jump. Each half repeats the county list twice
 * so it overflows even wide screens and never leaves a gap before the wrap.
 *
 * Equal spacing: the location and the "·" bullet are separate flex children,
 * so the track's `gap` sits between every element uniformly.
 */
export default function CityMarquee() {
  const areas = SITE.countiesServed;
  const half = [...areas, ...areas]; // wide enough to overflow the viewport
  const loop = [...half, ...half]; // two identical halves -> seamless -50% loop

  return (
    <section
      className="bg-[var(--color-royal-deep)] py-6 border-y border-[var(--color-copper)]/20 overflow-hidden"
      aria-label="Service areas"
    >
      <div className="flex items-center gap-3 px-[var(--space-page-x)] mb-2 max-w-[var(--max-content)] mx-auto">
        <MapPin className="w-3.5 h-3.5 text-[var(--color-copper)]" />
        <span className="text-[var(--color-copper)] text-[10px] tracking-[0.3em] uppercase font-semibold">
          Serving
        </span>
      </div>

      <div className="marquee-track" aria-hidden>
        {loop.map((name, i) => (
          <Fragment key={i}>
            <span className="font-display-bold uppercase text-white/55 text-[40px] md:text-4xl tracking-tight whitespace-nowrap">
              {name}
            </span>
            <span className="font-display-bold text-[var(--color-copper)] text-[40px] md:text-4xl leading-none">
              ·
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
