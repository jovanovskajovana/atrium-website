'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import AtriumLogo from '@/components/icons/atrium-logo'

import { NAV_ITEMS } from '@/constants/navigation'

import { Link, usePathname } from '@/i18n/navigation'

const Navigation = () => {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const isHome = pathname === '/'

  return (
    <>
      <Link
        href="/"
        className="absolute top-[4vh] left-[3vw] w-[2vw]"
        data-logo
      >
        <AtriumLogo className="w-full h-auto" />
      </Link>

      <nav className="absolute top-[16vh] left-[3vw]" data-nav>
        {NAV_ITEMS.map(({ href, key }) => {
          const isActive = !isHome && pathname.startsWith(href)
          const showDash = hoveredItem ? hoveredItem === key : isActive

          return (
            <Link
              key={key}
              href={href}
              className="flex text-[0.86vw] font-[500] leading-[1.6] text-black-100"
              data-menu-item
              data-active={isActive ? '' : undefined}
              onMouseEnter={() => setHoveredItem(key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="inline-flex items-center">
                <span
                  className={`inline-block overflow-hidden transition-[width,margin] duration-500 ease-in-out ${showDash ? 'w-[0.9vw] mr-[0.4vw]' : 'w-0 mr-0'}`}
                >
                  —
                </span>
                {t(key)}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute top-[4vh] right-[3vw]" data-lang-picker>
        <LanguageSwitcher />
      </div>
    </>
  )
}

export default Navigation
