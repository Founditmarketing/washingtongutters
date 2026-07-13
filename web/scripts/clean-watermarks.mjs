#!/usr/bin/env node
/*
 * clean-watermarks — feed each image in public/_src-images/from-site/ to
 * Nano Banana Pro along with an in-painting prompt that removes the
 * watermarks (badges, logo, URL strip) while preserving the underlying
 * photograph. Cleaned versions are written to from-site/cleaned/.
 *
 * Usage:
 *   node scripts/clean-watermarks.mjs                 # process all
 *   node scripts/clean-watermarks.mjs edmonds-1.jpg   # one file
 *
 * Dedups by exact file size first so we don't pay to clean the same
 * underlying photo twice.
 */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  statSync,
} from "node:fs";
import { join, resolve, parse } from "node:path";
import { GoogleGenAI } from "@google/genai";

const ROOT = resolve(process.cwd());
const IN_DIR = join(ROOT, "public", "_src-images", "from-site");
const OUT_DIR = join(IN_DIR, "cleaned");

const MODEL = process.env.CLEAN_MODEL || "gemini-3.1-flash-image-preview";

const CLEAN_PROMPT = `Edit this photograph: in-paint over the gold star/satisfaction badges, the centered green house logo, and the bottom URL strip with naturally extended versions of whatever was behind them (siding, gutter, roof, sky, vegetation). Output the same photograph with all those overlays removed and only the clean underlying installation visible. Same aspect ratio, same lighting, same colors.`;

function loadEnvLocal() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

async function cleanOne(ai, srcPath, outPath) {
  const buf = readFileSync(srcPath);
  const base64 = buf.toString("base64");
  const start = Date.now();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      { text: CLEAN_PROMPT },
      { inlineData: { mimeType: "image/jpeg", data: base64 } },
    ],
    config: { responseModalities: ["IMAGE"] },
  });
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const parts = response?.candidates?.[0]?.content?.parts || [];
  let text = "";
  for (const part of parts) {
    if (part.inlineData?.data) {
      writeFileSync(outPath, Buffer.from(part.inlineData.data, "base64"));
      const kb = (statSync(outPath).size / 1024).toFixed(0);
      return { ok: true, kb, elapsed };
    }
    if (part.text) text += part.text;
  }
  const finishReason = response?.candidates?.[0]?.finishReason || "(none)";
  return { ok: false, elapsed, text: text.slice(0, 300), finishReason };
}

async function main() {
  loadEnvLocal();
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not set in web/.env.local");
    process.exit(1);
  }

  if (!existsSync(IN_DIR)) {
    console.error(`No photos at ${IN_DIR}. Run fetch-site-photos first.`);
    process.exit(1);
  }
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const arg = process.argv[2];
  let files = readdirSync(IN_DIR).filter((f) => /\.jpe?g$/i.test(f));
  if (arg) files = files.filter((f) => f === arg);

  // Dedup by exact byte size (their photos are file-by-file identical
  // across many city renames; size is a perfect proxy here)
  const sizeToName = new Map();
  for (const f of files) {
    const sz = statSync(join(IN_DIR, f)).size;
    if (!sizeToName.has(sz)) sizeToName.set(sz, f);
  }
  const unique = [...sizeToName.values()].sort();
  console.log(`\n${files.length} files, ${unique.length} unique by size.\n`);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let ok = 0, fail = 0;
  for (const f of unique) {
    const out = join(OUT_DIR, f);
    if (existsSync(out)) {
      console.log(`  [skip] ${f} (already cleaned)`);
      continue;
    }
    process.stdout.write(`  [clean] ${f}... `);
    try {
      const r = await cleanOne(ai, join(IN_DIR, f), out);
      if (r.ok) {
        console.log(`OK ${r.kb} KB in ${r.elapsed}s`);
        ok++;
      } else {
        console.log(`NO IMAGE (${r.elapsed}s) — finish: ${r.finishReason}`);
        if (r.text) console.log(`    > ${r.text}`);
        fail++;
      }
    } catch (e) {
      console.log(`FAIL: ${e?.message || e}`);
      fail++;
    }
  }

  console.log(`\nCleaned ${ok}, failed ${fail}.\nOutput: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(`\nFatal: ${e?.message || e}`);
  process.exit(1);
});
