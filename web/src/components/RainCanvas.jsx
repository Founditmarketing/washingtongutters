import { useEffect, useRef } from "react";

/*
 * RainCanvas — real animated rainfall drawn on a <canvas> sized to its parent.
 *
 * Each drop is a comet-style streak: a gradient from a transparent tail to a
 * bright head, aligned to its fall direction. Drops live across three depth
 * layers (far/slow/faint → near/fast/bright) for parallax, lean with a light
 * wind, and blend additively so overlaps glow on a dark background.
 *
 * Behaviour:
 *  - Density scales with the parent's area (capped for performance).
 *  - Runs only while the section is on screen (IntersectionObserver) and
 *    resizes with it (ResizeObserver).
 *  - Respects prefers-reduced-motion: renders nothing.
 *  - Cleans up rAF + observers on unmount.
 */
export default function RainCanvas({ className = "", color = "214, 228, 255" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const WIND = 0.22; // horizontal drift per unit of fall
    const mag = Math.hypot(WIND, 1);
    const ux = WIND / mag;
    const uy = 1 / mag;

    let W = 0;
    let H = 0;
    let drops = [];
    let raf = 0;
    let last = 0;

    const rand = (a, b) => a + Math.random() * (b - a);

    /* Randomise one drop. `spread` seeds it anywhere on screen (first fill);
     * otherwise it starts just above the top to fall in. */
    const seed = (d, spread) => {
      const t = Math.random();
      const tier = t > 0.82 ? 2 : t > 0.5 ? 1 : 0; // near / mid / far
      d.speed = tier === 2 ? rand(10, 15) : tier === 1 ? rand(7, 10) : rand(4.5, 7);
      d.len = tier === 2 ? rand(30, 52) : tier === 1 ? rand(19, 31) : rand(11, 19);
      d.alpha = tier === 2 ? rand(0.45, 0.7) : tier === 1 ? rand(0.28, 0.44) : rand(0.14, 0.24);
      d.width = tier === 2 ? 1.6 : tier === 1 ? 1.15 : 0.85;
      d.x = rand(-W * 0.15, W * 1.05);
      d.y = spread ? rand(-H, H) : rand(-40, -10);
      return d;
    };

    const resize = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(380, Math.max(110, (W * H) / 3300)));
      drops = Array.from({ length: count }, () => seed({}, true));
    };

    const frame = (t) => {
      const dt = last ? Math.min((t - last) / 16.67, 3) : 1;
      last = t;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (const d of drops) {
        const tailX = d.x - ux * d.len;
        const tailY = d.y - uy * d.len;
        const g = ctx.createLinearGradient(tailX, tailY, d.x, d.y);
        g.addColorStop(0, `rgba(${color}, 0)`);
        g.addColorStop(1, `rgba(${color}, ${d.alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();

        d.x += WIND * d.speed * dt;
        d.y += d.speed * dt;
        if (d.y - d.len > H) seed(d, false);
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !W || !H) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    /* Only animate while the CTA is actually in view. */
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(parent);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [color]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
