# Seamless Gutters 4 Less — World-Class Plan

A complete strategic brief: audit, positioning, IA, design direction, homepage blueprint, SEO geographic engine, and phased rollout.

Business: Seamless Gutters 4 Less | Tacoma, WA | 30+ years | Puget Sound service area
CRM/Forms/Payments: Jobber (keep, embed properly)
Goal: World-class site that owns local search across Seattle suburbs and the I-5 corridor north of Seattle.

---

## 0. Executive Summary

The current site is a generic WordPress build with template-leftover bugs, inconsistent NAP data, weak hierarchy, and zero geographic SEO depth. It's a 5-star company with a 2-star website.

The opportunity is enormous because gutter installation is one of the highest-intent local service searches in the Pacific Northwest — every fall and spring, homeowners in Bellevue, Edmonds, Bothell, Mill Creek, Lynnwood, etc. are typing "gutter installation near me" into Google. The winners are companies with deep local landing pages, real review schema, fast mobile sites, and instant-quote flows.

**Three pillars of the rebuild:**
1. **Trust at first scroll** — clean Pacific Northwest aesthetic, real photos, real reviews, immediate conversion paths (call, text, instant estimate).
2. **Geographic SEO engine** — 50+ unique city/county/neighborhood landing pages targeting the entire Puget Sound, prioritized for north-of-Seattle and east-side suburbs.
3. **Conversion architecture** — Jobber form embedded properly, sticky mobile CTA, instant-estimate calculator, financing badge, senior/veteran discount surfaced everywhere.

---

## 1. Audit: What's Working, What's Broken

### Working
- Solid service mix: installation, replacement, soffit/fascia, gutter guards.
- Real video testimonials (5 of them) — gold for conversion if presented well.
- 5-star Google rating — needs to be schema-marked and surfaced loudly.
- Senior + Veteran discount badges — strong differentiators.
- County hub pages exist for all six counties — foundation to build on.
- Phone-first instinct (tel: links).
- Established 30+ year history.

### Broken — must fix in v1
- **NAP inconsistency**: 3 different phone numbers on homepage. Pick the primary, route to that one canonical number across the entire site, GMB, and citations.
- **Footer Terms/Privacy links** point to statelinegutters.com (wrong domain).
- **Image alt text** references "Yulee, FL" — wrong state. Audit every alt tag.
- **Broken HTML in footer**: `<https://...”>Seamless Gutters` link is malformed.
- **Conflicting copy**: "30+ years" in one section vs "40 years combined experience" in another.
- **Copyright 2024** — auto-update to current year.
- **No structured data** (no LocalBusiness schema, no Service schema, no Review schema, no FAQ schema visible).
- **No page-level uniqueness** on county pages (likely thin/duplicate content).
- **Hero is unfocused**: H1 is decent but the value prop, social proof, and CTA fight each other for attention.
- **Service cards are stock-feeling**, no real project photos with location captions.
- **No instant estimate / no clear quote path above the fold on mobile**.
- **Footer links are repeated and disorganized** ("Quick links" header has nothing under it).
- **Likely poor Core Web Vitals** (WordPress + S3 image origin, multiple video files autoloading).

---

## 2. Strategic Positioning

### Brand Promise (one sentence)
**Seamless gutters built for Pacific Northwest rain — installed fast, priced fair, backed by 30 years.**

### The three things this brand should always communicate
1. **Local pride and PNW expertise** — they understand wet winters, moss country, big trees, mossy roofs, fir-needle clogs. National competitors don't.
2. **Price leadership without the cheap-feeling**. "4 Less" is the name — own the value angle, but elevate it with craftsmanship signals (real photos, named installers, real customer videos).
3. **Frictionless quotes**. Most homeowners hate calling for estimates. Win them with online estimate, text-to-quote, and a Jobber form that takes 60 seconds.

### Tagline options
- "Pacific Northwest gutters. Honest pricing. 30 years on the ladder."
- "Built for the rain belt."
- "Seamless gutters, priced fair, installed once."
- "Your home's first line of defense against PNW rain."

