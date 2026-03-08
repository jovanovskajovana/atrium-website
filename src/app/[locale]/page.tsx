'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  useIsomorphicLayoutEffect(() => {
    if (showIntro) return

    const section = sectionRef.current
    const section2 = section2Ref.current
    const img9 = img9Ref.current
    if (!section || !section2 || !img9) return

    const img5El = section.querySelectorAll('[data-collage-item]')[3]

    const ctx = gsap.context(() => {
      const sectionRect = section.getBoundingClientRect()
      const img9Rect = img9.getBoundingClientRect()
      const scrollY = window.scrollY

      const collageW = window.innerWidth * 0.26
      const collageH = collageW * (IMG9.h / IMG9.w)
      const collageLeft =
        sectionRect.width - sectionRect.width * 0.05 - collageW
      const collageTop =
        sectionRect.height - sectionRect.height * 0.07 - collageH

      const collagePosX = sectionRect.left + collageLeft
      const collagePosY = sectionRect.top + scrollY + collageTop
      const img9PosX = img9Rect.left
      const img9PosY = img9Rect.top + scrollY

      const fromScale = collageW / img9Rect.width
      const fromX = collagePosX - img9PosX
      const fromY = collagePosY - img9PosY

      const naturalHeight = img9Rect.height
      const targetHeight = naturalHeight * 0.85

      gsap.set(img9, {
        transformOrigin: '0% 0%',
        x: fromX,
        y: fromY,
        scale: fromScale,
        height: naturalHeight,
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
          height: targetHeight,
          duration: 1,
          ease: 'none',
        },
        0
      )

      if (imgEl) {
        img9Tl.fromTo(
          imgEl,
          { scale: 1 },
          { scale: 1.2, duration: 1, ease: 'none' },
          0
        )
      }

      const collageItems = section.querySelectorAll('[data-collage-item]')
      const collageBg = section.querySelector('[data-collage-bg]')

      const scatterDirs = [
        { x: -200, y: -150, rotation: -15, scale: 1.8 },
        { x: 250, y: -200, rotation: 12, scale: 2.0 },
        { x: -300, y: 50, rotation: -20, scale: 1.6 },
        { x: 200, y: 250, rotation: 18, scale: 1.9 },
        { x: -250, y: -250, rotation: 25, scale: 2.2 },
        { x: -200, y: 300, rotation: -12, scale: 1.7 },
        { x: 300, y: 150, rotation: -18, scale: 2.0 },
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
        scatterTl.to(collageBg, { opacity: 0, duration: 1 }, 0.1)
      }

      const s2Titles = section2.querySelectorAll('[data-s2-title]')
      const s2Texts = section2.querySelectorAll('[data-s2-text]')
      const textBlock = section2.querySelector('[data-text-reveal]')

      if (textBlock && s2Titles.length) {
        gsap.set(s2Titles, { y: 40, opacity: 0 })
        gsap.set(s2Texts, { y: 20, opacity: 0 })

        const s2Tl = gsap.timeline({ paused: true })

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
        const lines = section3.querySelectorAll('[data-pillar-line]')
        const numbers = section3.querySelectorAll('[data-pillar-num]')
        const titles = section3.querySelectorAll('[data-pillar-title]')
        const texts = section3.querySelectorAll('[data-pillar-text]')

        gsap.set(lines, { scaleX: 0 })
        gsap.set(numbers, { y: 60, opacity: 0 })
        gsap.set(titles, { y: 30, opacity: 0 })
        gsap.set(texts, { y: 20, opacity: 0 })

        const tl = gsap.timeline({ paused: true })

        tl.to(
          lines,
          {
            scaleX: 1,
            duration: 1.8,
            ease: 'power3.inOut',
            stagger: 0.12,
          },
          0
        )

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
        const projectTagline = section4.querySelector('[data-project-tagline]')
        const projectLink = section4.querySelector('[data-project-link]')

        gsap.set(projectItems, { y: 120, opacity: 0 })

        const s4Tl = gsap.timeline({ paused: true })

        s4Tl.to(projectItems, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.08,
        })

        if (projectTagline) {
          gsap.set(projectTagline, { y: 30, opacity: 0 })
          s4Tl.to(
            projectTagline,
            { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
            0.5
          )
        }

        if (projectLink) {
          gsap.set(projectLink, { y: 30, opacity: 0 })
          s4Tl.to(
            projectLink,
            { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
            0.7
          )
        }

        ScrollTrigger.create({
          trigger: section4,
          start: 'top 80%',
          onEnter: () => s4Tl.play(),
          onLeaveBack: () => s4Tl.reverse(),
        })
      }
    })

    return () => ctx.revert()
  }, [showIntro])

  return (
    <main className="overflow-x-hidden">
      <section
        ref={sectionRef}
        className={`relative h-screen w-full ${showIntro ? 'invisible' : 'visible'}`}
      >
        <div
          data-collage-bg
          className="absolute inset-0 w-[60vw] m-auto h-fit"
          style={{ transform: 'translate(10vw, -18vh) scale(0.47)' }}
        >
          <Image
            src="/assets/img-1.webp"
            alt="Atrium"
            width={1920}
            height={1194}
            className="w-full"
            loading="eager"
            priority
          />
        </div>

        {COLLAGE_REST.map((img, i) => (
          <div
            key={i}
            className={`absolute ${img.className}`}
            data-collage-item
          >
            <Image
              src={img.src}
              alt="Atrium"
              width={img.w}
              height={img.h}
              className="w-full"
              loading="eager"
              priority
            />
          </div>
        ))}
      </section>

      <section ref={section2Ref} className="relative pt-[6%]">
        <div
          ref={img9Ref}
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

        <div
          className="flex flex-col max-w-[60vw] px-[3vw] m-auto"
          data-text-reveal
        >
          <h2
            data-s2-title
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.2] uppercase whitespace-nowrap pl-[1.5vw] mt-[2%]"
          >
            {t('section_2_title_1')}
          </h2>
          <h2
            data-s2-title
            className="text-[3.7vw] font-[450] text-black-100 leading-[1.2] uppercase whitespace-nowrap pl-[5vw]"
          >
            {t('section_2_title_2')}
          </h2>

          <div className="text-[0.92vw] leading-[1.8] text-black-100 w-[70%] mx-auto">
            <p data-s2-text className="indent-[3em] mt-[2.5%]">
              {t('section_2_text_1')}
            </p>
            <p data-s2-text className="indent-[3em] mt-[2%]">
              {t('section_2_text_2')}
            </p>
            <p data-s2-text className="indent-[3em] mt-[2%]">
              {t('section_2_text_3')}
            </p>
          </div>
        </div>

        <div className="flex justify-between w-[37.5vw] pb-[8%] mt-[8%] mx-auto">
          <button
            data-btn-reveal
            className="text-black-100 text-[0.8vw] border border-black-100 py-[1%] px-[1.1vw] hover:bg-black-100 hover:text-white-100 transition-all duration-500 ease-in-out"
          >
            {t('section_2_cta_meeting')}
          </button>
          <button
            data-btn-reveal
            className="text-black-100 text-[0.8vw] border border-black-100 py-[1%] px-[1.1vw] hover:bg-black-100 hover:text-white-100 transition-all duration-500 ease-in-out"
          >
            {t('section_2_cta_inquiry')}
          </button>
          <button
            data-btn-reveal
            className="text-black-100 text-[0.8vw] border border-black-100 py-[1%] px-[1.1vw] hover:bg-black-100 hover:text-white-100 transition-all duration-500 ease-in-out"
          >
            {t('section_2_cta_oem')}
          </button>
        </div>
      </section>

      <section ref={section3Ref} className="relative pb-[8%] pt-[2%]">
        <div data-pillars-track>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} data-pillar>
              <div
                className="h-px bg-black-100/20 origin-left"
                data-pillar-line
              />
              <div className="grid grid-cols-[6vw_1fr] gap-[2vw] items-start py-[2%] pl-[23.25vw] pr-[12vw]">
                <span
                  className="text-[3.2vw] font-light leading-none text-black-100/[0.1]"
                  data-pillar-num
                >
                  {String(n).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <h3
                    className="text-[1.1vw] font-medium text-black-100 leading-[1.2] uppercase pt-[0.5%]"
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
          <div data-pillar-line className="h-px bg-black-100/20 origin-left" />
        </div>
      </section>

      <section ref={section4Ref} className="relative pb-[6%]">
        <div className="flex items-center gap-[20px] justify-center">
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
            const w = isLarge ? 312 : 228
            const h = isLarge ? 420 : 307
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

        <div className="text-center mt-[5%]" data-project-tagline>
          <p className="text-[1.5vw] font-[450] text-black-100 uppercase">
            {t('section_4_tagline_1')}
          </p>
          <p className="text-[1.1vw] font-[350] text-black-100/50 mt-[0.6vw]">
            {t('section_4_tagline_2')}
          </p>
        </div>

        <div className="flex justify-center mt-[3%]" data-project-link>
          <Link
            href="/references"
            className="text-black-100 text-[0.92vw] underline hover:opacity-80 transition-opacity"
          >
            {t('section_4_cta')}
          </Link>
        </div>
      </section>

      <section className="h-[100vh] pb-[8%]"></section>

      {showIntro && <IntroAnimation onComplete={completeIntro} />}
    </main>
  )
}

export default Home
