/*
 * Blog posts — migrated from washingtongutters4less.com/blogs/ (the brand's
 * own content). Each post's body is an ordered list of blocks:
 *   { t: "p" | "h2" | "h3", text }
 *   { t: "ul", items: [...] }
 *   { t: "img", image, alt }   // `image` is a /public base (ResponsiveImg)
 *
 * The shared "How It Works" steps and closing CTA live in BlogPostPage, since
 * they're identical across every post on the original site.
 */

export const POSTS = [
  {
    slug: "gutter-installation-lacey",
    title: "Lacey's Gutter Installation Experts",
    category: "Thurston County",
    categorySlug: "thurston-county",
    date: "2025-04-25",
    dateDisplay: "April 25, 2025",
    readMinutes: 3,
    heroImage: "blog/lacey",
    heroAlt: "Washington Gutters 4 Less installer fitting a new seamless gutter on a Lacey home.",
    excerpt:
      "In Lacey, your gutters are your home's first line of defense. Here's how we install systems built to handle Thurston County's wettest winters — and last for decades.",
    body: [
      { t: "p", text: "In Lacey, when the rain comes — it doesn't ask if your gutters are ready. They either work… or they don't. That's why smart homeowners call the experts who build gutters the right way, the first time." },
      { t: "p", text: "At Washington Gutters 4 Less, we specialize in premium gutter installation for homes and businesses across Lacey, WA. We don't cut corners. We don't believe in “good enough.” We believe in craftsmanship that protects your home for decades." },
      { t: "p", text: "Because in a place like Lacey, your gutters aren't just another accessory. They're your first line of defense." },
      { t: "h2", text: "Why Lacey Trusts Us for Gutter Installation" },
      { t: "p", text: "Gutters have one job: direct water safely away from your home. But poor materials, sloppy installation, or the wrong system for your roof can lead to water damage, foundation problems, and thousands in repairs." },
      { t: "p", text: "That's why we install only the best:" },
      { t: "ul", items: [
        "Seamless Aluminum Gutters — Custom-built on-site for a flawless, leak-free fit.",
        "Heavy-Duty Steel Gutters — For maximum strength and durability.",
        "Gutter Guard Systems — Keep leaves and debris out, water flowing, and your ladder in the garage where it belongs.",
        "Custom Styles and Colors — Your gutters will work hard and look great doing it.",
      ] },
      { t: "p", text: "Each system is designed specifically for your home — not slapped together from whatever's on the truck." },
      { t: "img", image: "blog/lacey-inline", alt: "Close-up of a gutter guard being installed along a shingle roofline in Lacey, WA." },
      { t: "h2", text: "Local Knowledge. Lasting Results." },
      { t: "p", text: "We know Lacey. We know the wet winters, the mossy roofs, the heavy downpours that can hammer your gutters for days. Our experience with Thurston County homes means we know exactly what works — and what doesn't." },
      { t: "p", text: "From steep rooflines to split-level homes, we know how to engineer a system that not only handles the rain but also enhances your home's value and curb appeal." },
      { t: "p", text: "Our crews are professional, polite, and precise. We show up on time. We clean up when we're done. And most importantly — we install gutters that last." },
      { t: "h2", text: "The Details Matter" },
      { t: "p", text: "A gutter system is only as good as its weakest link. That's why we obsess over the details — the pitch, the spacing, the downspout placement. It's why we use better hangers, stronger fasteners, and more durable materials than the other guys." },
      { t: "p", text: "Your home deserves more than just “standard.” It deserves a system that performs flawlessly — season after season, storm after storm." },
      { t: "p", text: "We believe every Lacey homeowner should have peace of mind knowing their gutters are working hard even when the rain won't quit." },
      { t: "h2", text: "Book Your Free Gutter Consultation in Lacey Today" },
      { t: "p", text: "If you're looking for the cheapest price, plenty of companies can rush a job for you. But if you're looking for gutters installed by real craftsmen — people who care about doing it right — we invite you to call us." },
    ],
  },

  {
    slug: "gutter-installation-olympia",
    title: "Olympia's Trusted Gutter Installation Experts",
    category: "Thurston County",
    categorySlug: "thurston-county",
    date: "2025-04-25",
    dateDisplay: "April 25, 2025",
    readMinutes: 3,
    heroImage: "blog/olympia",
    heroAlt: "Established Olympia-area home with freshly installed white seamless gutters by Washington Gutters 4 Less.",
    excerpt:
      "When it rains in Olympia, it pours. See why homeowners trust us to install gutters once, install them right, and stand behind every inch.",
    body: [
      { t: "p", text: "When it rains in Olympia, it pours. And if your gutters aren't up to the job, the damage to your home can cost you thousands. That's why smart homeowners trust us — the gutter installation experts who do it once, do it right, and make it last." },
      { t: "p", text: "At Washington Gutters 4 Less, we don't believe in shortcuts. We believe in craftsmanship, precision, and the kind of service that turns first-time customers into lifelong clients. Our mission is simple: install the best gutters in Olympia — and stand behind every inch of them." },
      { t: "h2", text: "Why Olympia Homeowners Choose Us" },
      { t: "p", text: "Olympia weather demands quality. From drizzles to downpours, your gutters have to perform. That's why we install only top-grade materials built to handle the Pacific Northwest's toughest conditions. We offer:" },
      { t: "ul", items: [
        "Seamless Aluminum Gutters — Custom fit to your home, leak-resistant, and built to endure.",
        "Steel Gutters — For homeowners who want the ultimate in strength and durability.",
        "Gutter Guards — Say goodbye to clogged gutters and risky ladder climbs.",
        "Custom Colors and Styles — Gutters that not only protect, but also enhance your home's curb appeal.",
      ] },
      { t: "p", text: "Every installation is tailored to the specific needs of your home. No “one-size-fits-all” gimmicks. No upsells you don't need. Just honest, expert craftsmanship — guaranteed." },
      { t: "h2", text: "Local Experts Who Understand Olympia" },
      { t: "p", text: "We live here. We work here. And we know exactly what Olympia homes need to withstand the wet season. Our team knows the soil, the rainfall patterns, and even the architectural styles common in Thurston County. That's important — because the wrong pitch, the wrong material, or the wrong installation technique could cost you thousands in hidden damage later." },
      { t: "p", text: "When you hire us, you're not getting a cookie-cutter contractor. You're getting Olympia's gutter specialists — professionals who measure twice, cut once, and treat your home like it's their own." },
      { t: "h2", text: "The Difference Is In the Details" },
      { t: "p", text: "Anyone can slap gutters on a house. We engineer drainage systems. Systems that protect your foundation, preserve your landscaping, and defend your roof. Systems that are virtually maintenance-free and built to last for decades." },
      { t: "p", text: "Before we lift a ladder, we inspect your home, your roofline, and your existing drainage. We identify problem areas and solve them before they become expensive headaches." },
      { t: "p", text: "And after installation? We stand behind our work with a rock-solid warranty — because your peace of mind matters." },
      { t: "h2", text: "Schedule Your Free Olympia Gutter Consultation Today" },
    ],
  },

  {
    slug: "gutter-repair-tacoma",
    title: "The Gutter Repair Experts Tacoma Trusts",
    category: "Pierce County",
    categorySlug: "pierce-county",
    date: "2025-04-23",
    dateDisplay: "April 23, 2025",
    readMinutes: 3,
    heroImage: "blog/tacoma",
    heroAlt: "Washington Gutters 4 Less technician repairing a downspout on a Tacoma home.",
    excerpt:
      "A failing gutter is a slow, silent destroyer of homes. Meet the Tacoma gutter-repair specialists who fix leaks, sags, and drainage problems the right way.",
    body: [
      { t: "h2", text: "Protect Your Home from Water Damage — Get It Fixed Right the First Time" },
      { t: "p", text: "When your gutters stop doing their job, your home is at risk." },
      { t: "p", text: "And yet, most homeowners don't realize the danger until it's too late — until the water starts pooling near the foundation, the fascia boards are rotting, or the mold creeps in where it shouldn't." },
      { t: "p", text: "Let us be blunt: a failing gutter system is not just a nuisance. It's a slow, silent destroyer of homes. But not if you act quickly and call the right team." },
      { t: "p", text: "We specialize in one thing and one thing only: fixing broken, leaking, or sagging gutters with precision, care, and craftsmanship that would make your grandfather proud." },
      { t: "p", text: "We are not general contractors dabbling in gutters — we are gutter specialists. Every member of our team is trained to diagnose issues fast, repair them with excellence, and leave your property cleaner than we found it. That's how we've earned the trust of homeowners across Tacoma and the surrounding area." },
      { t: "img", image: "blog/tacoma-inline", alt: "Technician re-securing a seamless gutter along a Tacoma-area roofline." },
      { t: "h3", text: "Why Choose Us?" },
      { t: "p", text: "Because in a sea of handymen and fly-by-night repairmen, we're the team with a track record. A team that shows up on time, tells the truth, and charges a fair price. No pushy upsells. No mystery charges. Just honest-to-goodness work done right." },
      { t: "p", text: "We fix:" },
      { t: "ul", items: [
        "Leaking corners and joints",
        "Sagging gutters and broken hangers",
        "Improper drainage and slope problems",
        "Rusted or damaged gutter sections",
        "Clogged downspouts and overflow issues",
      ] },
      { t: "p", text: "If your gutter problem can be fixed, we'll fix it. If it's beyond repair, we'll tell you straight — and if replacement is needed, we'll give you options that fit your home and your budget." },
      { t: "h3", text: "We're Local. And That Matters." },
      { t: "p", text: "We know Tacoma. We know its weather, its storms, and its seasons. We know what heavy rain does to an unprotected home and how vital it is to have a gutter system that performs flawlessly. We're not a franchise or a corporate outfit with an out-of-state call center. We're local, independent, and proud to be serving this community one home at a time." },
      { t: "h3", text: "Call Today. Sleep Better Tonight." },
      { t: "p", text: "A quick phone call can save you thousands in future repairs — and more importantly, give you peace of mind that your home is protected." },
      { t: "p", text: "Let us earn your trust the way we've earned it from hundreds of other satisfied customers: by doing exceptional work, without the nonsense." },
      { t: "p", text: "Call now for a free estimate. Let's put an end to your gutter worries — before the next storm hits." },
    ],
  },
];

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);
