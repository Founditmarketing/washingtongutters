import { useEffect, useRef } from "react";

/**
 * HeroRain — canvas-based atmospheric rain for the hero.
 *
 * The previous CSS-line approach reads as "rain pattern", not rain. This is
 * a real particle system tuned for the Washington Gutters 4 Less brand: cold
 * Pacific Northwest weather catching warm city light from a copper bloom.
 *
 * Composition:
 *  - 3 depth layers (far → near). Each layer: own count, speed, length,
 *    line weight, alpha range, and copper-tint amount.
 *  - Wind drift on a slow sine — angle subtly shifts every few seconds so
 *    the rain never feels mechanical.
 *  - Drops are drawn as gradient line segments (transparent at top, bright
 *    at bottom). Near-layer drops carry a copper highlight that reads as
 *    catch-light from the warm bloom on the right.
 *  - When a near-layer drop falls past the bottom edge it spawns a low
 *    elliptical "ripple" implying a wet ground line. Ripples expand and
 *    fade over ~1s. They sit just inside the bottom fog band.
 *  - Distant lightning: every 15–35s, a copper-tinted full-canvas pulse
 *    ramps in over 80ms and fades over ~700ms. Subtle enough to register
 *    as atmosphere, not as a flashbulb.
 *
 * Performance:
 *  - Single canvas, no DOM per drop, all transforms inside the 2d ctx.
 *  - DPR capped at 2 to avoid retina meltdown on iPad Pros.
 *  - Pauses via IntersectionObserver when offscreen.
 *  - Pauses on document.visibilitychange when the tab hides.
 *  - prefers-reduced-motion: paints a single still frame and no rAF loop.
 *  - Density scales with canvas area, so phones get ~30% the drop count
 *    of a desktop hero without explicit breakpoints.
 */

const LAYERS = [
  /*  count: drops per 10,000 px² of canvas
      speed: vertical px/s range
      length: streak length range
      width: stroke px
      alpha: stroke alpha range
      copper: 0–1 amount of copper tint mixed into the warm catch-light
              (only the near layer carries real copper; far drops are cool
               near-white so depth reads correctly) */
  { count: 0.85, speed: [180, 260], length: [10, 16], width: 0.7, alpha: [0.16, 0.30], copper: 0.0 },
  { count: 0.55, speed: [320, 460], length: [18, 28], width: 1.0, alpha: [0.30, 0.50], copper: 0.18 },
  { count: 0.22, speed: [520, 760], length: [30, 50], width: 1.4, alpha: [0.50, 0.80], copper: 0.55 },
];

function rand(a, b) {
  return a + Math.random() * (b - a);
}

