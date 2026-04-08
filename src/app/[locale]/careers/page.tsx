'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLenis } from '@/components/LenisProvider'
import { Link } from '@/i18n/navigation'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const CareersPage = () => {
  const t = useTranslations()
  const lenis = useLenis()
  const pageRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      const heroBits = page.querySelectorAll('[data-careers-hero-bit]')
      heroBits.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            delay: 0.08 * i,
          }
        )
      })

      const split = page.querySelector('[data-careers-split]')
      if (split) {
        gsap.fromTo(
          split,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: split,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      page.querySelectorAll('[data-culture-item]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      page.querySelectorAll('[data-careers-role]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      const cta = page.querySelector('[data-careers-cta]')
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cta,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      requestAnimationFrame(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
      })
    }, page)

    return () => {
      ctx.revert()
      requestAnimationFrame(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
      })
    }
  }, [lenis])

  return (
    <main ref={pageRef} className="relative overflow-x-hidden">
      <section className="relative pt-[18.5vh] pb-[6%]">
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[2.8vw] xs:text-[2.2vw] sm:text-[0.8rem] md:text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase mb-[2.2vw]"
            data-careers-hero-bit
          >
            {t('careers.section_1_label')}
          </p>
          <h1 className="text-[3.2vw] font-[450] text-black-100 leading-[1.08] tracking-[0.02em] uppercase max-w-[62vw]">
            <span className="block" data-careers-hero-bit>
              {t('careers.section_1_title_1')}
            </span>
            <span
              className="block text-black-100/78 mt-[0.35em]"
              data-careers-hero-bit
            >
              {t('careers.section_1_title_2')}
            </span>
          </h1>
          <p
            className="mt-[4vw] max-w-[28vw] text-[0.92vw] text-black-100/55 leading-[1.75]"
            data-careers-hero-bit
          >
            {t('careers.section_1_text')}
          </p>
        </div>
      </section>

      <section className="relative pb-[10%]">
        <div
          className="max-w-[75vw] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.55fr)] gap-x-[6vw] gap-y-[6vw] border-t border-black-100/10 pt-[4%]"
          data-careers-split
        >
          <p className="text-[1.05vw] font-[400] text-black-100/70 leading-[1.85] tracking-[0.01em]">
            {t('careers.section_2_text')}
          </p>
          <dl className="space-y-[2.2vw] lg:pt-[0.5vw]">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border-l border-black-100/15 pl-[1.4vw]">
                <dt className="text-[0.65vw] uppercase tracking-[0.2em] text-black-100/40 mb-[0.5vw]">
                  {t(`careers.section_2_fact_${n}_label`)}
                </dt>
                <dd className="text-[0.88vw] text-black-100/75 leading-[1.55]">
                  {t(`careers.section_2_fact_${n}_text`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative pb-[10%]">
        <div className="max-w-[75vw] mx-auto">
          <p className="text-[2.8vw] xs:text-[2.2vw] sm:text-[0.8rem] md:text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase mb-[4vw]">
            {t('careers.section_3_label')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[5vw] md:gap-x-[3vw] md:gap-y-0">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                data-culture-item
                className="relative md:border-l md:border-black-100/10 md:pl-[2vw] md:first:border-l-0 md:first:pl-0 pt-[3vw] md:pt-0 border-t border-black-100/10 md:border-t-0 first:border-t-0 first:pt-0"
              >
                <span className="block text-[4.5vw] font-[450] text-black-100/[0.07] leading-none mb-[1.2vw] select-none">
                  {String(n).padStart(2, '0')}
                </span>
                <h2 className="text-[1.15vw] font-[450] text-black-100 uppercase tracking-[0.04em] mb-[1vw]">
                  {t(`careers.section_3_value_${n}_title`)}
                </h2>
                <p className="text-[0.88vw] text-black-100/55 leading-[1.75] max-w-[22vw]">
                  {t(`careers.section_3_value_${n}_text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-[8%]">
        <div className="max-w-[75vw] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[2vw] mb-[3vw]">
            <p className="text-[2.8vw] xs:text-[2.2vw] sm:text-[0.8rem] md:text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase">
              {t('careers.section_4_label')}
            </p>
            <p className="text-[0.78vw] text-black-100/45 max-w-[28vw] leading-[1.6] sm:text-right">
              {t('careers.section_4_note')}
            </p>
          </div>
          <ul className="border-t border-black-100/10">
            {[1, 2, 3, 4].map((n) => (
              <li
                key={n}
                data-careers-role
                className="border-b border-black-100/10 group/role"
              >
                <Link
                  href="/contact"
                  className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-[1.2vw] py-[2.4vw] transition-[background-color,padding] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-black-100 focus-visible:outline-offset-[0.35vw] lg:hover:bg-black-100 lg:hover:px-[1vw] lg:focus-visible:bg-black-100 lg:focus-visible:px-[1vw]"
                >
                  <div className="flex flex-wrap items-baseline gap-x-[1.2vw] gap-y-[0.4vw]">
                    <span className="text-[1.25vw] font-[450] text-black-100 uppercase tracking-[0.03em] transition-colors duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/role:text-white-100">
                      {t(`careers.section_4_role_${n}_title`)}
                    </span>
                    <span className="text-[0.65vw] uppercase tracking-[0.18em] text-black-100/40 transition-colors duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/role:text-white-100/55">
                      {t(`careers.section_4_role_${n}_team`)}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-[2vw] lg:shrink-0">
                    <span className="text-[0.78vw] text-black-100/50 transition-colors duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/role:text-white-100/60">
                      {t(`careers.section_4_role_${n}_type`)}
                    </span>
                    <span className="text-[0.72vw] uppercase tracking-[0.2em] text-black-100 transition-colors duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/role:text-white-100">
                      {t('careers.section_4_apply')}
                      <span
                        aria-hidden
                        className="inline-block ml-[0.35em] transition-transform duration-500 ease-out group-hover/role:translate-x-[0.25vw]"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="relative bg-black-100 text-white-100 py-[8%] mx-[2.2vw] mb-[10%]"
        data-careers-cta
      >
        <div className="max-w-[75vw] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[3vw]">
          <div className="max-w-[36vw]">
            <h2 className="text-[2.2vw] font-[450] leading-[1.2] uppercase tracking-[0.03em] mb-[1.5vw]">
              {t('careers.section_5_title')}
            </h2>
            <p className="text-[0.92vw] text-white-100/55 leading-[1.75]">
              {t('careers.section_5_text')}
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center self-start lg:self-auto text-[0.8vw] border border-white-100 h-[3.3vw] px-[1.1vw] overflow-hidden shrink-0"
          >
            <span className="absolute inset-0 bg-white-100 translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
            <span className="relative text-white-100 transition-colors duration-500 ease-in-out group-hover:text-black-100">
              {t('careers.section_5_cta')}
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default CareersPage
