import { useParams, Navigate, Link } from "react-router-dom";
import { Phone, ArrowRight, ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema, blogPostingSchema } from "../lib/schema";
import { POSTS, getPost } from "../data/blog";
import { SITE } from "../data/site";

/* Shared closing steps + CTA — identical across posts on the original site. */
const STEPS = [
  { n: "01", title: "Call Us For a Free Quote", text: "We're here to guide you and give you a detailed estimate." },
  { n: "02", title: "Schedule a Consultation Visit", text: "We'll get to work at a time that suits your needs." },
  { n: "03", title: "Zero-Hassle Gutter Service", text: "Enjoy seamless, professional service." },
];

function Block({ block }) {
  switch (block.t) {
    case "h2":
      return (
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-10 mb-4 leading-[1.05]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display-bold uppercase text-xl text-[var(--color-royal)] mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[var(--color-slate)]/80 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-copper)] shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <div className="my-8 rounded-[var(--radius-tile)] overflow-hidden border border-[var(--color-line)]">
          <ResponsiveImg
            base={block.image}
            alt={block.alt}
            sizes="(max-width: 720px) 100vw, 680px"
            className="w-full h-auto object-cover"
          />
        </div>
      );
    default:
      return (
        <p className="text-[var(--color-slate)]/80 leading-[1.7] text-[16px] lg:text-[17px] my-4">
          {block.text}
        </p>
      );
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/blog/" replace />;

  document.title = `${post.title} — ${SITE.name}`;

  const others = POSTS.filter((p) => p.slug !== post.slug);

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
      { name: post.title, path: `/blog/${post.slug}/` },
    ]),
    blogPostingSchema(post),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id={`blog-${post.slug}`} />

      <PageHero
        eyebrow="Blog"
        title={post.title}
        lead={post.excerpt}
        image={post.heroImage}
        imageAlt={post.heroAlt}
      />

      {/* ── ARTICLE ── */}
      <article className="py-[var(--space-section-md)]">
        <div className="max-w-[880px] mx-auto px-[var(--space-page-x)]">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-slate)]/60 pb-6 mb-8 border-b border-[var(--color-line)]">
            <Link
              to={`/locations/${post.categorySlug}/`}
              className="inline-flex items-center gap-1.5 text-[var(--color-copper)] font-semibold uppercase tracking-[0.14em] text-[11px] hover:underline"
            >
              <MapPin className="w-3.5 h-3.5" /> {post.category}
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {post.dateDisplay}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readMinutes} min read
            </span>
          </div>

          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {/* ── HOW IT WORKS ── */}
      <section className="py-[var(--space-section-md)] bg-[var(--color-bone)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <div className="text-center mb-12">
            <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-3">
              How It Works
            </div>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)]">
              Three steps. <span className="text-[var(--color-copper)]">Zero hassle.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-7"
              >
                <div className="font-display-black text-5xl text-[var(--color-copper)]/25 leading-none mb-4">
                  {s.n}
                </div>
                <h3 className="font-display text-xl text-[var(--color-royal)] mb-2">{s.title}</h3>
                <p className="text-[var(--color-slate)]/70 text-[15px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-[var(--space-section-lg)] bg-[var(--color-royal-deep)] relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-10 pointer-events-none" aria-hidden />
        <div className="relative max-w-[var(--max-prose)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white leading-[0.95]">
            Don't Gamble with Your Home's{" "}
            <span className="text-[var(--color-copper)]">First Line of Defense.</span>
          </h2>
          <p className="text-white/75 mt-5 text-[16px] lg:text-lg leading-relaxed">
            When water flows the wrong way, it can cost you thousands in foundation damage, wood rot,
            and mold. Protect your investment with the company homeowners trust — Washington Gutters 4 Less.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-7 py-4 rounded-full font-display-bold uppercase tracking-tight shadow-lg shadow-[var(--color-copper)]/25"
            >
              <Phone className="w-4 h-4" /> Call {SITE.phone.display}
            </a>
            <a
              href="/contact/#estimate"
              className="haptic inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white px-7 py-4 rounded-full font-display-bold uppercase tracking-tight transition-colors"
            >
              Free written estimate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── MORE POSTS ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display-black uppercase text-2xl text-[var(--color-royal)]">
            More from the blog
          </h2>
          <Link
            to="/blog/"
            className="haptic inline-flex items-center gap-1.5 text-[var(--color-royal)] hover:text-[var(--color-copper)] font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}/`}
              className="haptic group flex gap-4 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] overflow-hidden hover:border-[var(--color-copper)]/50 transition-colors"
            >
              <div className="w-32 shrink-0 overflow-hidden bg-[var(--color-royal)]">
                <ResponsiveImg
                  base={p.heroImage}
                  alt={p.heroAlt}
                  widths={[640]}
                  sizes="128px"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="py-4 pr-4">
                <div className="text-[var(--color-copper)] text-[10px] tracking-[0.14em] uppercase font-semibold mb-1.5">
                  {p.category}
                </div>
                <h3 className="font-display-bold uppercase text-[15px] text-[var(--color-royal)] leading-tight">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
