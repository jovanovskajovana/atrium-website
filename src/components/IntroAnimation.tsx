'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const FULL_A =
  'M42.7443 2.2507H52.2308L93.1342 92.8439H82.2365L71.7191 69.0703H22.8632L12.2232 92.8439H1.84082L42.7443 2.2507ZM67.7552 59.9568L47.3587 14.0699L26.8394 59.9445H67.7429L67.7552 59.9568Z'
const FULL_T =
  'M107.321 11.6962H137.805V92.8439H148.004V11.6962H178.488V2.2507H107.321V11.6962Z'
const FULL_R =
  'M294.461 29.4311V29.1729C294.461 21.9288 292.006 15.8409 287.49 11.3149C281.808 5.62058 273.021 2.2507 261.792 2.2507H222.914V92.8439H233.112V57.6447H258.945L285.159 92.8439H297.689L269.916 55.8244C284.128 53.3647 294.449 44.4357 294.449 29.4188L294.461 29.4311ZM233.112 48.4574V11.6962H261.007C275.598 11.6962 284.128 18.3007 284.128 29.5541V29.8124C284.128 41.4594 274.31 48.4451 260.884 48.4451H233.112V48.4574Z'
const FULL_I = 'M353.221 2.2507H343.022V92.8439H353.221V2.2507Z'
const FULL_U =
  'M469.206 54.9266C469.206 74.7277 458.615 84.8251 441.961 84.8251C425.308 84.8251 414.324 73.9529 414.324 54.2748V2.2507H404.126V54.9266C404.126 80.5574 419.368 94.2706 441.704 94.2706C464.039 94.2706 479.416 80.6804 479.416 54.1518V2.2507H469.218V54.9266H469.206Z'
const FULL_M =
  'M601.268 2.2507L568.341 51.692L535.402 2.2507H525.069V92.8439H535.022V19.5921L567.949 68.0003H568.464L601.403 19.4691V92.8439H611.601V2.2507H601.268Z'

const CHEVRON_A =
  'M52.2308 2.2507H42.7443L1.84082 92.8439H12.2232L47.3587 14.0699L82.2365 92.8439H93.1342L52.2308 2.2507Z'
const CROSSBAR_T = 'M107.321 2.2507H178.488V11.6962H107.321V2.2507Z'

const CENTERS_X = [47.5, 142.9, 260.3, 348.1, 441.8, 568.3]
const CENTER_SHIFT = 306.5 - (CENTERS_X[0] + CENTERS_X[1]) / 2
const MERGE_SHIFT = (CENTERS_X[1] - CENTERS_X[0]) / 2

const IntroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textSvgRef = useRef<SVGSVGElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const imgW = window.innerWidth * 0.6
      const startScale = 20 / imgW

      const svg = textSvgRef.current!
      const fullA = svg.querySelector('[data-part="full-a"]')
      const fullT = svg.querySelector('[data-part="full-t"]')
      const chevronA = svg.querySelector('[data-part="chevron-a"]')
      const crossbarT = svg.querySelector('[data-part="crossbar-t"]')
      const groupA = svg.querySelector('[data-group="a"]')
      const groupT = svg.querySelector('[data-group="t"]')
      const letterR = svg.querySelector('[data-part="r"]')
      const letterI = svg.querySelector('[data-part="i"]')
      const letterU = svg.querySelector('[data-part="u"]')
      const letterM = svg.querySelector('[data-part="m"]')

      const allLetters = [fullA, fullT, letterR, letterI, letterU, letterM]
      const dissolving = [letterM, letterU, letterI, letterR]

      const tl = gsap.timeline({ delay: 0.3 })

      // — ATRIUM appears letter by letter —
      tl.fromTo(
        allLetters,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
        },
      )

        // — R, I, U, M collapse right-to-left toward A+T —
        .to(
          dissolving,
          {
            x: (i: number) => -(CENTERS_X[5 - i] - CENTERS_X[1]),
            opacity: 0,
            scale: 0.3,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.in',
            transformOrigin: 'center center',
          },
          '+=0.2',
        )

        // — A + T slide to center —
        .to(
          [groupA, groupT],
          {
            x: CENTER_SHIFT,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '+=0.2',
        )

        // — Strip away: full letters crossfade to essential strokes —
        .to(
          [fullA, fullT],
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '+=0.2',
        )
        .to(
          [chevronA, crossbarT],
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<',
        )

        // — Merge: strokes slide together to form the mark —
        .to(
          groupA,
          {
            x: CENTER_SHIFT + MERGE_SHIFT,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '+=0.4',
        )
        .to(
          groupT,
          {
            x: CENTER_SHIFT - MERGE_SHIFT,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '<',
        )
        .to(
          crossbarT,
          {
            scaleX: 1.28,
            duration: 0.8,
            ease: 'power2.inOut',
            transformOrigin: 'center center',
          },
          '<',
        )

        // — Hold, then mark compresses to a point —
        .to(
          textSvgRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            transformOrigin: 'center center',
          },
          '+=0.8',
        )

        // — Image expands from the same center —
        .fromTo(
          imageRef.current,
          {
            scale: startScale,
            opacity: 1,
            transformOrigin: 'center center',
          },
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
            immediateRender: false,
          },
          '-=0.1',
        )
    }, containerRef)

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-beige-100 z-50"
    >
      <svg
        ref={textSvgRef}
        viewBox="0 0 613 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-[15vw] h-auto"
      >
        <path data-part="r" d={FULL_R} fill="#1d1d1b" opacity="0" />
        <path data-part="i" d={FULL_I} fill="#1d1d1b" opacity="0" />
        <path data-part="u" d={FULL_U} fill="#1d1d1b" opacity="0" />
        <path data-part="m" d={FULL_M} fill="#1d1d1b" opacity="0" />

        <g data-group="a">
          <path data-part="full-a" d={FULL_A} fill="#1d1d1b" opacity="0" />
          <path
            data-part="chevron-a"
            d={CHEVRON_A}
            fill="#1d1d1b"
            opacity="0"
          />
        </g>

        <g data-group="t">
          <path data-part="full-t" d={FULL_T} fill="#1d1d1b" opacity="0" />
          <path
            data-part="crossbar-t"
            d={CROSSBAR_T}
            fill="#1d1d1b"
            opacity="0"
          />
        </g>
      </svg>

      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0 w-[60vw] m-auto"
        style={{ height: 'fit-content' }}
      >
        <Image
          src="/assets/img-1.webp"
          alt="Atrium"
          width={1920}
          height={1194}
          className="w-full"
          priority
        />
      </div>
    </div>
  )
}

export default IntroAnimation
