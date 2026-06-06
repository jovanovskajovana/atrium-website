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
    page: 'design_your_space',
    href: '/design-your-space',
  })
}

const DesignYourSpacePage = () => {
  const t = useTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('design_your_space.title')}</h1>
      </div>
    </main>
  )
}

export default DesignYourSpacePage
