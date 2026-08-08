"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/**
 * AN ARROW THAT POINTS BACK SHOULD GO BACK.
 *
 * These links read "← All characters" and went to `/characters` — a fresh,
 * unfiltered load. So filtering the grid, opening someone, and using the arrow
 * threw the filter away, while the browser's own back button kept it. Two
 * controls that look like the same idea behaving differently is worse than
 * either behaviour on its own.
 *
 * `router.back()` returns to the previous entry with its scroll position and
 * its query string intact, which is what the arrow was always promising.
 *
 * THE HREF IS STILL REQUIRED, and not as decoration. Someone can arrive here
 * from a search engine, a shared link or a new tab, with no history to go back
 * to — pressing back then leaves the site entirely. So the element stays a
 * real `<a>` with a real destination: middle-click and "open in new tab" work,
 * it is crawlable, and it degrades to plain navigation with no JavaScript.
 * Only when there IS somewhere to return to does the click go back instead.
 */
export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        /* Let the browser handle modified clicks — new tab, new window, save.
           Hijacking those is the classic way a custom link gets it wrong. */
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          return;
        }
        /* `history.length > 1` is the honest test for "came from somewhere".
           A tab opened straight onto this page has a length of 1. */
        if (typeof window !== "undefined" && window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      {children}
    </Link>
  );
}
