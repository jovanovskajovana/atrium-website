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
    '/references': {
      en: '/references',
      de: '/referenzen',
      sl: '/reference',
    },
    '/references/[slug]': {
      en: '/references/[slug]',
      de: '/referenzen/[slug]',
      sl: '/reference/[slug]',
    },
    '/production': {
      en: '/production',
      de: '/produktion',
      sl: '/proizvodnja',
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
    '/careers': {
      en: '/careers',
      de: '/karriere',
      sl: '/zaposlitev',
    },
    '/careers/[slug]': {
      en: '/careers/[slug]',
      de: '/karriere/[slug]',
      sl: '/zaposlitev/[slug]',
    },
    '/about': {
      en: '/about',
      de: '/ueber-uns',
      sl: '/o-nas',
    },
    '/contact': {
      en: '/contact',
      de: '/kontakt',
      sl: '/kontakt',
    },
    '/privacy-policy': {
      en: '/privacy-notice',
      de: '/datenschutz',
      sl: '/politika-zasebnosti',
    },
    '/cookie-policy': {
      en: '/cookie-policy',
      de: '/cookie-richtlinie',
      sl: '/politika-piskotkov',
    },
    '/terms-of-use': {
      en: '/terms-of-use',
      de: '/nutzungsbedingungen',
      sl: '/pogoji-uporabe',
    },
    '/design-your-space': {
      en: '/design-your-space',
      de: '/gestalten-sie-ihren-raum',
      sl: '/oblikujte-svoj-prostor',
    },
  },
})
