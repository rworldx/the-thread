/**
 * EVERY EXTERNAL URL THIS SITE REFERENCES, REQUESTED.
 *
 *   npm run verify:assets
 *
 * THE FAILURE CLASS THIS EXISTS FOR: a fabricated identifier.
 *
 * Two TMDB person photo paths were written from memory. They had the right
 * shape — 27 base62 characters and a `.jpg` — the type system was happy, the
 * build was green, the page rendered, and both were 404. Nothing structural can
 * see that. A hash is only wrong in the sense that a server has never heard of
 * it, so the only check that works is asking the server.
 *
 * It was never contained to photos. Every one of these is a hand-or-machine
 * authored external identifier with nothing behind it:
 *
 *   - Elektra's `imdbId`, typed into the corpus by hand
 *   - two animated series with hand-set TMDB ids
 *   - 155 poster paths and 155 backdrops from the sync
 *   - 112 character artwork URLs from a third-party CDN
 *   - two person photo paths, the ones that started this
 *   - ~1,100 YouTube video keys
 *
 * A NETWORK CALL, so it is deliberately NOT part of `validate`. That runs on
 * every build and must stay hermetic and instant. This runs in CI and before a
 * deploy, where being slow and being right is the correct trade.
 *
 * HEAD where possible. YouTube has no HEAD for a watch URL, so trailers go
 * through the oEmbed endpoint, which 404s precisely when a video is gone,
 * private or region-locked out of existence.
 */

import { titles, posterOf, backdropOf, castOf, postersOf, videosOf, imdbIdOf } from "../content/build";
import { allCharacters } from "../lib/characters";
import { stones } from "../content/stones";
import { RIGHTS_LOGOS } from "../content/rights";

interface Target {
  url: string;
  what: string;
  where: string;
}

const TMDB = "https://image.tmdb.org/t/p";
/** The two ids hardcoded in app/components/people.tsx. */
const PEOPLE = [
  "/kKeyWoFtTqOPsbmwylNHmuB3En9.jpg",
  "/vbCNOAGNqox21Q462rY4w2WL9Eo.jpg",
];

function collect(): Target[] {
  const out: Target[] = [];
  const seen = new Set<string>();
  const add = (url: string, what: string, where: string) => {
    if (seen.has(url)) return;
    seen.add(url);
    out.push({ url, what, where });
  };

  for (const t of titles) {
    const poster = posterOf(t.id);
    // A hand-set poster is absolute; a synced one is a TMDB path. The one that
    // is typed by a human is exactly the one most worth requesting.
    if (poster) add(poster.startsWith("http") ? poster : `${TMDB}/w342${poster}`, "poster", t.id);
    const backdrop = backdropOf(t.id);
    if (backdrop) add(`${TMDB}/w780${backdrop}`, "backdrop", t.id);
    for (const p of postersOf(t.id)) add(`${TMDB}/w185${p}`, "gallery", t.id);
    for (const c of castOf(t.id)) {
      if (c.actorPhoto) add(`${TMDB}/w185${c.actorPhoto}`, "actor", t.id);
    }
    for (const v of videosOf(t.id)) {
      /**
       * oEmbed, not the watch page. YouTube answers 200 for a watch URL of a
       * deleted video and serves an error page, so the status code says
       * nothing. oEmbed 404s on exactly the states that matter.
       */
      add(
        `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${v.key}`,
        "trailer",
        `${t.id} (${v.key})`,
      );
    }
    /**
     * The IMDb id is checked as a real page rather than as an image, because it
     * is the one identifier in the corpus a human typed.
     */
    const imdb = imdbIdOf(t.id);
    if (imdb) add(`https://www.imdb.com/title/${imdb}/`, "imdb id", t.id);
  }

  for (const c of allCharacters) {
    if (c.image) add(c.image, "character art", c.id);
  }
  for (const p of PEOPLE) add(`${TMDB}/original${p}`, "person photo", "app/components/people.tsx");
  /* The six Infinity Stone renders. Same rule as every other URL here. */
  for (const s of stones) add(s.image, "stone art", s.id);
  /* The studio marks on the rights timeline. */
  for (const [k, v] of Object.entries(RIGHTS_LOGOS)) add(v.src, "studio logo", k);

  return out;
}

/**
 * HEAD first; some CDNs only answer GET, so fall back before failing.
 *
 * TWO WAYS THIS INSTRUMENT WAS WRONG ON ITS FIRST RUN, and both had to be
 * fixed before the output meant anything. It reported 145 failures and 143 of
 * them were correct URLs:
 *
 *   IMDb answers 202 Accepted to an automated HEAD, not 200. The id is fine
 *   and the page exists; 202 is their bot mitigation acknowledging the
 *   request. Any 2xx is a pass.
 *
 *   YouTube oEmbed answers 401/403 when a video exists but its owner has
 *   disabled embedding. This site does not embed anything — every trailer is a
 *   plain link — so an embed restriction says nothing about whether the link
 *   works. Those are counted separately and are not failures.
 *
 * A checker that cries wolf on 143 correct URLs is worse than no checker,
 * because the two real failures are invisible in the noise.
 */
