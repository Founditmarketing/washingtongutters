import { Fragment } from "react";
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
      className="bg-[var(--color-royal-ink)] py-2.5 border-y border-white/5 overflow-hidden"
      aria-label="Service areas"
    >
      <div className="marquee-track" aria-hidden>
        {loop.map((name, i) => (
          <Fragment key={i}>
            <span className="font-display uppercase text-white/55 text-[13px] md:text-[15px] tracking-[0.12em] whitespace-nowrap">
              {name}
            </span>
            <span className="text-[var(--color-copper)]/60 text-[13px] md:text-[15px] leading-none">
              ·
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
