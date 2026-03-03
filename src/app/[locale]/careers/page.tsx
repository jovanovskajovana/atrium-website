import { useTranslations } from 'next-intl'

const CareersPage = () => {
  const t = useTranslations('careers')

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('title')}</h1>
      </div>
    </main>
  )
}

export default CareersPage
