import Image from "next/image";
import { remoteSrc } from "@/image-loader";
import type { TitleSource } from "@/content/schema";

/**
 * POSTERS — brief §14.
 *
 * Every rule here is asserted somewhere, because §14 spent five steps in the
 * same state dark mode and RTL were in: written down, never rendered.
 *
 *   aspect-ratio   reserved on the box, ALWAYS. This is what keeps CLS < 0.1.
 *   data-tint      the dominant colour, from the generated stylesheet. NOT an
 *                  inline style — a CSP without unsafe-inline blocks those, and
 *                  the failure is silent: 130 identical grey boxes.
 *   priority       exactly ONE per page, the LCP element. `priority` is a
 *                  <link rel=preload>; eight of them compete with the CSS and
 *                  the fonts and make LCP worse.
 *   sizes          must match the grid it renders in, or phones download
 *                  desktop-sized images. Invisible until Lighthouse.
 *
 * TMDB serves fixed widths and its CDN is faster than ours. We hand `next/image`
 * one source width and let the optimiser produce the rest; we store the path,
 * never the bytes (§14.2).
 */

const TMDB = "https://image.tmdb.org/t/p";

export type PosterSize = "hero" | "panel" | "grid" | "lead";

/** Source width per context. Bigger than the largest render, never more. */
const SOURCE: Record<PosterSize, string> = {
  hero: "w500",
  panel: "w342",
  grid: "w342",
  // The bento's lead tile and its wide tile render at roughly double the small
  // cell, so they get their own source. Serving them w342 would upscale on any
  // desktop, which is the one place a poster is large enough for it to show.
  lead: "w500",
};

/**
 * `sizes` must describe the box the image ACTUALLY occupies, and these are
 * derived from the CSS rather than guessed at.
 *
 * The first version said 45vw for the hero while its box is
 * `clamp(7.5rem, 34vw, 17.5rem)`. On a 390px phone that box renders at 133px
 * and the browser was told 176px — at 2× DPR it fetches the 360 candidate
 * instead of the 280, on the LCP image of every title page. The panel had the
 * same shape of error: a fixed 72px box declared as 22vw, harmless only because
 * the capped deviceSizes happen to round it to the same candidate today.
 *
 * A FIXED-width box gets a bare width. Only a box that actually scales with the
 * viewport gets a vw. Verified by measurement in e2e/posters.spec.ts, because a
 * static "sizes exists" assertion cannot see a mismatch — which is how the first
 * version shipped past P5.
 */
const SIZES: Record<PosterSize, string> = {
  // box: clamp(7.5rem, 34vw, 17.5rem) → 34vw until it caps at 280px
  hero: "(max-width: 48rem) 34vw, 280px",
  // box: a fixed 72px at every width
  panel: "72px",
  /**
   * The universe bento. TWO boxes, so TWO size classes — one `sizes` covering
   * both would be the §14.5 bug with a different set of numbers.
   *
   * box: 2 cols below 768 (≈46vw), 5 cols above (≈19vw), capped by the 90rem
   * content width at ≈250px.
   */
  grid: "(max-width: 48rem) 46vw, (max-width: 90rem) 19vw, 250px",
  // box: 2 of those columns, so twice the width at every step.
  lead: "(max-width: 48rem) 92vw, (max-width: 90rem) 38vw, 510px",
};

export interface PosterProps {
  title: Pick<TitleSource, "id" | "titleEn" | "titleAr" | "seasons">;
  posterPath: string | null;
  size: PosterSize;
  /** The LCP element. Exactly one per page — asserted by P3. */
  priority?: boolean;
  locale: string;
}

export function Poster({ title, posterPath, size, priority, locale }: PosterProps) {
  return (
    <div className="poster" data-tint={title.id} data-size={size}>
      {posterPath ? (
        <Image
          /**
           * Explicit dimensions rather than `fill`.
           *
           * `fill` emits a LOAD-BEARING inline style — position:absolute plus
           * four offsets — and a CSP without `unsafe-inline` blocks style
           * attributes, which would leave every poster unpositioned. With
           * width/height the only inline style next/image emits is
           * `color:transparent`, which is cosmetic: blocked, nothing breaks.
           *
           * 2:3 is TMDB's poster ratio without exception, and the box already
           * reserves it, so these numbers only set the intrinsic aspect.
           */
          /**
           * An absolute URL passes straight through; a TMDB path gets the size
           * prefix. One title in the corpus supplies its own poster because
           * TMDB has no record of it at all.
           */
          /* Never transformed — see `image-loader.ts`. `SOURCE[size]` already
             asks TMDB for the right width, and a hand-supplied absolute URL is
             passed through or proxied by host as needed. */
          src={remoteSrc(
            posterPath.startsWith("http")
              ? posterPath
              : `${TMDB}/${SOURCE[size]}${posterPath}`,
            342,
          )}
          unoptimized
          alt=""
          width={342}
          height={513}
          sizes={SIZES[size]}
          priority={priority}
          // Everything that is not the LCP element queues behind the fonts and
          // the thread. The browser's own heuristic beats a hand-rolled one.
          {...(priority ? {} : { loading: "lazy" as const, fetchPriority: "low" as const })}
        />
      ) : (
        <PosterFallback title={title} locale={locale} />
      )}
    </div>
  );
}

/**
 * §14.7 — design the gap.
 *
 * Marvel One-Shots, some specials and unreleased titles have no TMDB poster. A
 * broken-image icon would undo the whole design, so the absence gets its own
 * card: the title set in the display face on --muted, with a red rule at the
 * foot. It should read as a deliberate variant, not an error.
 */
function PosterFallback({
  title,
  locale,
}: {
  title: Pick<TitleSource, "titleEn" | "titleAr">;
  locale: string;
}) {
  const ar = locale === "ar";
  return (
    <div className="poster-fallback" aria-hidden="true">
      <bdi lang={ar ? "ar" : "en"} className="poster-fallback-title">
        {ar ? title.titleAr : title.titleEn}
      </bdi>
    </div>
  );
}
