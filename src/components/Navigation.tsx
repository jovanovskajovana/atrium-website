'use client'

import { useTranslations } from 'next-intl'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import AtriumLogo from '@/components/icons/atrium-logo'

import { NAV_ITEMS } from '@/constants/navigation'

import { Link, usePathname } from '@/i18n/navigation'

const Navigation = () => {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <div className="relative flex items-center justify-between py-[1.6%] px-[2.2vw]">
      <Link href="/" className="w-[2vw]" data-logo>
        <AtriumLogo className="w-full h-auto" />
      </Link>

      <nav
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[2vw]"
        data-nav
      >
        {NAV_ITEMS.map(({ href, key }) => (
          <Link
            key={key}
            href={href}
            className="group relative overflow-hidden inline-block text-[0.86vw] leading-[1.4] text-black-100"
            data-menu-item
            data-active={!isHome && pathname.startsWith(href) ? '' : undefined}
          >
            <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              {t(key)}
            </span>
            <span className="absolute left-0 top-full transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              {t(key)}
            </span>
          </Link>
        ))}
      </nav>

      <div data-lang-picker>
        <LanguageSwitcher />
      </div>
    </div>
  )
}

export default Navigation
