import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { localeParams, directionOf } from "@/lib/locales";
import {
  MARK_NODES,
  MARK_THREADS,
  MARK_RED,
  MARK_R,
  MARK_STROKE,
} from "@/app/components/thread-mark";

/**
 * THE CARD THAT APPEARS WHEN SOMEBODY PASTES THE LINK.
 *
 * WhatsApp, Slack, iMessage, Discord and X all read Open Graph, and every one
 * of them shows a blank grey rectangle when there is nothing to read. A link to
 * this site was arriving as a bare URL with no picture and no name.
 *
 * SIZE AND FORMAT ARE NOT PREFERENCES. 1200×630 is the ratio every one of those
 * clients crops to, and PNG is what they all decode — an SVG card renders on
 * exactly none of them. That is why this is a rasteriser and not a page.
 *
 * ONE PER LOCALE, because the card is the first and often only thing a reader
 * sees: an Arabic link should preview in Arabic, right to left, in an Arabic
 * face. `generateStaticParams` renders both at build time, so nothing here
 * runs on a request.
 *
 * THE MARK IS THE SAME GEOMETRY the favicon and the header use, imported
 * rather than redrawn — inlined as a data URI because `ImageResponse` lays out
 * HTML and cannot take raw SVG children.
 *
 * FONTS ARE LOADED FROM DISK, and they are not quite the site's own.
 *
 * `next/font` hands back CSS rather than bytes and emits WOFF2, which this
 * rasteriser cannot read, so the files in `app/og-fonts` are Open Font Licence
 * TTFs committed for this one purpose. Archivo is the same face the site sets
 * its Latin in. The Arabic is CAIRO, not the site's Thmanyah — Thmanyah ships
 * as WOFF2, and both Noto Arabic families fail to parse here with
 * "lookupType: 5 - substFormat: 3 is not yet supported", which is a gap in the
 * rasteriser's shaping tables rather than a fault in the fonts. Cairo renders
 * correctly and sits close enough to the site's voice for a card.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return localeParams();
}

/**
 * RTL TEXT IN VISUAL ORDER, because the rasteriser has no bidi.
 *
 * Satori places tokens strictly left to right and does not run the Unicode
 * bidirectional algorithm — `direction: rtl` changes alignment and nothing
 * else. So the Arabic tagline came out with its words backwards on the one
 * image that is this site's first impression: "أولًا. تشاهد ماذا اعرف" where
 * it should read "اعرف ماذا تشاهد أولًا."
 *
 * Glyph SHAPING is fine — the letters join correctly — so only the word order
 * is wrong, and handing it the reversed order makes left-to-right placement
 * produce the right-to-left reading. Trailing punctuation moves to the front
 * for the same reason: a full stop ends an Arabic sentence on the LEFT.
 *
 * This is a workaround for a missing feature, not a way to store text. It runs
 * at the last possible moment, on a copy, and the corpus keeps logical order.
 */
function visualOrder(text: string): string {
  const m = text.match(/^(.*?)([.!؟?،]*)$/s);
  const body = (m?.[1] ?? text).trim();
  const tail = m?.[2] ?? "";
  const words = body.split(/\s+/).reverse().join(" ");
  return tail ? `${tail} ${words}` : words;
}

/** The mark, as a data URI. `currentColor` has no meaning here, so ink is literal. */
function markDataUri(ink: string): string {
  const threads = MARK_THREADS.map(
    (d) =>
      `<path d="${d}" stroke="${MARK_RED}" stroke-width="${MARK_STROKE}" stroke-linecap="round" fill="none"/>`,
  ).join("");
  const nodes = MARK_NODES.map(
    (n) =>
      `<circle cx="${n.cx}" cy="${n.cy}" r="${MARK_R}" stroke="${n.red ? MARK_RED : ink}" stroke-width="${MARK_STROKE}" fill="none"/>`,
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">${threads}${nodes}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const ar = locale === "ar";
  const rtl = directionOf(locale) === "rtl";

  const fonts = join(process.cwd(), "app", "og-fonts");
  /**
   * STATIC WEIGHTS, NOT THE VARIABLE FILES.
   *
   * The first version loaded the variable releases — `Archivo[wdth,wght].ttf`
   * — and the build died with "Cannot read properties of undefined (reading
   * '256')" from inside the rasteriser's font parser. It does not understand
   * an `fvar` axis; it wants an instance. Two weights each, named, is the fix.
   */
  const [latin, latinBold, arabicR, arabicBold] = await Promise.all([
    readFile(join(fonts, "Archivo-400.ttf")),
    readFile(join(fonts, "Archivo-700.ttf")),
    readFile(join(fonts, "Cairo-400.ttf")),
    readFile(join(fonts, "Cairo-700.ttf")),
  ]);

  const ink = "#fafafa";
  const inkSoft = "#a1a1aa";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0b",
          padding: "0 88px",
          /* The one accent, as a hairline along the top — the same rule the
             site uses for the active page. Under 5% of the card. */
          borderTop: `10px solid ${MARK_RED}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri(ink)} width={190} height={190} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: rtl ? "flex-end" : "flex-start",
            }}
          >
            {/**
             * `direction` IS LOAD-BEARING HERE, not a nicety.
             *
             * The rasteriser lays out in logical order and does not run the
             * bidi algorithm on its own, so the Arabic tagline came out with
             * its words in reverse — "أولًا. تشاهد ماذا اعرف" instead of
             * "اعرف ماذا تشاهد أولًا." It read as gibberish to anyone who
             * reads Arabic, on the one image that is the site's first
             * impression.
             */}
            <div
              style={{
                fontFamily: ar ? "Arabic" : "Latin",
                fontWeight: 700,
                fontSize: 104,
                letterSpacing: ar ? 0 : "-0.035em",
                color: ink,
                lineHeight: 1.05,
                direction: rtl ? "rtl" : "ltr",
              }}
            >
              {rtl ? visualOrder(t("name")) : t("name")}
            </div>
            <div
              style={{
                fontFamily: ar ? "Arabic" : "Latin",
                fontWeight: 400,
                fontSize: 40,
                color: inkSoft,
                marginTop: 18,
                maxWidth: 680,
                lineHeight: 1.3,
                textAlign: rtl ? "right" : "left",
                direction: rtl ? "rtl" : "ltr",
              }}
            >
              {rtl ? visualOrder(t("tagline")) : t("tagline")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Latin", data: latin, weight: 400 as const, style: "normal" as const },
        { name: "Latin", data: latinBold, weight: 700 as const, style: "normal" as const },
        { name: "Arabic", data: arabicR, weight: 400 as const, style: "normal" as const },
        { name: "Arabic", data: arabicBold, weight: 700 as const, style: "normal" as const },
      ],
    },
  );
}
