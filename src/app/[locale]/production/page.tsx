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

  const videoRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const section4Ref = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLElement>(null)
  const panoRef = useRef<HTMLDivElement>(null)
  const oemRef = useRef<HTMLElement>(null)
  const interiorsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTagline = document.querySelector('[data-hero-tagline]')
      const video = videoRef.current

      if (heroTagline) {
        gsap.fromTo(
          heroTagline,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
        )
      }

      if (video) {
        gsap.set(video, { scale: 0.97, y: 30, autoAlpha: 0 })

        gsap.to(video, {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        })

        const videoTl = gsap.timeline({
          scrollTrigger: {
            start: 0,
            end: () => window.innerHeight * 0.5,
            scrub: 0.5,
          },
        })

        videoTl.to(video, { scale: 1, duration: 1, ease: 'none' }, 0)
      }

      const section2 = section2Ref.current
      if (section2) {
        const s2Title = section2.querySelector('[data-s2-title]')
        const s2Btns = section2.querySelector('[data-s2-btns]')
        const s2Image = section2.querySelector('[data-s2-image]')

        if (s2Title) gsap.set(s2Title, { y: 40, opacity: 0 })
        if (s2Btns) gsap.set(s2Btns, { y: 40, opacity: 0 })
        if (s2Image) gsap.set(s2Image, { y: 40, autoAlpha: 0 })

        const s2Tl = gsap.timeline({ paused: true })

        if (s2Title) {
          s2Tl.to(
            s2Title,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        if (s2Btns) {
          s2Tl.to(
            s2Btns,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.3
          )
        }

        ScrollTrigger.create({
          trigger: section2,
          start: 'top 80%',
          onEnter: () => s2Tl.play(),
          onLeaveBack: () => s2Tl.reverse(),
        })

        if (s2Image) {
          const s2ImgEl = s2Image.querySelector('img')
          const s2ImgTl = gsap.timeline({ paused: true })

          s2ImgTl.to(s2Image, {
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: 'power3.out',
          })

          if (s2ImgEl) {
            s2ImgTl.fromTo(
              s2ImgEl,
              { scale: 1.08 },
              { scale: 1, duration: 1.3, ease: 'power3.out' },
              0
            )
          }

          ScrollTrigger.create({
            trigger: s2Image,
            start: 'top 85%',
            onEnter: () => s2ImgTl.play(),
            onLeaveBack: () => s2ImgTl.reverse(),
          })
        }
      }

      const section3 = section3Ref.current
      if (section3) {
        const s3Title = section3.querySelector('[data-s3-title]')
        const s3Text = section3.querySelector('[data-s3-text]')
        const s3Items = section3.querySelectorAll('[data-s3-item]')
        const s3Grid = section3.querySelector('[data-s3-grid]')

        if (s3Title) gsap.set(s3Title, { y: 40, opacity: 0 })
        if (s3Text) gsap.set(s3Text, { y: 20, opacity: 0 })
        gsap.set(s3Items, { y: 50, opacity: 0 })

        const s3TextTl = gsap.timeline({ paused: true })
        if (s3Title) {
          s3TextTl.to(
            s3Title,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        if (s3Text) {
          s3TextTl.to(
            s3Text,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.2
          )
        }

        ScrollTrigger.create({
          trigger: section3,
          start: 'top 80%',
          onEnter: () => s3TextTl.play(),
          onLeaveBack: () => s3TextTl.reverse(),
        })

        const s3CardsTl = gsap.timeline({ paused: true })
        s3CardsTl.to(s3Items, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.15,
        })

        ScrollTrigger.create({
          trigger: s3Grid,
          start: 'top 75%',
          onEnter: () => s3CardsTl.play(),
          onLeaveBack: () => s3CardsTl.reverse(),
        })
      }

      const section4 = section4Ref.current
      if (section4) {
        const s4Title = section4.querySelector('[data-s4-title]')
        const s4Image = section4.querySelector('[data-s4-image]')
        const s4ImgEl = s4Image?.querySelector('img')
        const s4Features = section4.querySelectorAll('[data-s4-feature]')

        if (s4Title) gsap.set(s4Title, { y: 40, opacity: 0 })
        if (s4Image) gsap.set(s4Image, { y: 40, autoAlpha: 0 })
        gsap.set(s4Features, { y: 30, opacity: 0 })

        const s4TitleTl = gsap.timeline({ paused: true })
        if (s4Title) {
          s4TitleTl.to(
            s4Title,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }

        ScrollTrigger.create({
          trigger: section4,
          start: 'top 80%',
          onEnter: () => s4TitleTl.play(),
          onLeaveBack: () => s4TitleTl.reverse(),
        })

        const s4ContentTl = gsap.timeline({ paused: true })
        if (s4Image) {
          s4ContentTl.to(
            s4Image,
            { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        if (s4ImgEl) {
          s4ContentTl.fromTo(
            s4ImgEl,
            { scale: 1.08 },
            { scale: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        s4ContentTl.to(
          s4Features,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
          },
          0.15
        )

        ScrollTrigger.create({
          trigger: s4Image,
          start: 'top 80%',
          onEnter: () => s4ContentTl.play(),
          onLeaveBack: () => s4ContentTl.reverse(),
        })

        const s4Statement = document.querySelector('[data-s4-statement]')
        if (s4Statement) {
          const s4StTitles = s4Statement.querySelectorAll('[data-s4-st-title]')

          gsap.set(s4StTitles, { y: 40, opacity: 0 })

          const s4StTl = gsap.timeline({ paused: true })
          s4StTl.to(s4StTitles, {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.1,
          })
          ScrollTrigger.create({
            trigger: s4Statement,
            start: 'top 80%',
            onEnter: () => s4StTl.play(),
            onLeaveBack: () => s4StTl.reverse(),
          })
        }
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
      <div
        className="absolute top-[16.5vh] left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-0 z-10"
        data-hero-tagline
      >
        <h1 className="text-[2.6vw] font-[450] text-black-100 leading-[1.15] tracking-[0.03em] uppercase mb-[0.4em]">
          {t('section_1_title_1')}
          <br />
          {t('section_1_title_2')}
        </h1>
        <p className="text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase">
          {t('section_1_label')}
        </p>
      </div>

      <div className="relative mt-[calc(100vh-31.33vw)] h-[52vw]">
        <div
          ref={videoRef}
          className="absolute inset-0 overflow-hidden origin-top invisible"
        >
          <Image
            src="/assets/img-20.webp"
            alt="Production facility"
            width={1920}
            height={800}
            className="w-full h-auto object-cover"
            sizes="94vw"
          />
          {/* <iframe
            src="https://player.vimeo.com/video/1142351975?badge=0&autopause=0&player_id=0&app_id=58479&portrait=0&color=fff&title=0&byline=0&background=1&dnt=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0 w-[177.77vh] min-w-full h-screen min-h-[56.25vw]"
            allow="autoplay; fullscreen; picture-in-picture"
            title={t('section_1_label')}
          /> */}
        </div>
      </div>

      <section ref={section2Ref} className="relative pt-[4%] mb-[10%]">
        <div className="max-w-[35vw] mx-auto text-center">
          <p className="text-[0.92vw] text-black-100/60 leading-[1.8]">
            {t('section_2_text')}
          </p>
        </div>
        {/* <div className="max-w-[45vw] mx-auto text-center">
          <h2
            className="text-[1.1vw] font-[400] text-black-100/60 leading-[1.7] tracking-[0.02em]"
            data-s2-title
          >
            {t('section_2_text')}
          </h2>
        </div> */}
        <div className="flex justify-center gap-[1.5vw] mt-[8%]" data-s2-btns>
          <Button>{t('section_2_cta_1')}</Button>
          <Button>{t('section_2_cta_2')}</Button>
        </div>

        <div
          className="overflow-hidden w-[35vw] mt-[10%] mx-auto"
          data-s2-image
        >
          <Image
            src="/assets/img-20.webp"
            alt="Production facility"
            width={800}
            height={1200}
            className="w-full h-auto object-cover"
            sizes="35vw"
          />
        </div>
      </section>

      <section ref={section3Ref} className="relative mb-[10%]">
        <div className="mx-auto text-center mb-[5%]">
          <h2
            className="text-[2.4vw] font-[450] text-black-100 leading-[1.3] uppercase tracking-[0.03em] mb-[1.5%]"
            data-s3-title
          >
            {t('section_3_title')}
          </h2>
          <p
            className="text-[0.92vw] text-black-100/50 leading-[1.8] max-w-[34vw] mx-auto"
            data-s3-text
          >
            {t('section_3_text')}
          </p>
        </div>

        <div
          className="grid grid-cols-4 gap-[1vw] max-w-[75vw] mx-auto"
          data-s3-grid
        >
          {[
            { value: '130+', key: 1 },
            { value: '500+', key: 2 },
            { value: '14', key: 3 },
            { value: '60+', key: 4 },
          ].map(({ value, key }) => (
            <div
              key={key}
              className="bg-beige-100 aspect-square flex flex-col justify-end py-[10%] px-[1.8vw]"
              data-s3-item
            >
              <p className="text-[3.2vw] font-[400] text-black-100 leading-[1.2] tracking-[-0.02em]">
                {value}
              </p>
              <p className="text-[0.8vw] text-black-100/40 tracking-[0.1em] uppercase mt-[0.3vw]">
                {t(`section_3_stat_${key}_label`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section ref={section4Ref} className="relative mb-[10%]">
        <div className="max-w-[75vw] mx-auto">
          <h2
            className="text-[2.4vw] font-[450] text-black-100 leading-[1.3] uppercase tracking-[0.03em] text-center mb-[6%]"
            data-s4-title
          >
            {t('section_4_heading')}
          </h2>
          <div className="grid grid-cols-[1fr_1.2fr] gap-[6vw] items-start">
            <div className="overflow-hidden" data-s4-image>
              <Image
                src="/assets/img-21.webp"
                alt={t('section_4_heading')}
                width={720}
                height={960}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="pt-[2%]">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="border-t border-black-100/10 py-[2vw]"
                  data-s4-feature
                >
                  <h3 className="text-[1.1vw] font-[500] text-black-100 leading-[1.2] uppercase mb-[0.6vw]">
                    {t(`section_4_feature_${n}_title`)}
                  </h3>
                  <p className="text-[0.92vw] text-black-100/60 leading-[1.8] max-w-[28vw]">
                    {t(`section_4_feature_${n}_text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mb-[10%]">
        <div className="max-w-[75vw] mx-auto" data-s4-statement>
          <h2
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase whitespace-nowrap ml-[-0.2vw]"
            data-s4-st-title
          >
            {t('section_4_statement_1')}
          </h2>
          <h2
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase whitespace-nowrap ml-[-0.2vw]"
            data-s4-st-title
          >
            {t('section_4_statement_2')}
          </h2>
        </div>
      </section>

      {/* <section ref={statementRef} className="relative py-[8%]">
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
      </section> */}
    </main>
  )
}

export default ProductionPage
