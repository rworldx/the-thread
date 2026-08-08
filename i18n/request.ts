import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locales";

/**
 * UI chrome only. Titles, editor's notes and spoiler-safe lines live in
 * `content/` — they are editorial data, not interface strings, and they are
 * bilingual per node rather than per locale file.
 *
 * Every page is statically generated, so `setRequestLocale` is called in each
 * route before any translation is read; without it next-intl opts the tree into
 * dynamic rendering and the prerendered pages quietly become server-rendered.
 */

/**
 * IN DEV, READ THE FILE. IN PRODUCTION, IMPORT IT.
 *
 * This was a single `import(\`../messages/${locale}.json\`)` for both, and it
 * cost most of an afternoon of false diagnosis. Next caches that JSON module in
 * the dev server and does not reliably invalidate it when the file changes, so
 * editing a message left the running app serving the OLD set — while the page
 * component that referenced the NEW key had already hot-reloaded.
 *
 * The symptom is the worst possible one: `home.doorsHeadingA` printed raw on
 * the page, which looks exactly like a missing translation. I checked the two
 * JSON files, found the key present in both, checked the built HTML, found the
 * text rendered correctly, and told the user twice that it was their cache.
 * Being right about that was useless — the page was still broken in front of
 * them, and "restart your dev server" is not a fix, it is a thing to remember
 * forever.
 *
 * Reading from disk per request in dev is a few hundred microseconds on a
 * 30KB file and it makes the class of bug impossible. Production keeps the
 * static import so the messages are bundled and there is no filesystem read in
 * the request path — and production was never affected, because it builds once.
 */
async function load(locale: string): Promise<Record<string, unknown>> {
  if (process.env.NODE_ENV === "development") {
    /**
     * A PLAIN PATH, not a `URL`. Turbopack substitutes its own `URL` class in
     * the server bundle and `fs.readFile` rejects it — "must be of type string
     * or an instance of Buffer or URL. Received an instance of URL", which is
     * as confusing an error message as it sounds.
     *
     * `locale` has already been through `isLocale`, so it is one of two known
     * values and there is nothing here to traverse with.
     */
    const file = join(process.cwd(), "messages", `${locale}.json`);
    return JSON.parse(await readFile(file, "utf8")) as Record<string, unknown>;
  }
  return (await import(`../messages/${locale}.json`)).default;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : DEFAULT_LOCALE;

  return { locale, messages: await load(locale) };
});
