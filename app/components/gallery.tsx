"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { remoteSrc } from "@/image-loader";
import { useTranslations } from "next-intl";

/**
 * THE POSTER GALLERY, and its lightbox.
 *
 * Thumbnails are `w185`. The large image is `w780` and it is requested ON OPEN,
 * never on page load — eight full-size posters per title across 147 titles
 * would be the single largest thing on the site and almost nobody opens them.
 *
 * A native `<dialog>` rather than a div with a high z-index. The browser gives
 * the focus trap, the Escape handler, the inert background and the top-layer
 * stacking for free, and every hand-rolled version of those is worse.
 */

const THUMB = "https://image.tmdb.org/t/p/w185";
const FULL = "https://image.tmdb.org/t/p/w780";

export function Gallery({ posters, title }: { posters: string[]; title: string }) {
  const t = useTranslations("title");
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  if (posters.length < 2) return null;

  return (
    <>
      <ul className="gallery" role="list">
        {posters.map((p, i) => (
          <li key={p}>
            <button
              type="button"
              className="gallery-thumb"
              onClick={() => setOpen(i)}
              aria-label={t("openPoster", { n: i + 1, total: posters.length })}
            >
              <Image
                src={remoteSrc(`${THUMB}${p}`, 342)}
                unoptimized
                alt=""
                width={185}
                height={278}
                sizes="(max-width: 48rem) 30vw, 150px"
                loading="lazy"
                fetchPriority="low"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        className="lightbox"
        onClose={() => setOpen(null)}
        /* Clicking the backdrop closes it. The dialog element IS the backdrop,
           so a click that lands on it rather than on the image is outside. */
        onClick={(e) => {
          if (e.target === ref.current) setOpen(null);
        }}
      >
        {open !== null && (
          <>
            <Image
              src={remoteSrc(`${FULL}${posters[open]}`, 780)}
              unoptimized
              alt={title}
              width={780}
              height={1170}
              sizes="(max-width: 48rem) 92vw, 640px"
            />
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setOpen(null)}
            >
              {t("closeGallery")}
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
