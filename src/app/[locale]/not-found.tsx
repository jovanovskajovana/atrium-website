'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'

import { Link } from '@/i18n/navigation'
import Button from '@/components/Button'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

const NotFound = () => {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const label = section.querySelector('[data-label]')
    const title = section.querySelector('[data-title]')
    const text = section.querySelector('[data-text]')
    const btn = section.querySelector('[data-btn]')
    const number = section.querySelector('[data-number]')

    if (label) gsap.set(label, { y: 20, opacity: 0 })
    if (title) gsap.set(title, { y: 40, opacity: 0 })
    if (text) gsap.set(text, { y: 20, opacity: 0 })
    if (btn) gsap.set(btn, { y: 20, opacity: 0 })
    if (number) gsap.set(number, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.2 })

    if (label) {
      tl.to(label, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.3)
    }
    if (title) {
      tl.to(title, { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }, 0.4)
    }
    if (text) {
      tl.to(text, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.6)
    }
    if (btn) {
      tl.to(btn, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.8)
    }
    if (number) {
      tl.to(number, { opacity: 1, duration: 2, ease: 'power2.out' }, 0.3)
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <main className="overflow-x-hidden">
      <section
        ref={sectionRef}
        className="relative min-h-screen pt-[18.5vh] pb-[10%]"
      >
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase mb-[1.8%]"
            data-label
          >
            404
          </p>
          <h1
            className="text-[4vw] text-black-100 font-[500] leading-[1.1] uppercase ml-[-0.2vw]"
            data-title
          >
            {t('not_found.title')}
          </h1>
          <p
            className="text-[1.1vw] text-black-100/70 font-[450] leading-[1.85] max-w-[52vw] mt-[2.5%]"
            data-text
          >
            {t('not_found.description')}
          </p>
          <div className="mt-[3.5%]" data-btn>
            <Button as={Link} href="/">
              {t('not_found.back_home')}
            </Button>
          </div>
        </div>

        <p
          className="absolute right-[4vw] bottom-[8%] text-[18vw] text-black-100/10 font-[500] leading-none select-none pointer-events-none"
          data-number
          aria-hidden
        >
          404
        </p>
      </section>
    </main>
  )
}

export default NotFound
