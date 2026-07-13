import { useEffect } from "react";

/*
 * Renders one or more JSON-LD blobs into <head>. Accepts a single object or
 * an array of objects. Each blob is keyed by its index and removed on unmount.
 */
export default function SchemaJsonLd({ data, id }) {
  useEffect(() => {
    const blobs = Array.isArray(data) ? data : [data];
    const nodes = blobs.map((blob, i) => {
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.dataset.schema = `${id || "sg4l"}-${i}`;
      tag.textContent = JSON.stringify(blob);
      document.head.appendChild(tag);
      return tag;
    });
    return () => nodes.forEach((n) => n.remove());
  }, [data, id]);
  return null;
}
