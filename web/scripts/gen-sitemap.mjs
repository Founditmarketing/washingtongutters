/*
 * Generates web/public/sitemap.xml from the canonical route list.
 *
 * Run automatically as part of `vite build`. Also runnable on its own
 * via `node scripts/gen-sitemap.mjs` for testing.
 *
 * Today this is a hand-rolled route list because we don't have a router
 * config we can introspect from Node. When city/service-area pages land
 * (sg4l-plan.md §7), add them to the SERVICE_AREA_PAGES block below.
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");
const OUT_PATH   = resolve(ROOT, "public", "sitemap.xml");

const BASE = "https://washingtongutters4less.com";

const SERVICE_SLUGS = [
  "gutter-installation",
  "gutter-replacement",
  "gutter-repair",
  "gutter-guards",
  "soffit-and-fascia-repair",
];

const LOCATION_SLUGS = [
  "king-county",
  "pierce-county",
  "snohomish-county",
  "thurston-county",
  "mason-county",
];

const BLOG_SLUGS = [
  "gutter-installation-lacey",
  "gutter-installation-olympia",
  "gutter-repair-tacoma",
];

/* Each entry mirrors the routes registered in src/App.jsx.
 * `changefreq` and `priority` are hints, not contracts — Google mostly
 * ignores them but Bing still uses them.  */
const PAGES = [
  { loc: "/",          changefreq: "weekly",  priority: 1.0 },
  { loc: "/about/",    changefreq: "monthly", priority: 0.7 },
  { loc: "/gallery/",  changefreq: "weekly",  priority: 0.7 },
  { loc: "/reviews/",  changefreq: "weekly",  priority: 0.8 },
  { loc: "/faq/",      changefreq: "monthly", priority: 0.8 },
  { loc: "/contact/",  changefreq: "monthly", priority: 0.8 },
  { loc: "/locations/", changefreq: "monthly", priority: 0.8 },
  { loc: "/blog/",      changefreq: "weekly",  priority: 0.6 },
  ...SERVICE_SLUGS.map((slug) => ({
    loc: `/services/${slug}/`,
    changefreq: "monthly",
    priority: 0.9,
  })),
  ...LOCATION_SLUGS.map((slug) => ({
    loc: `/locations/${slug}/`,
    changefreq: "monthly",
    priority: 0.9,
  })),
  ...BLOG_SLUGS.map((slug) => ({
    loc: `/blog/${slug}/`,
    changefreq: "monthly",
    priority: 0.6,
  })),
];

function urlEl({ loc, changefreq, priority }, lastmod) {
  return [
    "  <url>",
    `    <loc>${BASE}${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
}

function main() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = PAGES.map((p) => urlEl(p, lastmod)).join("\n");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");

  if (!existsSync(dirname(OUT_PATH))) {
    mkdirSync(dirname(OUT_PATH), { recursive: true });
  }
  writeFileSync(OUT_PATH, xml, "utf8");
  console.log(`[sitemap] wrote ${PAGES.length} urls → ${OUT_PATH}`);
}

main();
