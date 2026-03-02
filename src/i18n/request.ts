import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale

  return {
    locale: safeLocale,
    messages: (await import(`../intl/${safeLocale}.json`)).default,
  }
})
