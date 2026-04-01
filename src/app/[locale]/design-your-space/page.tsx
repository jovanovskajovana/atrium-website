import { useTranslations } from 'next-intl'

const DesignYourSpacePage = () => {
  const t = useTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('design_your_space.title')}</h1>
      </div>
    </main>
  )
}

export default DesignYourSpacePage
