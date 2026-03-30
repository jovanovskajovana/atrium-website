import { useTranslations } from 'next-intl'

const CookiePolicyPage = () => {
  const t = useTranslations('cookie_policy')

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('title')}</h1>
      </div>
    </main>
  )
}

export default CookiePolicyPage
