/*
 * Renders a <picture> with AVIF -> WebP -> JPG fallbacks at 640w + 1024w
 * for an image stored in /public as <base>-{640,1024}.{avif,webp,jpg}.
 *
 * Pass `widths={[640]}` for assets that only have a 640w variant
 * (3:4 portraits where the source was already small).
 */
export default function ResponsiveImg({
  base,
  alt,
  className = "",
  sizes = "100vw",
  widths = [640, 1024],
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  width,
  height,
}) {
  const srcSet = (ext) =>
    widths.map((w) => `/${base}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `/${base}-${widths[widths.length - 1]}.jpg`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={fallback}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        className={className}
      />
    </picture>
  );
}
