# The Thread

**What to watch before the thing you want to watch.**

Marvel watch-order lists already exist. This is not one. You name a single title
and it computes the shortest honest path to it — a dependency resolver over the
whole Marvel screen canon, not just the MCU.

Independent fan project. Not affiliated with or endorsed by Marvel Studios,
Disney, Sony, or 20th Century Studios.

---

## Status

All ten steps of the build order are complete. The hard thing worked before the
pretty thing did: the graph engine and its tests landed before a single line of
CSS, and `/path/[slug]` shipped deliberately unstyled to prove the product
before it looked like anything.

| | |
|---|---|
| Titles in the corpus | 216 |
| Rights-holders | MCU (74) · Animation (56) · Legacy (31) · Fox (18) · Sony (15) · Defenders (13) · Marvel Television (9) |
| Universes, as navigated | 8 — Fox splits into X-Men and Fantastic Four, two separate watch orders |
| The essentials spine | 22 titles, Iron Man → Far From Home |
| Characters | 670, appearances derived from cast |
| Episodes | 2,193, with stills and runtimes, on the season pages |
| Pages | 1,881, all statically prerendered |
| Tests | 317 unit + 51 browser |
| Locales | English and Arabic, both rendering |

**Images: nothing is transformed by Vercel.** Image Optimization is billed per
transformation, and 216 posters plus 670 portraits plus galleries and search
thumbnails exhausted the 5,000 free ones — after which the optimiser *errors*
rather than degrading, so most of the deployed site lost its images while
localhost looked perfect. Reducing usage does not refund a spent quota, so the
count is now zero: TMDB serves each poster at a width written into the path,
Wikia — the one host of eighteen that refuses a hotlinked request — goes
through the free `images.weserv.nl`, and every other host is used directly. A
full crawl of twelve routes and both searches makes **0** billed requests, and
the direct-request count simply tracks the corpus. `image-loader.ts` records the two
shapes that were tried first and why each failed.

**Seven and eight are both right, and they count different things.** Seven is
the number of rights-holders in the data — the `universe` field. Eight is how
the site is navigated, because Fox's X-Men and Fantastic Four are two separate
orders that share a studio and nothing else.

## Context of use (ISO 9241-210)

Two distinct user goals, which is why the product has two front doors:

1. **The newcomer** has watched nothing and wants a starting point that will not
   take 200 hours. Served by the 22-title essentials spine.
2. **The returning viewer** wants to watch one specific thing tonight and needs
   to know what it depends on. Served by `pathTo(id)`.

Every competitor makes these two people share one screen. The whole product
follows from not doing that.

### What the spine is, and is not

The essentials path is **the Infinity Saga, start to finish** — 22 titles, Iron
Man through Far From Home. It ends in 2019 by design, because that is where the
story ends, not because the list is stale.

The homepage card therefore reads **"22 titles. The Infinity Saga, start to
finish."** It must not read "catch up": a newcomer who finishes it in 2026 is
seven years behind, and framing a complete story as a catch-up list turns a
satisfying ending into a gap. What comes after is a separate door, not a
remainder.

## Architecture

Order is a **derived value**, never a hardcoded list. Every title is a node;
every prerequisite is an edge. Four orders fall out of one graph.

```
content/schema.ts          TitleSource (hand-written) → Title (post-sync)
content/titles.ts          the 216 nodes, one per line of the source document
content/tmdb.generated.json  machine-fetched facts, committed
content/copy.ts            the 216 spoiler-safe one-liners, EN + AR
content/build.ts           the merge — the ONLY thing pages import
app/poster-tints.css       generated per-title dominant colours
lib/graph.ts               topoSort · releaseOrder · essentialsOrder · pathTo
lib/validate.ts            cross-node rules; runs in CI and fails the build
lib/runtime.ts             runtimeOf · formatRuntime · schedule
lib/locales.ts             the routing surface for locales
lib/describe.ts            seasonLabel · formatCost · totalRuntime
lib/collections.ts         the groupings the homepage and /projects render
lib/wall.ts                which 24 posters make the hero, and in what order
content/character-schema.ts  CharacterSource — species, roles, mutant levels
content/characters.ts      the 670 people, hand-written; appearances are NOT
lib/characters.ts          the cast join — see "Characters" below
scripts/sync-tmdb.ts       build-time TMDB fetch; zero API calls in production
scripts/sync-characters.ts artwork resolution; writes character-art.generated
```

