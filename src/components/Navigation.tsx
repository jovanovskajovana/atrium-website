import { useTranslations } from 'next-intl'

import LanguagePicker from '@/components/LanguagePicker'
import AtriumLogo from '@/components/icons/atrium-logo'

import { Link } from '@/i18n/navigation'

const Navigation = () => {
  const t = useTranslations('nav')

  return (
    <>
      <Link
        href="/"
        className="absolute top-[4vh] left-[3vw] w-[2.2vw]"
        data-logo
      >
        <AtriumLogo className="w-full h-auto" />
      </Link>

      <nav className="absolute top-[16vh] left-[3vw]" data-nav>
        <Link
          href="/references"
          className="flex text-black-100 text-[1vw] font-[450] leading-[1.8]"
          data-menu-item
        >
          {t('references')}
        </Link>
        <Link
          href="/production"
          className="flex text-black-100 text-[1vw] font-[450] leading-[1.8]"
          data-menu-item
        >
          {t('production')}
        </Link>
        <Link
          href="/news"
          className="flex text-black-100 text-[1vw] font-[450] leading-[1.8]"
          data-menu-item
        >
          {t('news')}
        </Link>
        <Link
          href="/careers"
          className="flex text-black-100 text-[1vw] font-[450] leading-[1.8]"
          data-menu-item
        >
          {t('careers')}
        </Link>
        <Link
          href="/about"
          className="flex text-black-100 text-[1vw] font-[450] leading-[1.8]"
          data-menu-item
        >
          {t('about')}
        </Link>
        <Link
          href="/contact"
          className="flex text-black-100 text-[1vw] font-[450] leading-[1.8]"
          data-menu-item
        >
          {t('contact')}
        </Link>
      </nav>

      <div className="absolute top-[4vh] right-[3vw]" data-lang-picker>
        <LanguagePicker />
      </div>
    </>
  )
}

export default Navigation
