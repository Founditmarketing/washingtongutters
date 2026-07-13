/*
 * Quick visual sanity check for the new CustomerVideos section + the
 * sticky-header behaviour. Writes screenshots to web/.prompts/screenshots/.
 *
 * Captures:
 *   - desktop @ top of page
 *   - desktop @ customer-videos section
 *   - mobile (iPhone 14 viewport) @ top of page
 *   - mobile @ customer-videos section
 *   - mobile @ scrolled-down-3500px (verifies header still pinned at top)
 *
 * Run: `node scripts/visual-check.mjs`  (dev server must be running on :5739)
 */

import { chromium, devices } from "playwright";
import { mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const OUT = resolve(__dirname, "..", ".prompts", "screenshots");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:5739/";

async function shoot(page, name) {
  const file = resolve(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  → ${file}`);
}

const browser = await chromium.launch();

/* DESKTOP */
{
  console.log("desktop");
  const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await shoot(page, "desktop-top");

  /* Scroll just past the hero so the trust badge bar (and the WA seal
   * placement inside it) is fully visible. */
  await page.evaluate(() => window.scrollBy(0, 880));
  await page.waitForTimeout(400);
  await shoot(page, "desktop-trust-bar");

  await page.evaluate(() =>
    document.getElementById("customer-videos")?.scrollIntoView({ behavior: "instant", block: "start" }),
  );
  await page.waitForTimeout(400);
  await shoot(page, "desktop-customer-videos");
  await ctx.close();
}

/* MOBILE — iPhone 14 viewport */
{
  console.log("mobile");
  const ctx  = await browser.newContext({ ...devices["iPhone 14"] });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await shoot(page, "mobile-top");
  await page.evaluate(() =>
    document.getElementById("customer-videos")?.scrollIntoView({ behavior: "instant", block: "start" }),
  );
  await page.waitForTimeout(400);
  await shoot(page, "mobile-customer-videos");

  /* Brand-card detail shot — scroll a bit further so we see the bottom
   * NAP mask in the same frame as the play button. */
  await page.evaluate(() => window.scrollBy(0, 380));
  await page.waitForTimeout(400);
  await shoot(page, "mobile-brand-card-detail");

  /* Header sticky check — scroll deep and re-screenshot. The header has
   * a logo at the top; if it stays pinned, we should see the logo over
   * whatever section is in view. */
  await page.evaluate(() => window.scrollTo(0, 3500));
  await page.waitForTimeout(400);
  await shoot(page, "mobile-scrolled-header-sticky");
  await ctx.close();
}

await browser.close();
console.log("\nDone — screenshots in", OUT);
