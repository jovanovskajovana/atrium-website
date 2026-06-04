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
  const indexRefs = useRef<Array<HTMLSpanElement | null>>([])
  const railFillRef = useRef<HTMLDivElement>(null)

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

          const indexEls = indexRefs.current
          const railFill = railFillRef.current
          const ACTIVE = '#26251e'
          const INACTIVE = 'rgba(38, 37, 30, 0.3)'

          const syncProgress = (p: number) => {
            if (railFill) railFill.style.transform = `scaleX(${p})`
            const activeIdx = p < 0.26 ? 0 : p < 0.7 ? 1 : 2
            indexEls.forEach((el, i) => {
              if (el) el.style.color = i === activeIdx ? ACTIVE : INACTIVE
            })
          }

          syncProgress(0)

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
            onUpdate: (self) => syncProgress(self.progress),
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
      className="relative mb-[6%] flex h-screen w-full items-center overflow-hidden bg-beige-50"
    >
      <div className="relative order-2 flex flex-col justify-center w-[34vw] pl-[3vw] pr-[6vw] z-10">
        <p className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase mb-[5vh]">
          {t('home.section_6_label')}
        </p>

        <div className="relative grid">
          {STEPS.map((key, index) => (
            <p
              key={key}
              ref={(el) => {
                textRefs.current[index] = el
              }}
              className={`col-start-1 row-start-1 text-[1.9vw] text-black-100 font-[500] leading-[1.3] uppercase ${
                index === 0 ? '' : 'invisible opacity-0'
              }`}
            >
              {t.rich(key, { br: () => <br /> })}
            </p>
          ))}
        </div>

        <div className="mt-[7vh]">
          <div className="flex justify-between text-[1vw] font-[500] tracking-[0.15em] w-[14vw]">
            {['01', '02', '03'].map((n, i) => (
              <span
                key={n}
                ref={(el) => {
                  indexRefs.current[i] = el
                }}
                style={{ color: i === 0 ? '#26251e' : 'rgba(38, 37, 30, 0.3)' }}
              >
                {n}
              </span>
            ))}
          </div>
          <div className="relative bg-black-100/15 w-[14vw] h-px mt-[1.4vh]">
            <div
              ref={railFillRef}
              className="absolute left-0 top-0 origin-left bg-black-100 w-full h-px"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

      <div className="relative order-1 h-[78vh] flex-1 pl-[5vw]">
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
    </section>
  )
}

export default ProductionShowcase
