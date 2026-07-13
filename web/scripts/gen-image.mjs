#!/usr/bin/env node
/*
 * gen-image — generate a marketing image with Google Gemini image models
 * (Nano Banana Pro / Nano Banana 2). Saves to public/_src-images/ and
 * automatically runs the AVIF/WebP/JPG optimizer.
 *
 * Usage:
 *   npm run gen:image -- --prompt "<long descriptive prompt>" --name hero
 *   npm run gen:image -- -p "..." -n why-pnw --model pro --aspect 16:9
 *   npm run gen:image -- -p "..." -n quick --model fast
 *
 * Models:
 *   pro   = gemini-3-pro-image-preview   (Nano Banana Pro, studio quality, default)
 *   fast  = gemini-3.1-flash-image-preview (Nano Banana 2, fast, high-volume)
 *   v1    = gemini-2.5-flash-image       (original Nano Banana, legacy)
 *
 * Requires GEMINI_API_KEY in env or in web/.env.local
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
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

function parseArgs(argv) {
  const args = { model: "pro", aspect: "16:9" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--prompt" || a === "-p") { args.prompt = next; i++; }
    else if (a === "--name" || a === "-n") { args.name = next; i++; }
    else if (a === "--model" || a === "-m") { args.model = next; i++; }
    else if (a === "--aspect" || a === "-a") { args.aspect = next; i++; }
    else if (a === "--no-optimize") { args.skipOptimize = true; }
    else if (a === "--help" || a === "-h") { args.help = true; }
  }
  return args;
}

function printHelp() {
  console.log(`
gen-image — generate marketing images with Google Gemini image models

Usage:
  npm run gen:image -- --prompt "<text>" --name <slug>

Required:
  -p, --prompt   Long descriptive prompt (use quotes)
  -n, --name     Output base filename (no extension); becomes <name>.jpg

Optional:
  -m, --model    pro | fast | v1   (default: pro)
                 pro  = Nano Banana Pro     (studio quality)
                 fast = Nano Banana 2       (high-volume)
                 v1   = original Nano Banana (legacy)
  -a, --aspect   1:1 | 16:9 | 9:16 | 4:3 | 3:4   (default: 16:9)
      --no-optimize   Skip the AVIF/WebP/JPG variants step
  -h, --help     This message

Env:
  GEMINI_API_KEY   Required. Set in web/.env.local
`);
}

function loadEnvLocal() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) return printHelp();

  if (!args.prompt || !args.name) {
    console.error("Error: --prompt and --name are required.\n");
    printHelp();
    process.exit(1);
  }

  loadEnvLocal();
  if (!process.env.GEMINI_API_KEY) {
    console.error(
      "Error: GEMINI_API_KEY not set.\n\n" +
        "Get a key at https://aistudio.google.com/apikey then add it to web/.env.local:\n" +
        "  GEMINI_API_KEY=AI...\n",
    );
    process.exit(1);
  }

  const model = MODEL_ALIASES[args.model] || args.model;
  console.log(`\n→ Model:  ${model}`);
  console.log(`→ Aspect: ${args.aspect}`);
  console.log(`→ Output: public/_src-images/${args.name}.jpg`);
  console.log(`→ Prompt: ${args.prompt.slice(0, 120)}${args.prompt.length > 120 ? "..." : ""}\n`);

  if (!existsSync(SRC_DIR)) mkdirSync(SRC_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const start = Date.now();
  const response = await ai.models.generateContent({
    model,
    contents: args.prompt,
    config: { imageConfig: { aspectRatio: args.aspect } },
  });
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  let saved = false;
  const parts = response?.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      const buf = Buffer.from(part.inlineData.data, "base64");
      const outPath = join(SRC_DIR, `${args.name}.jpg`);
      writeFileSync(outPath, buf);
      const kb = (buf.length / 1024).toFixed(0);
      console.log(`Wrote ${args.name}.jpg (${kb} KB) in ${elapsed}s\n`);
      saved = true;
    } else if (part.text) {
      console.log(`Model says: ${part.text}\n`);
    }
  }

  if (!saved) {
    console.error("No image returned from model. Response:");
    console.error(JSON.stringify(response, null, 2));
    process.exit(1);
  }

  if (args.skipOptimize) return;

  console.log("Optimizing variants (AVIF/WebP/JPG @ multiple widths)...\n");
  const result = spawnSync(
    process.execPath,
    [join(ROOT, "scripts", "optimize-images.mjs")],
    { stdio: "inherit", cwd: ROOT },
  );
  process.exit(result.status ?? 0);
}

main().catch((e) => {
  console.error(`\nError: ${e?.message || e}`);
  if (e?.status) console.error(`HTTP ${e.status}`);
  process.exit(1);
});
