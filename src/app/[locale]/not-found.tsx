import { useTranslations } from 'next-intl'

const NotFound = () => {
  const t = useTranslations('not_found')

  return (
    <main>
      <h1>404</h1>
      <p>{t('not_found')}</p>
    </main>
  )
}

export default NotFound
