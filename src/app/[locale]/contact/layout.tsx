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
    page: 'contact',
    href: '/contact',
  })
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