---

## 3. Recommended Design Direction

### Aesthetic: "Pacific Craft"

A modern home-services design language with PNW soul. Think: a cross between a high-end roofing brand and a craft-trade Instagram aesthetic.

### Color palette
- **Primary**: Deep forest green `#1F3D2E` (PNW evergreen, masculine, trustworthy)
- **Accent**: Aged copper `#B96A3B` (gutter material, warmth, trade-craft)
- **Neutral dark**: Slate `#1B1E22`
- **Neutral light**: Bone `#F5F1EA` (warmer than pure white)
- **Pure white**: `#FFFFFF` for cards
- **Success/CTA optional**: Use the copper for primary CTAs — it pops on green and bone backgrounds.

### Typography
- **Display/Headlines**: Fraunces or Source Serif (editorial weight) OR Sentinel-style serif for premium trust. If staying modern, Söhne / Inter Display.
- **Body/UI**: Inter or Geist Sans — clean, neutral, hyper-readable.
- **Optional accent**: A condensed sans (Barlow Condensed) for stats/labels, ties to the trade aesthetic.

### Photography direction
- Real installations on real PNW homes. Craftsman bungalows, modern Bellevue boxes, Snohomish farmhouses, Edmonds waterfront.
- Misty/cloudy day photography — lean into the rain.
- Detail shots: the gutter machine forming a continuous run, copper downspouts, ladder-on-eave shots.
- Crew portraits with named installers (humanizes the brand).
- Drone shots of finished installs.

