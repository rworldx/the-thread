import { Archivo, Caveat, IBM_Plex_Mono, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";

/**
 * Every face here is self-hosted by next/font at build time. No request ever
 * leaves for fonts.googleapis.com, which keeps the CSP tight (§9) and removes a
 * render-blocking third party.
 *
 * THE LATIN VOICE IS ONE FAMILY, NOT TWO.
 *
 * This replaced Anton + Epilogue, and the reason is the design read rather than
 * taste. Anton is a heavy condensed poster face: it is comic-cover lettering,
 * which is the first thing anyone reaches for on a Marvel brief and therefore
 * the first thing to refuse. This site is not about the films, it is about the
 * RECORD of them, and a record is set in one neutral grotesk at several weights
 * with the data in mono.
 *
 * Archivo is that grotesk. It was drawn for high-performance display and text in
 * the same family, so 700 at -0.03em carries a heading and 400 carries a
 * paragraph without pairing two faces that sit on the same axis. Epilogue beside
 * Anton was exactly that pairing error: two grotesques, similar but not
 * identical, which reads as indecision rather than as a system.
 */

export const archivo = Archivo({
  // Variable, so weight is an axis rather than four downloads.
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * ONE SIGNATURE, AND THE ONLY PLACE A SCRIPT FACE IS ALLOWED.
 *
 * A grotesk site earns exactly one exception and this is it: the line at the
 * bottom that says a person made this. It is not decoration — it is the only
 * first-person mark on 954 pages of third-person record, so it gets a hand
 * rather than a weight of Archivo.
 *
 * CAVEAT RATHER THAN A WEDDING SCRIPT. Great Vibes and Parisienne are formal
 * copperplate: they say "invitation", not "signed by someone". Caveat is drawn
 * from real handwriting with a marker, which is what a signature on a piece of
 * work actually looks like, and it holds up beside a grotesk instead of
 * fighting it.
 *
 * AND IT HOLDS ON A DARK GROUND, which decided it over the alternatives.
 * Sacramento, Alex Brush and Great Vibes are all monoline or copperplate — thin
 * strokes that thin further at small sizes. This site already lost a whole
 * element that way: the marquee was set in a recessive grey and simply could
 * not be seen in Arabic, because Naskh strokes are thinner than Archivo's.
 * Caveat at 600 is a marker weight and survives the same ground.
 *
 * Self-hosted by next/font at build time like every other face here, so the
 * CSP stays `font-src 'self'` and no request leaves for Google.
 */
export const caveat = Caveat({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * THE ARABIC DISPLAY VOICE — Thmanyah Serif Display.
 *
 * Deliberately its own thing rather than a compromise: no Latin grotesk covers
 * Arabic, and stretching one to fake it is the failure this project exists to
 * avoid. A serif is normally the wrong default reach, but the brand brief names
 * this family, which is the one condition under which it is the right answer.
 *
 * Only the two weights the design uses. Every extra weight is a file every
 * Arabic visitor downloads.
 */
export const thmanyahDisplay = localFont({
  src: [
    { path: "./fonts/thmanyahserifdisplay-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/thmanyahserifdisplay-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-thmanyah-display",
  display: "swap",
  // Keeps the fallback's metrics close enough that the swap does not shift
  // layout — CLS protection, verified rather than assumed.
  adjustFontFallback: false,
  fallback: ["Noto Naskh Arabic", "serif"],
});

export const thmanyahSans = localFont({
  src: [
    { path: "./fonts/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-thmanyah-sans",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Noto Sans Arabic", "sans-serif"],
});

/** Kept in the stack as FALLBACKS behind Thmanyah, not as the primary face. */
export const notoNaskh = Noto_Naskh_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-noto-naskh",
  display: "swap",
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

export const fontVariables = [
  archivo.variable,
  caveat.variable,
  plexMono.variable,
  thmanyahDisplay.variable,
  thmanyahSans.variable,
  notoNaskh.variable,
  notoSansArabic.variable,
].join(" ");
