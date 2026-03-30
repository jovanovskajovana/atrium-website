'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '@/components/Button'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const ProductionPage = () => {
  const t = useTranslations('production')

  const statsRef = useRef<HTMLDivElement>(null)
  const dualImagesRef = useRef<HTMLDivElement>(null)
  const capsRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLElement>(null)
  const panoRef = useRef<HTMLDivElement>(null)
  const oemRef = useRef<HTMLElement>(null)
  const interiorsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stats = statsRef.current
      if (stats) {
        const statItems = stats.querySelectorAll('[data-stat-item]')
        gsap.set(statItems, { y: 40, opacity: 0 })

        const statsTl = gsap.timeline({ paused: true })
        statsTl.to(statItems, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.08,
        })

        ScrollTrigger.create({
          trigger: stats,
          start: 'top 85%',
          onEnter: () => statsTl.play(),
          onLeaveBack: () => statsTl.reverse(),
        })
      }

      const dualImages = dualImagesRef.current
      if (dualImages) {
        const images = dualImages.querySelectorAll('[data-dual-image]')
        gsap.set(images, { y: 50, opacity: 0 })

        const dualTl = gsap.timeline({ paused: true })
        dualTl.to(images, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.15,
        })

        ScrollTrigger.create({
          trigger: dualImages,
          start: 'top 80%',
          onEnter: () => dualTl.play(),
          onLeaveBack: () => dualTl.reverse(),
        })
      }

      const caps = capsRef.current
      if (caps) {
        const capItems = caps.querySelectorAll('[data-cap-item]')
        gsap.set(capItems, { y: 30, opacity: 0 })

        const capsTl = gsap.timeline({ paused: true })
        capsTl.to(capItems, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
        })

        ScrollTrigger.create({
          trigger: caps,
          start: 'top 80%',
          onEnter: () => capsTl.play(),
          onLeaveBack: () => capsTl.reverse(),
        })
      }

      const statement = statementRef.current
      if (statement) {
        const stText = statement.querySelector('[data-statement-text]')
        if (stText) {
          gsap.set(stText, { y: 40, opacity: 0 })
          const stTl = gsap.timeline({ paused: true })
          stTl.to(stText, {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
          })
          ScrollTrigger.create({
            trigger: statement,
            start: 'top 80%',
            onEnter: () => stTl.play(),
            onLeaveBack: () => stTl.reverse(),
          })
        }
      }

      const pano = panoRef.current
      if (pano) {
        gsap.set(pano, { y: 40, autoAlpha: 0 })
        const panoImg = pano.querySelector('img')

        const panoTl = gsap.timeline({ paused: true })
        panoTl.to(pano, {
          y: 0,
          autoAlpha: 1,
          duration: 1.3,
          ease: 'power3.out',
        })

        if (panoImg) {
          panoTl.fromTo(
            panoImg,
            { scale: 1.08 },
            { scale: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }

        ScrollTrigger.create({
          trigger: pano,
          start: 'top 85%',
          onEnter: () => panoTl.play(),
          onLeaveBack: () => panoTl.reverse(),
        })
      }

      const oem = oemRef.current
      if (oem) {
        const oemLabel = oem.querySelector('[data-oem-label]')
        const oemTitle = oem.querySelector('[data-oem-title]')
        const oemText = oem.querySelector('[data-oem-text]')
        const oemFeatures = oem.querySelectorAll('[data-oem-feature]')
        const oemImage = oem.querySelector('[data-oem-image]')

        if (oemLabel) gsap.set(oemLabel, { y: 20, opacity: 0 })
        if (oemTitle) gsap.set(oemTitle, { y: 40, opacity: 0 })
        if (oemText) gsap.set(oemText, { y: 20, opacity: 0 })
        gsap.set(oemFeatures, { y: 30, opacity: 0 })
        if (oemImage) gsap.set(oemImage, { y: 50, opacity: 0 })

        const oemTl = gsap.timeline({ paused: true })

        if (oemLabel) {
          oemTl.to(
            oemLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
        }
        if (oemTitle) {
          oemTl.to(
            oemTitle,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0.1
          )
        }
        if (oemText) {
          oemTl.to(
            oemText,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.3
          )
        }
        oemTl.to(
          oemFeatures,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.12,
          },
          0.4
        )
        if (oemImage) {
          oemTl.to(
            oemImage,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0.3
          )
        }

        ScrollTrigger.create({
          trigger: oem,
          start: 'top 80%',
          onEnter: () => oemTl.play(),
          onLeaveBack: () => oemTl.reverse(),
        })
      }

      const interiors = interiorsRef.current
      if (interiors) {
        const intLabel = interiors.querySelector('[data-int-label]')
        const intTitle = interiors.querySelector('[data-int-title]')
        const intText = interiors.querySelector('[data-int-text]')
        const intFeatures = interiors.querySelectorAll('[data-int-feature]')
        const intImages = interiors.querySelectorAll('[data-int-image]')

        if (intLabel) gsap.set(intLabel, { y: 20, opacity: 0 })
        if (intTitle) gsap.set(intTitle, { y: 40, opacity: 0 })
        if (intText) gsap.set(intText, { y: 20, opacity: 0 })
        gsap.set(intFeatures, { y: 30, opacity: 0 })
        gsap.set(intImages, { y: 50, opacity: 0 })

        const intTl = gsap.timeline({ paused: true })

        if (intLabel) {
          intTl.to(
            intLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
        }
        if (intTitle) {
          intTl.to(
            intTitle,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0.1
          )
        }
        if (intText) {
          intTl.to(
            intText,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.3
          )
        }
        intTl.to(
          intFeatures,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.12,
          },
          0.4
        )
        intTl.to(
          intImages,
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.15,
          },
          0.3
        )

        ScrollTrigger.create({
          trigger: interiors,
          start: 'top 80%',
          onEnter: () => intTl.play(),
          onLeaveBack: () => intTl.reverse(),
        })
      }

      const cta = ctaRef.current
      if (cta) {
        const ctaItems = cta.querySelectorAll('[data-cta-item]')
        gsap.set(ctaItems, { y: 40, opacity: 0 })

        const ctaTl = gsap.timeline({ paused: true })
        ctaTl.to(ctaItems, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.15,
        })

        ScrollTrigger.create({
          trigger: cta,
          start: 'top 80%',
          onEnter: () => ctaTl.play(),
          onLeaveBack: () => ctaTl.reverse(),
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative overflow-x-hidden">
      <div className="absolute top-[16.5vh] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <h1 className="text-[2.6vw] font-[450] text-black-100 leading-[1.15] tracking-[0.03em] uppercase mb-[0.4em]">
          {t('section_1_title_1')}
          <br />
          {t('section_1_title_2')}
        </h1>
        <p className="text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase">
          {t('section_1_label')}
        </p>
      </div>

      <div
        className="relative aspect-[16/9] overflow-hidden mx-[1.5vw]"
        style={{ marginTop: 'calc(100vh - 31.33vw)' }}
      >
        <iframe
          src="https://player.vimeo.com/video/1142351975?badge=0&autopause=0&player_id=0&app_id=58479&portrait=0&color=fff&title=0&byline=0&background=1&dnt=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            border: 0,
            width: '177.77vh',
            minWidth: '100%',
            height: '100vh',
            minHeight: '56.25vw',
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          title={t('section_1_label')}
        />
      </div>

      <section className="relative pt-[6%]">
        <p
          className="text-[0.92vw] text-black-100/60 leading-[1.8] max-w-[34vw] mx-auto text-center mb-[5%]"
          data-hero-text
        >
          {t('section_2_text')}
        </p>
        <div ref={statsRef} className="max-w-[60vw] mx-auto mb-[8%]">
          <div className="grid grid-cols-3 gap-y-[3vw] gap-x-[4vw]">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="text-center" data-stat-item>
                <p className="text-[2vw] font-[450] text-black-100 leading-none">
                  {t(`section_2_stat_${n}_value`)}
                </p>
                <p className="text-[0.78vw] text-black-100/40 tracking-[0.08em] uppercase mt-[0.6vw]">
                  {t(`section_2_stat_${n}_label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        ref={dualImagesRef}
        className="grid grid-cols-2 gap-[1.5vw] mx-[1.5vw] mb-[8%]"
      >
        <div className="overflow-hidden aspect-[4/3]" data-dual-image>
          <Image
            src="/assets/img-2.webp"
            alt="Production facility"
            width={960}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden aspect-[4/3]" data-dual-image>
          <Image
            src="/assets/img-3.webp"
            alt="Workshop detail"
            width={960}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <section ref={capsRef} className="max-w-[75vw] mx-auto mb-[8%]">
        <div className="grid grid-cols-2 gap-[6vw]">
          {[1, 2].map((n) => (
            <div key={n} data-cap-item>
              <h3 className="text-[1.1vw] font-[500] text-black-100 leading-[1.2] uppercase mb-[1.5%]">
                {t(`section_3_title_${n}`)}
              </h3>
              <p className="text-[0.92vw] text-black-100/60 leading-[1.8]">
                {t(`section_3_text_${n}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section ref={statementRef} className="relative py-[8%]">
        <div className="max-w-[65vw] mx-auto text-center" data-statement-text>
          <p className="text-[2.4vw] font-[450] text-black-100 leading-[1.3] uppercase tracking-[0.06em]">
            {t('section_4_title')}
          </p>
        </div>
      </section>

      <div ref={panoRef} className="overflow-hidden mx-[1.5vw] mb-[10%]">
        <Image
          src="/assets/img-5.webp"
          alt="Production panoramic"
          width={1920}
          height={800}
          className="w-full h-auto object-cover"
          sizes="94vw"
        />
      </div>

      <section
        ref={oemRef}
        className="relative bg-black-100 py-[8%] mx-[1.5vw] mb-[10%]"
      >
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.92vw] text-white-100/40 tracking-[0.15em] uppercase mb-[1.5%]"
            data-oem-label
          >
            {t('section_5_label')}
          </p>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[4vw] items-start">
            <div>
              <h2
                className="text-[3.7vw] font-[450] text-white-100 leading-[1.15] uppercase"
                data-oem-title
              >
                {t('section_5_title')}
              </h2>
              <p
                className="text-[0.92vw] text-white-100/60 leading-[1.8] mt-[3%] max-w-[32vw]"
                data-oem-text
              >
                {t('section_5_text')}
              </p>
              <div className="grid grid-cols-2 gap-x-[3vw] gap-y-[2vw] mt-[5%]">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} data-oem-feature>
                    <h4 className="text-[0.92vw] font-[500] text-white-100 leading-[1.3] uppercase mb-[0.5vw]">
                      {t(`section_5_feature_${n}_title`)}
                    </h4>
                    <p className="text-[0.82vw] text-white-100/50 leading-[1.7]">
                      {t(`section_5_feature_${n}_text`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden aspect-[3/4]" data-oem-image>
              <Image
                src="/assets/img-7.webp"
                alt={t('section_5_title')}
                width={720}
                height={960}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={interiorsRef} className="relative mb-[10%]">
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase mb-[1.5%]"
            data-int-label
          >
            {t('section_6_label')}
          </p>
          <h2
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase"
            data-int-title
          >
            {t('section_6_title')}
          </h2>
          <p
            className="text-[0.92vw] text-black-100/60 leading-[1.8] max-w-[40vw] mt-[2%]"
            data-int-text
          >
            {t('section_6_text')}
          </p>

          <div className="grid grid-cols-3 gap-[3vw] mt-[5%]">
            {[1, 2, 3].map((n) => (
              <div key={n} data-int-feature>
                <span className="text-[2.4vw] text-black-100/10 font-light leading-none">
                  {String(n).padStart(2, '0')}
                </span>
                <h4 className="text-[0.92vw] font-[500] text-black-100 leading-[1.3] uppercase mt-[0.8vw] mb-[0.5vw]">
                  {t(`section_6_feature_${n}_title`)}
                </h4>
                <p className="text-[0.82vw] text-black-100/50 leading-[1.7]">
                  {t(`section_6_feature_${n}_text`)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.4fr_1fr] gap-[1.5vw] mt-[5%]">
            <div className="overflow-hidden aspect-[16/10]" data-int-image>
              <Image
                src="/assets/img-18.webp"
                alt={t('section_6_title')}
                width={960}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden aspect-[16/10]" data-int-image>
              <Image
                src="/assets/img-19.webp"
                alt={t('section_6_title')}
                width={960}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-[6%] mb-[4%]">
        <div className="max-w-[55vw] mx-auto text-center">
          <p
            className="text-[1.2vw] font-[350] text-black-100/50 mb-[3%]"
            data-cta-item
          >
            {t('section_7_text')}
          </p>
          <div className="flex justify-center gap-[1.5vw]" data-cta-item>
            <Button>{t('section_7_cta_1')}</Button>
            <Button>{t('section_7_cta_2')}</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductionPage
