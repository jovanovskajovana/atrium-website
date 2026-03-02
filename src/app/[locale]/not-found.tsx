'use client'

import { useTranslations } from 'next-intl'

const NotFound = () => {
  const t = useTranslations('not-found')

  return (
    <main>
      <h1>404</h1>
      <p>{t('not-found')}</p>
    </main>
  )
}

export default NotFound
