import { useEffect } from "react";

/* Typography system:
 *   - Display / titles: Archivo (700–900) — a sturdy modern grotesque.
 *   - Body / UI: Hanken Grotesk (400–800) — clean and friendly.
 *   - Editorial accent: Newsreader italic — the single supporting serif voice.
 * Deliberately distinct from the template's Barlow Condensed + Manrope. */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap";

export function useGoogleFonts() {
  useEffect(() => {
    if (document.querySelector('link[data-fonts="sg4l"]')) return;
    const link = document.createElement("link");
    link.href = FONT_HREF;
    link.rel = "stylesheet";
    link.dataset.fonts = "sg4l";
    document.head.appendChild(link);
  }, []);
}
