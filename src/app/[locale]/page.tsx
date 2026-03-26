'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '@/components/Button'
import IntroAnimation from '@/components/IntroAnimation'

import { COLLAGE_IMAGES } from '@/constants/intro-animation'

import { useTranslations } from 'next-intl'

import useIntroAnimation from '@/hooks/useIntroAnimation'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const COLLAGE_REST = COLLAGE_IMAGES.slice(0, -1)
const IMG9 = COLLAGE_IMAGES[COLLAGE_IMAGES.length - 1]

const Home = () => {
  const t = useTranslations('home')
  const { showIntro, completeIntro } = useIntroAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const img9Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const section4Ref = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLElement>(null)
  const closingRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (showIntro) {
      window.scrollTo(0, 0)
      return
    }

    const section = sectionRef.current
    const section2 = section2Ref.current
    const img9 = img9Ref.current
    if (!section || !section2 || !img9) return

    const ctx = gsap.context(() => {
      const img9Rect = img9.getBoundingClientRect()
      const img9Pos = section.querySelector('[data-img9-position]')
      const colRect = img9Pos ? img9Pos.getBoundingClientRect() : img9Rect

      const fromScale = colRect.width / img9Rect.width
      const fromX = colRect.left - img9Rect.left
      const fromY = colRect.top - img9Rect.top

      gsap.set(img9, {
        transformOrigin: '0% 0%',
        x: fromX,
        y: fromY,
        scale: fromScale,
      })

      const imgEl = img9.querySelector('img')

      const img9Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=50%',
          scrub: 0.5,
        },
      })

      img9Tl.to(
        img9,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'none',
        },
        0
      )

      if (imgEl) {
        img9Tl.fromTo(
          imgEl,
          { scale: 1 },
          { scale: 1.15, duration: 1, ease: 'none' },
          0
        )
      }

      const collageItems = section.querySelectorAll('[data-collage-item]')
      const collageBg = section.querySelector('[data-collage-bg]')

      const scatterDirs = [
        { x: -250, y: -200, rotation: -10, scale: 1.5 },
        { x: -200, y: 200, rotation: -8, scale: 1.4 },
        { x: 250, y: -150, rotation: 10, scale: 1.5 },
        { x: 200, y: 200, rotation: 8, scale: 1.4 },
      ]

      const scatterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=50%',
          scrub: 0.5,
        },
      })

      collageItems.forEach((item, i) => {
        const dir = scatterDirs[i % scatterDirs.length]
        scatterTl.to(item, { ...dir, opacity: 0, duration: 1 }, 0)
      })

      if (collageBg) {
        scatterTl.to(
          collageBg,
          {
            y: -250,
            rotation: 5,
            scale: 1.4,
            opacity: 0,
            duration: 1,
          },
          0
        )
      }

      const heroTagline = document.querySelector('[data-hero-tagline]')
      if (heroTagline) {
        scatterTl.to(
          heroTagline,
          { y: -60, opacity: 0, duration: 0.6, ease: 'power2.inOut' },
          0
        )
      }

      const s2Label = section2.querySelector('[data-section-label]')
      const s2Titles = section2.querySelectorAll('[data-s2-title]')
      const s2Texts = section2.querySelectorAll('[data-s2-text]')
      const textBlock = section2.querySelector('[data-text-reveal]')

      if (textBlock && s2Titles.length) {
        if (s2Label) gsap.set(s2Label, { y: 20, opacity: 0 })
        gsap.set(s2Titles, { y: 40, opacity: 0 })
        gsap.set(s2Texts, { y: 20, opacity: 0 })

        const s2Tl = gsap.timeline({ paused: true })

        if (s2Label) {
          s2Tl.to(
            s2Label,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
        }

        s2Tl.to(
          s2Titles,
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
          },
          0
        )

        s2Tl.to(
          s2Texts,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.15,
          },
          0.3
        )

        ScrollTrigger.create({
          trigger: textBlock,
          start: 'top bottom',
          onEnter: () => s2Tl.play(),
          onLeaveBack: () => s2Tl.reverse(),
        })
      }

      const btnBlock =
        section2.querySelector('[data-btn-reveal]')?.parentElement
      if (btnBlock) {
        gsap.set(btnBlock, { y: 60, opacity: 0 })
        ScrollTrigger.create({
          trigger: btnBlock,
          start: 'top 120%',
          onEnter: () => {
            gsap.to(btnBlock, { opacity: 1, duration: 0.3, ease: 'none' })
            gsap.to(btnBlock, {
              y: 0,
              duration: 1,
              ease: 'power3.out',
            })
          },
          onLeaveBack: () => {
            gsap.to(btnBlock, { opacity: 0, duration: 0.3, ease: 'none' })
            gsap.to(btnBlock, {
              y: 60,
              duration: 1,
              ease: 'power3.out',
            })
          },
        })
      }

      const section3 = section3Ref.current
      if (section3) {
        const pillarLabel = section3.querySelector('[data-section-label]')
        const numbers = section3.querySelectorAll('[data-pillar-num]')
        const titles = section3.querySelectorAll('[data-pillar-title]')
        const texts = section3.querySelectorAll('[data-pillar-text]')

        if (pillarLabel) gsap.set(pillarLabel, { y: 20, opacity: 0 })
        gsap.set(numbers, { y: 60, opacity: 0 })
        gsap.set(titles, { y: 30, opacity: 0 })
        gsap.set(texts, { y: 20, opacity: 0 })

        const tl = gsap.timeline({ paused: true })

        if (pillarLabel) {
          tl.to(
            pillarLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
        }

        tl.to(
          numbers,
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            stagger: 0.15,
          },
          0.3
        )

        tl.to(
          titles,
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.15,
          },
          0.5
        )

        tl.to(
          texts,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.15,
          },
          0.7
        )

        ScrollTrigger.create({
          trigger: section3,
          start: 'top bottom',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      }

      const section4 = section4Ref.current
      if (section4) {
        const projectItems = section4.querySelectorAll('[data-project-item]')
        const projectLink = section4.querySelector('[data-project-link]')
        const projectLabel = section4.querySelector('[data-section-label]')

        const vw = window.innerWidth
        const s4Tl = gsap.timeline({ paused: true })

        if (projectLabel) {
          gsap.set(projectLabel, { y: 20, opacity: 0 })
          s4Tl.to(
            projectLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
        }

        projectItems.forEach((item, i) => {
          gsap.set(item, { x: vw, opacity: 0 })
          s4Tl.to(
            item,
            { x: 0, opacity: 1, duration: 2, ease: 'power2.inOut' },
            i * 0.08
          )
        })

        if (projectLink) {
          gsap.set(projectLink, { y: 20, opacity: 0 })
          ScrollTrigger.create({
            trigger: projectLink,
            start: 'top 90%',
            onEnter: () =>
              gsap.to(projectLink, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
              }),
            onLeaveBack: () =>
              gsap.to(projectLink, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
              }),
          })
        }

        ScrollTrigger.create({
          trigger: section4,
          start: 'top-=100 bottom',
          onEnter: () => s4Tl.play(),
          onLeaveBack: () => s4Tl.reverse(),
        })
      }

      const tagline = taglineRef.current
      if (tagline) {
        const taglineReveal = tagline.querySelector('[data-tagline-reveal]')
        if (taglineReveal) {
          gsap.set(taglineReveal, { y: 40, opacity: 0 })
          const taglineTl = gsap.timeline({ paused: true })
          taglineTl.to(
            taglineReveal,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
          ScrollTrigger.create({
            trigger: tagline,
            start: 'top 80%',
            onEnter: () => taglineTl.play(),
            onLeaveBack: () => taglineTl.reverse(),
          })
        }
      }

      const closing = closingRef.current
      if (closing) {
        const closingReveal = closing.querySelector('[data-closing-reveal]')
        if (closingReveal) {
          gsap.set(closingReveal, { y: 40, opacity: 0 })
          const closingTl = gsap.timeline({ paused: true })
          closingTl.to(
            closingReveal,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
          ScrollTrigger.create({
            trigger: closing,
            start: 'top 80%',
            onEnter: () => closingTl.play(),
            onLeaveBack: () => closingTl.reverse(),
          })
        }
      }
    })

    return () => ctx.revert()
  }, [showIntro])

  return (
    <main className="relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
        <div className="absolute top-[12%] right-[6vw]" data-hero-tagline>
          <p className="text-[1vw] font-[350] text-black-100 leading-[1.5] tracking-[0.02em]">
            {t('hero_tagline_1')}
            <br />
            {t('hero_tagline_2')}
          </p>
          <p className="text-[0.8vw] font-[350] text-black-100/40 tracking-[0.02em] mt-[0.6vw]">
            {t('hero_tagline_3')}
          </p>
        </div>
      </div>

      <section
        ref={sectionRef}
        className={`relative h-screen w-full ${showIntro ? 'invisible' : 'visible'}`}
      >
        <div
          data-collage-bg
          className="absolute top-[15%] left-[33vw] w-[34vw] aspect-square overflow-hidden"
        >
          <Image
            src="/assets/img-1.webp"
            alt="Atrium"
            width={1920}
            height={1194}
            className="w-full h-full object-cover"
            loading="eager"
            priority
          />
        </div>

        {COLLAGE_REST.map((img, i) => (
          <div
            key={i}
            className={`absolute aspect-square overflow-hidden ${img.className}`}
            data-collage-item
          >
            <Image
              src={img.src}
              alt="Atrium"
              width={img.w}
              height={img.h}
              className="w-full h-full object-cover"
              loading="eager"
              priority
            />
          </div>
        ))}

        <div
          data-img9-position
          className={`absolute invisible ${IMG9.className}`}
          style={{ aspectRatio: `${IMG9.w}/${IMG9.h}` }}
        />
      </section>

      <section ref={section2Ref} className="relative pt-[6%]">
        <div
          ref={img9Ref}
          data-img9
          className="relative flex items-center overflow-hidden z-20"
        >
          <Image
            src={IMG9.src}
            alt="Atrium"
            width={IMG9.w}
            height={IMG9.h}
            className="w-full flex-shrink-0"
            sizes="100vw"
            loading="eager"
            priority
          />
        </div>

        <div className="max-w-[75vw] mx-auto mt-[4%]" data-text-reveal>
          <p
            className="text-[0.92vw] uppercase tracking-[0.15em] text-black-100/40 mb-[1.5%]"
            data-section-label
          >
            {t('section_2_label')}
          </p>
          <div className="grid grid-cols-[1.4fr_1fr] gap-[3vw] items-start">
            <div>
              <h2
                data-s2-title
                className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase whitespace-nowrap ml-[-0.3vw]"
              >
                {t('section_2_title_1')}
              </h2>
              <h2
                data-s2-title
                className="text-[3.7vw] font-[450] text-black-100 leading-[1.15] uppercase whitespace-nowrap ml-[-0.3vw]"
              >
                {t('section_2_title_2')}
              </h2>
            </div>

            <p
              className="text-[0.92vw] leading-[1.8] text-black-100"
              data-s2-text
            >
              {t('section_2_text_1')}
            </p>
          </div>

          <div className="text-[0.92vw] leading-[1.8] text-black-100 mt-[2%]">
            <p data-s2-text>{t('section_2_text_2')}</p>
            <p data-s2-text className="mt-[2%]">
              {t('section_2_text_3')}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-[1.5vw] pb-[8%] mt-[8%]">
          <Button data-btn-reveal>{t('section_2_cta_meeting')}</Button>
          <Button data-btn-reveal>{t('section_2_cta_inquiry')}</Button>
          <Button data-btn-reveal>{t('section_2_cta_oem')}</Button>
        </div>
      </section>

      <section ref={taglineRef} className="relative pb-[6%]">
        <div className="max-w-[55vw] mx-auto text-center" data-tagline-reveal>
          <p className="text-[2.4vw] font-[450] text-black-100 uppercase leading-[1.3]">
            {t('section_4_tagline_1')}
          </p>
          <p className="text-[1.2vw] font-[350] text-black-100/50 mt-[1.2vw]">
            {t('section_4_tagline_2')}
          </p>
        </div>
      </section>

      <section ref={section4Ref} className="relative pb-[8%]">
        <p
          className="text-[0.92vw] uppercase tracking-[0.15em] text-black-100/40 text-center mb-[4%]"
          data-section-label
        >
          {t('section_projects_label')}
        </p>
        <div className="flex items-center justify-center gap-[1.5vw]">
          {[
            '/assets/img-10.webp',
            '/assets/img-11.webp',
            '/assets/img-12.webp',
            '/assets/img-13.webp',
            '/assets/img-14.webp',
            '/assets/img-15.webp',
            '/assets/img-16.webp',
            '/assets/img-17.webp',
          ].map((src, i) => {
            const isLarge = i % 2 === 0
            const w = isLarge ? 340 : 248
            const h = isLarge ? 458 : 334
            const num = String(i + 1).padStart(2, '0')
            return (
              <div
                key={i}
                className="shrink-0"
                style={{ width: w }}
                data-project-item
              >
                <p className="text-[0.8vw] text-black-100/40 mb-[1%]">{num}</p>
                <div
                  className="overflow-hidden"
                  style={{ width: w, height: h }}
                >
                  <Image
                    src={src}
                    alt="Atrium project"
                    width={w}
                    height={h}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[0.92vw] text-black-100 mt-[2%]">
                  {t(`section_4_project_${i + 1}`)}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-[4%]" data-project-link>
          <Link
            href="/references"
            className="text-black-100 text-[0.92vw] underline hover:opacity-80 transition-opacity"
          >
            {t('section_4_cta')}
          </Link>
        </div>
      </section>

      <section ref={section3Ref} className="relative pb-[8%]">
        <p
          className="text-[0.92vw] uppercase tracking-[0.15em] text-black-100/40 text-center mb-[4%]"
          data-section-label
        >
          {t('section_pillars_label')}
        </p>
        <div data-pillars-track>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} data-pillar>
              <div className="grid grid-cols-[6vw_1fr] gap-[2vw] items-start py-[2%] pl-[23.25vw] pr-[12vw]">
                <span
                  className="text-[3.2vw] font-light leading-none text-black-100/[0.1]"
                  data-pillar-num
                >
                  {String(n).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <h3
                    className="text-[1.1vw] font-[500] text-black-100 leading-[1.2] uppercase pt-[0.5%]"
                    data-pillar-title
                  >
                    {t(`section_3_pillar_${n}_title`)}
                  </h3>
                  <p
                    className="text-[0.92vw] leading-[1.8] text-black-100/60 max-w-[32vw] pt-[1.5%]"
                    data-pillar-text
                  >
                    {t(`section_3_pillar_${n}_text`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={closingRef} className="relative py-[10%]">
        <div className="text-center" data-closing-reveal>
          <h2 className="text-[2.8vw] font-[450] text-black-100 uppercase leading-[1.2]">
            {t('closing_cta_title')}
          </h2>
          <p className="text-[1.1vw] text-black-100/60 font-[350] leading-[1.8] max-w-[35vw] mx-auto mt-[1.5vw]">
            {t('closing_cta_text')}
          </p>
          <div className="flex justify-center gap-[1.5vw] mt-[3vw]">
            <Button>{t('section_2_cta_meeting')}</Button>
            <Button>{t('section_2_cta_inquiry')}</Button>
          </div>
        </div>
      </section>

      {showIntro && <IntroAnimation onComplete={completeIntro} />}
    </main>
  )
}

export default Home
