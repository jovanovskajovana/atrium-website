import { useTranslations } from 'next-intl'

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
