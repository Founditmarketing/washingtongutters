// Take iPhone-viewport screenshots of every key route + every section of the home page.
// Uses Playwright's built-in iPhone 14 Pro device descriptor (390x844 @ 3x).
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE || "http://localhost:5739";
const OUT = process.env.OUT_DIR || join(process.cwd(), "_design", "screens");
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { name: "01-home",     path: "/" },
  { name: "02-services", path: "/services/seamless-gutter-installation/" },
  { name: "03-about",    path: "/about/" },
  { name: "04-gallery",  path: "/gallery/" },
  { name: "05-reviews",  path: "/reviews/" },
  { name: "06-contact",  path: "/contact/" },
];

const iphone = devices["iPhone 14 Pro"];

const browser = await chromium.launch();
const context = await browser.newContext({
  ...iphone,
  reducedMotion: "no-preference",
  hasTouch: true,
  isMobile: true,
});
const page = await context.newPage();

for (const r of ROUTES) {
  const url = BASE + r.path;
  console.log("→", url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 }).catch(() => {});
  // wait for hero / above-fold content to settle
  await page.waitForTimeout(1500);

  // Above-the-fold (viewport only)
  await page.screenshot({ path: join(OUT, `${r.name}-fold.png`), fullPage: false });

  // Full page (entire scroll)
  await page.screenshot({ path: join(OUT, `${r.name}-full.png`), fullPage: true });

  // For the home page, capture a few intermediate scroll positions for richer review
  if (r.name === "01-home") {
    const positions = [
      { y: 800,  name: "01-home-scroll-1-trust-marquee" },
      { y: 1500, name: "01-home-scroll-2-services" },
      { y: 2400, name: "01-home-scroll-3-process" },
      { y: 3300, name: "01-home-scroll-4-whypnw" },
      { y: 4200, name: "01-home-scroll-5-gallery" },
      { y: 5100, name: "01-home-scroll-6-reviews" },
      { y: 6000, name: "01-home-scroll-7-estimator" },
      { y: 6900, name: "01-home-scroll-8-final-footer" },
    ];
    for (const p of positions) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), p.y);
      await page.waitForTimeout(450);
      await page.screenshot({ path: join(OUT, `${p.name}.png`), fullPage: false });
    }
    // Also capture the open mobile menu (best-effort — never block the run).
    try {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      const menuBtn = await page.$('button[aria-label="Open menu"]');
      if (menuBtn) {
        await menuBtn.click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: join(OUT, "01-home-menu-open.png"), fullPage: false });
      }
    } catch (e) {
      console.log("(menu screenshot skipped):", e.message);
    }
  }
}

await browser.close();
console.log("\nSaved screenshots to", OUT);
