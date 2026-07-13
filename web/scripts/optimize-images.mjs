/*
 * Generates AVIF + WebP + JPG fallback at multiple widths for any image
 * placed at /public/_src-images/. Outputs to /public/.
 *
 * Run: `npm run optimize:images`
 */

import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, "public", "_src-images");
const OUT = join(ROOT, "public");
const WIDTHS = [640, 1024, 1600, 2400];

async function ensureSrc() {
  if (!existsSync(SRC)) {
    await mkdir(SRC, { recursive: true });
    console.log(`Created ${SRC} — drop master images here.`);
  }
}

async function processOne(file) {
  const inPath = join(SRC, file);
  const { name } = parse(file);
  const buf = await sharp(inPath).rotate().toBuffer();
  const meta = await sharp(buf).metadata();

  const widths = WIDTHS.filter((w) => w <= meta.width).concat(
    WIDTHS.every((w) => w > meta.width) ? [meta.width] : [],
  );

  for (const w of widths) {
    const base = `${name}-${w}`;
    await sharp(buf).resize({ width: w }).avif({ quality: 55, effort: 6 }).toFile(join(OUT, `${base}.avif`));
    await sharp(buf).resize({ width: w }).webp({ quality: 78 }).toFile(join(OUT, `${base}.webp`));
    await sharp(buf).resize({ width: w }).jpeg({ quality: 78, mozjpeg: true }).toFile(join(OUT, `${base}.jpg`));
    const sizeKb = (await stat(join(OUT, `${base}.avif`))).size / 1024;
    console.log(`  ${base}.{avif,webp,jpg} (${Math.round(sizeKb)} KB avif)`);
  }
}

async function main() {
  await ensureSrc();
  const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  if (!files.length) {
    console.log("No source images to process.");
    return;
  }
  for (const f of files) {
    console.log(`\n→ ${f}`);
    await processOne(f);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
