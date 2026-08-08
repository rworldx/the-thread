"use client";

import { useEffect } from "react";

/**
 * Dev-only horizontal-overflow guard (brief §13.12).
 *
 * This only works because `body` has no `overflow-x: hidden`. That property
 * conceals overflow rather than preventing it, so with it in place every
 * element below would measure clean on a visibly broken layout.
 *
 * Renders nothing and is tree-shaken out of production builds.
 */
export function OverflowGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const check = () => {
      const limit = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > limit) {
        console.warn(
          `[overflow] page scrolls horizontally: ${document.documentElement.scrollWidth}px > ${limit}px`,
        );
      }
      /**
       * A DELIBERATE horizontal scroller is not overflow, and neither is
       * anything inside one.
       *
       * `.what-journey` is the §13.8 scroll-snap timeline: at ≥1024 with a fine
       * pointer it is supposed to scroll sideways inside its own box. The guard
       * measured it against the document width and reported nine warnings on
       * every load of `/what-is-marvel` at desktop, none of them real. An
       * instrument that cries wolf gets ignored, and then it is not an
       * instrument. Skip any subtree under an element that has opted into
       * horizontal scrolling.
       */
      const scrollers = [...document.querySelectorAll<HTMLElement>("*")].filter((el) => {
        const ox = getComputedStyle(el).overflowX;
        return ox === "auto" || ox === "scroll";
      });
      const inScroller = (el: Element) => scrollers.some((s) => s !== el && s.contains(el));

      for (const el of document.querySelectorAll<HTMLElement>("body *")) {
        if (inScroller(el)) continue;
        const isScroller = scrollers.includes(el);
        // getBoundingClientRect catches elements pushed outside the viewport,
        // which scrollWidth alone misses on absolutely-positioned children.
        const rect = el.getBoundingClientRect();
        // A scroller's own scrollWidth exceeding the viewport is the point of
        // it. Where it SITS still has to be inside the page.
        const wide = !isScroller && el.scrollWidth > limit;
        if (wide || rect.right > limit + 1 || rect.left < -1) {
          console.warn("[overflow]", el.tagName.toLowerCase(), el.className, el);
        }
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return null;
}
