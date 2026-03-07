'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import IntroAnimation from '@/components/IntroAnimation'

import { COLLAGE_IMAGES } from '@/constants/intro-animation'

import useIntroAnimation from '@/hooks/useIntroAnimation'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const COLLAGE_REST = COLLAGE_IMAGES.slice(0, -1)
const IMG9 = COLLAGE_IMAGES[COLLAGE_IMAGES.length - 1]

const Home = () => {
  const { showIntro, completeIntro } = useIntroAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const img9Ref = useRef<HTMLDivElement>(null)

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

      gsap.set(img9, {
        transformOrigin: '0% 0%',
        x: fromX,
        y: fromY,
        scale: fromScale,
      })

      const tl = gsap.timeline({ paused: true })

      tl.to(img9, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      })

      ScrollTrigger.create({
        trigger: img5El,
        start: 'top 5%',
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      })
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

      <section ref={section2Ref} className="relative bg-beige-100 pt-[8%]">
        <div ref={img9Ref} className="relative z-20">
          <Image
            src={IMG9.src}
            alt="Atrium"
            width={IMG9.w}
            height={IMG9.h}
            className="w-full"
            sizes="100vw"
            loading="eager"
            priority
          />
        </div>

        <div className="flex flex-col max-w-[60vw] pb-[8%] px-[3vw] m-auto">
          <h2
            data-text-reveal
            className="text-[3.7vw] font-medium text-black-100 leading-[1.2] uppercase pl-[1.5vw] mt-[0.25%]"
          >
            Bespoke Furniture
          </h2>
          <h2
            data-text-reveal
            className="text-[3.7vw] font-medium text-black-100 leading-[1.2] uppercase pl-[5vw]"
          >
            Industrial Precision
          </h2>

          <div
            className="text-[0.92vw] leading-[1.8] text-black-100 w-[70%] mx-auto"
            data-text-reveal
          >
            <p className="indent-[3em] mt-[0.5%]">
              We work closely with architects, designers, and craftsmen to turn
              design ideas into custom furniture. Our approach combines precise
              manufacturing with careful attention to detail, ensuring that
              every piece is produced exactly as envisioned by the designer.
            </p>
            <p className="indent-[3em] mt-[1%]">
              Using advanced CNC machining, we achieve outstanding dimensional
              accuracy and perfect tolerances for every detail. Yet, the warmth
              and individuality of each piece comes from the hands of our
              craftspeople, who finish every element with care—imparting
              authenticity and human character.
            </p>
            <p className="indent-[3em] mt-[1%]">
              Rooted in the European Union, we combine a heritage of
              craftsmanship with strict quality standards and sustainable
              sourcing. Our local, traceable supply chains ensure materials are
              responsibly selected, resulting in furniture that embodies
              engineered precision and the enduring values of EU-made
              excellence.
            </p>
          </div>
        </div>
      </section>

      {showIntro && <IntroAnimation onComplete={completeIntro} />}
    </main>
  )
}

export default Home
