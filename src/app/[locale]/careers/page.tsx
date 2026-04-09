'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { JOB_LISTINGS } from '@/constants/careers'

import { Link } from '@/i18n/navigation'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const CareersPage = () => {
  const t = useTranslations()

  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const section1 = section1Ref.current
    if (!section1) return

    const ctx = gsap.context(() => {
      const s1Label = section1.querySelector('[data-s1-label]')
      const s1Titles = section1.querySelectorAll('[data-s1-title]')
      const s1Text = section1.querySelector('[data-s1-text]')

      if (s1Label) {
        gsap.fromTo(
          s1Label,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15 }
        )
      }

      if (s1Titles.length) {
        gsap.fromTo(
          s1Titles,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
          }
        )
      }

      if (s1Text) {
        gsap.fromTo(
          s1Text,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.25 }
        )
      }

      const split = section1.querySelector('[data-careers-split]')
      if (split) {
        gsap.set(split, { y: 60, opacity: 0 })

        gsap.to(split, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      const section2 = section2Ref.current
      if (section2) {
        const s2Label = section2.querySelector('[data-s2-label]')
        const s2CultureItems = section2.querySelectorAll('[data-culture-item]')
        const s2RolesHeader = section2.querySelector('[data-s2-roles-header]')
        const s2Roles = section2.querySelectorAll('[data-careers-role]')

        if (s2Label) gsap.set(s2Label, { y: 28, opacity: 0 })
        gsap.set(s2CultureItems, { y: 28, opacity: 0 })

        const s2CultureTl = gsap.timeline({ paused: true })
        if (s2Label) {
          s2CultureTl.to(
            s2Label,
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            0
          )
        }
        s2CultureTl.to(
          s2CultureItems,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
          },
          0.1
        )

        ScrollTrigger.create({
          trigger: section2,
          start: 'top 80%',
          onEnter: () => s2CultureTl.play(),
          onLeaveBack: () => s2CultureTl.reverse(),
        })

        if (s2RolesHeader) {
          gsap.set(s2RolesHeader, { y: 28, opacity: 0 })
          const s2RolesHeaderTl = gsap.timeline({ paused: true })
          s2RolesHeaderTl.to(s2RolesHeader, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          })
          ScrollTrigger.create({
            trigger: s2RolesHeader,
            start: 'top 85%',
            onEnter: () => s2RolesHeaderTl.play(),
            onLeaveBack: () => s2RolesHeaderTl.reverse(),
          })
        }

        s2Roles.forEach((el) => {
          gsap.set(el, { y: 28, opacity: 0 })
          const elTl = gsap.timeline({ paused: true })
          elTl.to(el, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          })
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            onEnter: () => elTl.play(),
            onLeaveBack: () => elTl.reverse(),
          })
        })
      }

      const section3 = section3Ref.current
      if (section3) {
        gsap.set(section3, { y: 30, opacity: 0 })
        const s3Tl = gsap.timeline({ paused: true })
        s3Tl.to(section3, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        })
        ScrollTrigger.create({
          trigger: section3,
          start: 'top 85%',
          onEnter: () => s3Tl.play(),
          onLeaveBack: () => s3Tl.reverse(),
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="overflow-x-hidden">
      <section ref={section1Ref} className="pt-[18.5vh] pb-[10%]">
        <div className="max-w-[72vw] mx-auto">
          <p
            className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase mb-[1.8%] opacity-0"
            data-s1-label
          >
            {t('careers.section_1_label')}
          </p>
          <h1
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase ml-[-0.2vw] opacity-0"
            data-s1-title
          >
            {t('careers.section_1_title_1')}
          </h1>
          <h1
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase ml-[-0.2vw] opacity-0"
            data-s1-title
          >
            {t('careers.section_1_title_2')}
          </h1>
          <p
            className="text-[1.1vw] text-black-100/75 leading-[1.85] max-w-[52vw] mt-[2.5%] opacity-0"
            data-s1-text
          >
            {t('careers.section_1_text')}
          </p>
        </div>

        <div
          className="grid grid-cols-[52vw_1fr] gap-x-[6vw] border-t border-black-100/15 max-w-[72vw] mx-auto pt-[6%] mt-[6%] opacity-0"
          data-careers-split
        >
          <p className="text-[1.3vw] font-[400] text-black-100/60 leading-[1.65]">
            {t('careers.section_2_text')}
          </p>
          <dl className="space-y-[2.4vw] pt-[0.5vw]">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="border-l-2 border-brown-100/20 pl-[1.4vw]"
              >
                <dt className="text-[0.75vw] font-[500] uppercase tracking-[0.2em] text-black-100/50 mb-[0.5vw]">
                  {t(`careers.section_2_fact_${n}_label`)}
                </dt>
                <dd className="text-[0.95vw] text-black-100/75 leading-[1.6]">
                  {t(`careers.section_2_fact_${n}_text`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section ref={section2Ref} className="bg-beige-100 py-[7%] mb-[2%]">
        <div className="max-w-[72vw] mx-auto">
          <p
            className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase mb-[4vw] opacity-0"
            data-s2-label
          >
            {t('careers.section_3_label')}
          </p>
          <div className="grid grid-cols-3 gap-x-[3.5vw]">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="border-l border-black-100/10 pl-[2vw] first:border-l-0 first:pl-0 opacity-0"
                data-culture-item
              >
                <span className="block text-[4.5vw] font-[500] text-brown-100/10 leading-none mb-[1.2vw] select-none">
                  {String(n).padStart(2, '0')}
                </span>
                <h3 className="text-[1.25vw] font-[500] text-black-100 uppercase tracking-[0.04em] mb-[1vw]">
                  {t(`careers.section_3_value_${n}_title`)}
                </h3>
                <p className="text-[0.95vw] text-black-100/65 leading-[1.8] max-w-[22vw]">
                  {t(`careers.section_3_value_${n}_text`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[72vw] mx-auto mt-[10%]">
          <div
            className="flex flex-row items-end justify-between gap-[2vw] mb-[3vw] opacity-0"
            data-s2-roles-header
          >
            <p className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase">
              {t('careers.section_4_label')}
            </p>
            <p className="text-[0.85vw] font-[450] text-black-100/50 max-w-[28vw] leading-[1.6] text-right">
              {t('careers.section_4_note')}
            </p>
          </div>
          <ul className="border-t border-black-100/10">
            {JOB_LISTINGS.map((listing) => (
              <li
                key={listing.slug}
                className="border-b border-black-100/10 group/role opacity-0"
                data-careers-role
              >
                <Link
                  href={{
                    pathname: '/careers/[slug]',
                    params: { slug: listing.slug },
                  }}
                  className="flex flex-row items-baseline justify-between gap-[1.2vw] py-[2.4vw] px-0 transition-[background-color,padding] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-black-100 hover:px-[1vw]"
                >
                  <div className="flex flex-wrap items-baseline gap-x-[1.2vw] gap-y-[0.4vw]">
                    <span className="text-[1.3vw] font-[500] text-black-100 uppercase tracking-[0.03em] transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/role:text-white-100">
                      {t(`careers.section_4_role_${listing.roleIndex}_title`)}
                    </span>
                    <span className="text-[0.75vw] font-[500] uppercase tracking-[0.18em] text-black-100/50 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/role:text-white-100/55">
                      {t(`careers.section_4_role_${listing.roleIndex}_team`)}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-[2vw] shrink-0">
                    <span className="text-[0.85vw] font-[450] text-black-100/55 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/role:text-white-100/60">
                      {t(`careers.section_4_role_${listing.roleIndex}_type`)}
                    </span>
                    <span className="text-[0.8vw] font-[500] uppercase tracking-[0.2em] text-black-100 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/role:text-white-100">
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
        ref={section3Ref}
        className="bg-black-100 text-white-100 py-[10%] mb-[12%] mx-[2.2vw]"
      >
        <div className="max-w-[72vw] mx-auto flex flex-row items-end justify-between gap-[3vw]">
          <div className="max-w-[38vw]">
            <h2 className="text-[2.6vw] font-[500] leading-[1.15] uppercase tracking-[0.03em] mb-[1.8vw]">
              {t('careers.section_5_title')}
            </h2>
            <p className="text-[1.05vw] text-white-100/65 leading-[1.8]">
              {t('careers.section_5_text_1')}
            </p>
            <p className="text-[1.05vw] text-white-100/65 leading-[1.8]">
              {t('careers.section_5_text_2')}
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center text-[0.88vw] font-[500] tracking-[0.04em] border border-white-100 h-[3.6vw] px-[1.6vw] overflow-hidden shrink-0"
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
