'use client'

import { useTranslations } from 'next-intl'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import AtriumLogo from '@/components/icons/atrium-logo'

import { NAV_ITEMS } from '@/constants/navigation'

import { Link, usePathname } from '@/i18n/navigation'

const Navigation = () => {
  const t = useTranslations()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="relative flex items-center justify-between py-[1.4vw] px-[2.2vw]">
      <Link href="/" className="w-[2.2vw]" data-logo>
        <AtriumLogo className="w-full h-auto" />
      </Link>

      <nav
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[1.8vw]"
        data-nav
      >
        {NAV_ITEMS.map(({ href, key }) => (
          <Link
            key={key}
            href={href}
            className="group relative overflow-hidden inline-block text-[0.92vw] font-[450] leading-[1.6] text-black-100 tracking-[0.03em]"
            data-menu-item
            data-active={isActive(href) ? '' : undefined}
          >
            <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              {t(`nav.${key}`)}
            </span>
            <span className="absolute left-0 top-full transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              {t(`nav.${key}`)}
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
