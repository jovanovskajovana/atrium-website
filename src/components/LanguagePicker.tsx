'use client'

import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LanguagePicker = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    router.replace({ pathname } as any, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-[0.25vw] text-[0.8vw]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-[0.25vw]">
          {i > 0 && <span className="text-black-100/40">|</span>}
          <button
            type="button"
            onClick={() => handleChange(loc)}
            className={`${
              locale === loc
                ? 'text-black-100 font-medium'
                : 'text-black-100/40'
            } hover:text-black-100 hover:font-medium transition-all duration-300`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  )
}

export default LanguagePicker
