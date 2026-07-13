import { useEffect } from "react";

/* Fraunces is loaded only in italic for editorial accents (kicker paragraphs,
 * the Rain/Moss/Cedar lockup, occasional pull quotes). Body and display work
 * stays on Barlow Condensed + Manrope. Subset to Latin to keep payload small. */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Roboto+Condensed:wght@500;700&family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,400&display=swap";

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
