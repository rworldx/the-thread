import { getTranslations } from "next-intl/server";

/**
 * WHERE TO WATCH — GLOBAL, not regional.
 *
 * The region selector is gone, and its removal is a correction rather than a
 * simplification. Per-country JustWatch coverage is thin, and gating on it made
 * the site look emptier than the world is: it told a reader in Oman that a
 * Marvel film was "not streaming in OM" when it is on Disney+ there. A false
 * negative on the one question the page exists to answer is worse than a
 * slightly vague true one.
 *
 * So: every provider TMDB knows of anywhere, deduplicated, with one line saying
 * availability varies by country. That is both truer and more useful.
 *
 * This also stopped being a client component. There is no state left in it, and
 * a server component is one less island to hydrate on every title page.
 *
 * We link OUT and never embed or host video (§10). A site that streams is a
 * takedown; one that routes people to legal streamers is one the studios are
 * happy about.
 */

export async function WhereToWatch({ providers }: { providers: string[] }) {
  const t = await getTranslations("watch");

  return (
    <section className="where-to-watch" aria-labelledby="wtw-heading">
      <h2 id="wtw-heading">{t("heading")}</h2>

      {providers.length > 0 ? (
        <ul className="wtw-list" role="list">
          {providers.map((name) => (
            <li key={name} className="wtw-provider">
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="wtw-none">{t("nowhere")}</p>
      )}

      <p className="wtw-disclaimer">{t("varies")}</p>
      <p className="wtw-disclaimer">{t("disclaimer")}</p>
    </section>
  );
}
