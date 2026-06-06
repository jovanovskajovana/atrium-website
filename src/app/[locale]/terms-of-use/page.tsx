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
    page: 'terms_of_use',
    href: '/terms-of-use',
  })
}

const TermsOfUsePage = () => {
  const t = useTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('terms_of_use.title')}</h1>
      </div>
    </main>
  )
}

export default TermsOfUsePage
