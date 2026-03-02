import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations('header')

  return (
    <header>
      <nav>{t('header')}</nav>
    </header>
  )
}

export default Header
