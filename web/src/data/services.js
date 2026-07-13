import { Hammer, RefreshCw, Wrench, Shield, Home } from "lucide-react";

/*
 * The five services this business offers. Order controls the homepage grid
 * (first four are featured) and the footer/location-page service lists.
 *
 * Each service has an `image` base name. Components build <picture>
 * elements with /<base>-640.{avif,webp,jpg} and /<base>-1024.{avif,webp,jpg}
 * via the optimize-images pipeline.
 */

export const SERVICES = [
  {
    slug: "gutter-installation",
    icon: Hammer,
    title: "Gutter Installation",
    short: "New continuous aluminum gutters formed on-site to your exact run lengths.",
    desc:
      "Continuous aluminum gutters formed on-site to your exact run lengths. Zero seams, zero leaks.",
    image: "service-install-real",
    photoAlt:
      "Close-up of a fresh white seamless gutter with mounting bracket installed along a residential roofline.",
  },
  {
    slug: "gutter-replacement",
    icon: RefreshCw,
    title: "Gutter Replacement",
    short: "Pull and replace failing gutters in a single day.",
    desc:
      "Old gutters failing? We pull, dispose, and replace in a single day with cleanup included.",
    image: "service-replace-real",
    photoAlt:
      "New white seamless gutter running along a residential roofline with clean fascia board and shingle detail.",
  },
  {
    slug: "gutter-repair",
    icon: Wrench,
    title: "Gutter Repair",
    short: "Leaks, sags, and loose downspouts fixed right — often the same visit.",
    desc:
      "Leaking seams, sagging runs, or a downspout pulled off the house? We find the real problem and fix it to last, so you don't replace a whole system before its time.",
    image: "service-repair-real",
    photoAlt:
      "Close-up of a residential seamless gutter and downspout corner being repaired along the roofline.",
  },
  {
    slug: "gutter-guards",
    icon: Shield,
    title: "Gutter Guards",
    short: "Stop pine needles, leaves, and PNW moss before they cost you a roof.",
    desc:
      "Stop pine needles, leaves, and PNW moss before they cost you a roof. Lifetime guard options.",
    image: "service-guards-real",
    photoAlt:
      "Close-up of a micro-mesh gutter guard installed along a residential shingle roofline, showing the fine mesh that keeps pine needles and Pacific Northwest moss out of the gutter.",
  },
  {
    slug: "soffit-and-fascia-repair",
    icon: Home,
    title: "Soffit or Fascia",
    short: "Rotted wood behind your gutters? We rebuild it before re-hanging.",
    desc:
      "Rotted wood behind your gutters? We rebuild it with primed cedar or composite, then re-hang clean.",
    image: "service-soffit-real",
    photoAlt:
      "Brown seamless gutter and downspout with ventilated soffit detail on a brick-facade craftsman home.",
  },
];
