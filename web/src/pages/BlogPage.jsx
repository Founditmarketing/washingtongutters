import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import { POSTS } from "../data/blog";
import { SITE } from "../data/site";

/*
 * Blog index — lists every post as a card. Points the "Blog" nav item here.
 */
export default function BlogPage() {
  document.title = `Blog — ${SITE.name}`;

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="blog" />

      <PageHero
        eyebrow="Blog"
        title="Gutter know-how from around the Sound."
        accent="around the Sound."
        lead="Local guides and straight talk on gutter installation, repair, and protection across Western Washington — written by the crew that does the work."
        chips={["Veteran-Owned", `${SITE.rating.label}`, `${SITE.customersServed}+ customers`]}
      />

      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}/`}
              className="haptic group flex flex-col bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-tile)] overflow-hidden hover:border-[var(--color-copper)]/50 transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[var(--color-royal)]">
                <ResponsiveImg
                  base={post.heroImage}
                  alt={post.heroAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 text-[11px] text-[var(--color-slate)]/55 mb-3">
                  <span className="inline-flex items-center gap-1 text-[var(--color-copper)] font-semibold uppercase tracking-[0.14em]">
                    <MapPin className="w-3.5 h-3.5" /> {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.dateDisplay}
                  </span>
                </div>
                <h2 className="font-display-bold uppercase text-xl text-[var(--color-royal)] leading-tight tracking-tight mb-3">
                  {post.title}
                </h2>
                <p className="text-[var(--color-slate)]/70 text-[14.5px] leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[var(--color-royal)] group-hover:text-[var(--color-copper)] font-semibold text-sm transition-colors">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
