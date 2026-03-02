import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('footer')

  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} {t('footer')}
      </p>
    </footer>
  )
}

export default Footer
