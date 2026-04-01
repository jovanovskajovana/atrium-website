'use client'

import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'

import Button from '@/components/Button'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

import { Link } from '@/i18n/navigation'

const CookieBanner = () => {
  const t = useTranslations()

  const bannerRef = useRef<HTMLDivElement>(null)

  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')

    if (consent) return

    const hasIntro = document.querySelector('[data-intro-animation]')

    if (!hasIntro) {
      setShouldRender(true)
      return
    }

    const show = () => setShouldRender(true)
    window.addEventListener('intro-complete', show, { once: true })

    return () => window.removeEventListener('intro-complete', show)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (!shouldRender || !bannerRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(bannerRef.current, { opacity: 0, y: 20 })

      gsap.to(bannerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, bannerRef)

    return () => ctx.revert()
  }, [shouldRender])

  const dismiss = (choice: string) => {
    if (!bannerRef.current) return

    localStorage.setItem('cookie-consent', choice)
    gsap.killTweensOf(bannerRef.current)

    gsap.to(bannerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setShouldRender(false),
    })
  }

  if (!shouldRender) return null

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 right-[2.2vw] flex items-center gap-[1.5vw] bg-black-100 py-[1%] px-[1.5vw] z-50"
    >
      <p className="text-[0.8vw] text-white-100 mr-[1vw]">
        {t('cookie_banner.message')}{' '}
        <Link
          href="/privacy-policy"
          className="hover:opacity-80 transition-opacity"
        >
          {t('cookie_banner.privacy_link')}
        </Link>
      </p>
      <button
        onClick={() => dismiss('denied')}
        className="text-[0.8vw] text-white-100 underline hover:opacity-80 transition-opacity"
      >
        {t('cookie_banner.deny')}
      </button>
      <Button variant="light" size="small" onClick={() => dismiss('accepted')}>
        {t('cookie_banner.accept')}
      </Button>
    </div>
  )
}

export default CookieBanner
