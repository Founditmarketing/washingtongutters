#!/usr/bin/env node
/*
 * fetch-site-photos — download real job photos from the live
 * seamlessgutters4less.com WordPress media library by parsing the
 * AIOSEO image sitemap.
 *
 * Saves to: public/_src-images/from-site/<city>-<n>.jpg
 *
 * Usage:
 *   node scripts/fetch-site-photos.mjs                    # default cities (Tier 1 + gallery)
 *   node scripts/fetch-site-photos.mjs --count 4          # n photos per city
 *   node scripts/fetch-site-photos.mjs --city Bellevue    # one specific city
 *   node scripts/fetch-site-photos.mjs --legacy           # stateline-gutters legacy series only
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const SITEMAP_URL = "https://www.seamlessgutters4less.com/page-sitemap.xml";
const OUT_DIR = resolve(process.cwd(), "public", "_src-images", "from-site");

const DEFAULT_CITIES = [
  "Edmonds",
  "Bellevue",
  "Mill-Creek",
  "Snohomish",
  "Kirkland",
  "Lynnwood",
  "Bothell",
  "Mukilteo",
];

function parseArgs() {
  const args = { count: 2, cities: DEFAULT_CITIES, legacy: false };
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    const next = process.argv[i + 1];
    if (a === "--count" || a === "-n") { args.count = +next; i++; }
    else if (a === "--city" || a === "-c") { args.cities = [next]; i++; }
    else if (a === "--legacy") { args.legacy = true; }
  }
  return args;
}

async function getAllImageUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap ${res.status}`);
  const text = await res.text();
  const matches = [...text.matchAll(/<image:loc>\s*<!\[CDATA\[([^\]]+)\]\]>/g)];
  return [...new Set(matches.map((m) => m[1].trim()))];
}

function pickFor(allUrls, pattern, n) {
  // pattern like 'Bellevue-WA-gutters' — match URLs containing pattern,
  // skip resized variants (ones ending in -NNNxNNN.jpg), take the top n
  // by numerical suffix order.
  const re = new RegExp(`/${pattern}-(\\d+)(?:-\\d+x\\d+)?\\.(?:jpg|jpeg|png|webp)$`, "i");
  const candidates = allUrls
    .map((url) => {
      const m = url.match(re);
      if (!m) return null;
      // Prefer the original (no -NNNxNNN dimension suffix) over resized variants
      const isOriginal = !/-\d+x\d+\./.test(url);
      return { url, n: parseInt(m[1], 10), isOriginal };
    })
    .filter(Boolean)
    .sort((a, b) => (b.isOriginal - a.isOriginal) || a.n - b.n);

  // Dedup by photo number — only take one variant of photo #1, #2, etc.
  const seen = new Set();
  const picked = [];
  for (const c of candidates) {
    if (seen.has(c.n)) continue;
    seen.add(c.n);
    picked.push(c);
    if (picked.length >= n) break;
  }
  return picked;
}

async function downloadOne(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
  return buf.length;
}

async function main() {
  const args = parseArgs();
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log("Fetching sitemap...");
  const allUrls = await getAllImageUrls();
  console.log(`  ${allUrls.length} total images in sitemap.\n`);

  const slots = args.legacy
    ? [{ city: "stateline", pattern: "stateline-gutters-wa", count: 8 }]
    : args.cities.map((c) => ({
        city: c.toLowerCase(),
        pattern: `${c}-WA-gutters`,
        count: args.count,
      }));

  let saved = 0;
  let failed = 0;
  for (const slot of slots) {
    const picks = pickFor(allUrls, slot.pattern, slot.count);
    if (!picks.length) {
      console.log(`  [${slot.city}] no photos matched.`);
      continue;
    }
    console.log(`  [${slot.city}] ${picks.length} photo(s):`);
    for (let i = 0; i < picks.length; i++) {
      const out = join(OUT_DIR, `${slot.city}-${i + 1}.jpg`);
      try {
        const bytes = await downloadOne(picks[i].url, out);
        const kb = (bytes / 1024).toFixed(0);
        console.log(`    -> ${slot.city}-${i + 1}.jpg (${kb} KB)`);
        saved++;
      } catch (e) {
        console.log(`    !! ${slot.city}-${i + 1}: ${e.message}`);
        failed++;
      }
    }
  }
  console.log(`\nDone. Saved ${saved} photos. ${failed} failed.`);
  console.log(`Location: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(`\nFatal: ${e?.message || e}`);
  process.exit(1);
});
