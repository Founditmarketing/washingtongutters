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
    image: "photos/yellow-craftsman-porch",
    alt: "Yellow craftsman-style farmhouse with a full wraparound porch and American flag, finished with clean seamless gutters over manicured landscaping.",
  },
  {
    service: "installation",
    image: "photos/white-metal-garage",
    alt: "Newly built white metal garage and shop with a gray metal roof and a fresh seamless gutter run, on a gravel lot lined with evergreens.",
  },
  {
    service: "installation",
    image: "photos/barn-gutter-run",
    alt: "Long seamless gutter run with two downspouts along the covered lean-to of a timber pole barn on a rural Washington property.",
  },
  {
    service: "replacement",
    image: "photos/stone-rancher-downspout",
    alt: "Stone-veneer rancher with a red front door and a crisp new white seamless gutter and downspout running down the side.",
  },
  {
    service: "installation",
    image: "photos/doghouse-mini-gutter",
    alt: "Two bulldogs in a custom dog house fitted with its own miniature seamless gutter — no roofline is too small.",
  },
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
  {
    service: "replacement",
    image: "photos/gray-two-story-jobsite",
    portrait: true,
    alt: "Gray two-story home with a white-trim covered porch and new seamless gutters, the Washington Gutters 4 Less truck parked out front.",
  },
  {
    service: "installation",
    image: "photos/splitlevel-ladder-install",
    portrait: true,
    alt: "Crew ladder set against a split-level home mid-install as a new seamless gutter run goes up along the eave.",
  },
  {
    service: "installation",
    image: "photos/brown-modular-new-gutter",
    portrait: true,
    alt: "Brown modular home with white trim and a freshly installed white seamless gutter and downspout.",
  },
  {
    service: "replacement",
    image: "photos/red-two-story-garage",
    portrait: true,
    alt: "Rust-red two-story home with a white single-car garage and new seamless gutters along the rooflines.",
  },
  {
    service: "replacement",
    image: "photos/gray-rancher-downspout",
    portrait: true,
    alt: "Gray single-story rancher with a large picture window and a new white seamless gutter and corner downspout.",
  },
  {
    service: "replacement",
    image: "photos/gray-rancher-lattice-porch",
    portrait: true,
    alt: "Blue-gray rancher with a two-car garage and lattice-railed porch, finished with new seamless gutters.",
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
