export const LOCALES = ['en', 'az', 'hu'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  /** BCP 47 tag used for <html lang> and hreflang. */
  tag: string;
  /** Open Graph locale (language_TERRITORY). */
  og: string;
  /** Short label shown in the language switcher. */
  short: string;
  /** Endonym shown to assistive technology. */
  name: string;
  /** Font subsets needed beyond basic Latin. */
  needsLatinExt: boolean;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { tag: 'en', og: 'en_US', short: 'EN', name: 'English', needsLatinExt: false },
  az: { tag: 'az', og: 'az_AZ', short: 'AZ', name: 'Azərbaycanca', needsLatinExt: true },
  hu: { tag: 'hu', og: 'hu_HU', short: 'HU', name: 'Magyar', needsLatinExt: true },
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
