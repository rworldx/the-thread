import Image from "next/image";
import { remoteSrc } from "@/image-loader";

/**
 * An actor still from TMDB, or the gap designed as a gap.
 *
 * Explicit width/height rather than `fill`, for the same reason the poster does
 * it: `fill` emits a load-bearing inline style, and a CSP without
 * `unsafe-inline` blocks style ATTRIBUTES, which would leave every portrait
 * unpositioned with nothing thrown and nothing logged.
 *
 * `w185` everywhere. These render at 96 to 160px and nothing on this site shows
 * a face large enough to want more.
 */

const TMDB = "https://image.tmdb.org/t/p/w185";

export function Portrait({
  src,
  alt,
  priority = false,
}: {
  src: string | null;
  alt: string;
  priority?: boolean;
}) {
  if (!src) {
    // Not a broken image and not a grey box: a deliberate empty plate, the same
    // treatment the missing posters get.
    return <span className="portrait portrait-empty" aria-hidden="true" />;
  }
  return (
    <span className="portrait">
      <Image
        /* Pre-sized and unoptimized: TMDB publishes this width already, so
           transforming it pays for a resize their CDN did for free. */
        src={remoteSrc(`${TMDB}${src}`, 185)}
        unoptimized
        alt={alt}
        width={185}
        height={278}
        sizes="(max-width: 48rem) 30vw, 160px"
        priority={priority}
        {...(priority ? {} : { loading: "lazy" as const, fetchPriority: "low" as const })}
      />
    </span>
  );
}
