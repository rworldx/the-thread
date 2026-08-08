import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * THE THREAD — the signature element (brief §4).
 *
 * Two rules govern everything here:
 *
 * 1. The thread is DECORATION LAYERED OVER the list, never a replacement for
 *    it. The watch order lives in the <ol>; the rail is `aria-hidden` and
 *    carries no information a screen reader needs. If the CSS never loads, the
 *    order is still correct and still readable. The signature element must not
 *    BE the information architecture.
 *
 * 2. DOM order is never touched. The alternating desktop layout is pure
 *    `grid-column` placement — screen readers and keyboard tab order follow the
 *    DOM, and the order is the entire point of this site.
 *
 * The rail renders FULLY DRAWN by default. Drawing on scroll is a progressive
 * enhancement gated behind both `@supports (animation-timeline: scroll())` and
 * `prefers-reduced-motion: no-preference`. An undrawn base state would mean the
 * static HTML, reduced-motion users, and any browser without scroll timelines
 * all get a thread that looks broken rather than one that is simply still.
 */

export function Thread({
  children,
  progress,
}: {
  children: ReactNode;
  /** The watched-progress fill. Ties progress to the signature element rather
   *  than bolting a separate bar onto the page. */
  progress?: ReactNode;
}) {
  return (
    <div className="thread-wrap">
      <ThreadRail />
      {progress}
      {/* `role="list"` is NOT redundant ARIA — do not delete it.
          Safari with VoiceOver drops list semantics entirely when `list-style`
          is `none`, so without this there is no "list, 34 items" and no
          "item 3 of 34". The whole premise of this component is that the order
          lives in the <ol> rather than in the decoration; that premise is false
          in Safari without this attribute. Asserted by R15. */}
      <ol className="thread-list" role="list">
        {children}
      </ol>
    </div>
  );
}

function ThreadRail() {
  return (
    <svg
      className="thread-rail"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 4 100"
    >
      {/* The track is always present and always complete — the thread exists
          even before you have scrolled past any of it. */}
      <line className="thread-track" x1="2" y1="0" x2="2" y2="100" />
      {/* The progress line is the same object in the same red. `pathLength="1"`
          normalises the dash maths so it works at any content height, but NO
          stroke-dashoffset is set here: hiding it is the enhancement's job, in
          CSS, and only where the enhancement can actually run. */}
      <line className="thread-progress" x1="2" y1="0" x2="2" y2="100" pathLength="1" />
    </svg>
  );
}

export interface PanelProps {
  children: ReactNode;
  /** Skippable on a first watch — hollow node, dashed connector. */
  optional?: boolean;
  /** Not Marvel Studios. The node turns blue; colour carries information. */
  offUniverse?: boolean;
  /** Position in the ordered list, so <ol> numbering survives any grid placement. */
  value: number;
  /** The destination — the thing the user actually asked about. Ends the thread. */
  target?: boolean;
}

export function ThreadPanel({ children, optional, offUniverse, value, target }: PanelProps) {
  return (
    /**
     * NO inline style attribute, deliberately.
     *
     * An earlier version drove the desktop row with `style={{ "--n": value }}`.
     * CSP nonces do not cover style ATTRIBUTES — `style-src` without
     * `unsafe-inline` blocks them outright — so the day the CSP lands at step 10
     * the alternating layout would silently collapse to side-by-side panels,
     * which reads as "these two are simultaneous" rather than "then".
     *
     * Instead the panel spans the full grid width and takes its own row by
     * ordinary auto-placement, and the left/right split happens INSIDE the panel
     * on `:nth-child` parity. Pure stylesheet, and it survives a filtered list
     * where an index and a DOM position could diverge.
     */
    <li
      className="thread-panel"
      value={value}
      data-optional={optional ? "true" : undefined}
      data-branch={offUniverse ? "true" : undefined}
      data-target={target ? "true" : undefined}
    >
      <div className="panel-body">{children}</div>
    </li>
  );
}

