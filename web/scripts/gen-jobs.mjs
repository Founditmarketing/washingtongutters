/*
 * Generate responsive web variants for every jobsite photo in
 * /public/jobs/_raw/. For each source PNG (or JPG), this emits AVIF +
 * WebP + JPG at 640w, 1024w, and 1920w into /public/jobs/, matching the
 * URL pattern that components/atoms/ResponsiveImg.jsx already expects.
 *
 * Why three widths:
 *   - 640w   serves the 2-col mobile gallery + any thumbnail use.
 *   - 1024w  serves the 3-col desktop gallery + most hero placements.
 *   - 1920w  serves the lightbox + any future full-bleed hero treatment.
 *
 * Why three formats:
 *   - AVIF wins on size (often 40-60% smaller than JPG at the same
 *     perceptual quality) and is supported by all evergreen browsers.
 *   - WebP is the fallback for older Safari / Edge builds that don't
 *     support AVIF yet.
 *   - JPG is the universal floor — every browser, every email client,
 *     every social-share preview tool can render it.
 *
 * The ResponsiveImg atom assembles a <picture> with three <source>
 * elements pointing at avif → webp → img(jpg), so the user-agent picks
 * the best format it can decode automatically.
 *
 * Run: `node scripts/gen-jobs.mjs`     (or `npm run gen:jobs`)
 *
 * Idempotent: re-running just overwrites existing outputs. Safe to run
 * after dropping a new source PNG into /public/jobs/_raw/.
 */

import { readdirSync, mkdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");
const RAW_DIR    = resolve(ROOT, "public", "jobs", "_raw");
const OUT_DIR    = resolve(ROOT, "public", "jobs");

if (!existsSync(RAW_DIR)) {
  console.error(`[jobs] raw directory not found: ${RAW_DIR}`);
  process.exit(1);
}
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const WIDTHS = [640, 1024, 1920];

const sources = readdirSync(RAW_DIR)
  .filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
  .filter((f) => statSync(resolve(RAW_DIR, f)).isFile());

if (sources.length === 0) {
  console.warn(`[jobs] no PNG/JPG sources found in ${RAW_DIR}`);
  process.exit(0);
}

console.log(`[jobs] processing ${sources.length} source(s)`);

let totalBytesIn  = 0;
let totalBytesOut = 0;

for (const src of sources) {
  const srcPath = resolve(RAW_DIR, src);
  const base    = basename(src, extname(src));
  totalBytesIn += statSync(srcPath).size;

  /* Auto-orient applies EXIF rotation so phone-shot portraits aren't
   * rendered 90° wrong. Then resize once per target width using a Lanczos
   * downsample (sharp's default and the gold standard for photo
   * downscaling). */
  const pipeline = sharp(srcPath).rotate();
  const meta     = await pipeline.metadata();

  for (const w of WIDTHS) {
    /* Don't upscale: if the source is narrower than the target width,
     * cap at the source width and let the JPG/webp/avif encoders work
     * with what they have. */
    const targetW = Math.min(w, meta.width || w);

    /* withoutEnlargement: false is safe here because we already clamped
     * targetW above; sharp's behavior with explicit width matches the
     * source's intrinsic dimensions for smaller sources. */
    const resized = sharp(srcPath).rotate().resize({ width: targetW });

    const outJpg  = resolve(OUT_DIR, `${base}-${w}.jpg`);
    const outWebp = resolve(OUT_DIR, `${base}-${w}.webp`);
    const outAvif = resolve(OUT_DIR, `${base}-${w}.avif`);

    await resized.clone().jpeg({  quality: 82, mozjpeg: true })           .toFile(outJpg);
    await resized.clone().webp({  quality: 80, effort: 5 })               .toFile(outWebp);
    await resized.clone().avif({  quality: 50, effort: 5, chromaSubsampling: "4:2:0" }).toFile(outAvif);

    totalBytesOut += statSync(outJpg).size + statSync(outWebp).size + statSync(outAvif).size;
  }
  console.log(`[jobs] ${base} → ${WIDTHS.length * 3} variants`);
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
console.log(
  `[jobs] done. raw in: ${mb(totalBytesIn)}, web out: ${mb(totalBytesOut)} ` +
  `(${WIDTHS.length * 3 * sources.length} files).`,
);
