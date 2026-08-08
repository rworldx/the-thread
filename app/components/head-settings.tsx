import { getTranslations } from "next-intl/server";
import { LocaleSwitch } from "@/app/components/locale-switch";
import { ThemeSwitch } from "@/app/components/theme-switch";
import { ShieldToggle } from "@/app/components/shield";
import { SettingsNav } from "@/app/components/site-nav";

/**
 * LANGUAGE, THEME AND SPOILERS, BEHIND ONE CONTROL.
 *
 * Three switches sitting in the bar is eleven separate hit targets — three
 * theme options, two locales, a spoiler toggle and a search button — and at
 * anything under 1088px they could not share a line with the wordmark and the
 * nav. The header was two rows on a laptop and three on a phone.
 *
 * They are SETTINGS: things you change once and then forget. Search and the
 * five doors are things you use constantly. Folding the settings away is the
 * distinction the bar was failing to draw, and it buys the one line back at
 * every width.
 *
 * NATIVE `<details>`, so this costs no JavaScript and survives a CSP without
 * `unsafe-inline`. It is keyboard-operable and announced as a disclosure with
 * nothing added. The trade is real and worth naming: a native disclosure does
 * NOT close when you click elsewhere, because that behaviour does not exist
 * without a document listener. For a settings menu that is a fair price — you
 * are here to flip a switch and leave.
 */
export async function HeadSettings({ locale }: { locale: string }) {
  const t = await getTranslations("nav");

  return (
    <details className="settings">
      {/**
       * TWO NAMES, BECAUSE IT IS TWO CONTROLS.
       *
       * Wide, this holds language, theme and spoilers — settings, and calling
       * it Settings is exact. Narrow, it also holds the five sections of the
       * site, and "Settings" is then a lie about what is inside: nobody looks
       * for Characters under Settings.
       *
       * Both labels ship and CSS shows one. No `aria-label` on the summary,
       * deliberately — an aria-label cannot respond to a media query, and it
       * would override whichever label is actually on screen. Letting the
       * visible text BE the accessible name keeps the two from disagreeing.
       *
       * The bars are an icon AND a word, never the icon alone: an unlabelled
       * hamburger is the most-cited discoverability failure in mobile nav.
       */}
      <summary>
        <span className="settings-bars" aria-hidden="true" />
        <span className="settings-label settings-label-wide">{t("settings")}</span>
        <span className="settings-label settings-label-narrow">{t("menu")}</span>
        <span className="settings-caret" aria-hidden="true" />
      </summary>
      <div className="settings-panel">
        {/* The five doors first, because on the widths where they live here
            they are navigation and the rest are preferences. Hidden by CSS
            above 52rem, where they are back in the bar. */}
        <SettingsNav locale={locale} />
        {/* The switches, grouped and named — `nav-hierarchy`: primary
            navigation and secondary settings have to be visibly separate, not
            a single undifferentiated stack. The heading is hidden when the
            panel holds nothing but settings, because then it is the whole
            panel and labelling it twice is noise. */}
        <p className="settings-group-label">{t("settings")}</p>
        <LocaleSwitch locale={locale} />
        <ThemeSwitch />
        <ShieldToggle />
      </div>
    </details>
  );
}