const EMBED_RESTRICTED = new Set([401, 403]);

/**
 * A 429 IS NOT A DEAD URL, AND NEITHER IS A 503.
 *
 * This check exists to catch a FABRICATED identifier — a hash that no server
 * has ever heard of. That is a 404, and it is permanent. Rate limiting and
 * gateway errors are the opposite: the URL is fine and the host is asking us
 * to slow down.
 *
 * Treating them the same made CI fail on pushes where nothing had changed.
 * 7,800 requests arriving from a datacenter IP get throttled in a way they
 * never are from a laptop, so the check was crying wolf on correct data — and a
 * gate that fails at random is one people learn to ignore, which is exactly how
 * a real 404 would then get through.
 *
 * Transient statuses are retried with a widening pause. A URL is only reported
 * as broken once it has failed three times over several seconds.
 */
const TRANSIENT = new Set([408, 425, 429, 500, 502, 503, 504]);

async function once(t: Target): Promise<number> {
  const opts = { redirect: "follow" as const, headers: { "user-agent": "the-thread/verify" } };
  try {
    const head = await fetch(t.url, { method: "HEAD", ...opts });
    if (head.status === 405 || (head.status === 403 && t.what !== "trailer")) {
      const get = await fetch(t.url, { method: "GET", ...opts });
      return get.status;
    }
    return head.status;
  } catch {
    return 0; // network failure, reported distinctly from a 404
  }
}

async function check(t: Target): Promise<number> {
  let status = await once(t);
  for (let attempt = 1; attempt <= 2 && (status === 0 || TRANSIENT.has(status)); attempt += 1) {
    await new Promise((r) => setTimeout(r, attempt * 1500));
    status = await once(t);
  }
  return status;
}

const ok = (status: number, what: string) =>
  (status >= 200 && status < 300) || (what === "trailer" && EMBED_RESTRICTED.has(status));

async function main() {
  const targets = collect();
  const byWhat = new Map<string, number>();
  for (const t of targets) byWhat.set(t.what, (byWhat.get(t.what) ?? 0) + 1);
  console.log(`\n  ${targets.length} external URLs to verify`);
  for (const [what, n] of [...byWhat].sort()) console.log(`    ${what.padEnd(16)} ${n}`);
  console.log("");

  const failures: (Target & { status: number })[] = [];
  const restricted: Target[] = [];
  /**
   * TWELVE, not twenty-four. The point of this script is to be right, not to be
   * quick, and half the parallelism costs a couple of minutes on a job that
   * only runs in CI.
   */
  const CONCURRENCY = 12;
  let done = 0;

  const queue = [...targets];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (;;) {
        const t = queue.shift();
        if (!t) return;
        const status = await check(t);
        done += 1;
        if (done % 100 === 0) process.stdout.write(`\r  checked ${done}/${targets.length}`.padEnd(40));
        if (t.what === "trailer" && EMBED_RESTRICTED.has(status)) restricted.push(t);
        else if (!ok(status, t.what)) failures.push({ ...t, status });
      }
    }),
  );
  process.stdout.write(`\r  checked ${done}/${targets.length}`.padEnd(40) + "\n\n");

  /**
   * A SECOND PASS, IN THE QUIET, AND IT IS THE WHOLE FIX.
   *
   * The in-flight retry was useless: it fired 1.5 seconds into a flood of 7,800
   * requests, while the very congestion that caused the failure was still at
   * its peak. Four TMDB images failed CI that way — all four returning 200 with
   * real bytes the moment anyone asked them calmly.
   *
   * So every failure is re-checked AFTER the flood has drained, one at a time,
   * with a pause. A URL that fails under load and answers when asked politely
   * is not a dead URL, and reporting it as one is how this gate teaches people
   * to ignore it.
   *
   * A fabricated identifier 404s in the quiet exactly as it did in the noise.
   * That is the thing this script exists to catch, and it still catches it.
   */
  if (failures.length > 0) {
    console.log(`  ${failures.length} to re-check quietly, after the flood…\n`);
    await new Promise((r) => setTimeout(r, 5000));
    const survived: typeof failures = [];
    for (const f of failures) {
      const status = await check(f);
      if (!ok(status, f.what)) survived.push({ ...f, status });
      await new Promise((r) => setTimeout(r, 250));
    }
    failures.length = 0;
    failures.push(...survived);
  }

  if (restricted.length > 0) {
    console.log(
      `  ${restricted.length} trailer(s) have embedding disabled by their owner.\n` +
        "  Not a failure: this site links to YouTube and embeds nothing.\n",
    );
  }

  if (failures.length === 0) {
    console.log(`  every one of ${targets.length} external URLs resolves.\n`);
    return;
  }

  console.log(`  ${failures.length} FAILED:\n`);
  for (const f of failures.sort((a, b) => a.what.localeCompare(b.what))) {
    console.log(`    [${f.status || "network"}] ${f.what.padEnd(14)} ${f.where}`);
    console.log(`      ${f.url}`);
  }
  console.log("");
  process.exitCode = 1;
}

await main();
