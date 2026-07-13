# Seamless Gutters 4 Less — Web

Local dev environment for the Seamless Gutters 4 Less marketing site. Built with Vite + React + Tailwind v4, ready to extend per [`../sg4l-plan.md`](../sg4l-plan.md).

## Stack

- Vite (React template)
- React 19
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- `lucide-react` icons
- Google Fonts: Fraunces (display), Manrope (body) — injected at runtime

## Getting Started

```bash
cd web
npm install        # only first time
npm run dev        # Opens Seamless Gutters at http://localhost:5739 (see terminal if you change port)
```

## Scripts

- `npm run dev` — start the local dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Project Layout

```
web/
├── index.html                    # SEO meta + font preconnect
├── vite.config.js                # React + Tailwind v4 plugin
├── src/
│   ├── main.jsx                  # React entry
│   ├── App.jsx                   # Renders <SeamlessGuttersHomepage />
│   ├── SeamlessGutters.jsx       # Single-file homepage (will be split out)
│   └── index.css                 # @import "tailwindcss" + base resets
└── public/                       # static assets
```

The `SeamlessGutters.jsx` file is the current monolithic homepage. As we move toward the full plan we'll split it into:

- `src/components/` — Header, Hero, Services, Estimator, ServiceAreaMap, Reviews, Footer, etc.
- `src/pages/` — Home, Service pages, County hubs, City landing pages
- `src/data/` — cities, counties, services, reviews, gallery
- `src/lib/` — schema (JSON-LD), Jobber integration, analytics

## Roadmap (from sg4l-plan.md)

1. **Phase 1 — Foundation**: lock design system, fix NAP/footer/alt issues, hero polish, Jobber spec.
2. **Phase 2 — Core service pages**: 5 service pages + 6 county hubs + final homepage + Jobber form + estimator + analytics.
3. **Phase 3 — Tier 1 city pages**: 17 unique city pages + interactive service-area map + sitemap + internal links.
4. **Phase 4 — Tier 2 cities + blog kickoff** (Snohomish/Eastside outer ring + 4 cornerstone posts + filterable gallery).
5. **Phase 5 — Tier 3 + service×city matrix + perf/schema audit**.
6. **Phase 6 — Ongoing engine** (1–2 posts/mo, 1 city or project page/wk, GMB & review velocity).
