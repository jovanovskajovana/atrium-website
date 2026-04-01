import { useTranslations } from 'next-intl'

const NotFound = () => {
  const t = useTranslations()

  return (
    <main>
      <h1>404</h1>
      <p>{t('not_found.not_found')}</p>
    </main>
  )
}

export default NotFound
