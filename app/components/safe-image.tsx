"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState, type ImgHTMLAttributes, type ReactNode } from "react";

/**
 * AN IMAGE THAT CANNOT SHOW A BROKEN-IMAGE ICON.
 *
 * Takes the ladder `imageSources()` builds and walks down it: when a rung
 * errors — the file was deleted, the host started refusing hotlinks, a proxy
 * got blocked — the next one is tried. When the last one fails, `fallback`
 * renders in its place: the designed gap each call site already has.
 *
 * TWO DETAILS ARE LOAD-BEARING.
 *
 * `referrerPolicy="no-referrer"`. Wikia rejects a request whose Referer is a
 * foreign site and serves the same file to a request with none. TMDB and the
 * rest do not care either way, so it is set everywhere rather than per host.
 *
 * The ref check. An image that fails BEFORE hydration fires its `error` event
 * at a tag React is not listening to yet, and the ladder would stall on rung
 * one. So on mount the tag is asked directly: `complete` with no pixels is a
 * failure that already happened.
 *
 * `plain` renders an `<img>` instead of `next/image`, for the call sites that
 * hand-write a `srcSet`. The `srcSet` belongs to the first rung only — it
 * would otherwise keep winning over every fallback `src`.
 */

type Common = {
  sources: readonly string[];
  /** Rendered once every source has failed. Nothing, if omitted. */
  fallback?: ReactNode;
};

export type SafeImageProps =
  | (Common & { plain?: false } & Omit<ImageProps, "src" | "onError" | "ref">)
  | (Common & { plain: true } & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError" | "ref">);

export function SafeImage(props: SafeImageProps) {
  const { sources, fallback = null, ...rest } = props;
  const [index, setIndex] = useState(0);
  const src = sources[index];

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const check = useCallback(
    (img: HTMLImageElement | null) => {
      if (img && img.complete && img.naturalWidth === 0 && img.currentSrc) next();
    },
    [next],
  );

  if (!src) return <>{fallback}</>;

  if (rest.plain) {
    const { plain: _plain, srcSet, ...img } = rest;
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        key={src}
        ref={check}
        {...img}
        src={src}
        srcSet={index === 0 ? srcSet : undefined}
        referrerPolicy="no-referrer"
        onError={next}
      />
    );
  }

  const { plain: _plain, ...img } = rest;
  return (
    // jsx-a11y/alt-text is satisfied by the caller: `alt` is required on ImageProps.
    <Image
      key={src}
      ref={check}
      {...img}
      src={src}
      unoptimized
      referrerPolicy="no-referrer"
      onError={next}
    />
  );
}