/**
 * Title block. English is primary with Arabic beneath, in BOTH locales (§6):
 * Arabic speakers search Marvel titles by their English names, and inlining the
 * two on one line produces bidi soup that is hard to scan in either language.
 */
export function PanelTitle({
  href,
  en,
  ar,
  index,
}: {
  href: string;
  en: string;
  ar: string;
  index: number;
}) {
  return (
    <>
      <span className="panel-index tabular" aria-hidden="true">
        #{String(index).padStart(3, "0")}
      </span>
      <span className="panel-title">
        <a href={href}>
          <bdi lang="en">{en}</bdi>
        </a>
      </span>
      {/* BOTH runs are isolated, not just the Arabic one.
          Putting a direction on the block flips what start/end mean FOR THAT
          BLOCK, so the non-page-direction title flies to the opposite edge of
          the panel; `text-align: match-parent` does not rescue it. <bdi>
          isolates each run INLINE — correct bidi for mixed strings like
          "سبايدر مان (2017)" — while the block keeps the page direction and
          inherits the panel alignment.

          Isolating only the Arabic would work today and break at step 7: in the
          AR locale the page becomes dir="rtl" and the ENGLISH titles hit the
          exact mirror of the bug. */}
      <span className="panel-title-ar">
        <bdi lang="ar">{ar}</bdi>
      </span>
    </>
  );
}

/**
 * The comic caption box (§4.2). Sits in the gutter beside the thread from 768px
 * up, and stacks full-width beneath its node below that — never beside it,
 * because there is no room and a squeezed note is worse than a stacked one.
 */
/**
 * THE NOTE, AND THE TITLES IT NAMES, AS LINKS.
 *
 * "Before this one: the Deadpool films and Logan" is clear if you already know
 * what those are, and this site exists for the reader who does not. A name in
 * prose cannot be clicked, so every title the note refers to is rendered under
 * it as a real link with its poster — the same object the rest of the page uses
 * to mean "a thing you can watch".
 *
 * They come from `editorNote.mentions`, checked against the corpus by B21, so a
 * note can never point at a title that has been renamed away.
 */
export async function EditorNote({
  en,
  ar,
  signature,
  mentions = [],
  locale,
}: {
  en: string;
  ar: string;
  signature: string;
  mentions?: { id: string; titleEn: string; titleAr: string; poster: string | null }[];
  locale?: string;
}) {
  /* The label is computed here rather than passed in: two callers render this
     and neither should have to know how the disclosure words itself. */
  const t = await getTranslations();
  return (
    <aside className="editor-note">
      <p>{en}</p>
      <p lang="ar" dir="rtl">
        {ar}
      </p>
      {/**
       * THE TITLES ARE BEHIND A CLICK, not sitting in the note.
       *
       * A note is one line on a spine, and eight posters underneath it stopped
       * being a footnote and became a second gallery — on the timeline, where
       * the whole argument is that the line does not break, that is the worst
       * place to put one. The note reads as a note again, and the titles are
       * one keypress away for anyone who wants to know what "the Deadpool
       * films" actually means.
       *
       * Native `<details>`, like every other disclosure here: no JavaScript,
       * nothing for the CSP to block, keyboard-operable, and the links are in
       * the markup whether it is open or not.
       */}
      {mentions.length > 0 && locale && (
        <details className="note-more">
          <summary>
            <span>{t("title.noteMentions", { n: mentions.length })}</span>
            <span className="note-more-caret" aria-hidden="true" />
          </summary>
          <ul className="note-mentions" role="list">
            {mentions.map((m) => (
              <li key={m.id}>
                <Link className="note-mention" href={`/${locale}/path/${m.id}`}>
                  {m.poster && !m.poster.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://image.tmdb.org/t/p/w92${m.poster}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="note-mention-plate" aria-hidden="true" />
                  )}
                  <span className="note-mention-name">
                    <bdi lang="en">{m.titleEn}</bdi>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}

      <p className="editor-note-sig">{signature}</p>
    </aside>
  );
}
