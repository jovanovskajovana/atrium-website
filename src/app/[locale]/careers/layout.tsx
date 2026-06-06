import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { buildPageMetadataFromNamespace } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadataFromNamespace({
    locale,
    page: 'careers',
    href: '/careers',
  })
}

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children
}
