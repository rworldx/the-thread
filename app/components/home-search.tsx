"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { remoteSrc } from "@/image-loader";
import index from "@/content/search-index.json";
import { search, suggestion, type SearchItem } from "@/lib/search";

/**
 * Door two's call to action: an INLINE search input, not a link to a search page.
 *
 * Same ranking and the same cost line as the header search — a returning viewer
 * should get the answer from the homepage without navigating anywhere first.
 *
 * No autofocus. On a phone that yanks the keyboard up the moment the page loads
 * and shoves the second door off-screen, which is the opposite of a choice.
 */

const ITEMS = index as SearchItem[];

/**
 * TITLES ONLY, HERE — and that is a decision, not an oversight.
 *
 * Characters joined the shared index so the TOP BAR can answer for the whole
 * site. This box is a different question: it sits under "what to watch before
 * the thing you want to watch" and its hint says "type a title and see what
 * comes before it". A character has no path, so it has no answer to give here.
 *
 * Filtered at the source rather than in the render, so the result count, the
 * keyboard selection and the empty state all agree about what is in the list.
 */
const TITLE_ITEMS = ITEMS.filter((i) => i.kind !== "character");

export function HomeSearch({ locale }: { locale: string }) {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const results = useMemo(() => search(query, TITLE_ITEMS, 5), [query]);
  const didYouMean = useMemo(
    () => (query.trim() && results.length === 0 ? suggestion(query, TITLE_ITEMS) : null),
    [query, results.length],
  );

  return (
    <div className="home-search">
      <label className="home-search-label" htmlFor="home-search-input">
        {t("label")}
      </label>
      {/* ITS OWN PLACEHOLDER KEY, because the two searches share a namespace
          and no longer share a scope. `placeholder` became "Title or
          character…" for the top bar, which answers for the whole site — and
          this box takes titles only, so it was promising something it cannot
          do. Shared namespaces make a change here silently land there. */}
      <input
        id="home-search-input"
        className="search-input"
        type="search"
        placeholder={t("placeholderTitleOnly")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />

      {results.length > 0 && (
        <ul className="search-results" role="list">
          {results.map(({ item }) => (
            <li key={item.id} className="search-result">
              <a href={`/${locale}/path/${item.id}`}>
                {item.image && (
                  <Image
                    className="search-result-thumb"
                    src={remoteSrc(item.image, 92)}
        unoptimized
                    alt=""
                    width={40}
                    height={60}
                    sizes="40px"
                    loading="lazy"
                  />
                )}
                <span className="search-result-text">
                <span className="search-result-title">
                  <bdi lang="en">{item.titleEn}</bdi>
                </span>
                <bdi className="search-result-cost">
                  <span className="tabular">{item.year}</span>
                  {" · "}
                  {item.pathLength === 0 ? t("startHere") : t("cost", { n: item.pathLength })}
                </bdi>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {query.trim() && results.length === 0 && (
        <p className="search-empty">
          {t("empty", { query })}{" "}
          {didYouMean && (
            <a href={`/${locale}/path/${didYouMean.id}`}>
              {t("didYouMean", { title: didYouMean.titleEn })}
            </a>
          )}
        </p>
      )}
    </div>
  );
}
