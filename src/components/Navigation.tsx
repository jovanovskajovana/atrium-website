'use client'

import { useTranslations } from 'next-intl'

import LanguagePicker from '@/components/LanguagePicker'
import AtriumLogo from '@/components/icons/atrium-logo'

import { NAV_ITEMS } from '@/constants/navigation'

import { Link, usePathname } from '@/i18n/navigation'

const Navigation = () => {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const isHome = pathname === '/'

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
        {NAV_ITEMS.map(({ href, key }) => (
          <Link
            key={key}
            href={href}
            className="flex text-[0.92vw] font-medium leading-[1.6] text-black-100"
            data-menu-item
            data-active={!isHome && pathname.startsWith(href) ? '' : undefined}
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      <div className="absolute top-[4vh] right-[3vw]" data-lang-picker>
        <LanguagePicker />
      </div>
    </>
  )
}

export default Navigation
