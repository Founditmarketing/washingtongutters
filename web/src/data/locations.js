/*
 * County service-area (location) pages. One entry per county we serve.
 *
 * `cities` is derived from data/cities.js so the two never drift — each
 * location lists every CITIES entry tagged with its county. The marketing
 * copy (h1, intro, why, faqs, cta) is original, county-specific content.
 *
 * Consumed by pages/LocationsPage.jsx (index) and pages/LocationPage.jsx
 * (detail, keyed by :slug). Hero images point at /public/photos/ bases.
 */

import { CITIES } from "./cities";

/* Cities in a county. `short` is the bare county name as stored in CITIES
 * (e.g. "King"); Bothell is tagged "King/Snohomish" so it shows in both. */
const citiesFor = (short) =>
  CITIES.filter((c) =>
    c.county.split("/").map((s) => s.trim()).includes(short),
  ).map((c) => c.name);

export const LOCATIONS = [
  {
    slug: "king-county",
    county: "King County",
    heroImage: "photos/two-story-gray-maple",
    cardTeaser:
      "Eastside to Seattle's north end — gutters built for Cascade-fed rain and heavy tree cover.",
    cities: citiesFor("King"),
    metaTitle: "King County Seamless Gutters — Washington Gutters 4 Less",
    metaDesc:
      "Veteran-owned seamless gutter installation, guards & repair across King County. Free same-week written estimates. Call or text (253) 399-0300.",
    h1: "Seamless Gutters Done Right in King County",
    accent: "Done Right",
    heroLead:
      "From the Eastside to Seattle's north end, we build gutters that stand up to Cascade-fed rain and heavy tree cover. Veteran-owned, our own crew, fair written pricing.",
    chips: ["Veteran-Owned", "5 Star Rated", "Licensed, Bonded & Insured", "No Subcontractors"],
    intro: [
      "We work King County every week, and the water here does not mess around. Winter storms roll off the Cascades and dump rain for days at a time, and a gutter that is sized wrong or seamed poorly shows it fast. In Bellevue, Kirkland, and Redmond we see modern builds with big roof planes throwing sheets of water at undersized downspouts, while older homes in Renton, Shoreline, and Bothell are still fighting aging sectional gutters that leak at every joint. We form seamless gutter on-site to fit your roofline, so the water goes where it should instead of down your siding and into your foundation.",
      "The tree canopy is the other half of the story. Mature firs, cedars, and maples shade neighborhoods in Issaquah, Sammamish, Mercer Island, and Woodinville, and all that greenery means a steady load of needles, cones, and moss in your troughs. Left alone it clogs runs, holds moisture against your fascia, and turns into overflow the first hard rain of the season. We know how King County homes actually drain, and we build and protect gutters for the rain and debris you really get here, not some textbook average.",
    ],
    why: {
      heading: "Why King County Homeowners Call Us",
      points: [
        {
          title: "Fair Pricing, Put in Writing",
          text: "You get a clear written estimate, usually the same week, and that quote is good for a full year. No pressure, no moving numbers, no surprise add-ons after the crew shows up.",
        },
        {
          title: "Our Own Veteran-Led Crew",
          text: "The same veteran owner has run this outfit for years, and every job is done by our trained crew. We never hand your home off to subcontractors, so the work stays consistent from Mercer Island to Bothell.",
        },
        {
          title: "Seamless Gutter Formed On-Site",
          text: "We roll your gutter to length right at your house, so there are no factory seams to split and leak down the road. One continuous run means fewer failure points through King County's long wet season.",
        },
      ],
    },
    faqs: [
      {
        q: "Do you serve my Eastside city?",
        a: "Yes. We cover King County top to bottom, including Bellevue, Kirkland, Redmond, Sammamish, Issaquah, Woodinville, Renton, Mercer Island, Shoreline, and Bothell. If you are anywhere in Western Washington, call or text (253) 399-0300 and we will confirm we reach you.",
      },
      {
        q: "How fast can you come out for an estimate?",
        a: "Most King County homeowners get a free written estimate the same week they call. Reach us at (253) 399-0300 by phone or text, tell us your address and what is going on, and we will get you on the schedule quickly.",
      },
      {
        q: "What about all the needles and moss on our gutters here?",
        a: "That is one of the most common calls we get. Fir needles, cones, and moss build up fast under the Eastside and Seattle-area canopy. We offer gutter cleaning to clear what is there and gutter guards sized for our region's debris, so your runs keep flowing through the wet months instead of overflowing.",
      },
    ],
    ctaHeading: "Ready for Gutters That Handle King County Rain?",
    ctaText:
      "Call or text (253) 399-0300 for a free, same-week written estimate. Veteran-owned, our own crew, and the quote is good for a full year. We are the only gutter company you'll ever need.",
  },

  {
    slug: "pierce-county",
    county: "Pierce County",
    heroImage: "photos/tan-rancher-lawn",
    cardTeaser:
      "Our Tacoma home turf — seamless gutters formed on-site across the South Sound.",
    cities: citiesFor("Pierce"),
    metaTitle: "Pierce County Seamless Gutters — Washington Gutters 4 Less",
    metaDesc:
      "Veteran-owned seamless gutters across Pierce County — Tacoma, Puyallup, Gig Harbor & Lakewood. Free same-week estimates. Call (253) 399-0300.",
    h1: "Seamless Gutters, Formed On-Site Across Pierce County",
    accent: "Pierce County",
    heroLead:
      "Tacoma and the 253 are our home base, so Pierce County is where our veteran-led crew works week in and week out. Free, same-week written estimates — call or text (253) 399-0300.",
    chips: ["Veteran-Owned", "5 Star Rated in WA", "No Subcontractors", "Free Written Estimates"],
    intro: [
      "We live and work here. Tacoma is our home base, and from there our crew runs the South Sound every week — Puyallup, University Place, Lakewood, Gig Harbor, and up into the Rainier foothills toward Bonney Lake and Buckley. Pierce County sits under some of the heaviest tree cover in the region: towering Douglas fir and cedar that shed needles all year, plus long, wet maritime winters that keep your roofline soaked from October into spring. That combination is hard on gutters, and we know exactly what it does to a house.",
      "The trouble with the old sectional gutters you'll find on a lot of Spanaway and Graham homes is the seams. Every joint is a spot for fir needles and moss to snag, and once a run clogs, that South Sound rain sheets right over the edge onto your fascia and down against the foundation. We fix that by forming seamless aluminum gutters on-site, cut to your roofline in one continuous run with no seams to fail. Fewer joints means fewer clogs, fewer leaks, and gutters that actually carry Pierce County's winter downpours where they belong.",
    ],
    why: {
      heading: "Why Pierce County Homeowners Call Us",
      points: [
        {
          title: "Fair, Written Pricing",
          text: "You get a real written quote before any work starts — not a number scribbled on a business card. It spells out the job and the price, and it's good for a full year, so you can plan on your schedule instead of ours.",
        },
        {
          title: "Our Own Veteran-Led Crew",
          text: "Same veteran owner for years, and the crew on your Tacoma or Gig Harbor roof is our crew — trained, licensed, bonded, and insured in Washington. We don't hand your job to subcontractors, so the people who quote it are the people who hang it.",
        },
        {
          title: "Seamless, Formed On-Site, Fast",
          text: "We roll the aluminum into one continuous run right in your driveway, sized for the rain that pours off Pierce County roofs. And because we're based right here, we can usually get out for a written estimate the same week you call.",
        },
      ],
    },
    faqs: [
      {
        q: "Do you install gutters in Gig Harbor, Graham, and the smaller Pierce County towns?",
        a: "Yes. We cover all of Pierce County from our Tacoma base — Gig Harbor, Graham, Puyallup, Lakewood, University Place, Spanaway, Bonney Lake, and out to Buckley in the Rainier foothills. If you're in the county, we serve you. Call or text (253) 399-0300 and we'll confirm your address.",
      },
      {
        q: "How fast can you come out for an estimate?",
        a: "Because our crew is based right here in the South Sound, we can usually get to your Pierce County home for a free written estimate the same week you reach out. Call or text (253) 399-0300 and we'll set a time that works for you.",
      },
      {
        q: "What about all the fir needles and moss on gutters around here?",
        a: "That's the number one gutter problem in Pierce County. Douglas fir and cedar drop needles year-round, and our wet winters grow moss fast. Seamless gutters clog far less than old sectional ones because there are no joints to catch debris, and we install gutter guards to keep needles out for good. We also handle cleaning if your current gutters are already packed.",
      },
    ],
    ctaHeading: "Get Your Free Pierce County Estimate",
    ctaText:
      "Call or text (253) 399-0300 for a free, same-week written quote that's good for a full year. From Tacoma to Buckley, we do it right the first time — the only gutter company you'll ever need.",
  },

  {
    slug: "snohomish-county",
    county: "Snohomish County",
    heroImage: "photos/blue-rancher",
    cardTeaser:
      "North Sound rain and year-round needle drop, handled — Everett to Monroe.",
    cities: citiesFor("Snohomish"),
    metaTitle: "Snohomish County Gutters — Washington Gutters 4 Less",
    metaDesc:
      "Seamless gutters, guards & repair across Snohomish County — Everett to Marysville. Veteran-owned, free same-week estimates. (253) 399-0300.",
    h1: "Seamless Gutters Built for Snohomish County Rain",
    accent: "Snohomish County",
    heroLead:
      "Gutters sized and formed for North Sound rain and year-round evergreen needle drop — from Everett and Edmonds to Marysville and Monroe.",
    chips: ["Veteran-Owned", "No Subcontractors", "5-Star Rated in WA", "Free Written Estimates"],
    intro: [
      "We run seamless gutter work across Snohomish County just about every week of the year — Everett, Lynnwood, Edmonds, Mill Creek and Mukilteo, and up through Marysville, Lake Stevens and Monroe. The North Sound catches some of the heaviest rain in the metro, and it doesn't fall politely. When a system rolls in off the water, your roofline has to move a lot of water fast, and gutters that were sized wrong or hung crooked show it in a hurry: sheeting over the front edge, staining the fascia, and dumping straight against the foundation.",
      "The other half of the job up here is the trees. Snohomish County lives under a thick evergreen canopy, and the cedars, firs and hemlocks drop needles all year — not just leaves for a few weeks in October. Those needles pack into open gutters, hold water, and feed the moss that loves our damp shade. We size the gutters and downspouts for real North Sound rainfall, form each run on-site to fit the house, and set the pitch so needles and grit flush through instead of building a dam. Whether you're on an older place in Snohomish or a newer subdivision in Bothell, we build the system for how it actually rains here.",
    ],
    why: {
      heading: "Why Snohomish County Homeowners Call Us First",
      points: [
        {
          title: "Fair Pricing, in Writing",
          text: "You get a free, same-week written estimate with the number spelled out — materials, footage, downspouts, all of it. No pressure pitch and no moving target. The quote stays good for a full year, so you can plan the project on your schedule instead of ours.",
        },
        {
          title: "Our Own Veteran-Led Crew",
          text: "This is a veteran-owned shop with years on the ladder, and the crew that shows up is our crew — never a subcontractor. The same trained hands that measure your Edmonds or Mill Creek roofline are the ones who hang the steel and clean up when the job's done.",
        },
        {
          title: "Seamless Gutters Formed On-Site",
          text: "We roll each run off a single coil of aluminum right in your driveway, cut to fit the house with no mid-run seams to split or leak. Fewer joints means fewer failure points — and a lot less for North Sound needles and grit to snag on.",
        },
      ],
    },
    faqs: [
      {
        q: "Do you serve my town in Snohomish County?",
        a: "Yes. Washington Gutters 4 Less covers Snohomish County top to bottom — Everett, Lynnwood, Edmonds, Mukilteo, Mill Creek, Marysville, Lake Stevens, Snohomish, Monroe and Bothell all included. If you're anywhere in the North Sound, call or text (253) 399-0300 and we'll confirm we're out your way.",
      },
      {
        q: "How fast can you come out for an estimate?",
        a: "Usually the same week. We keep our schedule tight to Snohomish County, so once you call or text (253) 399-0300 we can typically get out to measure within a few days and hand you a written quote on the spot. That quote stays good for a full year.",
      },
      {
        q: "The fir needles and moss wreck my gutters every year — what can you do about it?",
        a: "That's the number one problem we solve up here. We size the gutters and downspouts for our heavy rain, add gutter guards built to shed conifer needles, and knock back the buildup with a proper cleaning so the system stops damming up under the evergreens. We'll walk your roofline and tell you straight what it actually needs.",
      },
    ],
    ctaHeading: "Get Your Free Snohomish County Gutter Estimate",
    ctaText:
      "Call or text (253) 399-0300 for a free, same-week written quote. Veteran-owned, licensed, bonded and insured in Washington State — and the only gutter company you'll ever need.",
  },

  {
    slug: "thurston-county",
    county: "Thurston County",
    heroImage: "photos/navy-rancher",
    cardTeaser:
      "Capital-region wet winters, sized and pitched to keep water off your foundation.",
    cities: citiesFor("Thurston"),
    metaTitle: "Thurston County Seamless Gutters — Washington Gutters 4 Less",
    metaDesc:
      "Veteran-owned seamless gutter installation, repair & guards across Thurston County. Free same-week written estimates. Call or text (253) 399-0300.",
    h1: "Seamless Gutters Built to Beat Thurston County Rain",
    accent: "Thurston County Rain",
    heroLead:
      "Veteran-owned, no subcontractors, and formed on your driveway to fit your home exactly. Free written estimates the same week you call.",
    chips: ["Veteran-Owned", "5 Star Rated in WA", "2,291+ Customers", "Licensed, Bonded & Insured"],
    intro: [
      "Down in the capital region, the rain settles in and stays a while. We handle gutter work across Thurston County — the older neighborhoods around downtown Olympia, the newer builds spreading across Lacey, and the hillside lots up in Tumwater — and this corner of the South Sound drinks water from October clear through spring. When the runoff off a roof has nowhere clean to go, it finds the foundation instead, and on the low-lying lots common around here that turns into standing water, soggy crawl spaces, and cracks you pay for later.",
      "Add in the big-leaf maples and the conifers that shed needles and moss all year, and undersized or clogged gutters simply can't keep up with a real Puget Sound downpour. We size and pitch every run for how hard it actually rains here, tie the downspouts into drainage that carries water away from the house, and build gutters that shrug off the wet season instead of surrendering to it. One crew, one standard, done right the first time.",
    ],
    why: {
      heading: "Why Thurston County Homeowners Call Us",
      points: [
        {
          title: "An Honest Number, In Writing",
          text: "You get a clear written quote before we touch anything, and it holds for a full year. No surprise add-ons after the trucks show up, no pressure, just an honest number for the work your Olympia or Lacey home actually needs.",
        },
        {
          title: "The Crew That Quotes It Installs It",
          text: "The same veteran owner has run this company for years, and we never hand your job to subcontractors. The trained crew that measures your home is the crew that installs it, so accountability never gets passed down the line.",
        },
        {
          title: "Seamless Runs, Cut On Your Driveway",
          text: "We roll seamless gutter on your driveway and cut it to your exact rooflines, so there are no stitched-together seams to leak once the Tumwater winter rains hit. Fewer joints means fewer failure points and far less maintenance.",
        },
      ],
    },
    faqs: [
      {
        q: "Do you serve Olympia, Lacey, and Tumwater?",
        a: "Yes. We cover all of Thurston County's capital-region core, including Olympia, Lacey, and Tumwater, plus the surrounding communities. If you are anywhere in the county, call or text (253) 399-0300 and we will confirm we cover your street.",
      },
      {
        q: "How fast can you come out for an estimate?",
        a: "We offer free, same-week written estimates. Call or text (253) 399-0300 and we will get out to measure your home, usually within days, and leave you a written quote that stays good for a full year.",
      },
      {
        q: "What about all the needles and moss from our conifers and maples?",
        a: "That is exactly the problem we solve here. Between big-leaf maple debris and conifer needles, open gutters clog fast in Thurston County. We install gutter guards sized for our tree cover and offer cleaning to keep water moving instead of overflowing onto your foundation.",
      },
    ],
    ctaHeading: "Ready for Gutters That Handle a South Sound Winter?",
    ctaText:
      "Call or text Washington Gutters 4 Less at (253) 399-0300 for a free, same-week written estimate anywhere in Thurston County. Veteran-owned, licensed, bonded and insured, and we do it right the first time.",
  },

  {
    slug: "mason-county",
    county: "Mason County",
    heroImage: "photos/cedar-carport",
    cardTeaser:
      "Hood Canal timber country — built for Shelton and Belfair's heavy needle load.",
    cities: citiesFor("Mason"),
    metaTitle: "Mason County Gutters — Washington Gutters 4 Less",
    metaDesc:
      "Veteran-owned seamless gutters for Mason County — Shelton, Belfair and Hood Canal. Free same-week written estimates. Call or text (253) 399-0300.",
    h1: "Seamless Gutters Made for Mason County Timber Country",
    accent: "Mason County Timber Country",
    heroLead:
      "From Shelton to Belfair, we form seamless gutters on-site to handle Hood Canal's heavy needle load and a wet season that never seems to quit. Veteran-owned, our own crew, free written estimates the same week.",
    chips: ["Veteran-Owned", "5-Star Rated in WA", "Licensed, Bonded & Insured", "Free Written Estimates"],
    intro: [
      "Out here in Mason County, the trees don't take a day off. The wooded lots around Shelton, Belfair, and the Hood Canal shoreline drop some of the heaviest needle and leaf loads in Western Washington, and our wet season runs long enough to keep a gutter system working overtime. When fir, cedar, and bigleaf maple debris packs into an undersized or sagging run, water spills behind the fascia, pools against the foundation, and finds every soft spot in a house — which is exactly what we get called out to fix.",
      "We've worked these timber-country roads for years, so we build for what Mason County actually throws at a roofline, not some flat, sunny suburb. Every run is seamless, formed on-site to the exact length of your home, with downspouts sized to keep up with a real Hood Canal downpour. No subcontractors touch your property — it's our own trained, veteran-led crew from the first measurement to the last screw. We quote it straight, put it in writing, and do it right the first time.",
    ],
    why: {
      heading: "Why Mason County Homeowners Call Us",
      points: [
        {
          title: "Written Pricing, Good for a Year",
          text: "You get a free, same-week written estimate — not a number scribbled on the back of a card. The price we put in writing holds for a full year, so you can plan the project on your schedule instead of ours.",
        },
        {
          title: "Our Own Veteran-Led Crew",
          text: "The crew on your Shelton or Belfair property is ours: trained, insured, and led by the same veteran owner who has run this company for twenty years. We never hand your home off to a subcontractor.",
        },
        {
          title: "Seamless Gutters Formed On-Site",
          text: "We roll every gutter to length right in your driveway, so there are no leaky seams to fail halfway through a long wet winter. We size the troughs and downspouts for Mason County's needle load and rainfall, and we get most jobs on the books the same week.",
        },
      ],
    },
    faqs: [
      {
        q: "Do you serve Shelton, Belfair, and the rural parts of Mason County?",
        a: "Yes. We cover Mason County from Shelton and the Belfair area out to the wooded lots and shoreline homes along Hood Canal. Long gravel driveways and heavily treed properties are normal for us — call or text (253) 399-0300 and we'll confirm we reach you.",
      },
      {
        q: "How fast can you get out for an estimate?",
        a: "In most cases the same week. We give free, written estimates, so you'll know the real price before any work starts, and that quote stays good for a full year. Reach us at (253) 399-0300 to get on the schedule.",
      },
      {
        q: "My gutters are always packed with needles and moss out here. What can you do about that?",
        a: "That's the number-one problem in Mason County. We install gutter guards matched to fine fir and cedar needles, upsize downspouts so debris flushes through instead of damming up, and offer straight gutter cleaning when a system just needs to be cleared and reset. We'll tell you honestly which one your home actually needs.",
      },
    ],
    ctaHeading: "Free Written Estimates Across Mason County",
    ctaText:
      "Call or text (253) 399-0300 for a free, same-week written estimate on seamless gutters, gutter guards, or repairs anywhere in Mason County — Shelton, Belfair, and the Hood Canal shoreline. We're the only gutter company you'll ever need.",
  },
];

export const getLocation = (slug) => LOCATIONS.find((l) => l.slug === slug);
