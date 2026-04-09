'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '@/components/Button'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const ProductionPage = () => {
  const t = useTranslations()

  const videoRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const section4Ref = useRef<HTMLElement>(null)
  const section5Ref = useRef<HTMLElement>(null)
  const section6Ref = useRef<HTMLElement>(null)
  const section7Ref = useRef<HTMLElement>(null)
  const section8Ref = useRef<HTMLElement>(null)

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
        gsap.set(video, { scale: 0.956, y: 30, autoAlpha: 0 })

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

        const s5Statement = document.querySelector('[data-s5-statement]')
        if (s5Statement) {
          const s5Titles = s5Statement.querySelectorAll('[data-s5-title]')

          gsap.set(s5Titles, { y: 40, opacity: 0 })

          const s5Tl = gsap.timeline({ paused: true })
          s5Tl.to(s5Titles, {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.1,
          })
          ScrollTrigger.create({
            trigger: s5Statement,
            start: 'top 80%',
            onEnter: () => s5Tl.play(),
            onLeaveBack: () => s5Tl.reverse(),
          })
        }

        const s6Wrap = document.querySelector('[data-s6-wrap]')
        if (s6Wrap) {
          const s6Label = s6Wrap.querySelector('[data-s6-label]')
          const s6Left = s6Wrap.querySelector('[data-s6-left]')
          const s6Right = s6Wrap.querySelector('[data-s6-right]')

          gsap.set(s6Wrap, { visibility: 'visible' })
          if (s6Label) gsap.set(s6Label, { y: 40, opacity: 0 })
          if (s6Left) {
            gsap.set(s6Left, { y: 40, visibility: 'hidden' })
          }
          if (s6Right) {
            gsap.set(s6Right, { y: 40, visibility: 'hidden' })
          }

          const s6Tl = gsap.timeline({
            paused: true,
            onComplete: () => {
              if (s6Left) gsap.set(s6Left, { clearProps: 'all' })
              if (s6Right) gsap.set(s6Right, { clearProps: 'all' })
            },
            onReverseComplete: () => {
              if (s6Left) {
                gsap.set(s6Left, { y: 40, visibility: 'hidden' })
              }
              if (s6Right) {
                gsap.set(s6Right, { y: 40, visibility: 'hidden' })
              }
            },
          })
          if (s6Label) {
            s6Tl.to(s6Label, {
              y: 0,
              opacity: 1,
              duration: 1.3,
              ease: 'power3.out',
            })
          }
          if (s6Left) {
            s6Tl.to(
              s6Left,
              {
                y: 0,
                visibility: 'visible',
                duration: 1.3,
                ease: 'power3.out',
              },
              0.1
            )
          }
          if (s6Right) {
            s6Tl.to(
              s6Right,
              {
                y: 0,
                visibility: 'visible',
                duration: 1.3,
                ease: 'power3.out',
              },
              0.2
            )
          }
          ScrollTrigger.create({
            trigger: s6Wrap,
            start: 'top 80%',
            onEnter: () => s6Tl.play(),
            onLeaveBack: () => s6Tl.reverse(),
          })
        }
      }

      const statement = section5Ref.current
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

      const oem = section7Ref.current
      if (oem) {
        const oemTitle = oem.querySelector('[data-oem-title]')
        const oemLabel = oem.querySelector('[data-oem-label]')
        const oemText = oem.querySelector('[data-oem-text]')
        const oemImage = oem.querySelector('[data-oem-image]')
        const oemFeatures = oem.querySelectorAll('[data-oem-feature]')
        const oemDelivery = oem.querySelector('[data-oem-delivery]')

        if (oemTitle) gsap.set(oemTitle, { y: 40, opacity: 0 })
        if (oemLabel) gsap.set(oemLabel, { y: 20, opacity: 0 })
        if (oemText) gsap.set(oemText, { y: 20, opacity: 0 })
        if (oemImage) gsap.set(oemImage, { y: 40, autoAlpha: 0 })
        gsap.set(oemFeatures, { y: 30, opacity: 0 })
        if (oemDelivery) gsap.set(oemDelivery, { y: 20, opacity: 0 })

        const oemTl = gsap.timeline({ paused: true })
        if (oemTitle) {
          oemTl.to(
            oemTitle,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        if (oemLabel) {
          oemTl.to(
            oemLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.1
          )
        }
        if (oemText) {
          oemTl.to(
            oemText,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.2
          )
        }
        if (oemImage) {
          oemTl.to(
            oemImage,
            { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' },
            0.15
          )
        }
        oemTl.to(
          oemFeatures,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
          },
          0.35
        )
        if (oemDelivery) {
          oemTl.to(
            oemDelivery,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.7
          )
        }
        ScrollTrigger.create({
          trigger: oem,
          start: 'top 80%',
          onEnter: () => oemTl.play(),
          onLeaveBack: () => oemTl.reverse(),
        })
      }

      const interiors = section8Ref.current
      if (interiors) {
        const intTitle = interiors.querySelector('[data-int-title]')
        const intLabel = interiors.querySelector('[data-int-label]')
        const intText = interiors.querySelector('[data-int-text]')
        const intFeatures = interiors.querySelectorAll('[data-int-feature]')
        const intImages = interiors.querySelector('[data-int-images]')

        if (intTitle) gsap.set(intTitle, { y: 40, opacity: 0 })
        if (intLabel) gsap.set(intLabel, { y: 20, opacity: 0 })
        if (intText) gsap.set(intText, { y: 20, opacity: 0 })
        gsap.set(intFeatures, { y: 30, opacity: 0 })
        if (intImages) gsap.set(intImages, { y: 40, autoAlpha: 0 })

        const intTl = gsap.timeline({ paused: true })
        if (intTitle) {
          intTl.to(
            intTitle,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        if (intLabel) {
          intTl.to(
            intLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.1
          )
        }
        if (intText) {
          intTl.to(
            intText,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.2
          )
        }
        intTl.to(
          intFeatures,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.15,
          },
          0.35
        )
        ScrollTrigger.create({
          trigger: interiors,
          start: 'top 80%',
          onEnter: () => intTl.play(),
          onLeaveBack: () => intTl.reverse(),
        })

        if (intImages) {
          const intImgsTl = gsap.timeline({ paused: true })
          intImgsTl.to(intImages, {
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: 'power3.out',
          })
          ScrollTrigger.create({
            trigger: intImages,
            start: 'top 85%',
            onEnter: () => intImgsTl.play(),
            onLeaveBack: () => intImgsTl.reverse(),
          })
        }

        const intCta = interiors.querySelector('[data-int-cta]')
        if (intCta) {
          const ctaChildren = intCta.children
          gsap.set(ctaChildren, { y: 20, opacity: 0 })

          const ctaTl = gsap.timeline({ paused: true })
          ctaTl.to(ctaChildren, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.12,
          })

          ScrollTrigger.create({
            trigger: intCta,
            start: 'top 85%',
            onEnter: () => ctaTl.play(),
            onLeaveBack: () => ctaTl.reverse(),
          })
        }
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
        <h1 className="text-[3vw] font-[500] text-black-100 leading-[1.12] uppercase mb-[0.4em]">
          {t('production.section_1_title_1')}
          <br />
          {t('production.section_1_title_2')}
        </h1>
        <p className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase">
          {t('production.section_1_label')}
        </p>
      </div>

      <div className="relative mt-[calc(100vh-30.87vw)] h-[52vw]">
        <div
          ref={videoRef}
          className="absolute inset-0 overflow-hidden origin-top invisible"
        >
          {/* <Image
            src="/assets/img-20.webp"
            alt="Production facility"
            width={1920}
            height={800}
            className="w-full h-auto object-cover"
            sizes="94vw"
          /> */}
          <iframe
            src="https://player.vimeo.com/video/1142351975?badge=0&autopause=0&player_id=0&app_id=58479&portrait=0&color=fff&title=0&byline=0&background=1&dnt=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0 w-[177.77vh] min-w-full h-screen min-h-[56.25vw]"
            allow="autoplay; fullscreen; picture-in-picture"
            title={t('production.section_1_label')}
          />
        </div>
      </div>

      <section ref={section2Ref} className="pt-[5%] mb-[12%]">
        <div className="max-w-[38vw] mx-auto text-center">
          <p className="text-[1.1vw] text-black-100/75 leading-[1.85]">
            {t('production.section_2_text')}
          </p>
        </div>
        <div className="flex justify-center gap-[1.8vw] mt-[8%]" data-s2-btns>
          <Button>{t('production.section_2_cta_1')}</Button>
          <Button>{t('production.section_2_cta_2')}</Button>
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

      <section ref={section3Ref} className="bg-beige-100 py-[7%] mb-[12%]">
        <div className="mx-auto text-center mb-[5%]">
          <h2
            className="text-[2.8vw] font-[500] text-black-100 leading-[1.25] uppercase mb-[1.8%]"
            data-s3-title
          >
            {t('production.section_3_title')}
          </h2>
          <p
            className="text-[1.1vw] text-black-100/70 leading-[1.85] max-w-[40vw] mx-auto"
            data-s3-text
          >
            {t('production.section_3_text')}
          </p>
        </div>

        <div
          className="grid grid-cols-4 gap-[1.2vw] max-w-[72vw] mx-auto"
          data-s3-grid
        >
          {[
            { value: '130+', key: 1 },
            { value: '7000m²', key: 2 },
            { value: '40+', key: 3 },
            { value: '900+', key: 4 },
          ].map(({ value, key }) => (
            <div
              key={key}
              className="bg-beige-200 aspect-square flex flex-col justify-end py-[10%] px-[1.8vw]"
              data-s3-item
            >
              <p className="text-[3.4vw] font-[500] text-black-100 leading-[1.2] tracking-[-0.02em]">
                {value}
              </p>
              <p className="text-[0.88vw] font-[500] text-black-100/50 tracking-[0.1em] uppercase mt-[0.5vw]">
                {t(`production.section_3_stat_${key}_label`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section ref={section4Ref} className="mb-[12%]">
        <div className="max-w-[72vw] mx-auto">
          <h2
            className="text-[2.8vw] font-[500] text-black-100 leading-[1.25] uppercase text-center mb-[6%]"
            data-s4-title
          >
            {t('production.section_4_title')}
          </h2>
          <div className="grid grid-cols-[1fr_1.2fr] gap-[6vw] items-start">
            <div className="overflow-hidden" data-s4-image>
              <Image
                src="/assets/img-21.webp"
                alt={t('production.section_4_title')}
                width={720}
                height={960}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="pt-[2%]">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="border-t border-black-100/10 py-[2.2vw]"
                  data-s4-feature
                >
                  <h3 className="text-[1.2vw] font-[500] text-black-100 leading-[1.2] uppercase">
                    {t(`production.section_4_feature_${n}_title`)}
                  </h3>
                  <p className="text-[1.05vw] text-black-100/70 leading-[1.85] max-w-[28vw] pt-[2%]">
                    {t(`production.section_4_feature_${n}_text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={section5Ref} className="mb-[12%]">
        <div className="max-w-[72vw] mx-auto" data-s5-statement>
          <h2
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase whitespace-nowrap ml-[-0.2vw]"
            data-s5-title
          >
            {t('production.section_5_title_1')}
          </h2>
          <h2
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase whitespace-nowrap ml-[-0.2vw]"
            data-s5-title
          >
            {t('production.section_5_title_2')}
          </h2>
        </div>
      </section>

      <section ref={section6Ref} className="mb-[12%]">
        <div className="max-w-[72vw] mx-auto invisible" data-s6-wrap>
          <p
            className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase mb-[2.5%]"
            data-s6-label
          >
            {t('production.section_6_label')}
          </p>
          <div className="grid grid-cols-2 gap-[2vw]">
            <a
              href="#oem-services"
              className="group border-t border-black-100/15 pt-[2vw] pb-[3vw]"
              data-s6-left
            >
              <span className="text-[0.82vw] font-[500] text-brown-100/50 uppercase">
                01
              </span>
              <h3 className="text-[2.4vw] font-[500] text-black-100 leading-[1.2] tracking-[0.03em] uppercase mt-[0.8vw] transition-opacity duration-300 group-hover:opacity-50">
                {t('production.section_6_option_1')}
              </h3>
            </a>
            <a
              href="#project-interiors"
              className="group border-t border-black-100/15 pt-[2vw] pb-[3vw]"
              data-s6-right
            >
              <span className="text-[0.82vw] font-[500] text-brown-100/50 tracking-[0.15em] uppercase">
                02
              </span>
              <h3 className="text-[2.4vw] font-[500] text-black-100 leading-[1.2] tracking-[0.03em] uppercase mt-[0.8vw] transition-opacity duration-300 group-hover:opacity-50">
                {t('production.section_6_option_2')}
              </h3>
            </a>
          </div>
        </div>
      </section>

      <section
        ref={section7Ref}
        id="oem-services"
        className="bg-black-100 py-[10%] mx-[2.2vw] mb-[12%]"
      >
        <div className="max-w-[72vw] mx-auto">
          <h2
            className="text-[4vw] font-[500] text-white-100 leading-[1.1] uppercase ml-[-0.2vw] mb-[1.8%]"
            data-oem-title
          >
            {t('production.section_7_title')}
          </h2>
          <p
            className="text-[0.95vw] font-[500] text-white-100 tracking-[0.18em] uppercase mb-[2.5%]"
            data-oem-label
          >
            {t('production.section_7_label')}
          </p>
          <p
            className="text-[1.05vw] text-white-100/70 leading-[1.85]"
            data-oem-text
          >
            {t('production.section_7_text')}
          </p>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[6vw] mt-[7%]">
            <div className="flex flex-col justify-between">
              <div>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="border-t border-white-100/15 py-[2.2vw]"
                    data-oem-feature
                  >
                    <div className="grid grid-cols-[1fr_2fr] gap-[2vw] items-start">
                      <h4 className="text-[1vw] font-[500] text-white-100 leading-[1.3] uppercase">
                        {t(`production.section_7_feature_${n}_title`)}
                      </h4>
                      <p className="text-[0.95vw] text-white-100/60 leading-[1.75]">
                        {t(`production.section_7_feature_${n}_text`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div data-oem-delivery>
                <p className="text-[1.3vw] font-[400] text-white-100/50">
                  {t('production.section_7_delivery')}
                </p>
                <div className="flex gap-[1.8vw] mt-[6%] mb-[2%]">
                  <Link href="/references">
                    <Button variant="light">
                      {t('production.section_8_cta_1')}
                    </Button>
                  </Link>
                  <Button variant="light">
                    {t('production.section_8_cta_2')}
                  </Button>
                </div>
              </div>
            </div>
            <div className="overflow-hidden" data-oem-image>
              <Image
                src="/assets/img-22.webp"
                alt={t('production.section_7_title')}
                width={720}
                height={960}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={section8Ref} id="project-interiors" className="mb-[12%]">
        <div className="max-w-[72vw] mx-auto">
          <h2
            className="text-[4vw] font-[500] text-black-100 leading-[1.1] uppercase ml-[-0.2vw] mb-[1.8%]"
            data-int-title
          >
            {t('production.section_8_title')}
          </h2>
          <p
            className="text-[0.95vw] font-[500] text-black-100 tracking-[0.18em] uppercase mb-[2.5%]"
            data-int-label
          >
            {t('production.section_8_label')}
          </p>
          <p
            className="text-[1.05vw] text-black-100/75 leading-[1.85]"
            data-int-text
          >
            {t('production.section_8_text')}
          </p>
          <div className="grid grid-cols-3 gap-[3.5vw] mt-[7%]">
            {[1, 2, 3].map((n) => (
              <div key={n} data-int-feature>
                <p className="text-[2.6vw] text-brown-100/20 font-[300] leading-none mb-[6%]">
                  {String(n).padStart(2, '0')}
                </p>
                <h4 className="text-[1.05vw] font-[500] text-black-100 leading-[1.3] uppercase mb-[4%]">
                  {t(`production.section_8_feature_${n}_title`)}
                </h4>
                <p className="text-[0.95vw] text-black-100/70 leading-[1.75] max-w-[20vw]">
                  {t(`production.section_8_feature_${n}_text`)}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-[2vw] mt-[7%]" data-int-images>
            <div className="overflow-hidden aspect-[3/4]">
              <Image
                src="/assets/img-23.webp"
                alt={t('production.section_8_title')}
                width={720}
                height={960}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden aspect-[3/4]">
              <Image
                src="/assets/img-24.webp"
                alt={t('production.section_8_title')}
                width={720}
                height={960}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-[7%]" data-int-cta>
            <p className="text-[1.3vw] font-[500] text-black-100">
              {t('production.section_8_industries_title')}
            </p>
            <p className="text-[1.05vw] text-black-100/70 leading-[2] mt-[1.8%]">
              {t('production.section_8_industries_list')}
            </p>
            <div className="flex gap-[1.8vw] mt-[4%]">
              <Link href="/references">
                <Button>{t('production.section_8_cta_1')}</Button>
              </Link>
              <Button>{t('production.section_8_cta_2')}</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductionPage
