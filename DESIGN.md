# DESIGN.md — Seamless Gutters 4 Less

> Concrete design system. Tokens, types, components. Every value is committed and reviewed against PRODUCT.md. Designers and engineers reference this file before introducing new colors, type sizes, or spacing.

## Aesthetic direction: "Heritage Trade"

Filson / Carhartt / Patagonia heritage-trade energy applied to a Pacific Northwest seamless gutter brand. Bold condensed industrial typography, deep navy primary, warm amber accents, real trade stamps, documentary photography. Earned, not curated. The owner has been on the ladder for 30 years and the design reads like it.

**What this is NOT (anymore):** elegant editorial / Kinfolk magazine profile of a tradesman. The previous Pacific Craft direction read too refined for the actual operator and customer. Replaced with a bolder, more direct, tradesman-confident voice.

## Theme rationale (the scene sentence)

A 58-year-old Bothell homeowner sits at her kitchen counter on a rainy Tuesday morning, holding her phone in one hand and a cup of coffee in the other, deciding which of three gutter companies to call back. Light streams through the window. The room is warm.

→ **Light theme primary.** Warm bone background, deep evergreen architecture, copper accents. Dark surfaces appear as deliberate sections (process, estimator, footer) for contrast and depth. This is not a dark-by-default site.

## Color strategy

**Committed.** Navy (`--color-royal`) carries 30–60% of hero, process, and footer surfaces. Amber (`--color-copper`) operates at ≤10% as the accent that drives the eye to action. `bone` is the warm cream backdrop on content sections. Never `#000` or `#fff`. Every neutral is tinted toward brand hue.

### Palette (OKLCH) — Puget Sound Navy

Navy at hue 250°, chroma 0.16. High enough chroma to read clearly as blue; low enough to avoid the cheap "electric royal" look of over-saturated blues. Paired with warm amber (hue 42°) — reads metallic/earned rather than yellow. Backgrounds are warm cream, not blue-tinted, so the site feels warm and grounded despite the cool primary.

| Token | OKLCH | Approx hex | Role |
|---|---|---|---|
| `--color-royal` | `oklch(0.44 0.16 250)` | `~#2A4080` | Primary brand. UI accents, badges, nav. |
| `--color-royal-deep` | `oklch(0.29 0.13 250)` | `~#162054` | Hero/dark section backgrounds. |
| `--color-royal-ink` | `oklch(0.19 0.09 250)` | `~#0D1638` | Footer surface, wordmark. |
| `--color-royal-tint` | `oklch(0.91 0.05 250)` | `~#D8E0F5` | Chips, callout panels, light accent surfaces. |
| `--color-copper` | `oklch(0.72 0.11 42)` | `~#C68A40` | Warm amber. CTAs, eyebrows, hover lifts. ≤10% surface. |
| `--color-copper-deep` | `oklch(0.62 0.10 42)` | `~#A87030` | Amber hover state. |
| `--color-bone` | `oklch(0.97 0.010 85)` | `~#F6F3ED` | Warm cream. Content section background. |
| `--color-paper` | `oklch(0.995 0.003 85)` | `~#FDFCFA` | Card surface on bone backgrounds. |
| `--color-slate` | `oklch(0.22 0.016 250)` | `~#18202E` | Body text (navy-tinted near-black). |
| `--color-line` | `oklch(0.44 0.16 250 / 0.10)` | rgba(...) | Hairline divider on light surfaces. |
| `--color-line-strong` | `oklch(0.44 0.16 250 / 0.18)` | rgba(...) | Stronger divider, button borders. |

### Color usage rules

- Navy (`royal-deep`) carries 30–60% of any hero, process, or footer surface.
- Amber (`copper`) is reserved for: eyebrows, primary CTAs, accent rules, hover-arrow lifts, hover underlines. Cap at ~10% of any given screen.
- Bone is the default content surface. Any white card that sits on bone uses `--color-paper` (warmer than pure white).
- Forbidden: pure black, pure white, gradient text, neon, glassmorphic blurs as default. (Grain noise overlay is allowed at ≤15% opacity on dark surfaces.)

## Typography

### Families

- **Display:** **Barlow Condensed** (700–900). `font-display-black` (900) for hero/section headlines, `font-display-bold` (700) for sub-headlines. Almost always UPPERCASE. Tight tracking (-0.015em to -0.02em). Tight leading (0.85–0.95). Industrial, condensed, billboard-confident.
- **Body / UI:** Manrope (300–800). Default body weight 400. UI labels 500–600.
- **Trade Stamp:** Roboto Condensed (700) used inside `<Stamp>` components.

