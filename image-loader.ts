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
 *   WIKIA   refuses a hotlinked request when it carries a foreign
 *           Referer — tested with a real browser Referer, it answers 404 —
 *           and answers 200 to the same URL with no Referer at all. It is
 *           requested directly, and every image tag sends
 *           `referrerPolicy="no-referrer"` (see `safe-image.tsx`).
 *
 *           It USED to go through images.weserv.nl. In October 2026 Wikia
 *           began answering weserv's https fetches with 403, which weserv
 *           relays as a 404, and every character portrait on the site went
 *           blank at once while every test stayed green.
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

export function isTmdb(src: string | null | undefined): boolean {
  return typeof src === "string" && src.startsWith("https://image.tmdb.org/t/p/");
}

/**
 * The URL to actually request, at roughly `width` pixels.
 *
 * Safe on any string: a non-TMDB URL comes back untouched, so call sites do
 * not need to know which host they are holding.
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

  return src;
}

/**
 * EVERY IMAGE GETS A LADDER, NOT A URL.
 *
 * A single URL is a single point of failure, and this site depends on
 * eighteen hosts it does not own. Any of them can delete a file, rename a
 * path, start refusing hotlinks, or block the proxy in front of it — Wikia
 * did the last one, and nothing noticed until the portraits were gone.
 *
 * So each image is a list, tried in order by `SafeImage` on the client. The
 * first rung is the URL `remoteSrc` has always produced. After it come two
 * independent public image proxies, each of which fetches server-side with
 * its own IP, its own cache and no Referer of ours:
 *
 *   weserv   images.weserv.nl, asked WITHOUT the `ssl:` prefix. Wikia
 *            refuses weserv's https fetch and, measured in October 2026,
 *            accepts the plain one.
 *   photon   i0.wp.com, WordPress's image CDN. A different company, so one
 *            host blocking one proxy cannot take out both rungs, and its
 *            long cache keeps serving a file for a while after the origin
 *            deletes it.
 *
 * `alternates` are DIFFERENT images of the same thing — another poster from
 * the title's own TMDB gallery — and come after every rung of the first one,
 * so the first choice is always kept while any route to it still works.
 * Photon's cache is also why a proxy rung is worth trying for a 404: it can
 * still hold a file the origin has since deleted.
 *
 * When every rung fails the component renders the designed gap, never a
 * broken-image icon.
 *
 * `exact` skips `remoteSrc` for a URL already written at a published width
 * that is not on the poster ladder — an episode still at w300, which
 * `remoteSrc` would move to w342, a width stills are not published at.
 */
export function imageSources(
  src: string,
  width: number,
  alternates: readonly string[] = [],
  { exact = false }: { exact?: boolean } = {},
): string[] {
  const primary = exact ? src : remoteSrc(src, width);
  /* Alternates go direct only. The proxy rungs already ran for the first
     choice, and three more per alternate would make a title whose whole
     gallery is gone take twenty-odd failed requests to reach its gap. */
  const out = [
    primary,
    viaWeserv(primary, width),
    viaPhoton(primary, width),
    ...alternates.map((a) => (exact ? a : remoteSrc(a, width))),
  ];
  return out.filter((u, i): u is string => !!u && out.indexOf(u) === i);
}

function viaWeserv(src: string, width: number): string | null {
  if (!/^https?:\/\//.test(src)) return null;
  /* weserv wants the URL without its scheme, which it then fetches over http,
     and the whole thing encoded — a bare `?` in a Wikia cache-buster would
     otherwise terminate its own query string. */
  const target = encodeURIComponent(src.replace(/^https?:\/\//, ""));
  return `https://images.weserv.nl/?url=${target}&w=${width}&output=webp&q=80`;
}

function viaPhoton(src: string, width: number): string | null {
  if (!/^https?:\/\//.test(src)) return null;
  /* Photon takes the host and path as its own path. It reads `w` from the
     query, and leaves any other parameter — a Wikia `cb` — alone. */
  const bare = src.replace(/^https?:\/\//, "");
  return `https://i0.wp.com/${bare}${bare.includes("?") ? "&" : "?"}w=${width}`;
}

/** Kept for call sites that only need to know whether to skip the optimiser. */
export const alwaysUnoptimized = true;
