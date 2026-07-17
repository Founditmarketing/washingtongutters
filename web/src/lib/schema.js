/*
 * JSON-LD generators. Each function returns a plain object that can be
 * serialized via <script type="application/ld+json">. Keep this file the
 * only place schema is defined — pages compose schemas, not invent them.
 */

import { SITE } from "../data/site";
import { SERVICES } from "../data/services";
import { CITIES } from "../data/cities";

const baseUrl = SITE.website;

/* Topics the business is an authority on — a strong entity-authority signal
 * for AI / answer engines (semantic disambiguation of what we "know about"). */
const KNOWS_ABOUT = [
  "Seamless gutters",
  "Gutter installation",
  "Gutter replacement",
  "Gutter repair",
  "Gutter guards",
  "Soffit and fascia repair",
  "Aluminum K-style gutters",
  "Downspouts and rainwater drainage",
  "Pacific Northwest rainwater management",
  "Residential gutter services",
];

/* areaServed as both counties (AdministrativeArea) and the strongest cities
 * (City) so local/GEO retrieval can match either granularity. */
const AREA_SERVED = [
  ...SITE.countiesServed.map((c) => ({
    "@type": "AdministrativeArea",
    name: `${c}, ${SITE.address.regionFull}`,
  })),
  ...CITIES.filter((c) => c.tier === 1).map((c) => ({
    "@type": "City",
    name: `${c.name}, ${SITE.address.regionFull}`,
  })),
];

export function localBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${baseUrl}#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: baseUrl,
    telephone: SITE.phone.raw,
    image: `${baseUrl}/og-default.jpg`,
    logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` },
    brand: { "@type": "Brand", name: SITE.name },
    slogan: SITE.tagline,
    priceRange: "$$",
    currenciesAccepted: "USD",
    description: SITE.description,
    knowsAbout: KNOWS_ABOUT,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.2529,
      longitude: -122.4443,
    },
    areaServed: AREA_SERVED,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone.raw,
      contactType: "customer service",
      areaServed: "US-WA",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gutter Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short || s.desc,
          url: `${baseUrl}/services/${s.slug}/`,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(SITE.rating.value),
      ratingCount: String(SITE.rating.count),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
  };

  /* Phone-only contact policy — only emit email / posted hours when set. */
  if (SITE.email) schema.email = SITE.email;
  if (SITE.hours) {
    schema.openingHoursSpecification = [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.hours.weekdays.open,
        closes: SITE.hours.weekdays.close,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: SITE.hours.saturday.open,
        closes: SITE.hours.saturday.close,
      },
    ];
  }

  return schema;
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@id": `${baseUrl}#business` },
    areaServed: SITE.countiesServed.map((c) => ({
      "@type": "AdministrativeArea",
      name: `${c}, ${SITE.address.regionFull}`,
    })),
    description: service.short || service.desc,
    url: `${baseUrl}/services/${service.slug}/`,
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

/*
 * FAQPage schema — the highest-leverage structured data for AI search and
 * answer engines. Each Q&A becomes a Question/acceptedAnswer pair that
 * Google, Bing, and LLM-backed search can lift directly into a rich result
 * or a generated answer.
 *
 * `faqs` is the ALL_FAQS array from data/faqs.js: [{ q, a: [para, ...] }].
 * The answer paragraphs are joined into a single string so the schema text
 * matches exactly what the page renders (a requirement for FAQ rich
 * results). Google forbids HTML tags other than a small allow-list here, so
 * we emit plain text.
 */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/faq/#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(a) ? a.join("\n\n") : a,
      },
    })),
  };
}

export function blogPostingSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}/blog/${post.slug}/#post`,
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}/${post.heroImage}-1024.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE.name, "@id": `${baseUrl}#business` },
    publisher: { "@id": `${baseUrl}#business` },
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}/`,
    articleSection: post.category,
  };
}

export function reviewSchema(reviews) {
  return reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(r.rating),
      bestRating: "5",
    },
    author: { "@type": "Person", name: r.name },
    reviewBody: r.text,
    itemReviewed: { "@id": `${baseUrl}#business` },
  }));
}
