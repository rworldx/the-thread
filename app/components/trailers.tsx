import type { TitleVideo } from "@/content/build";
import { getTranslations } from "next-intl/server";
import { Collapsible } from "@/app/components/collapsible";

/**
 * EVERY OFFICIAL TEASER AND TRAILER, small, in campaign order.
 *
 * This replaced a single large facade that opened one video in an iframe. Two
 * things were wrong with that. It showed one video and called it "the trailer"
 * when a film has three or four official ones, and it made a 16:9 hero out of
 * something people watch for ninety seconds and leave.
 *
 * NO IFRAME AT ALL NOW. Each card is a plain link to YouTube, which means:
 * nothing third-party loads unless somebody goes there, `frame-src` came back
 * out of the CSP, and the whole section is a server component with zero
 * JavaScript. The previous facade was already careful; not embedding is
 * simpler than embedding carefully.
 *
 * Thumbnails are YouTube's own `hqdefault`, which exists for every video and
 * needs no API call. `mqdefault` is sharper per byte at this size but is
 * missing on older uploads, and a hole in a rail is worse than a soft image.
 */

const THUMB = (key: string) => `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
const WATCH = (key: string) => `https://www.youtube.com/watch?v=${key}`;

/** Same rule as the cast: ten, then the rest on request. */
const SHOWN = 10;

export async function Trailers({ videos }: { videos: TitleVideo[] }) {
  const t = await getTranslations("title");

  if (videos.length === 0) {
    return (
      <p className="trailer-none-line">
        {t("noTrailer")}
      </p>
    );
  }

  return (
    <>
      <p className="section-count">{t("videoCount", { n: videos.length })}</p>
      <Collapsible hidden={videos.length - SHOWN} label={t("showMore", { n: videos.length - SHOWN })}>
      <ul className="trailer-rail" role="list" data-shown={SHOWN}>
        {videos.map((v) => (
          <li key={v.key}>
            <a
              className="trailer-card"
              href={WATCH(v.key)}
              target="_blank"
              /* noopener is the security half, noreferrer the privacy half.
                 Both, because this is a third party we do not control. */
              rel="noopener noreferrer"
            >
              <span className="trailer-thumb">
                {/* Deliberately NOT next/image: these are 480x360 letterboxed
                    JPEGs from YouTube's own CDN, already the right size, and
                    routing 1,137 of them through the optimiser would bill for
                    variants of an image nobody zooms into. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={THUMB(v.key)} alt="" width={480} height={360} loading="lazy" />
                <span className="trailer-play-badge" aria-hidden="true" />
              </span>
              <span className="trailer-kind">{t(`videoType.${v.type.toLowerCase()}`)}</span>
              <span className="trailer-name">{v.name}</span>
            </a>
          </li>
        ))}
      </ul>
      </Collapsible>
    </>
  );
}
