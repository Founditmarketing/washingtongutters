#!/usr/bin/env node
/*
 * gen-batch — generate many images sequentially from a JSON spec, then run
 * the optimize-images pass once at the end. Calls Nano Banana Pro by default.
 *
 * Usage:
 *   node scripts/gen-batch.mjs <path/to/spec.json>
 *
 * Spec format:
 *   [
 *     { "name": "service-installation", "prompt": "...", "aspect": "16:9", "model": "pro" },
 *     { "name": "gallery-edmonds-craftsman", "prompt": "...", "aspect": "3:4" }
 *   ]
 *
 * model: "pro" | "fast" | "v1"  (default "pro")
 * aspect: "1:1" | "16:9" | "9:16" | "4:3" | "3:4"  (default "16:9")
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { GoogleGenAI } from "@google/genai";

const ROOT = resolve(process.cwd());
const SRC_DIR = join(ROOT, "public", "_src-images");

const MODEL_ALIASES = {
  pro: "gemini-3-pro-image-preview",
  fast: "gemini-3.1-flash-image-preview",
  nb2: "gemini-3.1-flash-image-preview",
  v1: "gemini-2.5-flash-image",
};

function loadEnvLocal() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

async function generateOne(ai, item) {
  const model = MODEL_ALIASES[item.model || "pro"] || item.model;
  const aspect = item.aspect || "16:9";
  const out = join(SRC_DIR, `${item.name}.jpg`);

  process.stdout.write(`  [${item.name}] (${model}, ${aspect})... `);
  const start = Date.now();
  try {
    const response = await ai.models.generateContent({
      model,
      contents: item.prompt,
      config: { imageConfig: { aspectRatio: aspect } },
    });
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);

    const parts = response?.candidates?.[0]?.content?.parts || [];
    let saved = false;
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buf = Buffer.from(part.inlineData.data, "base64");
        writeFileSync(out, buf);
        const kb = (buf.length / 1024).toFixed(0);
        console.log(`OK ${kb} KB in ${elapsed}s`);
        saved = true;
        break;
      }
    }
    if (!saved) {
      console.log(`NO IMAGE in response`);
      console.log("    Response keys:", Object.keys(response || {}));
      return false;
    }
    return true;
  } catch (e) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`FAIL after ${elapsed}s — ${e?.message || e}`);
    return false;
  }
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("Usage: node scripts/gen-batch.mjs <spec.json>");
    process.exit(1);
  }
  const spec = JSON.parse(readFileSync(specPath, "utf8"));

  loadEnvLocal();
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY not set. Add it to web/.env.local");
    process.exit(1);
  }

  if (!existsSync(SRC_DIR)) mkdirSync(SRC_DIR, { recursive: true });

  console.log(`\nBatch: ${spec.length} images\n`);
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const results = { ok: 0, fail: 0 };
  for (const item of spec) {
    const ok = await generateOne(ai, item);
    if (ok) results.ok++;
    else results.fail++;
  }

  console.log(`\nGenerated ${results.ok}/${spec.length}. ${results.fail} failed.\n`);

  if (results.ok > 0) {
    console.log("Optimizing AVIF/WebP/JPG variants...\n");
    const r = spawnSync(
      process.execPath,
      [join(ROOT, "scripts", "optimize-images.mjs")],
      { stdio: "inherit", cwd: ROOT },
    );
    process.exit(r.status ?? 0);
  }
  process.exit(results.fail > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(`\nFatal: ${e?.message || e}`);
  process.exit(1);
});
