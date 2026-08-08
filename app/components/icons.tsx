import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";

/**
 * ICONS — one family, one weight, and no hand-drawn paths.
 *
 * The site previously used the literal characters `←` and `→` as its icons.
 * They are text, so they inherit the font stack: they rendered in Archivo on an
 * English page and in whatever the Arabic stack fell back to on an Arabic one,
 * at a different optical weight and a different baseline in each. An arrow that
 * changes shape between locales is not an icon, it is a glyph accident.
 *
 * Phosphor, imported from `/dist/ssr/*` rather than the package root. The root
 * export pulls the client build and would turn every page that shows an arrow
 * into a hydrated island; the SSR build is a plain function component, so these
 * pages keep shipping zero JavaScript.
 *
 * ONE strokeWidth for the whole project: Phosphor's `bold` weight, which sits
 * with Archivo at 600-700 rather than looking hairline beside it.
 *
 * Direction is a LAYOUT property, not an icon choice. There is no `ArrowLeft`
 * here: `.dir-icon` mirrors on `[dir="rtl"]`, so "forward" is one component and
 * "back" is the same component with `back` set. Two separate imports would let
 * an RTL page ship an arrow pointing the wrong way, which is the bug this
 * replaces.
 */

const SIZE = "1em";

export function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <span className={back ? "dir-icon dir-icon-back" : "dir-icon"} aria-hidden="true">
      <ArrowRight size={SIZE} weight="bold" />
    </span>
  );
}