**Three layers, not two.** `titles.ts` is hand-written, `tmdb.generated.json`
is fetched, and `build.ts` joins them — pages import only the join. Without that
merge the `Title` schema would be a gate with nothing passing through it: sync
would write its file, the file would be committed, and every page would go on
saying "runtime not yet synced" forever.

Precedence is deliberately asymmetric. Generated wins for `releaseDate` (it is
strictly more precise). Hand-authored wins for `runtimeMin` and `tmdbId`, and
**always** wins for `context`.

`spoilerSafe` is never seeded at all — see below.

The join is checked in both directions at import time: an orphaned record means
a renamed id silently lost its data, and an unfetched title means the corpus grew
since the last sync. Either fails the build.

**Two schemas, on purpose.** `TitleSource` is what a human writes; anything that
can only come from TMDB (runtime, exact release date, poster, plot copy) is
nullable. `Title` is what the UI renders and permits none of those nulls. The
split means a missing fact fails the build loudly instead of shipping as a
confidently wrong runtime or an invented plot summary.

**Three kinds of ordering data**, which are not interchangeable:

- `requires` — a hard dependency. Drives `pathTo`.
- `enriches` — a soft recommendation. Drives the "+ Recommended" toggle.
- `storyRank` — the author's curated sequence within one universe. Exists
  because the Fox X-Men films are read First Class → Origins → X-Men → X2, by
  events rather than release. That is not a dependency and must not be encoded
  as one.

## Characters

670 people. Their **appearances are derived, never typed**: a character is in a
title when that title's TMDB cast credits name them. Hand-listing them would put
the same fact in two files — the mistake `titleEn` and `spoilerSafe` each made
once — and the second copy always rots first.

The join runs on `aliases`, because a credit is written for a poster rather than
for a database: `Logan / Wolverine`, `Dr. Otto Octavius`, `James Buchanan
"Bucky" Barnes`, `Ted (Man-Thing)`. The matcher splits on the slash, reads
inside the brackets, offers a quoted nickname three ways, and compares **whole
segments** — never substrings, which once put Vision in every title crediting
"Television".

**One general rule, and only one.** An age prefix is stripped when the full form
matches nothing: `Baby Groot` is Groot, and thirty-nine credits wear a
qualifier like that. Two similar-looking rules were measured and rejected —
stripping a leading article gives Hope van Dyne her mother's scenes, because
Ant-Man credits `Janet van Dyne / The Wasp`; stripping an honorific gives Dagger
a M.O.D.O.K. character called `General Dagger`. Those became explicit aliases
instead, which are duller and cannot reach a stranger.

**Two escape hatches, both self-policing**, because derivation cannot be
absolute:

| | For | Fails how |
|---|---|---|
| `alsoIn` | An appearance that is real and **uncredited**. TMDB lists four credits for the whole 1967 Fantastic Four series, and the Silver Surfer carries one of its episodes | Nothing — it is additive, so it is kept narrow by review |
| `notIn` | A credit that uses the character's word for **somebody else**. Daredevil season 2 credits a bit part as "Leader"; the Hulk's Leader is not in that show | **Throws at build time** if it stops matching, so a stale exclusion cannot hide |

Neither may be used to paper over a matcher bug. If a credit really is the
character, the fix belongs in the alias list or the matcher.

**Chips are a hierarchy, and a parent contains its children.** Selecting
Mutants and then Omega must narrow, not empty — so every child chip is asserted
to be a subset of its parent (`C26`). That property was shipped broken three
times before it became a test.

## Invariants enforced in CI

`npm run validate` fails the build on any of these:

