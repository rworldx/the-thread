"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FILTER STATE THAT SURVIVES THE BACK BUTTON — without costing the prerender.
 *
 * The filters used to live in plain `useState`, which works until you click a
 * result: the component unmounts, and coming back remounts it with the
 * defaults. Filtering 170 projects down to three, opening one, and pressing
 * back put you on an unfiltered grid — the work thrown away by the one gesture
 * everybody uses to undo a navigation.
 *
 * THE OBVIOUS FIX WAS WRONG, and a guard caught it. Reading the query string
 * with `useSearchParams` forces the subtree out of the static prerender, so
 * `projects.html` shipped with ZERO posters in it — P6 failed on exactly that.
 * The whole grid became client-only, which trades a filter reset for the
 * site's SEO and every reader without JavaScript. A bad bargain.
 *
 * So the URL is read and written DIRECTLY:
 *
 *   - The first render uses the defaults, with no browser API touched, so the
 *     server and the static HTML render the full unfiltered grid exactly as
 *     they did before.
 *   - An effect on mount reads `window.location.search` and applies it. This
 *     is what makes back work: the browser restores the URL, the component
 *     remounts, and the effect reads the state back out of it.
 *   - Changes write with `history.replaceState`, which updates the address bar
 *     without a navigation and without a Next re-render.
 *
 * REPLACE, NOT PUSH. Every keystroke in a search box is a state change;
 * pushing would add one history entry per character typed and back would walk
 * backwards through the query letter by letter.
 *
 * DEFAULTS ARE NEVER WRITTEN, so an untouched page keeps a clean URL and a
 * shared link carries only the choices somebody actually made.
 *
 * The cost, stated plainly: on a back navigation the grid paints unfiltered
 * for one frame before the effect runs. That is the price of keeping the
 * server render honest, and it is the right way round.
 */
export function useUrlState<T extends Record<string, string>>(
  defaults: T,
): [T, (patch: Partial<T>) => void] {
  const [state, setState] = useState<T>(defaults);
  /* Set once the mount effect has run, so the writer never fires during the
     first paint and blanks a URL it has not read yet. */
  const ready = useRef(false);
  /**
   * THE LATEST VALUE, because `state` in a closure is the RENDER's value.
   *
   * The reset button called six setters in a row, and every one of them
   * computed `{ ...state, ...patch }` from the same render-time `state` — so
   * five patches were overwritten by the sixth and "clear filters" only ever
   * cleared the search box. Sequential calls in one tick have to compose, and
   * a ref is what lets them see each other.
   */
  const latest = useRef<T>(defaults);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = { ...defaults };
    let found = false;
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const raw = params.get(String(key));
      if (raw !== null) {
        next[key] = raw as T[keyof T];
        found = true;
      }
    }
    if (found) {
      setState(next);
      latest.current = next;
    }
    ready.current = true;
    /* Defaults are module-level constants in every caller, so this runs once
       per mount — which is exactly the point. */
  }, [defaults]);

  function set(patch: Partial<T>) {
    const next = { ...latest.current, ...patch };
    latest.current = next;
    setState(next);
    if (!ready.current) return;

    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(next)) {
      if (value === defaults[key] || value === "") params.delete(key);
      else params.set(key, String(value));
    }
    const qs = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }

  return [state, set];
}
