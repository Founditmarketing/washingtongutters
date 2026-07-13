/*
 * Generate optimized variants of every trade-stamp / trust-badge image we
 * ship with the site.
 *
 * Two output paths per source PNG:
 *   - public/<name>-240.webp + .png  (badge-bar use, ~10 KB)
 *   - public/<name>-480.webp + .png  (about-page / hero featured block)
 *
 * Sources live next to the generated variants in public/. Add new stamps
 * by dropping a source PNG into public/ and adding an entry to STAMPS
 * below.
 *
 * Some stamps arrive with a solid white background instead of real
 * transparency (e.g. a generic Google-5-star seal copied from a stock site).
 * Setting `removeWhiteBg: true` runs a 4-corner flood fill that converts
 * the *outer* white region to alpha=0 while preserving any white that's
 * "inside" the badge (e.g. star highlights). This is much cleaner than a
 * naive global "white → transparent" threshold, which would punch holes
 * through the artwork.
 *
 * Run: `node scripts/gen-trade-stamps.mjs`
 */

import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");
const PUBLIC     = resolve(ROOT, "public");

const STAMPS = [
  {
    /* WA Certified Veteran-Owned Business seal — state-issued. Source
     * came with a solid white background plate that made the badge
     * look mismatched next to the Google + Satisfaction stamps (both
     * have transparent rims). Flood-fill from corners removes the
     * outer white without punching through the white-inside-the-flag
     * stripes or the CERTIFIED banner. */
    name: "wa-veteran-certified",
    source: "wa-veteran-certified.png",
    removeWhiteBg: true,
    /* Trim near-transparent pixels off the edges so all stamps share a
     * consistent visual padding when rendered at the same size. */
    trim: true,
  },
  {
    /* Generic "Veteran Owned Business" red oval w/ US flag. Source
     * provided with native PNG transparency. */
    name: "veteran-owned-business",
    source: "veteran-owned-business.png",
    removeWhiteBg: false,
    trim: true,
  },
  {
    /* Google 5-Star Rating gold seal. Source arrived with solid white
     * background — corner flood fill removes it without eating the gold
     * laurel / banner artwork. */
    name: "google-5-star-rating",
    source: "google-5-star-rating.png",
    removeWhiteBg: true,
    trim: true,
  },
  {
    /* 100% Satisfaction Guarantee — owner-supplied raster source paired
     * with the matching Google 5-Star badge (both came from a single
     * source PNG, split via web/scripts internals). Already transparent. */
    name: "satisfaction-guarantee",
    source: "satisfaction-guarantee.png",
    removeWhiteBg: false,
    trim: true,
  },
];

const WIDTHS = [240, 480];

/* RGB distance from pure white. Anything within `tolerance` (per channel)
 * counts as background when seeded from the corners. */
const WHITE_TOLERANCE = 16;

/**
 * Replace the contiguous outer "white" region of an RGBA pixel buffer with
 * alpha=0. Seeds from all four corners and floods inward using BFS, only
 * traversing pixels that are within WHITE_TOLERANCE of pure white. Pixels
 * inside the artwork that happen to be white but are not connected to a
 * corner are left untouched.
 */
