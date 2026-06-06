import type { MetadataRoute } from 'next'

import { JOB_LISTINGS } from '@/constants/careers'
import { NEWS_ARTICLES } from '@/constants/news'
import { PROJECTS } from '@/constants/projects'

import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { SITE_URL, type AppHref } from '@/lib/metadata'

const buildEntry = (href: AppHref): MetadataRoute.Sitemap[number] => {
  const languages: Record<string, string> = {}

  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}${getPathname({ locale, href })}`
  }

  return {
    url: `${SITE_URL}${getPathname({ locale: routing.defaultLocale, href })}`,
    lastModified: new Date(),
    alternates: { languages },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticHrefs: AppHref[] = [
    '/',
    '/about',
    '/references',
    '/production',
    '/news',
    '/careers',
    '/contact',
    '/design-your-space',
    '/privacy-policy',
    '/cookie-policy',
    '/terms-of-use',
  ]

  const newsHrefs: AppHref[] = NEWS_ARTICLES.map((article) => ({
    pathname: '/news/[slug]',
    params: { slug: article.slug },
  }))

  const referenceHrefs: AppHref[] = PROJECTS.map((project) => ({
    pathname: '/references/[slug]',
    params: { slug: project.slug },
  }))

  const careerHrefs: AppHref[] = JOB_LISTINGS.map((listing) => ({
    pathname: '/careers/[slug]',
    params: { slug: listing.slug },
  }))

  return [...staticHrefs, ...newsHrefs, ...referenceHrefs, ...careerHrefs].map(
    buildEntry
  )
}