| Rule | What it catches |
|---|---|
| `cycle` | a prerequisite loop — reported as a path, `a → b → c → a`, not a boolean |
| `soft-cycle` | a loop in `requires ∪ enriches` that the hard graph alone would miss |
| `essential-closure` | an essential title depending on a non-essential one, which puts a silent hole in the 22-title spine |
| `optional-with-dependents` | a title drawn dashed as "skippable" that something else hard-requires — the thread would tell a user to skip it and then strand them |
| `missing-editor-note` | a cross-universe detour, hard **or** recommended, with no explanation shown to the user |
| `superfluous-editor-note` | a note on plain sequence — if every edge got one, the caption box would stop meaning "detour ahead" |
| `dangling-requires` / `-enriches` | an edge pointing at an id that does not exist |
| `duplicate-id` / `duplicate-season` | two nodes claiming the same identity |
| `story-rank-coverage` | a partially-ranked universe, which would render a half-empty toggle |
| `story-rank-contradiction` | a curated order that puts a prerequisite after its dependent |

## Getting started

```bash
npm install
npm run build     # 1,881 static pages — render tests read its output
npm test          # 317 unit tests
npm run test:e2e  # 320px reflow + touch targets, real browser
npm run shots     # §13.12 matrix: widths × themes × 5 routes + contact sheets
npm run validate  # corpus gate — hermetic, runs on every build
npm run typecheck
npm run verify:assets  # asks all ~9,200 external URLs to resolve. CI runs it;
                       # it is deliberately NOT part of validate, which must
                       # stay offline and instant
```

To populate runtimes, dates, and posters:

```bash
cp .env.example .env.local     # add your TMDB v4 read token
npm run sync:tmdb              # ~216 requests, writes content/tmdb.generated.json
```

Commit the generated JSON. Production makes **zero** TMDB calls — pages stay
static, there is no rate limit to hit, and no API key exists at runtime.

## Deploying

Push to GitHub, import the repo on Vercel. No environment variables are needed
in Vercel: `TMDB_READ_TOKEN` is used only by the local sync script, whose output
is committed.

## Editorial cost

`npm run validate` prints the resolved path length and runtime behind every
editor's note, on every CI run. A note is a promise that a detour is worth
taking; how long that detour actually is belongs in the diff that introduces it,
not in a user's evening three screens down the thread.

```
node                                          min   full   +rec
spider-man-no-way-home                         28     30      2
doctor-strange-in-the-multiverse-of-madness    32     48     16
    ↳ recommends "agents-of-shield" (7 seasons) — check this is intended
she-hulk-attorney-at-law-s1                    23     25      2
echo-s1                                        37     38      1
deadpool-and-wolverine                         34     42      8
```

## Recommendations are never a flat list

`recommendationsFor(id)` groups every recommendation by what suggests it and
prices its transitive cost. Taking one recommendation can cost a hundred hours
and another can cost nothing; a bullet each makes them look equal.

```
Also recommended · 8 more

  Elektra                             2005 · legacy
    ↳ needs Daredevil first — 1 title
  Blade                               1998 · legacy
  Blade: Trinity                      2004 · legacy
    ↳ needs Blade, Blade II first — 2 titles
```

Same principle as the editor's note: surface the homework before someone commits
to it, rather than letting them discover it three screens in.

## Typography

The Arabic display face is a single CSS variable, `--font-ar-display`, so it is
one line to change:

- **Arabic display:** Thmanyah Serif Display. **Arabic body:** Thmanyah Sans.
  Thmanyah's own FAQ states the family is free for personal and commercial use,
  explicitly including website and app interfaces. Served via `next/font/local`,
  which hashes the filenames and self-hosts, so nothing sits at a guessable path.
  Four woff2 weights only — every extra weight is a file every Arabic visitor
  downloads.
- **Fallbacks:** Noto Naskh Arabic and Noto Sans Arabic stay in each stack, so a
  glyph Thmanyah lacks still renders rather than dropping to a system default.
- Credited in the footer. Not required by the licence; it credits a Saudi type
  foundry on a bilingual Arabic project.

