import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { DEFAULT_LOCALE } from "./lib/locales";

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  /**
   * NO DEV OVERLAY BADGE.
   *
   * Next draws a floating indicator in the corner during development. It is
   * only ever visible to whoever is running the dev server, never to a reader,
   * but it sits on top of the page in every screenshot and in every look at the
   * site — which is most of how this design gets reviewed.
   */
  devIndicators: false,

  images: {
    // Allowlist, never a wildcard (brief §9). We hotlink TMDB and re-host
    // nothing (§14.2).
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org", pathname: "/t/p/**" },
      /**
       * Character artwork. Posters and actor stills come from TMDB; a picture
       * of Wolverine rather than of Hugh Jackman does not exist there, because
       * TMDB indexes cast and not characters.
       *
       * Pinned to a tagged release, and the bytes are never re-hosted — the
       * same posture as the posters. Swapping to Marvel's own CDN is one run of
       * `npm run sync:characters` with a key set, plus the pattern for
       * i.annihil.us here.
       */
      { protocol: "https", hostname: "cdn.jsdelivr.net", pathname: "/gh/akabab/**" },
      /**
       * The MCU and Marvel wikis, for the character portraits the comics
       * dataset has never heard of. Keyless MediaWiki APIs; the URL is stored
       * and the bytes are never re-hosted, same as everything else here.
       */
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      /**
       * IMDb's image CDN, for the ONE poster no other service carries. Not a
       * general escape hatch: the pathname is pinned to their images tree and
       * the corpus has exactly one `posterUrl`.
       */
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/images/**" },
      /**
       * HAND-PICKED CHARACTER ART, one host per entry in `IMAGE_OVERRIDES`.
       *
       * Every one is pinned to a pathname rather than opened at the host, so
       * this stays a list of specific places art comes from rather than a
       * general escape hatch. Two hosts that were offered are deliberately
       * ABSENT: tvtropes, which 403s any request without a browser referer,
       * and encrypted-tbn0.gstatic.com, which is Google's thumbnail cache and
       * whose URLs expire.
       */
      { protocol: "https", hostname: "www.hollywoodreporter.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/wikipedia/**" },
      { protocol: "https", hostname: "i.pinimg.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.marvel.com", pathname: "/content/**" },
      { protocol: "https", hostname: "static.comicvine.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "blogger.googleusercontent.com", pathname: "/img/**" },
      { protocol: "https", hostname: "theronin.org", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "playcontestofchampions.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "i.redd.it", pathname: "/**" },
      { protocol: "https", hostname: "media.zenfs.com", pathname: "/**" },
      { protocol: "https", hostname: "www.superherotoystore.com", pathname: "/cdn/**" },
      { protocol: "https", hostname: "oyster.ignimgs.com", pathname: "/wordpress/**" },
      { protocol: "https", hostname: "comicvine.gamespot.com", pathname: "/a/uploads/**" },
      { protocol: "https", hostname: "images.squarespace-cdn.com", pathname: "/content/**" },
      { protocol: "https", hostname: "images.weserv.nl", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
    // Capped hard: Vercel bills per unique source × width × quality, and the
    // defaults generate eight variants per image. These are the only widths a
    // poster is ever rendered at (§14.3).
    deviceSizes: [360, 768, 1024, 1440],
    imageSizes: [120, 180, 280],
    minimumCacheTTL: 31536000, // posters never change
  },

  // `/` has no page: every route lives under `[locale]`. A config redirect
  // rather than middleware, so this stays compatible with a fully static build.
  async redirects() {
    return [
      { source: "/", destination: `/${DEFAULT_LOCALE}`, permanent: false },
    ];
  },

  /**
   * CSP as a static header, NOT middleware with nonces.
   *
   * A nonce is per-request. Every page here is prerendered at build time, so
   * there is no request to mint one for — and the first attempt did exactly what
   * that implies: `strict-dynamic` disabled host allowlisting, Next's own chunks
   * arrived without a nonce, and every script on every route was blocked. The
   * site rendered as unstyled, inert HTML.
   *
   * `script-src` then keeps 'unsafe-inline', and this is a REAL downgrade from
   * brief §9, taken deliberately rather than discovered later:
   *
   * Next's App Router always emits inline bootstrap scripts — `__next_f.push`
   * carrying the RSC payload. Allowing them needs a nonce (per-request, so
   * dynamic), a hash (different on all 294 pages), or 'unsafe-inline'. Without
   * one of those, hydration simply dies: every route logged "Executing inline
   * script violates…" and shipped inert HTML.
   *
   * So the choice is 294 dynamic pages for a nonce, or static pages with
   * 'unsafe-inline'. Taken with the static build, because the concrete XSS
   * surface here is nil: no user input anywhere, no dangerouslySetInnerHTML, no
   * accounts, no third-party scripts, and no query parameters that reach the DOM.
   * 'unsafe-inline' protects against injected inline script, and there is no
   * path by which an attacker injects anything.
   *
   * WHAT WOULD CHANGE THIS: the moment user-supplied content renders anywhere —
   * a comment, a shared list, a query string echoed to the page — switch to
   * middleware nonces and accept dynamic rendering. Written down in the README
   * so it is a decision with a trigger rather than an oversight.
   *
   * NO 'unsafe-eval' IN PRODUCTION. An earlier version carried it beside
   * 'unsafe-inline' without a word of justification. With both unsafe keywords
   * `script-src` blocks almost nothing beyond third-party hosts, which would
   * undersell the compromise above into meaninglessness. Asserted in
   * e2e/csp.spec.ts — that suite runs against `next start`, so it cannot drift
   * back into a deployed build.
   *
   * It IS granted in dev, where React uses eval() to rebuild stack traces.
   * Denying it there never protected production, which does not want it; it
   * only logged a violation on every page load and broke the error overlay.
   * See the `devEval` note in headers() below.
   *
   * Still enforced, and worth having: no third-party script, no eval, no
   * framing, no plugins, no base-tag hijack, images only from TMDB, fetch only
   * from self.
   *
   * `style-src` keeps 'unsafe-inline' for one reason: next/image emits
   * `style="color:transparent"` and there is no nonce mechanism for a style
   * ATTRIBUTE. It is cosmetic — blocked, nothing moves — and R16 asserts that no
   * other inline style exists, so the exception cannot quietly widen. Everything
   * load-bearing ships as CSS: poster tints, the thread fill, the grid layout.
   */
  async headers() {
    /**
     * PRODUCTION ONLY, and the omission is the point.
     *
     * `upgrade-insecure-requests` rewrites every subresource URL to https. On a
     * deployed origin that is free protection. On `http://localhost:3000` it is
     * a self-inflicted outage: Chrome exempts localhost, Safari does NOT, so it
     * upgrades every chunk to `https://localhost:3000`, finds no TLS there, and
     * drops the request. The page arrives as unstyled HTML with no JS — no
     * console error the server can see, and nothing in the dev log, because the
     * requests are never sent.
     *
     * It cost a real "the site has no design" report. The screenshot suite
     * missed it for the same reason Chrome users would: Playwright drives
     * Chromium, which exempts localhost. Nothing is weakened in production.
     */
    const httpsUpgrade =
      process.env.NODE_ENV === "production"
        ? ["upgrade-insecure-requests"]
        : [];

    /**
     * 'unsafe-eval' in DEV ONLY, and for the same reason it was removed from
     * production: React uses `eval()` in development to rebuild stack traces
     * across environments, and never uses it in a production build. Omitting it
     * everywhere did not make production safer — production never wanted it —
     * it just logged a CSP violation on every page load in dev and cost the
     * debugging features the error overlay depends on.
     *
     * The production assertion in e2e/csp.spec.ts is what keeps this honest:
     * that suite runs against `next start` and fails if 'unsafe-eval' appears.
     */
    const devEval =
      process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'";

    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${devEval}`,
      "style-src 'self' 'unsafe-inline'",
      // Posters are hotlinked from TMDB and re-hosted nowhere (§14.2).
      "img-src 'self' blob: data: https://image.tmdb.org https://cdn.jsdelivr.net https://i.ytimg.com https://static.wikia.nocookie.net https://m.media-amazon.com https://www.hollywoodreporter.com https://upload.wikimedia.org https://i.pinimg.com https://cdn.marvel.com https://images.squarespace-cdn.com https://static.comicvine.com https://blogger.googleusercontent.com https://theronin.org https://playcontestofchampions.com https://i.redd.it https://media.zenfs.com https://comicvine.gamespot.com https://www.superherotoystore.com https://oyster.ignimgs.com https://images.weserv.nl",
      "font-src 'self'",
      // The spoiler context is fetched from our own origin; nothing else is.
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...httpsUpgrade,
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(config);
