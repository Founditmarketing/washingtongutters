/*
 * Generate optimized variants of the WA Certified Veteran-Owned seal.
 *
 * The source PNG is ~75 KB at full size. We emit:
 *   - public/wa-veteran-certified-240.webp   (badge-bar use, ~10 KB)
 *   - public/wa-veteran-certified-480.webp   (about-page hero use)
 *   - public/wa-veteran-certified-240.png    (fallback for older Safari)
 *   - public/wa-veteran-certified-480.png
 *
 * Source: public/wa-veteran-certified.png (copied from owner-provided asset).
 *
 * Run: `node scripts/gen-veteran-seal.mjs`
 */

import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");
const SRC        = resolve(ROOT, "public", "wa-veteran-certified.png");

if (!existsSync(SRC)) {
  console.error(`[seal] source missing: ${SRC}`);
  process.exit(1);
}

const WIDTHS = [240, 480];

for (const w of WIDTHS) {
  const webp = resolve(ROOT, "public", `wa-veteran-certified-${w}.webp`);
  const png  = resolve(ROOT, "public", `wa-veteran-certified-${w}.png`);

  await sharp(SRC).resize({ width: w }).webp({ quality: 88 }).toFile(webp);
  await sharp(SRC).resize({ width: w }).png({ compressionLevel: 9 }).toFile(png);

  console.log(`[seal] wrote ${w}px → ${webp} + ${png}`);
}