The Latin voice is **one family at several weights, not two**: Archivo carries
display and text, with IBM Plex Mono for data. It replaced Anton + Epilogue in
the design pass. Anton is a heavy condensed poster face, which is comic-cover
lettering and therefore the first thing anyone reaches for on a Marvel brief;
this site is not about the films but about the record of them, and a record is
set in a neutral grotesk. Epilogue sat on the same axis as Anton, which is the
one pairing to avoid: two grotesques, similar but not identical.

No Latin face covers Arabic, so the AR display voice is deliberately its own
rather than a stretched Latin one.

## Open decisions

- **Story order site-wide.** Cut from v1. `storyYear` needs ~216 researched
  facts that exist on no API, and a half-null toggle is worse than none. The
  field is in the schema, nullable, for v1.1.

## Legal

- Never hosts or embeds video. Links out to legal streamers only.
- No Marvel logo, wordmark, or trade dress.
- Poster artwork is hotlinked from TMDB, never re-hosted. TMDB attribution
  appears in the footer, as their terms require.

## Why `body` has no `overflow-x: hidden`

It conceals overflow rather than preventing it. With it set, the 320px floor
stops being enforceable, the dev guard in `app/overflow-guard.tsx` finds nothing,
and every `scrollWidth` assertion in `e2e/reflow.spec.ts` passes on a visibly
broken layout. It also makes `body` a scroll container, which breaks
`position: sticky` on descendants — and the sticky top bar arrives in step 5.

Overflow stays visible so the tests can fail on it. `tests/contrast.test.ts` G13
keeps it that way.

## Size is never implied

`seasons` is the single source of truth for how big a node is, and the UI has to
show it. "Agents of S.H.I.E.L.D." beside "Blade" is a lie — one is seven seasons
and the other is one film — so any node covering more than one season renders its
count everywhere it appears, and cost annotations lead with runtime rather than a
title count:

```
↳ needs Agents of S.H.I.E.L.D. (7 seasons) first — ~102h (1 title, 7 seasons)
↳ needs Blade, Blade II first — ~4h (2 titles)
```

Leading with "1 title" vs "2 titles" would rank these exactly backwards.

## Looking at it is part of the process

`npm run shots` renders every route at 320 / 360 / 390 / 430 / 768 / 1024 / 1280
/ 1440 in light, and at 390 / 768 / 1440 in dark, composing one contact sheet
per route per theme into a gitignored `screenshots/`.

The dark axis found a bug on its first run: `--red-200` is a pale pink on paper
and a near-**white** stripe on `#140A0A`, so the rail track dominated the line
and the red progress read as secondary — the signature element, inverted. Dark
had shipped with the tokens four commits earlier and had never been rendered.

It exists because ad-hoc screenshots caught four real defects in a single
session that no assertion saw: desktop panels sharing a grid row (which reads as
"simultaneous" rather than "then"), a 3px node/text collision, Arabic titles
flung to the opposite edge of every panel, and bidi soup in the title block.
None of those move a `scrollWidth`. The only way to keep catching them is to
make looking cheap.

## Two attributes that look redundant and are not

`role="list"` on the thread `<ol>` — Safari with VoiceOver drops list semantics
entirely when `list-style` is `none`, so without it there is no "list, 34 items"
and no "item 3 of 34". The premise of the Thread component is that the order
lives in the `<ol>` rather than the decoration; that premise is false in Safari
without this attribute.

`<bdi>` around **both** the English and the Arabic title, not just the Arabic.
Putting a `dir` on the block flips what `start`/`end` mean *for that block*, so
the title aligns to the opposite edge of its panel. Isolating only Arabic works
today and breaks at step 7, when the AR locale makes the page `dir="rtl"` and
the English titles hit the mirror of the same bug.

Both are asserted in `tests/render.test.ts`. Both look deletable. Neither is.

## What the data confirmed

Nine commits ran with every runtime null, so several claims were unverified.
After the first sync:

- **The spine is 48h 09m.** Brief §12's copy — *"22 titles, about 48 hours"* —
  holds almost exactly. `F7f` pins it between 45 and 51 hours.
- **The Inhumans recommendation costs ~98h 52m**, against Blade: Trinity's
  ~3h 58m. That 25× gap is the whole reason cost annotations lead with runtime
  rather than a title count.