### Scale (modular, 1.25 ratio)

| Token | Min size | Fluid clamp | Usage |
|---|---|---|---|
| `--text-display-xl` | 64px | `clamp(3rem, 9vw, 7.5rem)` | Hero H1 only. Fraunces 300, opsz 144. |
| `--text-display-lg` | 48px | `clamp(3rem, 6vw, 4.5rem)` | Section headings (Services, Process, Reviews). Fraunces 300. |
| `--text-display-md` | 40px | `clamp(2.5rem, 4.5vw, 3.5rem)` | Sub-section headings, modal headings. Fraunces 300. |
| `--text-display-sm` | 28px | `clamp(1.75rem, 3vw, 2.25rem)` | Card titles. Fraunces 400. |
| `--text-h4` | 20px | `1.25rem` | Process step titles, feature titles. Fraunces 400. |
| `--text-body-lg` | 18px | `1.125rem` | Hero subhead, lead paragraphs. Manrope 400. |
| `--text-body` | 16px | `1rem` | Default body. Manrope 400. |
| `--text-body-sm` | 14px | `0.875rem` | Secondary copy, footer links. Manrope 400. |
| `--text-eyebrow` | 11px | `0.6875rem` | Section eyebrows. Manrope 600 uppercase, 0.3em tracking, copper. |
| `--text-mono-label` | 10px | `0.625rem` | Index labels (01/04). Manrope 600 uppercase, 0.25em tracking. |

### Typography rules

- Body line length capped at 65–75ch. Long-form paragraphs use `max-w-prose`.
- Heading scale ratio is ≥ 1.25. Avoid intermediate sizes that flatten hierarchy.
- Italic only for the single most important phrase in a heading (e.g. "*built for Seattle rain*"). Never italic for whole headings.
- Tracking: tight (-0.01em to -0.03em) on display sizes, normal on body, wide (0.2em to 0.3em) on eyebrows and labels.

## Spacing rhythm

Vertical scale based on 4px / 8px grid. Vary section padding for rhythm — same padding everywhere is monotony.

| Token | Value | Usage |
|---|---|---|
| `--space-section-sm` | `clamp(4rem, 8vw, 5rem)` | Tight bands (city marquee, discount band, trust stack). |
| `--space-section-md` | `clamp(5rem, 10vw, 7rem)` | Standard content sections. |
| `--space-section-lg` | `clamp(6rem, 12vw, 9rem)` | Hero, services, gallery, final CTA. |
| `--space-page-x` | `clamp(1.5rem, 4vw, 2.5rem)` | Horizontal page padding. |
| `--max-content` | `1400px` | Max width of full-bleed content rows. |
| `--max-prose` | `680px` | Max width of long-form paragraphs. |

## Elevation and surface

- **No drop shadows on light surfaces.** Use hairline borders (`--color-line`) and subtle background contrast (`bone` vs `paper`).
- **Dark surfaces use grain overlay** at 10% opacity, not shadow.
- **CTAs use `box-shadow` only on dark backgrounds**, with brand-tinted shadow (`shadow-[var(--color-copper)]/20`).

## Motion

- **Fade-up only.** No bounce, no elastic, no rotate-in. Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (ease-out-quart).
- **Stagger by 150ms** between hero elements (eyebrow → headline → subhead → CTAs → trust strip).
- **Scroll-triggered animations** fire once via IntersectionObserver, never re-fire on scroll-back.
- **Hover lifts** at `translateY(-2px)` for primary CTAs; `translateY(-1px)` for secondary; cards use `scale(1.05)` on internal images, never on the card itself.
- **Counter animation** uses cubic ease-out over 2000ms, fires once at 40% threshold.
- **Sticky mobile CTA** never animates. It's always-on, fixed.
- **Marquee city scroll** is linear, infinite, 60s for one full cycle. Pauses on `prefers-reduced-motion`.
- **All non-essential motion respects `prefers-reduced-motion: reduce`.**

## Component inventory

These are the named, reusable components. Each one is small, props-driven, and faithful to the tokens above.

### Layout

- `<Page>` — sets `bg-bone`, font, NAP context, scroll-restoration.
- `<Container>` — `max-w-[1400px]`, horizontal page padding.

