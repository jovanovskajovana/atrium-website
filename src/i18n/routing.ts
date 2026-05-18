import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'de', 'sl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': {
      en: '/',
      de: '/',
      sl: '/',
    },
  },
})
