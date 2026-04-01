'use client'

import { useLocale } from 'next-intl'

import { LOCALE_LABELS } from '@/constants/navigation'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

interface LanguageSwitcherProps {
  variant?: 'inline' | 'list'
}

const LanguageSwitcher = ({ variant = 'inline' }: LanguageSwitcherProps) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    router.replace({ pathname } as any, { locale: newLocale })
  }

  if (variant === 'list') {
    return (
      <ul>
        {routing.locales.map((loc) => (
          <li key={loc}>
            <button
              type="button"
              onClick={() => handleChange(loc)}
              className="text-[0.84vw] text-white-100/65 lowercase hover:text-white-100 transition-colors"
            >
              {LOCALE_LABELS[loc] ?? loc}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex items-center gap-[0.25vw] text-[0.8vw] leading-[1]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-[0.25vw]">
          {i > 0 && (
            <span className="bg-white-100/40 text-clip-fix">|</span>
          )}
          <button
            type="button"
            onClick={() => handleChange(loc)}
            className={`text-clip-fix transition-all duration-300 ${
              locale === loc
                ? 'bg-white-100 font-[500]'
                : 'bg-white-100/40'
            } hover:bg-white-100 hover:font-[500]`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  )
}

export default LanguageSwitcher
