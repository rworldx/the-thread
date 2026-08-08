/**
 * The routing surface for locales.
 *
 * Moved into place at step 5, deliberately ahead of the translation work, so
 * step 7's remaining work is the RTL and copy pass, not a routing refactor
 * tangled up with a bidi refactor across four page types once step 6 lands.
 */

/**
 * Both locales RENDER. Publishing is gated separately.
 *
 * Rendering RTL is mechanical; publishing reviewed Arabic is editorial — the
 * same split as routing versus translation. Keeping `ar` out of this array
 * meant every `[dir="rtl"]` and `:lang(ar)` rule in globals.css was unreachable
 * and the thread's logical-property mirroring had never once executed. That is
 * the dark-mode failure again: shipped with the tokens, unrendered, broken on
 * first look — except RTL is the moat and the surface is far larger.
 *
 * The copy review gates DEPLOYMENT, via `arReviewed` in content/copy.ts.
 */
export const LOCALES = ["en", "ar"] as const;

/** The full set, including locales not yet enabled. Direction is known for all. */
export const DIRECTION = { en: "ltr", ar: "rtl" } as const;

export type Locale = (typeof LOCALES)[number];
export type KnownLocale = keyof typeof DIRECTION;

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function directionOf(locale: string): "ltr" | "rtl" {
  return DIRECTION[locale as KnownLocale] ?? "ltr";
}

/** For `generateStaticParams` on every route under `[locale]`. */
export function localeParams() {
  return LOCALES.map((locale) => ({ locale }));
}