- **215 of 216 titles matched**, and it is still the same one that does not. The one that did not, *Elektra (The Hand & The
  Devil)*, has no TMDB record — a rumoured project. `F7d` names it explicitly so
  a future title quietly failing to match cannot hide among the nulls.
- **All 216 spoiler-safe lines are written**, in `content/copy.ts`. The English
  is final; **every Arabic line is a draft awaiting a native read** — listed with
  its English beside it in `docs/COPY-TODO.md`.

## The two copy fields are not interchangeable

| field | shown | seeded from TMDB? |
|---|---|---|
| `spoilerSafe` | **always** — shield up or down, to everyone | **never** |
| `context` | masked until tapped | yes, from `overview` |

A TMDB `overview` is a marketing synopsis: it gives away the premise turn, and
for *Infinity War* or *Endgame* it describes the plot outright. Seeding it into
`spoilerSafe` switched the spoiler shield off by default for every matched
title — silently, with every test green — and spoiler safety is one of the five
gaps this project competes on (§1).

Overviews now seed `context`, which is precisely what shielded connective tissue
is. `spoilerSafe` is authored by hand, capped at 120 characters **in the schema**
so a pasted synopsis fails to parse rather than merely being discouraged. That
cap is the difference between the site's descriptions being its own work and
being 114 pasted blurbs.

## Why poster tints are a stylesheet

`.poster` reads `--poster-tint`, which is per-title. The obvious delivery is
`style="--poster-tint:#4a1d1d"` — and that is the same trap as the `grid-row`
inline style already removed from the Thread. A CSP without `unsafe-inline`
blocks style attributes, and the failure here is quieter: the layout would not
break, it would silently become 216 identical grey boxes, cancelling the whole
§14.4 placeholder strategy.

`scripts/gen-tints.ts` writes `app/poster-tints.css` from the synced data — one
rule per title, keyed off `data-tint`. Build-time, cacheable, nonce-able, and
`R16` ("no page emits an inline style attribute") stays true. 129 rules, 117
distinct colours, confirming `sharp` actually extracted them rather than
silently falling back to neutral.

## `\b` and `\w` are ASCII-only, and they fail open

`/^(الموسم|المواسم)\b/` never matched anything. JavaScript defines `\b` over
ASCII `[A-Za-z0-9_]`, so between an Arabic letter and a space there is no
boundary to find. It matched nothing, threw nothing, and left the rule it
belonged to looking correct.

The precise hazard, because it is narrower than "regexes and Arabic":

| | behaviour |
|---|---|
| `\b` `\B` `\w` `\W` | **ASCII-only.** The `u` flag does *not* fix them — only `\p{…}` is Unicode-aware |
| `\s` | Unicode-aware by spec. Safe |
| `\d` | ASCII `0–9` only. Correct here, since §6 fixes Western numerals |

`tests/regex-guard.test.ts` scans `lib/`, `scripts/`, `content/` and `app/` for
the dangerous four and fails the build unless the line carries an `ascii-ok:`
note. One legitimate use survives — TMDB poster paths are base-62 by
construction.

Related: the `spoilerSafe` length cap measures **visible** characters, not
UTF-16 code units. Arabic diacritics are each their own code unit, so `.length`
would charge a fully-voweled line for vowels the reader sees as part of the
letter — and fail a line that is visually shorter than its English counterpart.

## Locale routing landed before the translation

Every route lives under `app/[locale]`, with `LOCALES = ["en"]` for now. There is
no `app/layout.tsx`: the layout that knows the locale is the topmost one, so
`lang` and `dir` are read from the segment rather than hardcoded, and `/`
redirects to `/en` via config rather than middleware so a static build still works.

The routing move is mechanical and the translation is not, so they are separate
commits. Step 7 is "add `ar` to `LOCALES`, then do the RTL and copy work" —
not a routing refactor tangled up with a bidi refactor, across four page types
once step 6 lands instead of two.

## Rendering and publishing are separate gates

`LOCALES = ["en", "ar"]` — both locales build and render. What is gated is
**deployment**, not rendering:

