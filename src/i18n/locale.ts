const DATE_LOCALE_MAP: Record<string, string> = {
  sl: 'sl-SI',
  de: 'de-DE',
  en: 'en-GB',
}

export const getDateLocale = (appLocale: string): string =>
  DATE_LOCALE_MAP[appLocale] ?? 'en-GB'
