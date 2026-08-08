"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

/**
 * THE SPOILER SHIELD — one of the five competitive gaps (§1), and until now it
 * existed only in the data.
 *
 * `spoilerSafe` is always visible. `context` is the connective tissue, and it is
 * genuinely ABSENT rather than visually hidden: a blur filter or
 * `visibility: hidden` leaves the text in the DOM, where select-all copies it, a
 * screen reader may reach it, and view-source hands it straight over. All three
 * look identical in a screenshot.
 *
 * So the context is not in any page's HTML at all. It lives in
 * `public/context.json` and is fetched the first time somebody asks.
 *
 * Default ON, persisted. Hydration is handled the same way as progress: the
 * server renders the shielded state, the client adopts the stored preference in
 * one commit. No inline <head> script — that needs a nonce under the CSP.
 */

const KEY = "the-thread:shield";
const EVENT = "the-thread:shield-changed";

function readShield(): boolean {
  if (typeof window === "undefined") return true;
  // Default ON. Only an explicit "off" turns it off.
  return window.localStorage.getItem(KEY) !== "off";
}

function subscribe(onChange: () => void) {
  const h = () => onChange();
  window.addEventListener(EVENT, h);
  window.addEventListener("storage", h);
  return () => {
    window.removeEventListener(EVENT, h);
    window.removeEventListener("storage", h);
  };
}

export function useShield(): boolean {
  // Server snapshot is `true` — shielded — so the neutral first frame is the
  // SAFE one. Getting this backwards would flash the spoilers.
  return useSyncExternalStore(subscribe, readShield, () => true);
}

export function toggleShield() {
  window.localStorage.setItem(KEY, readShield() ? "off" : "on");
  window.dispatchEvent(new Event(EVENT));
}

export function ShieldToggle() {
  const t = useTranslations("shield");
  const on = useShield();
  return (
    <button
      type="button"
      className="shield-toggle"
      onClick={toggleShield}
      aria-pressed={on}
      title={t(on ? "onHint" : "offHint")}
    >
      {t(on ? "on" : "off")}
    </button>
  );
}

let cache: Record<string, { en: string; ar: string }> | null = null;

/** One fetch for the whole file, the first time anyone reveals anything. */
async function loadContext() {
  if (cache) return cache;
  const res = await fetch("/context.json");
  cache = (await res.json()) as Record<string, { en: string; ar: string }>;
  return cache;
}

/**
 * `available` says whether context exists FOR THIS LOCALE. Nine titles carry
 * hand-authored Arabic context and no English — TMDB has no overview for them
 * in any language, and inventing one to keep the shape rectangular is exactly
 * the thing this content layer refuses to do. Without this flag those pages
 * render a reveal button that fetches, finds nothing, and silently renders
 * itself again: a control that does nothing when pressed.
 *
 * Only EXISTENCE crosses into the HTML, never the text.
 */
export function SpoilerContext({
  id,
  locale,
  available,
}: {
  id: string;
  locale: string;
  available: boolean;
}) {
  const t = useTranslations("shield");
  const shielded = useShield();
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const reveal = async () => {
    setLoading(true);
    const data = await loadContext();
    setText(data[id]?.[locale === "ar" ? "ar" : "en"] ?? null);
    setLoading(false);
  };

  // Nothing to reveal in this language — render no control at all.
  if (!available) return null;

  // Shield off: show it as soon as it arrives, no button in the way.
  if (!shielded && text === null && !loading) void reveal();

  if (text !== null) {
    return (
      <div className="spoiler-context">
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div className="spoiler-context is-hidden">
      <button type="button" className="spoiler-reveal" onClick={reveal} aria-expanded={false}>
        {loading ? t("loading") : t("reveal")}
      </button>
    </div>
  );
}