- `arReviewed` in `content/copy.ts` is `false`, so `npm run check:publishable`
  exits non-zero.
- `/ar` carries `robots: noindex` until it flips.

Keeping `ar` out of `LOCALES` until the copy was reviewed meant every
`[dir="rtl"]` and `:lang(ar)` rule in `globals.css` was unreachable code and the
thread's logical-property mirroring had never once executed. That is the
dark-mode failure again — shipped with the tokens, unrendered, broken on first
look — except RTL is the moat.

The first AR render found four bugs in one screenshot, none of which any
assertion could see:

1. **English headings in Noto Naskh.** `[dir="rtl"] h1` applied the Arabic face
   to English text — and titles are English-primary in both locales, so that was
   most of the page. The display voice now follows the *text's* language.
2. **No page gutter.** Text hugged the viewport edge. Pre-existing, invisible in
   LTR where the eye starts at the margin anyway.
3. **`34 titles · 75h 26m` reordered to `titles · 75h 26m 34`** — a leading
   number is a weak-direction run that gets pulled to the paragraph's start edge.
   Fixed with `<bdi>`.
4. **The back arrow did not mirror.** Directional icons flip; logos, posters and
   numerals do not (§6).

## Numerals stay Western — a decision, not a default

`1`, `44`, not `١`, `٤٤`. Brief §6, confirmed deliberately: Shahid, OSN, Netflix
MENA and Disney+ MENA all use Western digits, as do most GCC banking and
government apps. Eastern Arabic numerals are alive in print and handwriting, but
a viewer scanning a watch-order list has been trained on the Western forms.

## `.tabular` holds numerals, and nothing else

`--font-mono` is IBM Plex Mono, which has **no Arabic coverage**. A tabular span
holding Arabic renders its digits in Plex and its words in a fallback — a
mixed-font phrase on every row of every AR page. That is exactly what happened
when the runtime carried `.tabular` and became `ساعة واحدة و44 دقيقة`.

The obvious CSS fix is worse than the bug: `.tabular:lang(ar)` matches *every*
tabular span on an Arabic page, because `lang` is inherited from `<html>`, so it
strips mono from the year and the `#001` index too — Latin numerals that want the
column alignment.

So the rule is enforced by assertion (`R21`) rather than by an override that
cannot tell which spans hold Arabic. `H5` separately guards that nothing under
`app/` imports `formatRuntime`, which is English-only and must never reach a page.

## Routes

| Route | Job |
|---|---|
| `/[locale]` | The poster mosaic, two doors, and "Previously…" for anyone returning |
| `/[locale]/path/[slug]` | A title, and the path to it. **One route, not two** |
| `/[locale]/universes` | The eight doors, side by side |
| `/[locale]/universes/[id]/[[...opts]]` | One universe, its order and its view. `all` is the whole thread |
| `/[locale]/projects` | Everything there is, grouped — the flat inventory |
| `/[locale]/characters` | The grid, its chips and its search |
| `/[locale]/characters/[id]` | One person, every title they are in, and who played them |
| `/[locale]/rights` | Who owned what, and when. The answer to "why is this hard" |
| `/[locale]/what-is-marvel` | Comics → studio → the rights split |

**Five doors, one destination.** Orders by time, universes by studio, characters
by person, search by name, rights by history. They are peers in the navigation,
not one primary and four secondaries, and every one of them ends in the same
place: a title and what to watch before it.

`/title` and `/path` were specified separately in the brief. That was wrong:
when someone asks about a title, the path **is** the answer, and splitting them
makes a person navigate to reach the thing they came for.

## The decision log

Every one of these was a correction, not a plan. They are recorded because the
reasoning is worth more than the outcome.

