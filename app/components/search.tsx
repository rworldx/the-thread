"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { remoteSrc } from "@/image-loader";
import index from "@/content/search-index.json";
import { search, suggestion, type SearchItem } from "@/lib/search";

/**
 * SEARCH — the feature this site was asked for by name.
 *
 * The thing that makes it ours is the second line of every row: how many titles
 * come before this one, and how long that is. Nobody else's Marvel search puts
 * the answer in the results. A search box that only returns titles is a search
 * box anyone can build.
 *
 * Below 768px it is a full-screen sheet; above, an inline combobox. It does NOT
 * autofocus on page load — that yanks the keyboard up on mobile and shifts the
 * layout out from under whoever was reading. Focus happens on tap, and only then.
 */

const ITEMS = index as SearchItem[];

/** A character goes to its page, a title to its path. */
function hrefFor(locale: string, item?: Pick<SearchItem, "id" | "kind">): string {
  if (!item) return `/${locale}`;
  return item.kind === "character"
    ? `/${locale}/characters/${item.id}`
    : `/${locale}/path/${item.id}`;
}

export function Search({ locale }: { locale: string }) {
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(() => search(query, ITEMS), [query]);
  const didYouMean = useMemo(
    () => (query.trim() && results.length === 0 ? suggestion(query, ITEMS) : null),
    [query, results.length],
  );

  // Focus only after the sheet opens — never on mount.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Escape closes from anywhere inside, including the list.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    const hit = ITEMS.find((x) => x.id === id);
    window.location.href = hrefFor(locale, hit);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[active]?.item ?? didYouMean;
      if (hit) go(hit.id);
    }
  };

  return (
    <div className="search" data-open={open ? "true" : undefined}>
      <button
        type="button"
        className="search-open"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {t("open")}
      </button>

      {open && (
        <div className="search-sheet" role="dialog" aria-label={t("labelBoth")}>
          <div className="search-head">
            <input
              ref={inputRef}
              className="search-input"
              type="search"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={
                results.length > 0 ? `${listId}-${active}` : undefined
              }
              aria-label={t("labelBoth")}
              placeholder={t("placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button type="button" className="search-close" onClick={() => setOpen(false)}>
              {t("close")}
            </button>
          </div>

          {/* Announced, not just rendered — a result count that only exists
              visually tells a screen-reader user nothing changed. */}
          <p className="search-status" role="status" aria-live="polite">
            {query.trim() ? t("resultCount", { n: results.length }) : t("hint")}
          </p>

          {results.length > 0 && (
            <ul className="search-results" role="listbox" id={listId} aria-label={t("labelBoth")}>
              {results.map(({ item }, i) => (
                <li
                  key={item.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className="search-result"
                  data-active={i === active ? "true" : undefined}
                >
                  <a
                    href={hrefFor(locale, item)}
                    onMouseEnter={() => setActive(i)}
                    data-kind={item.kind ?? "title"}
                  >
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
                      <bdi lang="en">{item.titleEn}</bdi>{" "}
                      <bdi lang="ar" className="search-result-ar">
                        {item.titleAr}
                      </bdi>
                    </span>
                    {/* THE COST. This is the whole point — a search that returns
                        only titles is one anyone can build.

                        ONE <bdi> around the WHOLE line, not just the count. With
                        the year outside it, the year is a weak-direction run and
                        the surrounding RTL paragraph pulls it to the far side:
                        "2017 · 10 عناوين قبله" rendered with the year detached
                        from its own row. Isolating the line keeps year-then-cost
                        in reading order in both directions. */}
                    {/* A CHARACTER'S SECOND LINE IS NOT A COST. `pathLength`
                        on a title means "watch this many first" and is the
                        whole differentiator; on a character it is how many
                        titles they are in, which is a different sentence and
                        must not be dressed as the same one. */}
                    {item.kind === "character" ? (
                      <bdi className="search-result-cost">
                        <span className="search-result-kind">{t("kindCharacter")}</span>
                        {" · "}
                        {t("appearsIn", { n: item.pathLength })}
                      </bdi>
                    ) : (
                      <bdi className="search-result-cost">
                        <span className="tabular">{item.year}</span>
                        {" · "}
                        {item.pathLength === 0
                          ? t("startHere")
                          : t("cost", { n: item.pathLength })}
                      </bdi>
                    )}
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
                <a href={hrefFor(locale, didYouMean)}>
                  {t("didYouMean", { title: didYouMean.titleEn })}
                </a>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
