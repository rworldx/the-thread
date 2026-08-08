import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { sagaGroups, isReleased } from "@/lib/saga";
import { titles, posterOf, ratingsOf } from "@/content/build";
import { Poster } from "@/app/components/poster";
import { EditorNote } from "@/app/components/thread";
import { seasonLabel } from "@/lib/describe";
import { formatRuntimeIntl } from "@/lib/runtime";
import type { UiMessages } from "@/lib/ui-messages";
import { mentionsOf } from "@/lib/mentions";
import type { TitleSource } from "@/content/schema";

/**
 * EIGHTEEN YEARS ON ONE LINE.
 *
 * The whole visual argument is that the spine does not break. Phases and sagas
 * are MARKERS ON the line, never separate lines: rendering each phase as its
 * own rail would say "here are six things", and the true statement is "here is
 * one thing, and these are its chapters". So there is exactly one `.thread-rail`
 * for the entire page, absolutely positioned over every group, and the phase
 * headers sit beside it rather than interrupting it.
 *
 * STRUCTURE IS REAL, NOT VISUAL. Sagas are an `<ol>`, each saga's phases are a
 * nested `<ol>` inside its `<li>`, and each phase's titles are a nested `<ol>`
 * inside its own. A screen reader hears "Infinity Saga, list of 3 phases, Phase
 * One, list of 8 titles" rather than 72 flat rows with headings loose among
 * them. The rail is `aria-hidden` decoration layered over all of it; strip the
 * stylesheet and the order survives intact.
 *
 * UNRELEASED TITLES ARE VISIBLY DIFFERENT. Seven of Phase 6 have not come out.
 * A timeline that draws 2026 exactly like 2008 is lying about the only question
 * this site answers, so those get a hollow node, dimmed type and no rating.
 */

export async function SagaTimeline({
  locale,
  msg,
}: {
  locale: string;
  msg: UiMessages;
}) {
  const t = await getTranslations();
  const sagas = sagaGroups(titles);
  const mcu = sagas.flatMap((s) => s.phases.flatMap((p) => p.titles));

  return (
    <div className="saga-wrap">
      {/**
       * ONE RAIL, for the whole page. Not one per phase and not one per saga.
       * It is the argument.
       */}
      <svg
        className="thread-rail saga-rail"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 4 100"
      >
        <line className="thread-track" x1="2" y1="0" x2="2" y2="100" />
        <line className="thread-progress" x1="2" y1="0" x2="2" y2="100" pathLength="1" />
      </svg>


      <ol className="saga-list" role="list">
        {sagas.map((saga) => (
          <li key={saga.saga} className="saga">
            <header className="saga-head">
              <h2>{t(`saga.${saga.saga}`)}</h2>
              <p className="saga-meta tabular">
                <bdi>
                  {saga.from}
                  {"–"}
                  {saga.to}
                </bdi>
              </p>
            </header>

            <ol className="phase-list" role="list">
              {saga.phases.map((phase) => (
                <li key={phase.phase} className="phase">
                  {/* STICKY, releasing at the next phase. An 18-year scroll
                      without this is 72 rows with no sense of place. */}
                  <h3 className="phase-head">
                    <span className="phase-name">
                      {t("saga.phase", { n: phase.phase })}
                    </span>
                    <span className="phase-years tabular">
                      {phase.from}
                      {"–"}
                      {phase.to}
                    </span>
                  </h3>

                  <ol className="phase-titles" role="list">
                    {phase.titles.map((x, i) => (
                      <TimelineRow
                        key={x.id}
                        t={x}
                        locale={locale}
                        m={msg}
                        /* Stagger caps at 6: past that the last item waits half
                           a second for no reason a reader can perceive. */
                        step={Math.min(i, 5)}
                        showYear={
                          i === 0 ||
                          phase.titles[i - 1]!.releaseDate.slice(0, 4) !==
                            x.releaseDate.slice(0, 4)
                        }
                      />
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TimelineRow({
  t,
  locale,
  m,
  step,
  showYear,
}: {
  t: TitleSource;
  locale: string;
  m: UiMessages;
  step: number;
  showYear: boolean;
}) {
  const released = isReleased(t);
  const rating = released ? ratingsOf(t.id).imdb : null;
  const seasons = seasonLabel(t, m);
  const year = t.releaseDate.slice(0, 4);

  return (
    <li
      className="saga-row reveal-step"
      data-step={step}
      data-unreleased={released ? undefined : "true"}
    >
      {/* The year prints once per run, beside the spine, the way a year heading
          works on a real timeline rather than on every single row. */}
      {showYear && (
        <span className="saga-year tabular" aria-hidden="true">
          {year}
        </span>
      )}


      <div className="panel-card">
        <Poster title={t} posterPath={posterOf(t.id)} size="panel" locale={locale} />
        <div className="panel-card-body">
          {/* No index number here. On the order pages "#014" is the position
              in a list; on a timeline the YEAR is the marker and a running
              count beside it is a second, competing one. `PanelTitle` prints it
              from `index`, so the title block is written out instead. */}
          <span className="panel-title">
            <a href={`/${locale}/path/${t.id}`}>
              <bdi lang="en">{t.titleEn}</bdi>
            </a>
          </span>
          <span className="panel-title-ar">
            <bdi lang="ar">{t.titleAr}</bdi>
          </span>
          <p className="panel-meta">
            <span className="tabular">{year}</span>
            {seasons && <span>{seasons}</span>}
            {t.runtimeMin !== null && (
              <span className="runtime">
                <bdi>{formatRuntimeIntl(t.runtimeMin, m)}</bdi>
              </span>
            )}
            {rating && (
              <span className="saga-score tabular">
                {"★"} {rating.score.toFixed(1)}
              </span>
            )}
            {!released && <span className="saga-soon">{m.upcoming}</span>}
          </p>
        </div>
      </div>

      {/* INLINE ON THE SPINE, which is the entire reason this page beats a
          table. The detour is not a footnote at the bottom; it is standing in
          the order exactly where you would otherwise walk past it. */}
      {t.editorNote && (
        <EditorNote
          en={t.editorNote.en}
          ar={t.editorNote.ar}
          signature={m.signature}
          mentions={mentionsOf(t.editorNote.mentions)}
          locale={locale}
        />
      )}
    </li>
  );
}
