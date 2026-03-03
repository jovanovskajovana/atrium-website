'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

import Navigation from '@/components/Navigation'

import {
  FULL_A,
  FULL_T,
  FULL_R,
  FULL_I,
  FULL_U,
  FULL_M,
  CHEVRON_A,
  CROSSBAR_T,
  CENTERS_X,
  CENTER_SHIFT,
  MERGE_SHIFT,
  COLLAGE_IMAGES,
} from '@/constants/intro-animation'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

const IntroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textSvgRef = useRef<SVGSVGElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !textSvgRef.current || !imageRef.current)
      return

    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      gsap.set('[data-logo]', { opacity: 0 })
      gsap.set('[data-menu-item]', { opacity: 0 })
      gsap.set('[data-lang-picker]', { opacity: 0 })

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

      // Phase 1: ATRIUM appears letter by letter
      tl.fromTo(
        allLetters,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: 'power3.out',
        }
      )

        // Phase 2: R, I, U, M collapse right-to-left toward A+T
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
          '+=0.05'
        )

        // Phase 3: A + T slide to center
        .to(
          [groupA, groupT],
          {
            x: CENTER_SHIFT,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '+=0.2'
        )

        // Phase 4: Strip away full letters, crossfade to essential strokes
        .to(
          [fullA, fullT],
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '+=0.2'
        )
        .to(
          [chevronA, crossbarT],
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<'
        )

        // Phase 5: Merge strokes to form the mark
        .to(
          groupA,
          {
            x: CENTER_SHIFT + MERGE_SHIFT,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '+=0.4'
        )
        .to(
          groupT,
          {
            x: CENTER_SHIFT - MERGE_SHIFT,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(
          crossbarT,
          {
            scaleX: 1.28,
            duration: 0.8,
            ease: 'power2.inOut',
            transformOrigin: 'center center',
          },
          '<'
        )

        // Phase 6: Mark compresses to a point
        .to(
          textSvgRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            transformOrigin: 'center center',
          },
          '+=0.4'
        )

        // Phase 7: Image expands from center with horizontal clip
        .fromTo(
          imageRef.current,
          {
            scale: startScale * 1.15,
            opacity: 1,
            clipPath: 'inset(0% 45% 0% 45%)',
            transformOrigin: 'center center',
          },
          {
            scale: 1,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'power3.out',
            immediateRender: false,
          },
          '-=0.1'
        )

        // Phase 8a: Image slides to right-side collage position
        .to(
          imageRef.current,
          {
            x: '10vw',
            y: '-18vh',
            scale: 0.47,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          '-=0.1'
        )

        // Phase 8b: AT logo fades in at top-left
        .fromTo(
          '[data-logo]',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.8'
        )

        // Phase 8c: Menu items stagger in
        .fromTo(
          '[data-menu-item]',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )

        // Phase 8d: Language picker fades in
        .fromTo(
          '[data-lang-picker]',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '<'
        )

        // Phase 8e: Collage images grow in with same clip reveal as hero
        .fromTo(
          '[data-collage]',
          {
            opacity: 1,
            scale: 0.15,
            clipPath: 'inset(0% 45% 0% 45%)',
            transformOrigin: 'center center',
          },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.07,
            duration: 1.2,
            ease: 'power3.out',
            immediateRender: false,
          },
          '-=0.9'
        )

        // Phase 9: Unlock scroll and signal completion
        .call(() => {
          document.body.style.overflow = ''
          window.dispatchEvent(new Event('intro-complete'))
        })
    }, containerRef)

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-beige-100 overflow-hidden z-50"
      data-intro-animation
    >
      <svg
        ref={textSvgRef}
        viewBox="0 0 613 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-[15vw] h-auto"
      >
        <path d={FULL_R} fill="#1d1d1b" opacity="0" data-part="r" />
        <path d={FULL_I} fill="#1d1d1b" opacity="0" data-part="i" />
        <path d={FULL_U} fill="#1d1d1b" opacity="0" data-part="u" />
        <path d={FULL_M} fill="#1d1d1b" opacity="0" data-part="m" />

        <g data-group="a">
          <path d={FULL_A} fill="#1d1d1b" opacity="0" data-part="full-a" />
          <path
            d={CHEVRON_A}
            fill="#1d1d1b"
            opacity="0"
            data-part="chevron-a"
          />
        </g>

        <g data-group="t">
          <path d={FULL_T} fill="#1d1d1b" opacity="0" data-part="full-t" />
          <path
            d={CROSSBAR_T}
            fill="#1d1d1b"
            opacity="0"
            data-part="crossbar-t"
          />
        </g>
      </svg>

      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0 w-[60vw] m-auto h-fit"
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

      <Navigation />

      {COLLAGE_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className={`absolute opacity-0 ${img.className}`}
          data-collage
        >
          <Image
            src={img.src}
            alt={`Atrium ${i + 2}`}
            width={img.w}
            height={img.h}
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  )
}

export default IntroAnimation
