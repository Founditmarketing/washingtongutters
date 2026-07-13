/*
 * Project gallery — real Washington Gutters 4 Less jobsite photos,
 * owner-supplied (dropped into /web/images and renamed by content).
 *
 * Responsive variants (640w + 1024w in AVIF + WebP + JPG) live in
 * /public/photos/ and are generated from the source photos. The `image`
 * field is the path-without-extension that ResponsiveImg expands into the
 * right <picture> tree.
 *
 * Ordering: landscape full-home shots lead (they read best in the
 * homepage collage); portrait shots and gutter/roofline detail shots
 * follow. `portrait: true` marks the vertical shots.
 *
 * Service tagging:
 *   - "replacement"   → established home wearing fresh seamless gutters
 *   - "installation"  → new install / mid-job (crew, materials, new build)
 *   - "guards"        → gutter-guard and roofline detail shots
 */

export const GALLERY = [
  // ── Landscape full-home shots ──
  {
    service: "replacement",
    image: "photos/two-story-gray-maple",
    alt: "Two-story gray home with dark double garage doors and fresh seamless gutters, framed by a red Japanese maple.",
  },
  {
    service: "replacement",
    image: "photos/blue-rancher",
    alt: "Blue single-story rancher with white garage and new seamless gutters on a clear autumn day.",
  },
  {
    service: "replacement",
    image: "photos/navy-rancher",
    alt: "Navy-gray rancher with a white double garage and clean new gutter run along the roofline.",
  },
  {
    service: "replacement",
    image: "photos/two-story-tan",
    alt: "Two-story tan home with a white garage and freshly installed seamless gutters.",
  },
  {
    service: "replacement",
    image: "photos/ranch-home-white",
    alt: "Single-story white ranch home with an attached garage and new seamless gutters.",
  },
  {
    service: "replacement",
    image: "photos/tan-rancher-lawn",
    alt: "Tan rancher on a wide green lawn with a new seamless gutter system.",
  },
  {
    service: "replacement",
    image: "photos/gray-home-driveway",
    alt: "Gray single-story home with a mature tree and fresh gutters over the garage.",
  },
  {
    service: "replacement",
    image: "photos/tan-double-garage",
    alt: "Tan two-story home with a double garage and new seamless gutters, surrounded by autumn trees.",
  },
  {
    service: "installation",
    image: "photos/cedar-carport",
    alt: "Cedar carport addition with a new white seamless gutter and downspout, shot from a dramatic low angle.",
  },
  {
    service: "installation",
    image: "photos/sage-home-install",
    alt: "Sage-green home mid-install, with a Washington Gutters 4 Less crew member fitting new seamless gutters.",
  },
  {
    service: "replacement",
    image: "photos/white-home-yard",
    alt: "White single-story home with a green yard and freshly hung seamless gutters.",
  },

  // ── Portrait shots ──
  {
    service: "replacement",
    image: "photos/two-story-red-door",
    widths: [640],
    portrait: true,
    alt: "Two-story home with a red front door and new seamless gutters along the eaves.",
  },
  {
    service: "installation",
    image: "photos/modern-home-downspout",
    widths: [640],
    portrait: true,
    alt: "Modern home corner showing a crisp new white downspout and seamless gutter.",
  },
  {
    service: "installation",
    image: "photos/home-entry-walkway",
    widths: [640],
    portrait: true,
    alt: "Home entry and walkway with new seamless gutters framing the covered porch.",
  },
  {
    service: "replacement",
    image: "photos/tan-home-facade",
    widths: [640],
    portrait: true,
    alt: "Tan home facade with lit windows and new seamless gutters along the roofline.",
  },
  {
    service: "replacement",
    image: "photos/two-story-foggy",
    widths: [640],
    portrait: true,
    alt: "Two-story home on a foggy Washington morning with freshly installed gutters.",
  },
  {
    service: "replacement",
    image: "photos/home-white-car",
    widths: [640],
    portrait: true,
    alt: "Home with a white car in the driveway and a clean new seamless gutter run.",
  },

  // ── Gutter & roofline detail ──
  {
    service: "guards",
    image: "photos/gutter-roofline-detail",
    widths: [640],
    portrait: true,
    alt: "Close-up of a new seamless gutter running along the shingle roofline above a green lawn.",
  },
  {
    service: "guards",
    image: "photos/shingle-gutter-closeup",
    widths: [640],
    portrait: true,
    alt: "Detail of asphalt shingles meeting a freshly installed seamless gutter edge.",
  },
  {
    service: "replacement",
    image: "photos/white-garage-home",
    widths: [640],
    portrait: true,
    alt: "Home with a white garage and trash bins at the curb, showing new seamless gutters.",
  },
];
