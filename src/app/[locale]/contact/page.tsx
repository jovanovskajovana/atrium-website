'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { COMPANY, TEAM_CONTACTS } from '@/constants/contacts'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const ContactPage = () => {
  const t = useTranslations()

  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const section1 = section1Ref.current
    if (!section1) return

    const ctx = gsap.context(() => {
      const s1Label = section1.querySelector('[data-s1-label]')
      const s1Text = section1.querySelector('[data-s1-text]')
      const s1Form = section1.querySelector('[data-s1-form]')
      const s1InfoItems = section1.querySelectorAll('[data-s1-info]')
      const s1Ctas = section1.querySelectorAll('[data-s1-cta]')

      if (s1Label) {
        gsap.fromTo(
          s1Label,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15 }
        )
      }

      if (s1Text) {
        gsap.fromTo(
          s1Text,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        )
      }

      if (s1Form) {
        gsap.set(s1Form, { y: 40, opacity: 0 })
        gsap.to(s1Form, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          delay: 0.3,
        })
      }

      if (s1InfoItems.length) {
        gsap.set(s1InfoItems, { y: 30, opacity: 0 })
        gsap.to(s1InfoItems, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.5,
        })
      }

      if (s1Ctas.length) {
        gsap.set(s1Ctas, { y: 20, opacity: 0 })
        gsap.to(s1Ctas, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.7,
        })
      }

      const section2 = section2Ref.current
      if (section2) {
        const s2Label = section2.querySelector('[data-s2-label]')
        const s2Items = section2.querySelectorAll('[data-s2-dept]')

        if (s2Label) gsap.set(s2Label, { y: 28, opacity: 0 })
        gsap.set(s2Items, { y: 30, opacity: 0 })

        const s2Tl = gsap.timeline({ paused: true })
        if (s2Label) {
          s2Tl.to(
            s2Label,
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            0
          )
        }
        s2Tl.to(
          s2Items,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.06,
          },
          0.1
        )

        ScrollTrigger.create({
          trigger: section2,
          start: 'top 80%',
          onEnter: () => s2Tl.play(),
          onLeaveBack: () => s2Tl.reverse(),
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
            {t('contact.section_1_label')}
          </p>
          <p
            className="text-[1.1vw] text-black-100/75 leading-[1.85] max-w-[52vw] mt-[2.5%] opacity-0"
            data-s1-text
          >
            {t('contact.section_1_text')}
          </p>

          <form
            className="bg-beige-100 px-[4vw] py-[4vw] mt-[6%] opacity-0"
            data-s1-form
          >
            <div className="grid grid-cols-2 gap-x-[4vw] gap-y-[3.2vw]">
              <label className="block">
                <span className="block text-[0.88vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('contact.form_name')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/20 px-[1vw] py-[0.75vw] text-[0.88vw] text-black-100 outline-none focus:border-black-100/50 transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-[0.88vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('contact.form_email')}
                </span>
                <input
                  type="email"
                  className="w-full bg-transparent border border-black-100/20 px-[1vw] py-[0.75vw] text-[0.88vw] text-black-100 outline-none focus:border-black-100/50 transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-[0.88vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('contact.form_company')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/20 px-[1vw] py-[0.75vw] text-[0.88vw] text-black-100 outline-none focus:border-black-100/50 transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-[0.88vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('contact.form_subject')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/20 px-[1vw] py-[0.75vw] text-[0.88vw] text-black-100 outline-none focus:border-black-100/50 transition-colors"
                />
              </label>
            </div>

            <div className="mt-[3.2vw]">
              <label className="block">
                <span className="block text-[0.88vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('contact.form_message')}
                </span>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border border-black-100/20 px-[1vw] py-[0.75vw] text-[0.88vw] text-black-100 outline-none focus:border-black-100/50 transition-colors resize-none"
                />
              </label>
            </div>

            <div className="mt-[3vw] flex justify-end">
              <button
                type="button"
                className="group relative inline-flex items-center justify-center text-[0.88vw] font-[500] tracking-[0.04em] border border-black-100 h-[3.6vw] px-[2vw] overflow-hidden"
              >
                <span className="absolute inset-0 bg-black-100 translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
                <span className="relative text-black-100 transition-colors duration-500 ease-in-out group-hover:text-white-100">
                  {t('contact.form_submit')}
                </span>
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 gap-x-[5vw] gap-y-[5vw] mt-[7%]">
            <div className="opacity-0" data-s1-info>
              <p className="text-[0.78vw] font-[500] uppercase tracking-[0.2em] text-black-100/50 mb-[1.2vw]">
                {t('contact.section_1_phone_label')}
              </p>
              <a
                href={`tel:${COMPANY.phone.replace(/[\s()]/g, '')}`}
                className="text-[1.2vw] font-[500] text-black-100 hover:text-black-100/60 transition-colors duration-300"
              >
                {COMPANY.phone}
              </a>
            </div>

            <div className="opacity-0" data-s1-info>
              <p className="text-[0.78vw] font-[500] uppercase tracking-[0.2em] text-black-100/50 mb-[1.2vw]">
                {t('contact.section_1_email_label')}
              </p>
              <a
                href={`mailto:${t('footer.contact_email')}`}
                className="text-[1.2vw] font-[500] text-black-100 hover:text-black-100/60 transition-colors duration-300"
              >
                {t('footer.contact_email')}
              </a>
            </div>

            <div className="opacity-0" data-s1-info>
              <p className="text-[0.78vw] font-[500] uppercase tracking-[0.2em] text-black-100/50 mb-[1.2vw]">
                {t('contact.section_1_address_label')}
              </p>
              <p className="text-[1.2vw] font-[500] text-black-100 leading-[1.7]">
                {COMPANY.address}
                <br />
                {COMPANY.city}
                <br />
                {COMPANY.country}
              </p>
            </div>

            <div className="opacity-0" data-s1-info>
              <p className="text-[0.78vw] font-[500] uppercase tracking-[0.2em] text-black-100/50 mb-[1.2vw]">
                {t('contact.section_1_follow_label')}
              </p>
              <div className="flex gap-[2vw]">
                <a
                  href={t('footer.instagram_url')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[1.2vw] font-[500] text-black-100 hover:text-black-100/60 transition-colors duration-300"
                >
                  {t('footer.instagram_label')}
                </a>
                <a
                  href={t('footer.linkedin_url')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[1.2vw] font-[500] text-black-100 hover:text-black-100/60 transition-colors duration-300"
                >
                  {t('footer.linkedin_label')}
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-[1.8vw] mt-[7%]">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center text-[0.88vw] font-[500] tracking-[0.04em] border border-black-100 h-[3.6vw] px-[2vw] overflow-hidden opacity-0"
              data-s1-cta
            >
              <span className="absolute inset-0 bg-black-100 translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
              <span className="relative text-black-100 transition-colors duration-500 ease-in-out group-hover:text-white-100">
                {t('contact.book_meeting')}
              </span>
            </a>
            <a
              href="#"
              className="group relative inline-flex items-center justify-center text-[0.88vw] font-[500] tracking-[0.04em] border border-black-100 h-[3.6vw] px-[2vw] overflow-hidden opacity-0"
              data-s1-cta
            >
              <span className="absolute inset-0 bg-black-100 translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
              <span className="relative text-black-100 transition-colors duration-500 ease-in-out group-hover:text-white-100">
                {t('contact.visit_showroom')}
              </span>
            </a>
          </div>
        </div>
      </section>

      <section ref={section2Ref} className="bg-beige-100 py-[7%] mb-[6%]">
        <div className="max-w-[72vw] mx-auto">
          <p
            className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase mb-[4vw] opacity-0"
            data-s2-label
          >
            {t('contact.section_2_label')}
          </p>

          <div className="grid grid-cols-3 gap-x-[3.5vw] gap-y-[4vw]">
            {TEAM_CONTACTS.map((dept) => (
              <div
                key={dept.key}
                className="border-l-2 border-brown-100/20 pl-[1.8vw] opacity-0"
                data-s2-dept
              >
                <p className="text-[0.78vw] font-[500] uppercase tracking-[0.2em] text-black-100/50 mb-[1vw]">
                  {t(`contact.dept_${dept.key}`)}
                </p>
                {dept.members.map((member) => (
                  <div key={member.email} className="mb-[1vw] last:mb-0">
                    <p className="text-[0.95vw] font-[500] text-black-100 leading-[1.55]">
                      {member.name}
                    </p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[0.85vw] text-black-100/55 hover:text-black-100 transition-colors duration-300"
                    >
                      {member.email}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
