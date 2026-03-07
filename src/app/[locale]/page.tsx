'use client'

import { useRef } from 'react'
import Image from 'next/image'
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

      const tl = gsap.timeline({ paused: true })

      tl.to(
        img9,
        {
          x: 0,
          y: 0,
          scale: 1,
          height: targetHeight,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      )

      if (imgEl) {
        tl.fromTo(
          imgEl,
          { scale: 1 },
          { scale: 1.2, duration: 1, ease: 'power2.inOut' },
          0
        )
      }

      ScrollTrigger.create({
        trigger: img5El,
        start: 'top 5%',
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      })

      const textBlock = section2.querySelector('[data-text-reveal]')
      if (textBlock) {
        gsap.set(textBlock, { y: 100, opacity: 0 })
        ScrollTrigger.create({
          trigger: textBlock,
          start: 'top 120%',
          onEnter: () => {
            gsap.to(textBlock, { opacity: 1, duration: 0.3, ease: 'none' })
            gsap.to(textBlock, {
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
          onLeaveBack: () => {
            gsap.to(textBlock, { opacity: 0, duration: 0.3, ease: 'none' })
            gsap.to(textBlock, {
              y: 100,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
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
        const pillars = section3.querySelectorAll('[data-pillar]')
        const track = section3.querySelector(
          '[data-pillars-track]'
        ) as HTMLElement
        gsap.set(pillars, { opacity: 0.4 })
        gsap.set(track, { y: 100, opacity: 0 })

        ScrollTrigger.create({
          trigger: section3,
          start: 'top 120%',
          onEnter: () => {
            gsap.to(track, { opacity: 1, duration: 0.3, ease: 'none' })
            gsap.to(track, { y: 0, duration: 0.8, ease: 'power3.out' })
            gsap.to(pillars[0], {
              opacity: 1,
              duration: 0.6,
              delay: 0.6,
              ease: 'power2.inOut',
            })
          },
          onLeaveBack: () => {
            gsap.to(track, { opacity: 0, duration: 0.3, ease: 'none' })
            gsap.to(track, { y: 100, duration: 0.8, ease: 'power3.out' })
            gsap.to(pillars[0], { opacity: 0.4, duration: 0.3, ease: 'none' })
          },
        })
      }
    })

    return () => ctx.revert()
  }, [showIntro])

  return (
    <main>
      <section
        ref={sectionRef}
        className={`relative h-screen w-full overflow-hidden ${showIntro ? 'invisible' : 'visible'}`}
      >
        <div
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
          <h2 className="text-[3.7vw] font-medium text-black-100 leading-[1.2] uppercase whitespace-nowrap pl-[1.5vw] mt-[6%]">
            {t('section_2_title_1')}
          </h2>
          <h2 className="text-[3.7vw] font-medium text-black-100 leading-[1.2] uppercase whitespace-nowrap pl-[5vw]">
            {t('section_2_title_2')}
          </h2>

          <div className="text-[0.92vw] leading-[1.8] text-black-100 w-[70%] mx-auto">
            <p className="indent-[3em] mt-[2%]">{t('section_2_text_1')}</p>
            <p className="indent-[3em] mt-[2%]">{t('section_2_text_2')}</p>
            <p className="indent-[3em] mt-[2%]">{t('section_2_text_3')}</p>
          </div>
        </div>

        <div className="flex justify-between w-[37.5vw] pb-[7%] mt-[8%] mx-auto">
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

      <section ref={section3Ref} className="relative pb-[8%]">
        <div data-pillars-track className="flex gap-[4vw] pl-[31.25vw]">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              data-pillar
              className="flex flex-col shrink-0 w-[20vw]"
            >
              <span className="text-[0.75vw] text-black-100/40 mb-[1vw]">
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="text-[1.1vw] font-medium text-black-100 uppercase tracking-[0.08em] leading-[1.3] mb-[1vw]">
                {t(`section_3_pillar_${n}_title`)}
              </h3>
              <p className="text-[0.85vw] leading-[1.8] text-black-100/60">
                {t(`section_3_pillar_${n}_text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {showIntro && <IntroAnimation onComplete={completeIntro} />}
    </main>
  )
}

export default Home