export default function HeroRain() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    running: false,
    raf: 0,
    drops: [],
    ripples: [],
    windPhase: Math.random() * Math.PI * 2,
    lightning: { active: false, t: 0, next: 0 },
    last: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const seedDrops = () => {
      const drops = [];
      const area = width * height;
      const isNarrow = width < 720;
      LAYERS.forEach((layer, layerIdx) => {
        /* Density formula: layer.count is "per 10,000 px²"; we floor at 18
           so even tiny canvases keep some depth. On narrow screens we trim
           the count to 65% so phones don't render hundreds of streaks. */
        const baseCount = Math.max(18, Math.floor((area / 10000) * layer.count));
        const count = isNarrow ? Math.floor(baseCount * 0.65) : baseCount;
        for (let i = 0; i < count; i++) {
          drops.push({
            x: Math.random() * (width + 200) - 100,
            y: Math.random() * height,
            vy: rand(layer.speed[0], layer.speed[1]),
            len: rand(layer.length[0], layer.length[1]),
            w: layer.width,
            a: rand(layer.alpha[0], layer.alpha[1]),
            copper: layer.copper,
            layerIdx,
          });
        }
      });
      stateRef.current.drops = drops;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedDrops();
    };

    const tick = (now) => {
      if (!stateRef.current.running) return;
      const dt = Math.min((now - stateRef.current.last) / 1000, 0.05);
      stateRef.current.last = now;
      stateRef.current.windPhase += dt * 0.28;

      /* Wind: baseline drifts rightward (Puget Sound prevailing) and
         oscillates ±60 px/s on a 22-second cycle. Layer index multiplies
         the effect so far drops drift less than near drops, which sells
         parallax depth. */
      const wind = Math.sin(stateRef.current.windPhase) * 60 + 95;

      ctx.clearRect(0, 0, width, height);

      /* Lightning — rare warm pulse. Copper-tinted, clamped at 10% alpha
         peak so the hero copy never washes out. */
      const ln = stateRef.current.lightning;
      ln.next -= dt;
      if (ln.next <= 0 && !ln.active) {
        ln.active = true;
        ln.t = 0;
        ln.next = rand(15, 35);
      }
      if (ln.active) {
        ln.t += dt;
        const intensity = ln.t < 0.08 ? ln.t / 0.08 : Math.max(0, 1 - (ln.t - 0.08) / 0.7);
        if (intensity > 0) {
          ctx.fillStyle = `oklch(0.82 0.09 60 / ${(intensity * 0.09).toFixed(3)})`;
          ctx.fillRect(0, 0, width, height);
        }
        if (ln.t > 0.82) ln.active = false;
      }

      /* Drops. Drawn as a vertical gradient line — bright at the leading
         edge (bottom of the streak) fading to transparent at the trailing
         edge. Near-layer drops mix copper into the brightest tip. */
      ctx.lineCap = "round";
      const drops = stateRef.current.drops;
      const ripples = stateRef.current.ripples;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const layerWind = wind * (0.45 + d.layerIdx * 0.35);
        d.x += layerWind * dt;
        d.y += d.vy * dt;

        if (d.y > height + d.len) {
          /* Near-layer rain spawns a ripple on the ground line. Mid layer
             does so occasionally (10%) for variety; far layer never does
             — its drops are imagined as falling far behind us. */
          const splashRoll = Math.random();
          if (
            (d.layerIdx === 2 && splashRoll < 0.55) ||
            (d.layerIdx === 1 && splashRoll < 0.10)
          ) {
            ripples.push({
              x: d.x,
              y: height - rand(4, 22),
              life: 0,
              maxLife: rand(0.75, 1.25),
            });
          }
          d.y = -d.len - rand(0, 80);
          d.x = Math.random() * (width + 200) - 100;
        }
        if (d.x > width + 100) d.x -= width + 200;
        if (d.x < -200) d.x += width + 200;

        /* Slope of the streak follows wind / fall speed, so wind shifts
           visibly tilt the rain in real time. */
        const slopeX = layerWind / d.vy;
        const x2 = d.x - slopeX * d.len;
        const y2 = d.y - d.len;

        const grad = ctx.createLinearGradient(d.x, d.y, x2, y2);
        if (d.copper > 0.2) {
          /* Near drops: copper tip → warm white core → fade. */
          grad.addColorStop(0, `oklch(0.86 ${(0.08 * d.copper).toFixed(3)} 50 / ${d.a.toFixed(3)})`);
          grad.addColorStop(0.45, `oklch(0.94 0.018 80 / ${(d.a * 0.85).toFixed(3)})`);
          grad.addColorStop(1, "oklch(0.92 0.015 262.5 / 0)");
        } else {
          /* Far/mid drops: cool near-white, no warmth. */
          grad.addColorStop(0, `oklch(0.93 0.02 262.5 / ${d.a.toFixed(3)})`);
          grad.addColorStop(1, "oklch(0.92 0.02 262.5 / 0)");
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.w;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      /* Ripples. Drawn as flat ellipses (perspective: water on a horizontal
         surface viewed obliquely) with a copper-warm rim. Filter in place. */
      let writeIdx = 0;
      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i];
        r.life += dt;
        if (r.life >= r.maxLife) continue;
        const p = r.life / r.maxLife;
        const radius = p * 26;
        const alpha = (1 - p) * 0.32;
        ctx.strokeStyle = `oklch(0.85 0.07 50 / ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, radius, radius * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ripples[writeIdx++] = r;
      }
      ripples.length = writeIdx;

      stateRef.current.raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (stateRef.current.running) return;
      stateRef.current.running = true;
      stateRef.current.last = performance.now();
      if (stateRef.current.lightning.next === 0) {
        stateRef.current.lightning.next = rand(8, 22);
      }
      stateRef.current.raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      stateRef.current.running = false;
      cancelAnimationFrame(stateRef.current.raf);
    };

    const renderStill = () => {
      /* Reduced-motion fallback: one quiet still frame of rain, no animation,
         no ripples, no lightning. Reads as light drizzle texture. */
      ctx.clearRect(0, 0, width, height);
      seedDrops();
      stateRef.current.drops.forEach((d) => {
        const x2 = d.x - 0.22 * d.len;
        const y2 = d.y - d.len;
        ctx.strokeStyle = `oklch(0.92 0.02 262.5 / ${(d.a * 0.55).toFixed(3)})`;
        ctx.lineWidth = d.w;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
    };

    resize();

    if (reduce) {
      renderStill();
      const onResize = () => {
        resize();
        renderStill();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
