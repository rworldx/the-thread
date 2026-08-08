import { getTranslations } from "next-intl/server";
import type { Ratings as RatingSet } from "@/content/build";

/**
 * THREE SCORES, EACH WEARING ITS OWN NAME.
 *
 * IMDb is the audience number and comes from IMDb's own daily dump, not from a
 * third party's copy of it. The Tomatometer and Metacritic are critic scores
 * and come from OMDb's `Ratings` array. They measure different populations, so
 * each card says which one it is rather than presenting a blended average that
 * would mean nothing.
 *
 * Metacritic is here because Letterboxd could not be. Letterboxd publishes no
 * API, and a scraped rating would be the only unverifiable number on the page.
 * Metacritic is a real third critic score from a real source.
 *
 * THE ROW COLLAPSES, and it has to. 80 of 156 titles have a Tomatometer and 78
 * have a Metacritic; almost none of the sixty-odd series have either, because
 * critics aggregate films far more than seasons. That is a real state, not a
 * gap to paper over, so a title with one score renders one card at full size
 * rather than one card and two empty slots.
 */
export async function Ratings({ ratings }: { ratings: RatingSet }) {
  const t = await getTranslations("title");
  const { imdb, rt, metacritic } = ratings;
  if (!imdb && rt === null && metacritic === null) return null;

  return (
    <div className="ratings" role="list" aria-label={t("ratingsLabel")}>
      {imdb && (
        <div className="rating" role="listitem" data-source="imdb">
          <span className="rating-source">IMDb</span>
          <span className="rating-score tabular">{imdb.score.toFixed(1)}</span>
          <span className="rating-votes">
            {t("votes", { n: imdb.votes.toLocaleString("en") })}
          </span>
        </div>
      )}

      {rt !== null && (
        <div className="rating" role="listitem" data-source="rt">
          <span className="rating-source">{t("tomatometer")}</span>
          {/* The number is stored as a number and the unit is added here, so
              the shape of OMDb's "85%" never leaks past the sync. */}
          <span className="rating-score tabular">{rt}%</span>
          <span className="rating-votes">{t("critics")}</span>
        </div>
      )}

      {metacritic !== null && (
        <div className="rating" role="listitem" data-source="metacritic">
          <span className="rating-source">Metacritic</span>
          <span className="rating-score tabular">{metacritic}</span>
          <span className="rating-votes">{t("outOf100")}</span>
        </div>
      )}
    </div>
  );
}