### Header

- `<Header>` — fixed-top, transparent → forest-95 + grain on scroll. Height 80px. Contains logo, nav, primary phone CTA, primary estimate CTA, mobile menu trigger.
- `<MobileNav>` — slide-in panel. Always includes phone CTA pinned at top.

### Hero

- `<Hero>` — full-viewport. Background image with forest gradient overlay (top 90%, mid 55%, bottom 95%). Eyebrow, H1 (3-line max), subhead, CTA pair, 4-column trust strip below. Bottom-right "now booking in [city]" pill on desktop.

### Sections

- `<CityMarquee>` — full-bleed dark band, infinite-scroll list of cities in italic Fraunces.
- `<Services>` — 12-col grid header (eyebrow + H2 + supporting paragraph), 2-col responsive grid of service cards.
- `<ServiceCard>` — image (16:10), copper icon overlay, "0X / 04" index label, title, body, "Learn more →" CTA.
- `<Process>` — dark forest section. 3-col steps with copper-stroke step numbers (01, 02, 03), icons, titles, bodies.
- `<TrustStack>` — 4 animated `<Counter>` cells separated by hairline rules.
- `<WhyPNW>` — split layout: portrait image with absolute copper rainfall card, text column with 3 icon callouts.
- `<Gallery>` — filterable. Tag pills, 3-col responsive image grid with city + label overlay on each tile.
- `<DiscountBand>` — dark forest, two icon-headline blocks (Senior, Veteran).
- `<Reviews>` — 3-up review card grid with stars, body, name, city. Eyebrow + headline + Google rating header above.
- `<EstimatorSection>` — split layout: copy column on left, `<EstimatorWidget>` on right. Forest gradient bg.
- `<EstimatorWidget>` — 4-question stepper with progress bar, choice tiles, range result card.
- `<FinalCta>` — centered. Eyebrow rule + H2 + supporting paragraph + 3 CTAs (request, call, text).
- `<Footer>` — dark slate. 4-column grid + bottom legal row. NAP block in column 1.
- `<MobileStickyCta>` — fixed bottom 3-cell grid: Call, Text, Estimate (copper).
- `<EstimateModal>` — Jobber form host. Currently placeholder, will accept Jobber API integration.

### Atoms

- `<Eyebrow>` — copper rule + uppercase tracked label. Used to introduce every section.
- `<Counter>` — IntersectionObserver-triggered animated number.
- `<CTAButton>` — `variant="primary" | "secondary" | "ghost"`. Primary = copper. Secondary = forest. Ghost = bordered.
- `<Stars>` — N-star row, copper fill.
- `<SchemaJsonLd>` — renders JSON-LD `<script>` tags into `<head>`.

## Accessibility commitments

- Color contrast: every text token tested AA against its background.
- Focus rings: 2px copper outline with 2px offset on every interactive element.
- Skip link to main content at top of page.
- All images have descriptive alt text referring to actual PNW work, never placeholder.
- Sticky mobile CTA does not obscure focus when keyboard navigating; container reserves bottom padding.
- Modal traps focus, returns focus to trigger on close, closes on Esc and overlay click.
- Marquee, counter, and fade-up animations all respect `prefers-reduced-motion`.

## Performance budget

- Lighthouse Mobile Performance ≥ 90.
- LCP < 2.0s on 4G Fast.
- CLS < 0.05.
- Initial JS payload (route) < 100 KB gzipped.
- Initial CSS payload < 30 KB gzipped (Tailwind v4 purge).
- Hero image preloaded, AVIF + WebP fallback, < 200 KB.
- All other above-fold images < 100 KB each.
- Below-fold images lazy-loaded, native `loading="lazy"`.
- Fonts: `font-display: swap`. Fraunces and Manrope subsetted to Latin only.

## File and code organization

```
web/src/
├── components/        # All UI components from the inventory above
├── data/              # Site constants: NAP, services, cities, reviews, gallery
├── hooks/             # useScrolled, useCounter
├── lib/               # schema (JSON-LD generators), analytics, jobber
├── styles/
│   ├── tokens.css     # @theme tokens (OKLCH colors, fluid scales, spacing)
│   └── global.css     # Tailwind import, base resets, scoped keyframes
├── App.jsx            # Top-level page composition
└── main.jsx           # React mount
```
