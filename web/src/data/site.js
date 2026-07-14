/*
 * Single source of truth for NAP and business constants.
 * Anywhere in the app that needs the phone, service area, or brand copy
 * imports from this file. NEVER hard-code these values elsewhere.
 */

/* Canonical numbers used anywhere on the site. Values match the brand's own
 * site (washingtongutters4less.com):
 *  - 2,291 trusted customers served (headline trust number)
 *  - 5.0 ★ — "5 Star Rated in Washington"
 *  - 5 counties served
 *  - Positioning: local, family-owned (and veteran-owned, owner-confirmed);
 *    "years of real-world experience" — NO specific founding year or year
 *    count is claimed, matching the brand site. Do NOT reintroduce
 *    "since 2005 / 20+ years / two decades" — that was recycled template copy.
 *
 * Contact policy (owner-confirmed): phone only. No public email, street
 * address, or posted hours — the business runs off the one number. Contractor
 * license number is intentionally omitted until the WA L&I number for this
 * entity is supplied; do NOT reuse another business's license.
 *
 * Single source of truth — never hard-code these elsewhere. */
export const SITE = {
  name: "Washington Gutters 4 Less",
  legalName: "Washington Gutters 4 Less, LLC",

  phone: {
    display: "(253) 399-0300",
    tel: "tel:+12533990300",
    sms: "sms:+12533990300",
    raw: "+12533990300",
  },
  /* Phone-only contact policy — no public email address. Kept null so any
   * lingering consumer renders nothing rather than a broken mailto. */
  email: null,

  address: {
    /* Base metro for local-SEO schema only (253 = Tacoma/Pierce). Not shown
     * to users — the business is presented as statewide with no street NAP. */
    locality: "Tacoma",
    region: "WA",
    regionFull: "Washington",
    country: "US",
  },

  /* Phone-only policy — no posted hours. Schema omits openingHours when null. */
  hours: null,

  rating: {
    value: 5.0,
    /* Headline trust number pulled from washingtongutters4less.com:
     * "2,291 trusted customers." Displayed as customers/homeowners served,
     * NOT as a Google review count. */
    count: 2291,
    source: "Google",
    label: "5 Star Rated in Washington",
  },
  /* Formatted for display in copy. */
  customersServed: "2,291",

  /* Google "write a review" link (owner-provided) — opens the review panel
   * for the business profile. Used by the "Leave us a review" button. */
  reviewUrl:
    "https://www.google.com/search?q=washington+gutters+4+less&rlz=1C5CHFA_enUS1003US1005&oq=washington+gutters+4+less&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGD0yBggCEEUYPNIBCTEyMDU3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&zx=1783969955211#sv=CAESzQEKuQEStgEKd0FKaVQ0dExEeUVoZVowbUl2V3cwRXpwUnNxWUVMUTJxREJXcGFudndPTEQ4RlNoaGV0MEN3cEdFYk9USXJ5eFhzeU5xWXd5MjQ2cnc1dzcwQ0lIbGl0MmR3RE9YUnhkd0xtWUNjYVhveVRzaUFwcHV0V3RoTkQ0EhdxRGhWYXNtX0N2V3hxdHNQOGJuRjJRWRoiQURzcjlmU2RnSjJqTmZCYjQtR2R1RWVIYnhlVS1paFgwdxIEODA1MRoBMyoAMAA4AUAAGAAghs7c3gdKAhAB",

  social: {
    google: "",
    facebook: "",
    instagram: "",
  },

  website: "https://washingtongutters4less.com",
  description:
    "Veteran-owned seamless gutter installation, replacement, guards & repairs across Washington. Free estimates in 5 counties. Call (253) 399-0300.",

  /* Primary service cities — the strongest markets. Used for top-of-funnel
   * positioning copy (hero subhead, footer, schema) and service-area page
   * sequencing. */
  primaryCities: ["Tacoma", "Bellevue"],

  /* Counties served, ordered by market prominence. From the brand site:
   * King, Pierce, Snohomish, Thurston, Mason. */
  countiesServed: [
    "King County",
    "Pierce County",
    "Snohomish County",
    "Thurston County",
    "Mason County",
  ],

  /* WA Department of Labor & Industries contractor license number.
   * Intentionally null until the correct number for this entity is supplied.
   * Components that show a license only render it when this is set. */
  license: null,

  promise:
    "Seamless gutters built for Washington weather — installed fast, priced fair, and done right the first time.",

  tagline: "The Only Gutter Company You'll Ever Need",
};
