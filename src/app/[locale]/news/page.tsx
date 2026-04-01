import { useTranslations } from 'next-intl'

const NewsPage = () => {
  const t = useTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('news.title')}</h1>
      </div>
    </main>
  )
}

export default NewsPage
