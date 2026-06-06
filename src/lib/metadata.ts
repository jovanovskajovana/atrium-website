import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export const SITE_NAME = 'Atrium'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.atrium-pohistvo.eu'
).replace(/\/$/, '')

export const DEFAULT_OG_IMAGE = '/assets/img-5.webp'

type AppLocale = (typeof routing.locales)[number]
export type AppHref = Parameters<typeof getPathname>[0]['href']

const OG_LOCALE_MAP: Record<AppLocale, string> = {
  en: 'en_GB',
  de: 'de_DE',
  sl: 'sl_SI',
}

const absoluteUrl = (path: string): string => `${SITE_URL}${path}`

export const buildAlternates = (
  locale: string,
  href: AppHref
): NonNullable<Metadata['alternates']> => {
  const languages: Record<string, string> = {}

  for (const supported of routing.locales) {
    languages[supported] = absoluteUrl(getPathname({ locale: supported, href }))
  }

  languages['x-default'] = absoluteUrl(
    getPathname({ locale: routing.defaultLocale, href })
  )

  return {
    canonical: absoluteUrl(getPathname({ locale: locale as AppLocale, href })),
    languages,
  }
}

interface PageMetadataOptions {
  locale: string
  title: string
  description: string
  href: AppHref
  index?: boolean
  image?: string
}

export const buildPageMetadata = ({
  locale,
  title,
  description,
  href,
  index = true,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata => {
  const alternates = buildAlternates(locale, href)

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: alternates.canonical as string,
      locale: OG_LOCALE_MAP[locale as AppLocale],
      images: [{ url: image, width: 1200, height: 750, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(index ? {} : { robots: { index: false, follow: false } }),
  }
}

export const buildPageMetadataFromNamespace = async ({
  locale,
  page,
  href,
  index = true,
  image,
}: {
  locale: string
  page: string
  href: AppHref
  index?: boolean
  image?: string
}): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return buildPageMetadata({
    locale,
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    href,
    index,
    image,
  })
}

export const withSiteName = (title: string): string => `${title} | ${SITE_NAME}`
