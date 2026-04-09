'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
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
      const s1Image = section1.querySelector('[data-s1-image]')
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

      if (s1Image) {
        gsap.set(s1Image, { y: 60, opacity: 0 })

        const s1ImgEl = s1Image.querySelector('img')
        if (s1ImgEl) gsap.set(s1ImgEl, { scale: 1.08 })

        const s1ImgTl = gsap.timeline({ delay: 0.2 })
        s1ImgTl.to(
          s1Image,
          { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
          0
        )
        if (s1ImgEl) {
          s1ImgTl.to(
            s1ImgEl,
            { scale: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
      }

      const section2 = section2Ref.current
      if (section2) {
        const s2Label = section2.querySelector('[data-s2-label]')
        const s2Texts = section2.querySelectorAll('[data-s2-text]')
        const s2Portraits = section2.querySelectorAll('[data-s2-portrait]')

        if (s2Label) gsap.set(s2Label, { y: 28, opacity: 0 })
        gsap.set(s2Texts, { y: 28, opacity: 0 })

        const s2TextTl = gsap.timeline({ paused: true })
        if (s2Label) {
          s2TextTl.to(
            s2Label,
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            0
          )
        }
        s2TextTl.to(
          s2Texts,
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
          onEnter: () => s2TextTl.play(),
          onLeaveBack: () => s2TextTl.reverse(),
        })

        s2Portraits.forEach((portrait) => {
          gsap.set(portrait, { y: 40, autoAlpha: 0 })

          const img = portrait.querySelector('img')
          const ptl = gsap.timeline({ paused: true })

          ptl.to(portrait, {
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: 'power3.out',
          })

          if (img) {
            ptl.fromTo(
              img,
              { scale: 1.08 },
              { scale: 1, duration: 1.3, ease: 'power3.out' },
              0
            )
          }

          ScrollTrigger.create({
            trigger: portrait,
            start: 'top 85%',
            onEnter: () => ptl.play(),
            onLeaveBack: () => ptl.reverse(),
          })
        })
      }

      const section3 = section3Ref.current
      if (section3) {
        const s3Signature = section3.querySelector('[data-s3-signature]')
        if (s3Signature) {
          gsap.set(s3Signature, { y: 30, opacity: 0 })
          const s3Tl = gsap.timeline({ paused: true })
          s3Tl.to(s3Signature, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          })
          ScrollTrigger.create({
            trigger: section3,
            start: 'top 80%',
            onEnter: () => s3Tl.play(),
            onLeaveBack: () => s3Tl.reverse(),
          })
        }
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
            {t('about.section_1_label')}
          </p>
          <h1
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase ml-[-0.2vw] opacity-0"
            data-s1-title
          >
            {t('about.section_1_title_1')}
          </h1>
          <h1
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase ml-[-0.2vw] opacity-0"
            data-s1-title
          >
            {t('about.section_1_title_2')}
          </h1>
          <p
            className="text-[1.1vw] text-black-100/75 leading-[1.85] max-w-[52vw] mt-[2.5%] opacity-0"
            data-s1-text
          >
            {t('about.section_1_text')}
          </p>
        </div>

        <div className="flex flex-col items-center max-w-[72vw] mt-[6%] mx-auto">
          <div className="w-[75%] opacity-0" data-s1-image>
            <div className="aspect-[16/10] overflow-hidden">
              <Image
                src="/assets/about-img-1.webp"
                alt={t('about.section_1_photo_label')}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                sizes="42vw"
              />
            </div>
            <p className="text-[0.88vw] font-[450] text-black-100/60 mt-[1.5%]">
              {t('about.section_1_photo_label')}
            </p>
          </div>
        </div>
      </section>

      <section ref={section2Ref} className="bg-beige-100 py-[8%]">
        <div className="max-w-[72vw] mx-auto">
          <p
            className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase mb-[1.8%] opacity-0"
            data-s2-label
          >
            {t('about.section_2_label')}
          </p>
          <div className="max-w-[48vw]">
            <p
              className="text-[1.05vw] text-black-100/75 leading-[1.85] mb-[8%] opacity-0"
              data-s2-text
            >
              {t('about.section_2_text_1')}
            </p>
            <p
              className="text-[1.1vw] font-[500] text-black-100 leading-[1.8] mb-[2%] opacity-0"
              data-s2-text
            >
              {t('about.section_2_title')}
            </p>
            <p
              className="text-[1.05vw] text-black-100/75 leading-[1.85] opacity-0"
              data-s2-text
            >
              {t('about.section_2_text_2')}
            </p>
          </div>
          <p
            className="text-[0.82vw] font-[500] text-black-100/60 tracking-[0.18em] uppercase mt-[6%] opacity-0"
            data-s2-text
          >
            {t('about.section_2_text_3')}
          </p>
        </div>

        <div className="max-w-[72vw] mx-auto mt-[5%]">
          <div className="grid grid-cols-2 gap-[2vw]">
            <div data-s2-portrait>
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="/assets/about-img-2.webp"
                  alt={t('about.section_2_photo_label_1')}
                  width={720}
                  height={960}
                  className="h-full w-full object-cover"
                  sizes="38vw"
                />
              </div>
              <p className="text-[0.88vw] font-[450] text-black-100/60 mt-[2%]">
                {t('about.section_2_photo_label_1')}
              </p>
            </div>

            <div
              className="flex flex-col justify-end pt-[16%]"
              data-s2-portrait
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="/assets/about-img-3.webp"
                  alt={t('about.section_2_photo_label_2')}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                  sizes="38vw"
                />
              </div>
              <p className="text-[0.88vw] font-[450] text-black-100/60 mt-[2%]">
                {t('about.section_2_photo_label_2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={section3Ref} className="bg-beige-100 pb-[10%]">
        <div className="flex justify-center max-w-[75vw] mx-auto">
          <div className="w-[25vw]" data-s3-signature>
            {/* <Image
              src="/assets/about-img-4.webp"
              alt={t('about.section_3_signature')}
              width={634}
              height={194}
              className="w-full"
              sizes="30vw"
            /> */}
            <p className="font-signature text-[4vw] text-black-100 leading-[1.15] text-center">
              {t('about.section_3_signature_text')}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
