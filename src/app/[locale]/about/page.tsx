'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Caveat } from 'next/font/google'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLenis } from '@/components/LenisProvider'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const caveat = Caveat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
})

const AboutPage = () => {
  const t = useTranslations()
  const lenis = useLenis()
  const pageRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      const heroBits = page.querySelectorAll('[data-about-hero]')
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

      page.querySelectorAll('[data-about-image]').forEach((el) => {
        const img = el.querySelector('img')
        const tl = gsap.timeline({ paused: true })

        tl.fromTo(
          el,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' },
          0
        )

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.08 },
            { scale: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      })

      page.querySelectorAll('[data-about-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
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
    <main ref={pageRef} className="overflow-x-hidden">
      <section className="pt-[18.5vh] pb-[6%]">
        <div className="max-w-[75vw] mx-auto">
          <h1
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase ml-[-0.2vw]"
            data-about-hero
          >
            {t('about.section_1_title_1')}
          </h1>
          <h1
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase ml-[-0.2vw]"
            data-about-hero
          >
            {t('about.section_1_title_2')}
          </h1>
          <p
            className="mt-[3vw] max-w-[52vw] text-[0.92vw] text-black-100/60 leading-[1.8]"
            data-about-hero
          >
            {t('about.section_1_text')}
          </p>
        </div>
      </section>

      <section className="pb-[8%]">
        <div className="max-w-[75vw] mx-auto flex flex-col items-center">
          <div
            className="w-[75%] aspect-[16/10] overflow-hidden invisible"
            data-about-image
          >
            <Image
              src="/assets/about-img-1.webp"
              alt={t('about.section_2_caption')}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 80vw, 42vw"
            />
          </div>
          <p
            className="mt-[1.2vw] text-[0.68vw] text-black-100/35 italic"
            data-about-fade
          >
            {t('about.section_2_caption')}
          </p>
        </div>
      </section>

      <section className="pb-[8%]">
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase mb-[3vw]"
            data-about-fade
          >
            {t('about.section_3_label')}
          </p>
          <div className="max-w-[48vw]">
            <p
              className="text-[0.92vw] text-black-100/60 leading-[1.8] mb-[3vw]"
              data-about-fade
            >
              {t('about.section_3_text_1')}
            </p>
            <p
              className="text-[0.95vw] font-[500] text-black-100 leading-[1.6] mb-[1vw]"
              data-about-fade
            >
              {t('about.section_3_heading')}
            </p>
            <p
              className="text-[0.92vw] text-black-100/60 leading-[1.8]"
              data-about-fade
            >
              {t('about.section_3_text_2')}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-[8%]">
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.72vw] text-black-100/40 tracking-[0.18em] uppercase mb-[4vw]"
            data-about-fade
          >
            {t('about.section_4_label')}
          </p>

          <div className="grid grid-cols-2 gap-x-[1.5vw]">
            <div className="invisible" data-about-image>
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="/assets/about-img-2.webp"
                  alt={t('about.section_4_portrait_1')}
                  width={720}
                  height={960}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 50vw, 38vw"
                />
              </div>
              <p className="mt-[0.8vw] text-[0.62vw] text-black-100/30 uppercase tracking-[0.12em]">
                {t('about.section_4_portrait_1')}
              </p>
            </div>

            <div
              className="flex flex-col justify-end pt-[6vw] invisible"
              data-about-image
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="/assets/about-img-3.webp"
                  alt={t('about.section_4_portrait_2')}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 40vw, 30vw"
                />
              </div>
              <p className="mt-[0.8vw] text-[0.62vw] text-black-100/30 uppercase tracking-[0.12em]">
                {t('about.section_4_portrait_2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[12%]">
        <div
          className="max-w-[75vw] mx-auto flex justify-center"
          data-about-fade
        >
          <p
            className={`${caveat.className} text-[3.8vw] text-black-100/80 leading-[1.2] text-center max-w-[45vw]`}
          >
            {t('about.section_5_signature')}
          </p>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