| Decision | Why |
|---|---|
| Two schemas, `TitleSource` → `Title` | So no runtime, date or plot line is ever invented. A missing fact fails the build loudly |
| `requires` / `enriches` / `storyRank` | Three different things. A reading order is not a dependency, and encoding it as one poisons every path |
| Overviews seed `context`, never `spoilerSafe` | A marketing synopsis in the always-visible field turns the spoiler shield off by default |
| The shield fetches, not hides | Blur and `visibility:hidden` leave the text in the DOM for select-all and view-source |
| One `<ol>`, thread is `aria-hidden` | The signature element must never *be* the information architecture |
| No load-bearing inline styles | A CSP blocks `style` attributes, and the failure is silent |
| `content-visibility` NOT applied | Measured: LCP 212ms, CLS 0.019 on the heaviest page. §14.6 fixed a measured problem; there isn't one. Local measurement — a floor, not a prediction; see Deploying |
| Universe is `كون`, in both numbers | `عوالم` is the plural of `عالم`, a different root. Using it beside `الكون` splits one concept across two words. Guarded by I8 |
| Static + `script-src 'unsafe-inline'` | Next always emits an inline bootstrap. A nonce means 294 dynamic pages, to defend an injection surface that does not exist |
| Western numerals in Arabic | What GCC streaming and banking UIs actually use |
| Progress in `localStorage` only | No accounts means no auth surface, no PII, no GDPR obligation. That is a feature |
| Universes are RIGHTS, not genres | Who owned the character when the thing was made. `marvel-tv` exists because filing Agents of S.H.I.E.L.D. beside Endgame told a beginner something false: Marvel Television was a different company, and its shows lost canon status when it was absorbed in 2019 |
| **Ratings are TMDB's, and say so** | No OMDb key exists, and TMDB's `vote_average` is a different population from IMDb's. `imdbId` is synced so a real IMDb number can be joined later without a migration. Printing one under the other's label is a lie the reader cannot check |
| Vote count beside every score | A 9.4 from 4,000 votes and an 8.4 from 1.4 million are not the same claim |
| Appearances derived from cast | Hand-listing them on both the character and the title is two sources of truth for one fact, which has already drifted twice here |
| The portrait is the most-credited actor | "First in release order" put a 1992 voice actor on Wolverine. Nothing threw; a screenshot caught it |
| An alias is a JOIN KEY | Sam Wilson had "Captain America" in his alias list, so he collected eight of Steve Rogers's credits and Chris Evans's photograph. `C18` now forbids a shared alias |
| Dark is the DEFAULT | Posters are mostly dark and high-contrast. A wall of them on white reads as a contact sheet; on #0A0A0B it reads as a cinema |
| Light / Dark / Auto as radios | A two-state toggle cannot say "follow my system", which is what auto does and what almost everyone wants |
| Where to watch is GLOBAL | "Not streaming in OM" was a false negative for a film that is on Disney+ in Oman. A false negative on the one question the page answers is worse than a vague true one |
| The trailer is a facade | An embedded iframe costs ~700KB of third-party script on load. `frame-src` allows exactly youtube-nocookie, and only after a click |
| Full-bleed by negating the gutter | `calc(50% - 50vw)` counts the scrollbar, so the hero was wider than the viewport on every browser that reserves one. Caught by the 320px floor on the first build |
| **Fabricated identifiers are their own failure class** | Two TMDB person photo paths were written from memory. Right shape, clean typecheck, green build, rendered page, both 404. Only a request can see it. `npm run verify:assets` HEADs all 3,674 external URLs and runs in CI |
| IMDb from IMDb, critics from OMDb | `datasets.imdbws.com` is IMDb's own daily dump and is authoritative; OMDb keeps a copy that can lag. Only the `Ratings` array is read from OMDb, for Rotten Tomatoes and Metacritic |
| Metacritic instead of Letterboxd | Letterboxd publishes no API. A scraped rating would be the only unverifiable number on the page. Metacritic is a real third critic score, already in the OMDb payload |
| Marvel's API evaluated, unreachable | developer.marvel.com no longer has a developer surface: `/account` redirects to the consumer homepage and there is no sign-in to obtain a key. The code path was deleted rather than left dormant. 9 characters carry the designed initial plate, and `C17` keeps that gap honest by forbidding an actor still in its place |
| `content-visibility` removed again | It skips rendering off-screen subtrees, so every full-page screenshot showed the character grid empty. It blinds the gate that catches everything else. It returns when the budget test fails and says so |
| Cool zinc neutrals, not warm | `--paper` was `#FEF2F2`, which is red-50: a pink page under red hairlines. Warm neutral plus red is the beige/oxblood family every "premium" AI page ships. The posters supply all the warmth this design needs |
| Red on exactly five things | Thread, target node, progress fill, focus ring, one CTA. Every other red box became a hairline. On a page that is already 216 posters, red chrome reads as noise rather than as system |
| `--color-branch`, renamed and relit | It means "not Marvel Studios", not "blue". The old `#1E40AF` was 2.28:1 on the dark ground and had never been measured there, so the fork's one piece of information was near-invisible in dark mode. `#2563EB` clears 3:1 in both |
| The scroll reveal moves, it does not fade | An opacity reveal on a `view()` timeline needs `fill-mode: both`, which held every below-the-fold section at opacity 0 until scrolled. Two whole homepage sections rendered blank in the screenshot sheets, in print, and in any headless render |
| One arrow component, not four | `←` and `→` were text, so they inherited the font stack and changed shape between locales. Phosphor, imported from `/dist/ssr/*` so the pages that show an arrow still ship zero JavaScript |
| `نحو`, not `~`, in Arabic | `~` is bidi-neutral: before a Latin numeral in an RTL paragraph it renders on the far side of the digit, so "~746 ساعة" read as "746~". Arabic writes approximation with a word |

