import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'de', 'sl'],
  defaultLocale: 'en',
  pathnames: {
    '/': {
      en: '/',
      de: '/',
      sl: '/',
    },
    '/about': {
      en: '/about',
      de: '/ueber-uns',
      sl: '/o-nas',
    },
    '/references': {
      en: '/references',
      de: '/referenzen',
      sl: '/reference',
    },
    '/news': {
      en: '/news',
      de: '/news',
      sl: '/novice',
    },
    '/news/[slug]': {
      en: '/news/[slug]',
      de: '/news/[slug]',
      sl: '/novice/[slug]',
    },
    '/contact': {
      en: '/contact',
      de: '/kontakt',
      sl: '/kontakt',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
