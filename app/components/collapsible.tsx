import type { ReactNode } from "react";

/**
 * A LIST THAT SHOWS TEN AND OFFERS THE REST.
 *
 * Some films credit forty actors and some titles carry a dozen trailers. Both
 * lists used to render in full, which put a wall of faces between the reader
 * and everything below it — and the cast list is the one place on this site
 * where "everything, always" is the wrong default, because the eleventh name is
 * a background role and the reader came for the leads.
 *
 * NATIVE `<details>`, NO JAVASCRIPT. This site ships a CSP without
 * `unsafe-inline` and prerenders every page; a disclosure built from a click
 * handler would be one more thing to hydrate for a control the browser already
 * has. It works with the stylesheet stripped, it works before hydration, and it
 * is keyboard-operable and announced without a line of ARIA.
 *
 * THE FULL LIST IS ALWAYS IN THE DOM. The overflow is hidden with CSS, not
 * omitted from the markup — so a reader searching the page with ctrl-F finds
 * the fortieth actor, and so does anything reading the page without styles.
 * Rendering ten and dropping thirty would make the page lie about what it holds.
 */

export function Collapsible({
  children,
  hidden,
  label,
}: {
  /** The complete list. Every item, always. */
  children: ReactNode;
  /** How many are folded away — for the label, and for whether to show one. */
  hidden: number;
  /** "+30 more", already translated and pluralised by the caller. */
  label: string;
}) {
  if (hidden <= 0) return <>{children}</>;

  return (
    <div className="collapsible">
      {children}
      {/* AFTER the list in the DOM, which is also where it belongs on screen:
          the control that reveals more sits at the end of what it reveals. */}
      <details className="collapsible-more">
        <summary>{label}</summary>
      </details>
    </div>
  );
}