## What the tests are for

They are not coverage. Each one exists because something silently broke.

| Guard | The failure it caught |
|---|---|
| `render.test.ts` | 130 pages rendered empty with a green build — `params` became a Promise |
| `regex-guard.test.ts` | `/^الموسم\b/` never matched: `\b` is ASCII-only and fails **open** |
| `e2e/posters.spec.ts` | `sizes` said 45vw for a box that renders at 34vw, on every LCP image |
| `e2e/state.spec.ts` | Hydration mismatch across 130 panels; a shield that hides rather than omits |
| `e2e/csp.spec.ts` | The CSP blocking every script, which no other check would have seen |
| `contrast.test.ts` | The brief's claim that red clears 4.5:1 on dark. It is 4.04:1 |
| `npm run shots` | Dark mode unrendered for four commits; RTL bugs; `1س 44د` reading as 44 hours |

## Deploying

```bash
npm ci && npm run build     # 294 static pages
npm run check:publishable   # BLOCKING in CI
```

Push to GitHub, import on Vercel. **No environment variables are needed** —
`TMDB_READ_TOKEN` is read only by `npm run sync:tmdb`, which runs on your machine
and commits its output. Vercel never sees it, and it must never become a
`NEXT_PUBLIC_` variable.

**After the import, run Lighthouse against the deployed URL, not localhost.**
The 212ms LCP in the decision table was measured locally, which takes TMDB's
image CDN out of the network path entirely — the one hop this repo does not
control. Treat that number as a floor rather than a prediction, and record the
real one in the decision table when you have it.

**Where the CSP comes from:** `next.config.ts`, under `headers()` — *not*
middleware. There is no `middleware.ts` in this repo, deliberately. A nonce is
per-request and every page is prerendered, so middleware would have made all 294
pages dynamic to defend an injection surface that does not exist. Vercel serves
`next.config.ts` headers on static responses, so the policy applies to every
route without a function invocation.

`check:publishable` **fails**, and that is the gate working. PRD v2 added 17
titles and 84 character records, and every Arabic string that came with them is
a non-native draft, so `arReviewed` went back to `false` and `/ar` carries
`noindex` again. It goes back to true after a native reader has been through the
new copy. Rendering and publishing stay separate questions.

## Open questions

- **A cast list can itself spoil.** The shield hides connective tissue, and the
  title page now shows cast and character chips, which are public metadata in
  the same class as the runtime. But No Way Home's cast is the exact thing the
  editor's note dances around. Putting the cast behind the shield is a product
  decision, not a bug fix, and it has not been made.
- **`storyRank` for the new universes.** `marvel-tv` and the pre-1998 legacy
  titles have none, so those blocks show release order only. Consistent with
  rule B16, which refuses a half-ranked toggle.
