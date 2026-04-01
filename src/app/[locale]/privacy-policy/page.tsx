import { useTranslations } from 'next-intl'

const PrivacyPolicyPage = () => {
  const t = useTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t('privacy_policy.title')}</h1>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
