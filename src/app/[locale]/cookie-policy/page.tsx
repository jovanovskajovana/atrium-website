import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { buildPageMetadataFromNamespace } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadataFromNamespace({
    locale,
    page: 'cookie_policy',
    href: '/cookie-policy',
  })
}

const CookiePolicyPage = () => {
  const t = useTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('cookie_policy.title')}</h1>
      </div>
    </main>
  )
}

export default CookiePolicyPage
