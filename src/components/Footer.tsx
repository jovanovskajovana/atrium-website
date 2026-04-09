'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '@/components/Button'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AtriumLogoFull from '@/components/icons/atrium-logo-full'
import AtriumLogoMark from '@/components/icons/atrium-logo-mark'

import { Link } from '@/i18n/navigation'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const t = useTranslations()
  const footerRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      const ctaSection = footer.querySelector('[data-footer-cta]')
      const ctaItems = footer.querySelectorAll('[data-footer-cta-item]')

      if (ctaItems.length) {
        gsap.set(ctaItems, { y: 50, opacity: 0 })
        const ctaTl = gsap.timeline({ paused: true })
        ctaTl.to(ctaItems, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.2,
        })

        ScrollTrigger.create({
          trigger: ctaSection,
          start: 'top 80%',
          onEnter: () => ctaTl.play(),
          onLeaveBack: () => ctaTl.reverse(),
        })
      }

      const contentSection = footer.querySelector('[data-footer-content]')
      const contentItems = footer.querySelectorAll('[data-footer-item]')

      if (contentItems.length) {
        gsap.set(contentItems, { autoAlpha: 0, y: 50 })
        const contentTl = gsap.timeline({ paused: true })
        contentItems.forEach((item, i) => {
          contentTl.to(
            item,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            i * 0.1
          )
        })

        ScrollTrigger.create({
          trigger: contentSection,
          start: 'top 80%',
          onEnter: () => contentTl.play(),
          onLeaveBack: () => contentTl.reverse(),
        })
      }
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black-100 text-white-100 overflow-hidden"
    >
      <AtriumLogoMark className="pointer-events-none absolute left-[50%] inset-y-[-2%] h-[104%] w-auto z-0" />

      <section
        className="relative text-center py-[12%] px-[2.2vw] z-10"
        data-footer-cta
      >
        <h2
          className="text-[3.2vw] font-[500] text-white-100 leading-[1.15] uppercase"
          data-footer-cta-item
        >
          {t('footer.cta_title')}
        </h2>
        <p
          className="text-[1.3vw] font-[400] text-white-100/70 leading-[1.8] max-w-[42vw] mx-auto mt-[2.5%]"
          data-footer-cta-item
        >
          {t('footer.cta_text')}
        </p>
        <div
          className="flex justify-center gap-[1.8vw] mt-[5%]"
          data-footer-cta-item
        >
          <Button variant="light">{t('footer.cta_button_1')}</Button>
          <Button variant="light">{t('footer.cta_button_2')}</Button>
        </div>
      </section>

      <div
        className="relative border-t border-white-100/15 z-10"
        data-footer-content
      >
        <div className="grid grid-cols-[1.2fr_2fr] gap-[5.5vw] py-[4%] px-[2.2vw]">
          <div data-footer-item>
            <Link href="/">
              <AtriumLogoFull
                className="w-[14vw] h-auto"
                fillColor="rgba(255,255,255,0.96)"
              />
            </Link>
            <p className="text-[0.85vw] text-white-100/55 leading-[1.7] tracking-[0.04em] max-w-[20vw] mt-[4%]">
              {t('footer.quote')}
            </p>
          </div>

          <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-[5.5vw]">
            <div className="space-y-[2.4vw]" data-footer-item>
              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.contact_title')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.contact_email')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.contact_phone')}
                </p>
              </div>

              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.address_title')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.address_line_1')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.address_line_2')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.address_line_3')}
                </p>
              </div>

              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.showroom_title')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.showroom_line_1')}
                </p>
                <p className="text-[0.92vw] leading-[1.75] text-white-100/70">
                  {t('footer.showroom_line_2')}
                </p>
              </div>
            </div>

            <div className="space-y-[2.4vw]" data-footer-item>
              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.navigation_title')}
                </p>
                <ul className="space-y-[0.2vw]">
                  <li>
                    <Link
                      href="/"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.home_label')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/references"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.nav_references')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/production"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.nav_production')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.nav_news')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.nav_careers')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.nav_about')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.nav_contact')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.legal_title')}
                </p>
                <ul className="space-y-[0.2vw]">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.privacy_notice_label')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-of-use"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.terms_of_use_label')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-[2.4vw]" data-footer-item>
              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.language_title')}
                </p>
                <LanguageSwitcher variant="list" />
              </div>

              <div>
                <p className="text-[0.78vw] font-[500] lowercase tracking-[0.13em] text-white-100/60 mb-[0.8vw]">
                  {t('footer.follow_title')}
                </p>
                <ul className="space-y-[0.2vw]">
                  <li>
                    <a
                      href={t('footer.instagram_url')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.instagram_label')}
                    </a>
                  </li>
                  <li>
                    <a
                      href={t('footer.linkedin_url')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.92vw] lowercase text-white-100/70 hover:text-white-100 transition-colors"
                    >
                      {t('footer.linkedin_label')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t border-white-100/10 py-[1.8%] px-[2.2vw]"
          data-footer-item
        >
          <p className="text-[0.82vw] text-white-100/50">
            &copy; {new Date().getFullYear()} Atrium d.o.o. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
