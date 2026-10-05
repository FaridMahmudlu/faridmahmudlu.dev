import type { Locale } from './config';
import { az } from './dictionaries/az';
import { en, type Dictionary } from './dictionaries/en';
import { hu } from './dictionaries/hu';

const DICTIONARIES: Record<Locale, Dictionary> = { en, az, hu };

export const t = (locale: Locale): Dictionary => DICTIONARIES[locale];

const monthFormatters = new Map<Locale, Intl.DateTimeFormat>();

/** "2026-08" → "Aug 2026" / "2026 avq." / "2026. aug."; "2025" stays "2025". */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return value;
  let fmt = monthFormatters.get(locale);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', timeZone: 'UTC' });
    monthFormatters.set(locale, fmt);
  }
  return fmt.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatPeriod(start: string, end: string | null, locale: Locale): string {
  return `${formatMonth(start, locale)} — ${end ? formatMonth(end, locale) : t(locale).work.present}`;
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

export type { Dictionary };