### Motion / interaction
- Subtle scroll-triggered fades and parallax — nothing showy.
- Service cards lift on hover.
- Sticky mobile CTA bar (Call / Text / Estimate).
- Animated counter for "homes serviced," "gutters installed," "years in business."
- Optional: a subtle rain/water animation on hero (but tasteful — don't go overboard).

### What this is NOT
- Not "construction site bold" with chevrons and safety-orange.
- Not "blue gradient plumber template."
- Not minimalist startup white-space (too cold for this audience).

---

## 4. Information Architecture (Sitemap)

```
/
├── /services/
│   ├── /seamless-gutter-installation/
│   ├── /gutter-replacement/
│   ├── /gutter-guards/
│   ├── /soffit-and-fascia-repair/
│   └── /gutter-cleaning/                ← add (high-volume search)
│
├── /service-areas/                      ← new hub page with interactive map
│   ├── /king-county/
│   │   ├── /seattle/
│   │   ├── /bellevue/
│   │   ├── /kirkland/
│   │   ├── /redmond/
│   │   ├── /sammamish/
│   │   ├── /issaquah/
│   │   ├── /shoreline/
│   │   ├── /mercer-island/
│   │   ├── /renton/
│   │   ├── /kent/
│   │   ├── /federal-way/
│   │   ├── /auburn/
│   │   ├── /burien/
│   │   ├── /woodinville/
│   │   ├── /kenmore/
│   │   ├── /lake-forest-park/
│   │   └── /newcastle/
│   ├── /snohomish-county/
│   │   ├── /everett/
│   │   ├── /lynnwood/
│   │   ├── /edmonds/
│   │   ├── /bothell/
│   │   ├── /mill-creek/
│   │   ├── /mukilteo/
│   │   ├── /mountlake-terrace/
│   │   ├── /marysville/
│   │   ├── /lake-stevens/
│   │   ├── /snohomish/
│   │   ├── /monroe/
│   │   ├── /arlington/
│   │   ├── /stanwood/
│   │   └── /granite-falls/
│   ├── /pierce-county/
│   │   ├── /tacoma/
│   │   ├── /lakewood/
│   │   ├── /puyallup/
│   │   ├── /sumner/
│   │   ├── /bonney-lake/
│   │   ├── /gig-harbor/
│   │   ├── /university-place/
│   │   └── /spanaway/
│   ├── /thurston-county/
│   │   ├── /olympia/
│   │   ├── /lacey/
│   │   ├── /tumwater/
│   │   └── /yelm/
│   ├── /kitsap-county/
│   │   ├── /bremerton/
│   │   ├── /silverdale/
│   │   ├── /poulsbo/
│   │   └── /port-orchard/
│   └── /mason-county/
│       ├── /shelton/
│       └── /belfair/
│
├── /service-areas/[city]/[service]/     ← service+city matrix for top combos (see SEO section)
│
├── /gallery/                            ← filterable project gallery
├── /reviews/                            ← Google reviews + video testimonials, schema-marked
├── /about/
│   └── /our-team/                       ← named installers with photos
├── /financing/                          ← if Jobber/third party offers it
├── /faq/
├── /blog/
├── /estimate/                           ← Jobber embed + instant rough estimator
└── /contact/
```

---

## 5. Homepage Blueprint (Section by Section)

### Section 1 — Hero (above fold)
- **Background**: Hero photo of a PNW craftsman home in light rain with finished gutters, OR a short looping muted video of the gutter-forming machine at work. Dark green overlay at 30% to ensure text legibility.
- **Eyebrow**: "Pacific Northwest • Family Owned • 30+ Years"
- **H1**: `Seamless Gutters Built for Seattle Rain.`
- **Sub**: One sentence — "Same-week estimates from Marysville to Olympia. Locally owned. Always priced fair."
- **Primary CTA**: "Get a Free Estimate" (copper button, opens Jobber form modal or scrolls to estimator)
- **Secondary CTA**: "Call (XXX) XXX-XXXX" (clean line button)
- **Trust strip below CTAs**: 5-star Google rating badge | Licensed & Insured | Family Owned Since 199X | Senior/Vet Discount
- **Mobile**: stacked, sticky tab bar at bottom (Call · Text · Estimate)

### Section 2 — Service Area Snapshot
- **Heading**: "Serving the entire Puget Sound — from Marysville to Shelton"
- **Interactive SVG map** of Western WA with the 6 counties highlighted. Hover/tap a county → preview card with major cities → click to county hub page.
- **Below map**: pills for top 12 cities (Seattle, Bellevue, Edmonds, Lynnwood, Bothell, Mill Creek, Everett, Marysville, Tacoma, Puyallup, Olympia, Bremerton) — each clickable to the city landing page.

### Section 3 — Services (Four Cards)
Real installation photos, clear pricing posture, hover lift.
1. **Seamless Gutter Installation** — "Custom-formed on-site to fit your home"
2. **Gutter Replacement** — "Old gutters failing? We pull and replace in a day"
3. **Gutter Guards** — "Stop fir needles, leaves, and moss before they cost you"
4. **Soffit & Fascia Repair** — "Rotted wood behind your gutters? We rebuild it"

Each card: photo, headline, 1-line value prop, "Learn more →" link. Icons subtle, copper-tinted.

### Section 4 — The Process (3-step visual)
**"How it works"**
1. **Free Estimate** — Submit online or call. Same-week response, valid for one full year.
2. **We Build It on Your Driveway** — Continuous gutter formed on-site to your exact run lengths. Zero seams = zero leaks.
3. **Installed in a Day** — Most homes done in 4-6 hours. Cleanup included. We treat your yard like our own.

### Section 5 — Trust Stack (Stats + Badges)
Animated counters:
- **30+** Years in business
- **5,000+** Homes protected
- **★ 5.0** Google rating
- **6** Counties served

Badges row: Licensed & Bonded WA · Insured · BBB · Veteran-Owned (if applicable) · Local Family Business

### Section 6 — Discount Highlights (color-blocked band)
Two-column block:
- **Senior Discount** — 10% off for homeowners 65+
- **Veteran & Active Duty Discount** — Thank you for your service. 10% off.

### Section 7 — Project Gallery (filterable)
A 6-9 image gallery with city tags ("Bellevue, WA — Craftsman gutter replacement"). Filter pills: "All · Installation · Guards · Soffit/Fascia · Cities". Clicking opens a lightbox with before/after slider.

### Section 8 — Why PNW Homes Need a Specialist
Editorial section (where the SEO content lives on the homepage).

> **Pacific Northwest rain doesn't behave like rain anywhere else.**
>
> Between October and April, our region absorbs 35–60 inches of rainfall. Combine that with massive Doug fir and cedar canopies, moss-prone roofs, and aging cedar shake fascia, and you have the perfect storm for gutter failure. Most homes built before 2010 have under-sized gutters that simply can't keep up with PNW volumes.

Three icon callouts:
- **Fir needles & moss** — clog faster than dry-climate debris.
- **Sustained downpours** — overwhelm 5" gutters; many PNW homes need 6".
- **Soft fascia rot** — wet PNW air destroys backing wood; we replace it.

This is also the section that earns "gutter installation Pacific Northwest" / "Seattle gutter company" / "best gutters for rain" type rankings.

### Section 9 — Reviews + Video Testimonials
- **Heading**: "What Puget Sound homeowners are saying"
- 3-up grid of Google review cards (pulled live or static, marked up with Review schema)
- Video testimonials in a horizontal scroll carousel — properly compressed, autoplay muted, click to unmute.

### Section 10 — Final Conversion Block
- **Heading**: "Get your free estimate in 60 seconds"
- Embedded Jobber form OR a 3-question instant rough-estimator (see Section 8).
- Phone number giant. Hours of operation. Service area reminder.

### Section 11 — Footer
Clean, organized, with:
- Logo + 1-sentence positioning
- Services column
- Service Areas column (top 8 cities + "see all →")
- Company column (About, Reviews, Blog, Financing, Contact)
- NAP block (name, address, phone, email — must be IDENTICAL to GMB)
- Social links (Google, Facebook, Instagram if applicable)
- Bottom bar: copyright (auto-year), Terms, Privacy, sitemap, accessibility statement

---

## 6. Service Page Template

Every service page (Installation, Replacement, Guards, Soffit/Fascia, Cleaning) follows this structure for SEO and conversion:

1. **H1** — `[Service] in the Puget Sound | Seamless Gutters 4 Less`
2. **Hero photo** of that service in action, with a 1-sentence value prop and "Free Estimate" CTA.
3. **What it is** — 2-3 paragraphs explaining the service in plain language. Target ~600-800 words across the page minimum for SEO depth.
4. **When you need it** — bulleted symptoms ("Water spilling over edges," "Fascia stains," "Visible sagging," etc.)
5. **What we install / how we do it** — process, materials, sizing (5" vs 6"), color options.
6. **Pricing posture** — typical price range or "starts at $X/linear ft" if comfortable, otherwise "transparent pricing, free written estimate."
7. **Project gallery** — 4-6 photos of THAT service.
8. **Service-specific FAQ** — 5-8 questions, marked up with FAQPage schema.
9. **Service area module** — "We provide [service] in [list of top 12 cities]" with internal links.
10. **CTA block** — Jobber form or estimate button.
11. **Internal links to other services** at the bottom.

---

## 7. The SEO Geographic Engine — The Big Play

This is where most gutter websites in the region are leaving money on the table, and it's where you can dominate.

### The matrix

For each priority city, you build:
- **City landing page**: `/service-areas/[county]/[city]/`
- **Service-specific city pages** for top 2 services: `/service-areas/[city]/gutter-installation/` and `/service-areas/[city]/gutter-guards/`

That's 3 pages per top city × ~30 priority cities = ~90 pages. Plus 6 county hubs. Plus 5 service pages. Plus blog. ≈ 110-120 SEO assets.

### Priority tiers — focused on north-of-Seattle and Seattle suburbs (per your brief)

#### TIER 1 — Build first (highest value, oldest housing stock, highest income)
North & East Seattle suburbs:
- Bellevue
- Kirkland
- Redmond
- Bothell (straddles King/Snohomish)
- Mill Creek
- Mukilteo
- Edmonds
- Lynnwood
- Mercer Island
- Sammamish

Seattle proper (high-value neighborhoods):
- Seattle (general page)
- Ballard
- Magnolia
- Queen Anne
- West Seattle
- Wallingford / Fremont
- View Ridge / Wedgwood / Maple Leaf

#### TIER 2 — Build next (strong residential demand, less competition)
Snohomish County corridor (your "north of Seattle" sweet spot):
- Everett
- Marysville
- Lake Stevens
- Snohomish
- Monroe
- Arlington
- Stanwood
- Mountlake Terrace
- Granite Falls

East side outer ring:
- Issaquah
- Newcastle
- Woodinville
- Kenmore
- Lake Forest Park
- Shoreline

#### TIER 3 — Build for full coverage
- Renton, Kent, Federal Way, Auburn, Burien, Tukwila, SeaTac, Des Moines (south King)
- All of Pierce, Thurston, Kitsap, Mason cities (already partially in your service area list)

### What goes on each city landing page (don't make these thin!)

Avoid "duplicate content with city name swapped" — Google will penalize. Each page needs ~500-800 words of genuinely localized content:

1. **H1**: `Seamless Gutter Installation in [City], WA`
2. **Hero block** with 1 sentence about the city + your work there.
3. **A "[City] homes & gutters" section** — talk about typical home styles in that city (e.g., Bellevue has a lot of 70s-80s split-levels, Edmonds has Craftsman + waterfront moderns, Snohomish has farmhouses), typical roof pitches, common problems.
4. **Climate/geography note** — Eastside is slightly drier than the coast; Edmonds and Mukilteo are right on the Sound and deal with salt air; Snohomish has more big trees and needle-fall.
5. **Service list** with internal links.
6. **Photos of actual jobs in that city** — this is huge. Even 1-2 unique photos per page beats every competitor.
7. **City-specific reviews** — pull Google reviews where the customer is from that city, surface them here with location.
8. **Map embed** centered on that city showing your service radius.
9. **Local schema markup** (Service + areaServed: City).
10. **FAQ schema** with questions like "Do you serve all of [City]?", "What's the typical cost of gutter installation in [City]?", "How long does installation take in [City]?"
11. **Internal links** — to the county hub, to neighboring city pages, to the service pages.
12. **CTA** — Jobber form or "Get [City] Estimate" button.

### Power moves that competitors won't do

- **Neighborhood-level pages for Seattle and Bellevue**. "Gutter Installation in Ballard, Seattle" or "Gutter Replacement in Somerset, Bellevue" — these are wide-open SERPs.
- **Embed local landmarks** in copy. "We've installed gutters from Crossroads to Bridle Trails." Google's NLP picks this up as strong local relevance.
- **Local city-tagged blog posts**. "Why Edmonds Homes Need 6-Inch Gutters" / "Best Time of Year to Replace Gutters in Bellevue" / "Snohomish Homeowners: Why Cedar Shake Fascia Rots Behind Gutters."
- **A "Recent Projects" feed** organized by city — auto-built from a CMS, with a thumbnail + city + service + 1-line note. Each project is its own URL, schema-marked.

---

## 8. Conversion Stack

### Jobber integration (correctly)
- **Don't** rely on Jobber's stock embed alone. Build a custom 3-step form on-site that posts to Jobber's API or webhook, with your own design language. Falls back to Jobber's embed if API isn't available.
- **The 3 steps**:
  1. What service? (radio buttons with icons)
  2. About your home (address autocomplete, # of stories, approx linear feet — optional, with a "not sure" toggle)
  3. Contact (name, phone, email, preferred contact method, preferred contact time)
- **Confirmation**: instant on-screen confirmation + auto-text from Jobber to the lead + an internal Slack/email ping to the team.

### Instant rough-estimate calculator (the differentiator)
A 4-question widget that gives a price *range* (not a binding quote):
1. Home size? (Small / Medium / Large with sketches)
2. Single or two-story?
3. Service type? (Install / Replace / Guards / Combo)
4. Approximate roof complexity? (Simple / Some hips & valleys / Complex)

→ Shows: "Estimated range: $X,XXX – $Y,YYY. Get a free precise estimate →" → leads into the Jobber form.

This alone will increase conversions 20-40% by removing the "I just want to know roughly what this costs" friction.

### Always-on conversion paths
- **Sticky mobile bottom bar**: Call · Text · Estimate
- **Click-to-text** option (lots of millennials/Gen X homeowners prefer text).
- **WhatsApp / SMS** integration if Jobber supports it.
- **Exit-intent modal** (light, used sparingly): "Quick question? We'll text you back within 30 minutes."
- **Live chat widget** (only if there's someone to staff it — otherwise it's a credibility leak).

### Trust accelerants near every CTA
- "Free estimate. No pressure. Valid for 12 months."
- "Locally owned. Licensed in WA. Insured."
- "5.0 ★ on Google — read 200+ reviews"

---

## 9. Content & Trust Engine

### Reviews
- Pull Google reviews via API or use a tool like Trustindex/EmbedSocial.
- Mark up with Review and AggregateRating schema.
- Dedicate a `/reviews/` page with all reviews + video testimonials + a "Leave us a review" CTA.
- Embed 3 best reviews on the homepage and on every service page.

### Project gallery
- Filterable by service and city.
- Each project = thumbnail + before/after slider + city + service + 1-line note + date.
- Auto-generated detail URLs (e.g., `/gallery/edmonds-craftsman-gutter-replacement-2025`) — these are themselves SEO assets.

### Blog (the long-tail SEO engine)
Publish 1-2 posts per month. Topic clusters:

**Cluster 1 — "How to" (informational, top-of-funnel)**
- How to tell if your gutters are failing
- 5 signs you need new gutters in the Pacific Northwest
- Gutter cleaning vs gutter guards: which is right for PNW homes?
- The real cost of ignoring soffit rot

**Cluster 2 — "City-specific" (local SEO)**
- Why Edmonds homes need 6-inch gutters
- Best time of year to replace gutters in Bellevue
- Snohomish County homeowners: cedar shake fascia and gutter failure
- Lynnwood homeowners' guide to gutter guards

**Cluster 3 — "Comparison/Decision" (mid-funnel)**
- Aluminum vs steel vs copper gutters in the PNW
- 5-inch vs 6-inch K-style: which do you need?
- DIY gutter cleaning vs hiring a pro
- Are gutter guards worth it in Western Washington?

**Cluster 4 — "Seasonal" (campaign content)**
- Fall checklist: get your gutters ready before the rains
- Spring gutter inspection guide
- Storm damage and your gutters: what to do

Each post should be 1,200-2,000 words, include 2-4 internal links to service and city pages, have a featured image, and end with a CTA.

### About / Team page
- The owner's story (real photo, name, history of the business).
- Named installers with photos and short bios — humanizes the brand and crushes "is this a real local company?" objections.
- Year-by-year milestones.
- Why they started, what they believe.

---

## 10. Technical SEO & Schema

### Must-haves
- **LocalBusiness schema** in JSON-LD on every page, with `areaServed` listing all 6 counties + top cities.
- **Service schema** on each service page.
- **AggregateRating + Review schema** on homepage and reviews page.
- **FAQPage schema** on FAQ section of every service and city page.
- **BreadcrumbList schema** site-wide.
- **VideoObject schema** for the testimonial videos.
- **ImageObject schema** for project gallery images.

### Performance targets
- Lighthouse Performance ≥ 90 mobile.
- LCP < 2.0s on 4G.
- CLS < 0.05.
- Total page weight on homepage < 2 MB.
- All images: WebP or AVIF, lazy-loaded below fold, properly sized, with descriptive alt tags **specific to PNW/WA work** (no more "Yulee, FL").
- Videos: poster images, lazy-loaded, properly compressed (under 3 MB each).

### Build stack recommendation
Given your workflow, the cleanest path is:
- **Astro** or **Next.js** static-export hosted on Vercel.
- Content in MDX or a headless CMS (Sanity, Payload, or even a Git-based CMS if the team is small).
- Jobber integration via their API (or fallback to embed).
- Tailwind for styling, framer-motion for the subtle animations.
- Vercel Image Optimization for the photo gallery.

This gives you near-instant page loads, easy duplication of city pages from a template, and zero WordPress security/maintenance overhead.

If staying on WordPress for client comfort: use a fast theme (GeneratePress, Astra Pro, or a custom block theme), aggressive caching (WP Rocket), and a CDN (Bunny or Cloudflare).

### Other technical
- XML sitemap + auto-submit to Google Search Console.
- robots.txt clean.
- Canonical tags on all city/service pages.
- Open Graph + Twitter card meta on every page.
- Favicon + PWA manifest (yes, even for service sites).
- 301 redirects from old URLs to new ones.
- HTTPS everywhere, HSTS preload.

---

## 11. Phased Rollout Plan

### Phase 1 — Foundation (Week 1)
- Lock the design system (colors, type, spacing, components).
- Fix all NAP inconsistencies. Pick the canonical phone. Update everywhere — site, GMB, citations.
- Audit and fix all alt tags, footer links, copyright, copy contradictions.
- Build new homepage in single-file form (HTML or React JSX, your call) for Trevor-style rapid iteration.
- Get the Jobber integration spec'd.

### Phase 2 — Core service pages (Week 2)
- Build the 5 service pages off the template.
- Build the 6 county hub pages with real, unique content per county.
- Build the homepage final version.
- Wire up the Jobber form + instant-estimate calculator.
- Set up GA4, Search Console, GMB integration.

### Phase 3 — Tier 1 city pages (Weeks 3-4)
- Build all 17 Tier 1 city pages with unique copy, schema, and at least one local photo each.
- Build the interactive service area map.
- Submit XML sitemap.
- Internal linking pass.

### Phase 4 — Tier 2 city pages (Weeks 5-6)
- Build remaining Snohomish + Eastside outer ring pages (~15 more).
- Start the blog with 3-4 cornerstone posts (one per cluster).
- Project gallery launched with filtering.

### Phase 5 — Tier 3 + matrix expansion (Weeks 7-8)
- Build remaining city pages for Pierce, Thurston, Kitsap, Mason.
- Build service+city matrix pages for top 10 cities (e.g., `/bellevue/gutter-guards/`).
- Schema audit pass.
- Performance optimization pass.

### Phase 6 — Ongoing engine (Month 3+)
- 1-2 blog posts per month.
- Add 1 new city or neighborhood page per week.
- Capture and publish 1 new project per week (each = its own URL).
- Quarterly review of GMB, citations, review velocity.
- A/B test hero CTAs and the instant-estimate calculator.

---

## Appendix A — Hero copy variations to test

1. `Seamless Gutters Built for Seattle Rain.`
2. `Pacific Northwest Gutters. Honest Pricing. 30 Years on the Ladder.`
3. `Your Home's First Defense Against PNW Rain.`
4. `Continuous Gutters. Formed On-Site. Installed in a Day.`
5. `From Marysville to Olympia — Seamless Gutters Done Right.`

## Appendix B — Quick wins you can ship in 24 hours
1. Fix the 3 phone numbers → one canonical number.
2. Fix the footer Terms/Privacy links to your actual policy pages.
3. Replace "Yulee, FL" alt text and audit every other image alt.
4. Fix the broken Seamless Gutters footer link.
5. Reconcile "30+ years" / "40 years combined" — pick one.
6. Update copyright year (and use auto-year going forward).
7. Add LocalBusiness schema to homepage with correct NAP.
8. Compress and lazy-load the testimonial videos.

## Appendix C — KPIs to track from day one
- Organic sessions (overall + by city page)
- Estimate form completions (and source attribution)
- Phone call clicks (track via GA4 events)
- Click-to-text conversions
- Average position for top 20 keywords (e.g. "gutter installation bellevue", "gutter replacement edmonds", "seamless gutters seattle")
- Local pack appearances by city
- Google review velocity (target 3-5 new reviews/month)
- Page load speed (mobile LCP)
- Bounce rate on city pages (should be low if pages are unique and useful)
