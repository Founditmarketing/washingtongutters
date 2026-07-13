/*
 * Cities served. Used by the homepage marquee, the footer "Top Service Areas"
 * column, and the service-area landing page templates.
 *
 * `tier` corresponds to market prominence + SEO priority. Tier 1 ships first
 * (service-area pages, footer prominence, schema). Tier 2 is supporting
 * coverage; tier 3 is outer service area.
 *
 * Coverage spans five counties — King, Pierce, Snohomish, Thurston, and
 * Mason — matching the service area on washingtongutters4less.com. The King
 * County Eastside (Bellevue, Kirkland, Redmond, Renton) and the Tacoma /
 * Pierce corridor are the strongest markets, so they lead.
 */

export const CITIES = [
  // Tier 1 — strongest markets: Tacoma/Pierce + King County Eastside
  { name: "Tacoma",           county: "Pierce",        tier: 1 },
  { name: "Bellevue",         county: "King",          tier: 1 },
  { name: "Kirkland",         county: "King",          tier: 1 },
  { name: "Redmond",          county: "King",          tier: 1 },
  { name: "Renton",           county: "King",          tier: 1 },
  { name: "Puyallup",         county: "Pierce",        tier: 1 },
  { name: "Gig Harbor",       county: "Pierce",        tier: 1 },
  { name: "University Place", county: "Pierce",        tier: 1 },
  { name: "Lakewood",         county: "Pierce",        tier: 1 },
  { name: "Issaquah",         county: "King",          tier: 1 },

  // Tier 2 — North Sound + close-in suburbs
  { name: "Everett",          county: "Snohomish",     tier: 2 },
  { name: "Lynnwood",         county: "Snohomish",     tier: 2 },
  { name: "Bothell",          county: "King/Snohomish", tier: 2 },
  { name: "Mill Creek",       county: "Snohomish",     tier: 2 },
  { name: "Edmonds",          county: "Snohomish",     tier: 2 },
  { name: "Mukilteo",         county: "Snohomish",     tier: 2 },
  { name: "Mercer Island",    county: "King",          tier: 2 },
  { name: "Sammamish",        county: "King",          tier: 2 },
  { name: "Bonney Lake",      county: "Pierce",        tier: 2 },
  { name: "Spanaway",         county: "Pierce",        tier: 2 },

  // Tier 3 — Outer service area, grouped by county for readability.
  { name: "Marysville",       county: "Snohomish",     tier: 3 },
  { name: "Lake Stevens",     county: "Snohomish",     tier: 3 },
  { name: "Snohomish",        county: "Snohomish",     tier: 3 },
  { name: "Monroe",           county: "Snohomish",     tier: 3 },
  { name: "Woodinville",      county: "King",          tier: 3 },
  { name: "Shoreline",        county: "King",          tier: 3 },
  { name: "Covington",        county: "King",          tier: 3 },
  { name: "North Bend",       county: "King",          tier: 3 },
  { name: "Graham",           county: "Pierce",        tier: 3 },
  { name: "Buckley",          county: "Pierce",        tier: 3 },
  { name: "Olympia",          county: "Thurston",      tier: 3 },
  { name: "Lacey",            county: "Thurston",      tier: 3 },
  { name: "Tumwater",         county: "Thurston",      tier: 3 },
  { name: "Shelton",          county: "Mason",         tier: 3 },
  { name: "Belfair",          county: "Mason",         tier: 3 },
];

/* Cities surfaced in the footer "Top Service Areas" column. Order is the
 * order they're displayed in — lead with the strongest markets. */
export const TOP_FOOTER_CITIES = [
  "Tacoma",
  "Bellevue",
  "Kirkland",
  "Redmond",
  "Renton",
  "Everett",
  "Lynnwood",
  "Issaquah",
  "Puyallup",
  "Edmonds",
];

/* Recent / currently-booking cities used by the home-page activity rail.
 * Rotated occasionally to keep the surface fresh. */
export const NOW_BOOKING = ["Bellevue", "Tacoma", "Kirkland"];
