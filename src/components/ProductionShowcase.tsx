'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const STATES = [
  '/assets/production-state-1.svg',
  '/assets/production-state-2.svg',
  '/assets/production-state-3.svg',
]
const OUTLINE = '/assets/production-state-1-outline.svg'

const STEPS = [
  'home.section_6_step_1',
  'home.section_6_step_2',
  'home.section_6_step_3',
] as const

const ProductionShowcase = () => {
  const t = useTranslations()

  const sectionRef = useRef<HTMLElement>(null)
  const drawRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<Array<HTMLImageElement | null>>([])
  const textRefs = useRef<Array<HTMLParagraphElement | null>>([])

  const [active, setActive] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || active) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '120% 0px' }
    )

    io.observe(section)
    return () => io.disconnect()
  }, [active])

  useIsomorphicLayoutEffect(() => {
    if (!active) return

    const section = sectionRef.current
    const drawWrap = drawRef.current
    if (!section || !drawWrap) return

    let cancelled = false
    let ctx: ReturnType<typeof gsap.context> | undefined

    fetch(OUTLINE)
      .then((res) => res.text())
      .then((markup) => {
        if (cancelled) return
        drawWrap.innerHTML = markup

        const [img1, img2, img3] = imgRefs.current
        const [text1, text2, text3] = textRefs.current
        if (!img1 || !img2 || !img3) return
        if (!text1 || !text2 || !text3) return

        ctx = gsap.context(() => {
          const captions = [text1, text2, text3]

          gsap.set(drawWrap, { autoAlpha: 1, '--draw': 1 })
          gsap.set(img1, { autoAlpha: 1 })
          gsap.set([img2, img3], { autoAlpha: 0 })
          gsap.set(captions, { autoAlpha: 0, y: 0 })
          gsap.set([drawWrap, img1, img2, img3, ...captions], {
            willChange: 'opacity',
          })

          const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches

          if (prefersReduced) {
            gsap.set(drawWrap, { autoAlpha: 0 })
            gsap.set(text1, { autoAlpha: 1 })
          } else {
            const reveal = gsap.timeline({ defaults: { ease: 'none' } })

            reveal
              .to(drawWrap, { '--draw': 0, duration: 1 })
              .to(drawWrap, { autoAlpha: 0, duration: 0.22 }, '>-0.02')
              .fromTo(
                text1,
                { autoAlpha: 0, y: 26 },
                { autoAlpha: 1, y: 0, duration: 0.32 },
                '>-0.08'
              )

            ScrollTrigger.create({
              trigger: section,
              start: 'top 85%',
              end: 'top top',
              scrub: 0.8,
              animation: reveal,
            })
          }

          const states = gsap.timeline({
            paused: true,
            defaults: { ease: 'none' },
          })

          states
            .to({}, { duration: 0.3 })
            .to(img1, { autoAlpha: 0, duration: 0.7 })
            .to(img2, { autoAlpha: 1, duration: 0.7 }, '<')
            .to(text1, { autoAlpha: 0, y: -26, duration: 0.6 }, '<')
            .fromTo(
              text2,
              { autoAlpha: 0, y: 32 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                immediateRender: false,
              },
              '<'
            )
            .to({}, { duration: 0.4 })
            .to(img2, { autoAlpha: 0, duration: 0.7 })
            .to(img3, { autoAlpha: 1, duration: 0.7 }, '<')
            .to(text2, { autoAlpha: 0, y: -26, duration: 0.6 }, '<')
            .fromTo(
              text3,
              { autoAlpha: 0, y: 32 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                immediateRender: false,
              },
              '<'
            )
            .to({}, { duration: 0.4 })

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=170%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            animation: states,
          })

          ScrollTrigger.refresh()
        }, section)
      })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [active])

  return (
    <section
      ref={sectionRef}
      className="relative mb-[6%] flex h-screen w-full items-center justify-center overflow-hidden bg-beige-50"
    >
      <div className="relative h-[84vh] w-full -translate-x-[3vw] px-[2vw]">
        {active && (
          <>
            {STATES.map((src, index) => (
              <img
                key={src}
                ref={(el) => {
                  imgRefs.current[index] = el
                }}
                src={src}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 h-full w-full object-contain ${
                  index === 0 ? '' : 'invisible opacity-0'
                }`}
              />
            ))}
            <div
              ref={drawRef}
              className="pd-draw absolute inset-0 bg-beige-50"
            />
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 grid place-items-center px-[5vw]">
        {STEPS.map((key, index) => (
          <p
            key={key}
            ref={(el) => {
              textRefs.current[index] = el
            }}
            className={`col-start-1 row-start-1 text-center text-[2.1vw] font-[600] uppercase leading-[1.3] tracking-[0.05em] text-black-100/85 ${
              index === 0 ? '' : 'invisible opacity-0'
            }`}
          >
            {t.rich(key, { br: () => <br /> })}
          </p>
        ))}
      </div>
    </section>
  )
}

export default ProductionShowcase
