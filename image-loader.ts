/**
 * NO IMAGE ON THIS SITE IS TRANSFORMED BY VERCEL — and that is the point.
 *
 * Vercel bills Image Optimization per transformation and the free tier allows
 * five thousand. 216 posters, 350 portraits, galleries, cast photos and 566
 * search thumbnails at several widths each exhausted it, and once exhausted
 * the optimiser ERRORS rather than degrading: most of the deployed site lost
 * its images while localhost, where no optimiser runs, looked perfect.
 *
 * Reducing usage does not refund a spent quota. So every image is served from
 * a host instead, by one of three routes:
 *
 *   TMDB    publishes each poster at eight fixed widths, so the width is
 *           written into the path and their CDN does the resize for free.
 *
 *   WIKIA   is the ONE host of the eighteen here that refuses a hotlinked
 *           request — tested with a real browser Referer, it answers 404. It
 *           goes through images.weserv.nl, a free public image proxy that
 *           fetches server-side and resizes on the way.
 *
 *   EVERY   other host — ComicVine, Pinterest, Wikimedia, jsDelivr, Amazon,
 *   OTHER   Marvel's own CDN and the rest — serves a hotlinked request fine,
 *           so it is used directly with no intermediary at all.
 *
 * Every `<Image>` that uses this is marked `unoptimized`, which is a boolean
 * and therefore crosses the server/client boundary — a `loader` prop is a
 * function and cannot, and `loader: "custom"` in the config disables
 * `/_next/image` outright. Both were tried; both are recorded here so the next
 * person does not repeat them.
 */

/** TMDB's published poster widths. Any other value 404s on their CDN. */
const TMDB_WIDTHS = [92, 154, 185, 342, 500, 780];
/** Profile photos are published at a different, shorter set. */
const TMDB_PROFILE_WIDTHS = [45, 185, 632];

/** The only host measured to refuse a hotlinked browser request. */
const NEEDS_PROXY = "static.wikia.nocookie.net";

export function isTmdb(src: string | null | undefined): boolean {
  return typeof src === "string" && src.startsWith("https://image.tmdb.org/t/p/");
}

/**
 * The URL to actually request, at roughly `width` pixels.
 *
 * Safe on any string: a non-TMDB, non-Wikia URL comes back untouched, so call
 * sites do not need to know which host they are holding.
 */
export function remoteSrc(src: string, width: number): string {
  const tmdb = src.match(/^(https:\/\/image\.tmdb\.org\/t\/p\/)([^/]+)(\/.+)$/);
  if (tmdb) {
    const [, base, size, file] = tmdb;
    const scale = size?.startsWith("h") ? TMDB_PROFILE_WIDTHS : TMDB_WIDTHS;
    /* The smallest published width that still covers the request, so nothing
       is upscaled and nothing larger than needed is downloaded. */
    const pick = scale.find((w) => w >= width) ?? scale[scale.length - 1];
    return `${base}w${pick}${file}`;
  }

  if (src.includes(NEEDS_PROXY)) {
    /* weserv wants the URL without its scheme, prefixed `ssl:` for https, and
       the whole thing encoded — a bare `?` in a Wikia cache-buster would
       otherwise terminate its own query string. */
    const target = encodeURIComponent("ssl:" + src.replace(/^https?:\/\//, ""));
    return `https://images.weserv.nl/?url=${target}&w=${width}&output=webp&q=80`;
  }

  return src;
}

/** Kept for call sites that only need to know whether to skip the optimiser. */
export const alwaysUnoptimized = true;
