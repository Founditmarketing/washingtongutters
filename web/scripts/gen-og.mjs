/*
 * Generates web/public/og-default.jpg (1200x630, Open Graph spec).
 *
 * Crops the existing hero image to a 1200x630 frame, overlays a dark scrim
 * so the wordmark reads clean, and writes a single JPG. Re-runnable any
 * time the hero changes — it always reads from the highest-res hero file
 * we ship.
 *
 * Run: `npm run gen:og`
 */

import { writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");

const SOURCE = resolve(ROOT, "public", "hero-real-1024.jpg");
const OUT    = resolve(ROOT, "public", "og-default.jpg");

const WIDTH  = 1200;
const HEIGHT = 630;

if (!existsSync(SOURCE)) {
  console.error(`[og] source not found: ${SOURCE}`);
  process.exit(1);
}

const scrim = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
     <defs>
       <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
         <stop offset="0%" stop-color="#0D1638" stop-opacity="0.05"/>
         <stop offset="55%" stop-color="#0D1638" stop-opacity="0.55"/>
         <stop offset="100%" stop-color="#0D1638" stop-opacity="0.85"/>
       </linearGradient>
     </defs>
     <rect width="100%" height="100%" fill="url(#g)"/>
     <g font-family="Georgia, 'Times New Roman', serif" fill="#F6F3ED">
       <text x="60" y="475" font-size="58" font-weight="700" letter-spacing="-2">Seamless Gutters 4 Less</text>
       <text x="60" y="525" font-size="26" fill="#C68A40" font-family="-apple-system, system-ui, sans-serif" font-weight="600" letter-spacing="6">VETERAN OWNED  ·  PACIFIC NORTHWEST  ·  SINCE 2005</text>
       <text x="60" y="580" font-size="26" fill="#F6F3ED" opacity="0.85" font-family="-apple-system, system-ui, sans-serif">5.0 ★ across 479 Google reviews  ·  6 counties served</text>
     </g>
   </svg>`
);

await sharp(SOURCE)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
  .composite([{ input: scrim, blend: "over" }])
  .jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile(OUT);

console.log(`[og] wrote ${WIDTH}x${HEIGHT} → ${OUT}`);
