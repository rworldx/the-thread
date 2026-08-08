"use client";

import { useEffect } from "react";

/**
 * THE MENU CLOSES WHEN YOU LEAVE IT — the one thing `<details>` will not do.
 *
 * A native disclosure has no concept of "elsewhere": it opens on its summary
 * and closes on its summary, and clicking the page behind it does nothing.
 * That is fine for a settings popover you flip and forget, and wrong for a
 * menu, which is what this becomes below 832px. It sat open over the page
 * after you had plainly moved on.
 *
 * NAVIGATING CLOSES IT TOO, and that is not the same event. A link inside the
 * panel does a client-side navigation — the URL changes, the page under the
 * menu changes, and the menu stays open on top of a page you already reached.
 *
 * BUT THE SWITCHES DO NOT CLOSE IT. Language, theme and spoilers are settings
 * you may want to try in sequence, and a menu that shuts after each one makes
 * changing two of them a chore. So the rule is by ROLE, not by "any click":
 * a link means you are leaving, a switch means you are adjusting.
 *
 * This is a listener rather than CSS because there is no CSS for it. It is
 * still no inline script and no `unsafe-inline` — a React handler is a
 * property, not an attribute, so the CSP is untouched.
 */
export function SettingsDismiss() {
  useEffect(() => {
    const panel = document.querySelector<HTMLDetailsElement>("details.settings");
    if (!panel) return;

    const close = () => panel.removeAttribute("open");

    const onPointerDown = (e: Event) => {
      if (!panel.open) return;
      /* Inside the disclosure — including its own summary, which toggles
         itself and must not be closed out from under that toggle. */
      if (e.target instanceof Node && panel.contains(e.target)) return;
      close();
    };

    const onClick = (e: Event) => {
      if (!panel.open) return;
      if (!(e.target instanceof Element)) return;
      /* A link means leaving; a button means adjusting. `closest` because the
         click usually lands on a span inside the anchor. */
      if (e.target.closest("a") && panel.contains(e.target)) close();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panel.open) {
        close();
        panel.querySelector("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
