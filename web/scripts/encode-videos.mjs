/*
 * Encodes raw customer videos to web-friendly H.264 + AAC and extracts
 * a JPG poster frame from each.
 *
 * Inputs:  public/videos/_raw/<name>.mp4
 * Outputs: public/videos/<name>.mp4       (compressed, web-optimized)
 *          public/videos/posters/<name>.jpg (poster frame ~1s in)
 *
 * Target bitrate is tuned for "homepage testimonial" rather than archival
 * quality — voice intelligibility and a clean face shot matter; 4K
 * fidelity does not. Each clip lands around 4–8 MB which Vercel's edge
 * cache can serve in well under a second on a typical connection.
 *
 * Re-running is idempotent: existing outputs are skipped unless --force.
 *
 * Requires ffmpeg on PATH.
 */

import { existsSync, readdirSync, mkdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");

const SRC_DIR     = resolve(ROOT, "public", "videos", "_raw");
const OUT_DIR     = resolve(ROOT, "public", "videos");
const POSTER_DIR  = resolve(ROOT, "public", "videos", "posters");

const FORCE = process.argv.includes("--force");

if (!existsSync(SRC_DIR)) {
  console.error(`[videos] source dir missing: ${SRC_DIR}`);
  process.exit(1);
}
mkdirSync(POSTER_DIR, { recursive: true });

function fmt(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/* ffmpeg invocation — h264_mp4 baseline + faststart for instant playback.
 * scale to max 1280px wide, preserving aspect; CRF 26 is the sweet spot
 * for "good enough" testimonial faces; AAC 96k is plenty for one speaker. */
function encode(input, output) {
  console.log(`  encode → ${basename(output)}`);
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i", input,
      "-vf", "scale='min(1280,iw)':-2",
      "-c:v", "libx264",
      "-preset", "slow",
      "-crf", "26",
      "-profile:v", "high",
      "-level", "4.0",
      "-pix_fmt", "yuv420p",
      "-c:a", "aac",
      "-b:a", "96k",
      "-movflags", "+faststart",
      output,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
}

/* Poster: pull a frame ~1s in (or at the very start for very short clips)
 * and write a JPG at the same width as the video so it doesn't blur on
 * retina screens. */
function poster(input, output) {
  console.log(`  poster → ${basename(output)}`);
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-ss", "1",
      "-i", input,
      "-frames:v", "1",
      "-vf", "scale='min(1280,iw)':-2",
      "-q:v", "4",
      output,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
}

const files = readdirSync(SRC_DIR).filter((f) => /\.mp4$/i.test(f));
if (!files.length) {
  console.error(`[videos] no .mp4 files in ${SRC_DIR}`);
  process.exit(1);
}

console.log(`[videos] ${files.length} source file(s)`);

for (const file of files) {
  const base   = basename(file, ".mp4");
  const input  = join(SRC_DIR,    file);
  const out    = join(OUT_DIR,    `${base}.mp4`);
  const post   = join(POSTER_DIR, `${base}.jpg`);

  const srcSize = statSync(input).size;
  console.log(`\n• ${file}  (${fmt(srcSize)})`);

  if (!FORCE && existsSync(out)) {
    console.log(`  encode skipped — ${basename(out)} exists`);
  } else {
    encode(input, out);
  }

  if (!FORCE && existsSync(post)) {
    console.log(`  poster skipped — ${basename(post)} exists`);
  } else {
    poster(input, post);
  }

  if (existsSync(out)) {
    const outSize = statSync(out).size;
    const ratio   = ((1 - outSize / srcSize) * 100).toFixed(0);
    console.log(`  result  → ${fmt(outSize)}  (-${ratio}%)`);
  }
}

console.log("\n[videos] done.");