function floodFillWhiteToAlpha(data, width, height) {
  const total = width * height;
  const visited = new Uint8Array(total);
  /* Queue is a flat array of pixel indices (y*width + x). Using a stack
   * with `pop()` is much faster than `shift()` for BFS-like fills in
   * Node — order doesn't matter for connected-component traversal. */
  const stack = [];

  function isWhite(idx4) {
    return (
      data[idx4] >= 255 - WHITE_TOLERANCE &&
      data[idx4 + 1] >= 255 - WHITE_TOLERANCE &&
      data[idx4 + 2] >= 255 - WHITE_TOLERANCE
    );
  }

  function maybeSeed(x, y) {
    const i = y * width + x;
    if (visited[i]) return;
    if (!isWhite(i * 4)) return;
    visited[i] = 1;
    stack.push(i);
  }

  /* Seed: all four edges. Necessary because a white background isn't
   * always reachable from a single corner — concave artwork can split
   * the outer region into disjoint regions touching different edges. */
  for (let x = 0; x < width; x++) {
    maybeSeed(x, 0);
    maybeSeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    maybeSeed(0, y);
    maybeSeed(width - 1, y);
  }

  while (stack.length > 0) {
    const i = stack.pop();
    data[i * 4 + 3] = 0;
    const x = i % width;
    const y = (i - x) / width;
    /* 4-connected neighbours. 8-connected leaks through 1px anti-
     * aliased seams more aggressively, which produces nicer edges. We
     * stay with 4-connected and rely on the antialiased rim pixels
     * being partially transparent after a soft erosion pass below. */
    if (x > 0)          maybeSeed(x - 1, y);
    if (x < width - 1)  maybeSeed(x + 1, y);
    if (y > 0)          maybeSeed(x,     y - 1);
    if (y < height - 1) maybeSeed(x,     y + 1);
  }

  /* Soften the boundary: any opaque pixel that touches a now-transparent
   * neighbour and is itself near-white gets a graded alpha based on how
   * white it is. This kills the white halo that otherwise rings the
   * artwork after a hard threshold. */
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const i4 = i * 4;
      if (data[i4 + 3] === 0) continue;
      let touchesBg = false;
      if (x > 0          && data[((y) * width + (x - 1)) * 4 + 3] === 0) touchesBg = true;
      if (!touchesBg && x < width - 1  && data[((y) * width + (x + 1)) * 4 + 3] === 0) touchesBg = true;
      if (!touchesBg && y > 0          && data[((y - 1) * width + x) * 4 + 3] === 0) touchesBg = true;
      if (!touchesBg && y < height - 1 && data[((y + 1) * width + x) * 4 + 3] === 0) touchesBg = true;
      if (!touchesBg) continue;
      /* Lightness 0–255 (avg of channels). Pixels closer to white get
       * lower alpha (more transparent), which gradients the rim. */
      const lightness = (data[i4] + data[i4 + 1] + data[i4 + 2]) / 3;
      if (lightness > 220) {
        const t = (lightness - 220) / (255 - 220);   // 0–1
        data[i4 + 3] = Math.round(data[i4 + 3] * (1 - t));
      }
    }
  }
}

async function processStamp({ name, source, removeWhiteBg, trim }) {
  const srcPath = resolve(PUBLIC, source);
  if (!existsSync(srcPath)) {
    console.error(`[stamps] source missing for ${name}: ${srcPath}`);
    return;
  }

  /* Build a base PNG buffer with the requested processing applied. We
   * resize from this base for each output width so antialiased downsampling
   * does the heavy lifting. */
  let pipeline = sharp(srcPath).ensureAlpha();

  if (removeWhiteBg) {
    const { data, info } = await pipeline
      .raw()
      .toBuffer({ resolveWithObject: true });
    floodFillWhiteToAlpha(data, info.width, info.height);
    pipeline = sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    });
  }

  if (trim) {
    /* threshold=10 → trim only fully-or-almost transparent edge pixels. */
    pipeline = pipeline.trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 });
  }

  const base = await pipeline.png().toBuffer();

  for (const w of WIDTHS) {
    const webp = resolve(PUBLIC, `${name}-${w}.webp`);
    const png  = resolve(PUBLIC, `${name}-${w}.png`);
    await sharp(base).resize({ width: w, withoutEnlargement: false }).webp({ quality: 88 }).toFile(webp);
    await sharp(base).resize({ width: w, withoutEnlargement: false }).png({ compressionLevel: 9 }).toFile(png);
    console.log(`[stamps] ${name} ${w}px → ${webp}, ${png}`);
  }
}

for (const stamp of STAMPS) {
  await processStamp(stamp);
}
