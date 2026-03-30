'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '@/components/Button'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AtriumLogoFull from '@/components/icons/atrium-logo-full'

import { Link } from '@/i18n/navigation'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const t = useTranslations('footer')
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
      <section
        className="relative text-center py-[10%] px-[1.5vw]"
        data-footer-cta
      >
        <h2
          className="text-[2.8vw] font-[450] text-white-100 leading-[1.2] uppercase"
          data-footer-cta-item
        >
          {t('cta_title')}
        </h2>
        <p
          className="text-[1.2vw] font-[350] text-white-100/65 leading-[1.8] max-w-[38vw] mx-auto mt-[2%]"
          data-footer-cta-item
        >
          {t('cta_text')}
        </p>
        <div
          className="flex justify-center gap-[1.5vw] mt-[4%]"
          data-footer-cta-item
        >
          <Button variant="light">{t('cta_button_1')}</Button>
          <Button variant="light">{t('cta_button_2')}</Button>
        </div>
      </section>

      <div className="border-t border-white-100/15" data-footer-content>
        <div className="grid grid-cols-[1.2fr_2fr] gap-[6vw] py-[4%] px-[1.5vw]">
          <div data-footer-item>
            <AtriumLogoFull
              className="w-[13vw] h-auto"
              fillColor="rgba(255,255,255,0.96)"
            />
            <p className="text-[0.78vw] text-white-100/45 leading-[1.6] tracking-[0.04em] max-w-[16vw] mt-[4%]">
              {t('quote')}
            </p>
          </div>

          <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-[4vw]">
            <div className="space-y-[2.2vw]" data-footer-item>
              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('contact_title')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('contact_email')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('contact_phone')}
                </p>
              </div>

              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('address_title')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('address_line_1')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('address_line_2')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('address_line_3')}
                </p>
              </div>

              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('hours_title')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('hours_days')}
                </p>
                <p className="text-[0.84vw] leading-[1.75] text-white-100/65">
                  {t('hours_time')}
                </p>
              </div>
            </div>

            <div className="space-y-[2.2vw]" data-footer-item>
              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('navigation_title')}
                </p>
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('home_label')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/references"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('nav_references')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/production"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('nav_production')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('nav_news')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('nav_careers')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('nav_about')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('nav_contact')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('legal_title')}
                </p>
                <ul>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('privacy_notice_label')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-of-use"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('terms_of_use_label')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-[2.2vw]" data-footer-item>
              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('language_title')}
                </p>
                <LanguageSwitcher variant="list" />
              </div>

              <div>
                <p className="text-[0.72vw] lowercase tracking-[0.13em] text-white-100/35 mb-[0.8vw]">
                  {t('follow_title')}
                </p>
                <ul>
                  <li>
                    <a
                      href={t('instagram_url')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('instagram_label')}
                    </a>
                  </li>
                  <li>
                    <a
                      href={t('facebook_url')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('facebook_label')}
                    </a>
                  </li>
                  <li>
                    <a
                      href={t('linkedin_url')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.84vw] lowercase text-white-100/65 hover:text-white-100 transition-colors"
                    >
                      {t('linkedin_label')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t border-white-100/10 py-[1.5%] px-[1.5vw]"
          data-footer-item
        >
          <p className="text-[0.74vw] text-white-100/45">
            &copy; {new Date().getFullYear()} Atrium d.o.o. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
