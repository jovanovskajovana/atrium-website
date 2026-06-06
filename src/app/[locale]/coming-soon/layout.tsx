import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('coming_soon.title'),
    description: t('coming_soon.description'),
    robots: { index: false, follow: false },
  }
}

export default function ComingSoonLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
