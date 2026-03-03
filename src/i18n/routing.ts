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
    '/production': {
      en: '/production',
      de: '/produktion',
      sl: '/proizvodnja',
    },
    '/careers': {
      en: '/careers',
      de: '/karriere',
      sl: '/zaposlitev',
    },
    '/contact': {
      en: '/contact',
      de: '/kontakt',
      sl: '/kontakt',
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      de: '/datenschutz',
      sl: '/politika-zasebnosti',
    },
  },
})
