import Image from "next/image";
import { remoteSrc } from "@/image-loader";

/**
 * THE POSTER MOSAIC — the first screen.
 *
 * The hero used to be a headline over flat colour. This is the single
 * highest-impact change in the redesign, and the reason is one sentence: the
 * posters are the product. Photographs arrive first and the words sit on them.
 *
 * It is real posters from the corpus, never a stock image. That is what makes
 * the first screen unmistakably Marvel without using a single Marvel asset
 * that is not a poster we already link to.
 *
 * TEXTURE, NOT DETAIL. Sources are `w185` and every tile sits under a scrim
 * heavy enough that nobody reads them. Trading resolution for scale is
 * deliberate: at `w342` this would be roughly four times the bytes for an
 * effect no one can see through the gradient.
 *
 * ONE priority image, still. `priority` is a preload, and twenty-four of them
 * would compete with the fonts and the stylesheet and make LCP worse than
 * having none.
 */

const TMDB = "https://image.tmdb.org/t/p/w185";

export interface MosaicTile {
  id: string;
  posterPath: string;
}

export function Mosaic({ titles }: { titles: MosaicTile[] }) {
  return (
    <div className="mosaic" aria-hidden="true">
      <div className="mosaic-grid">
        {titles.map((t, i) => (
          <div className="mosaic-cell" key={t.id} data-tint={t.id}>
            <Image
              src={remoteSrc(`${TMDB}${t.posterPath}`, 185)}
              unoptimized
              alt=""
              width={185}
              height={278}
              sizes="(max-width: 48rem) 34vw, 200px"
              priority={i === 0}
              {...(i === 0
                ? {}
                : { loading: "lazy" as const, fetchPriority: "low" as const })}
            />
          </div>
        ))}
      </div>
      {/* The scrim is what makes type legible over a wall of high-contrast
          artwork. Two stops, not one: a flat overlay dims the posters evenly
          and kills them, a gradient keeps the edges alive. */}
      <div className="mosaic-scrim" />
    </div>
  );
}
