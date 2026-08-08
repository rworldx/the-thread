"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * LIGHT / DARK / AUTO, as three explicit buttons rather than a toggle.
 *
 * A two-state toggle cannot express "follow my system", which is what most
 * people actually want and what this defaults to. Three radios can, and the
 * selected one is always visible, so nobody has to click to find out what state
 * they are in.
 *
 * HYDRATION. The server has no idea what the reader chose, so it renders `auto`
 * and the client adopts the stored value in one commit. That is the same
 * discipline the watched checkboxes use, and for the same reason: reading
 * localStorage during render mismatches, and React responds by discarding and
 * rebuilding the DOM.
 *
 * There is deliberately NO blocking inline script to prevent a first-paint
 * flash. Such a script is the standard fix and it would need `unsafe-inline` in
 * `script-src` at a stronger grade than this project already accepts, for a
 * flash that only affects readers whose choice differs from their system
 * setting. The default IS the system setting, so for almost everyone there is
 * nothing to flash.
 */

const KEY = "thread.theme";
type Theme = "light" | "dark" | "auto";
const THEMES: Theme[] = ["light", "dark", "auto"];

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "auto") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

export function ThemeSwitch() {
  const t = useTranslations("theme");
  const [theme, setTheme] = useState<Theme>("auto");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    if (stored && THEMES.includes(stored)) {
      setTheme(stored);
      apply(stored);
    }
    setReady(true);
  }, []);

  const choose = (next: Theme) => {
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private mode, or storage disabled. The choice still applies for this
      // page; it simply will not survive a reload. Nothing to report.
    }
  };

  return (
    <div className="theme-switch" role="radiogroup" aria-label={t("label")}>
      {THEMES.map((x) => (
        <button
          key={x}
          type="button"
          role="radio"
          /* Until the stored value is read, nothing is claimed to be selected.
             Announcing "auto" and then silently changing it is worse than a
             moment of nothing. */
          aria-checked={ready ? theme === x : false}
          className="theme-option"
          data-active={ready && theme === x ? "true" : undefined}
          onClick={() => choose(x)}
        >
          {t(x)}
        </button>
      ))}
    </div>
  );
}
