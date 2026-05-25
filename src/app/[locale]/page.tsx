'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useTranslations } from 'next-intl'

import {
  FULL_A,
  FULL_T,
  FULL_R,
  FULL_I,
  FULL_U,
  FULL_M,
  CENTERS_X,
  CENTER_SHIFT,
  MERGE_SHIFT,
  CHEVRON_A,
  CROSSBAR_T,
} from '@/constants/intro-animation'

import { COMPANY } from '@/constants/contacts'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

const ComingSoonPage = () => {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return

    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
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

      const bgImage = container.querySelector('[data-bg-image]')
      const comingSoon = container.querySelector('[data-coming-soon]')
      const subtitle = container.querySelector('[data-subtitle]')
      const divider = container.querySelector('[data-divider]')
      const contactBlock = container.querySelector('[data-contact-block]')

      const tl = gsap.timeline({ delay: 0.5 })

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

        .to(
          [groupA, groupT],
          {
            x: CENTER_SHIFT,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '+=0.2'
        )

        .to(
          [fullA, fullT],
          { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
          '+=0.2'
        )
        .to(
          [chevronA, crossbarT],
          { opacity: 1, duration: 0.4, ease: 'power2.inOut' },
          '<'
        )

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

        .to(
          svg,
          {
            top: window.innerWidth < 672 ? '18%' : '20%',
            duration: 1,
            ease: 'power2.inOut',
          },
          '+=0.6'
        )

      if (bgImage) {
        tl.fromTo(
          bgImage,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
          '-=0.8'
        )
      }

      if (comingSoon) {
        tl.fromTo(
          comingSoon,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
      }

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.7'
        )
      }

      if (divider) {
        tl.fromTo(
          divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
          '-=0.5'
        )
      }

      if (contactBlock) {
        tl.fromTo(
          contactBlock,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        )
      }
    })

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 bg-beige-100">
      <div className="absolute inset-0 opacity-0" data-bg-image>
        <Image
          src="/assets/coming-soon.webp"
          alt=""
          fill
          className="object-cover object-[center_18%] opacity-[0.2]"
          priority
        />
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 613 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] sm:w-[35vw] lg:w-[15vw] h-auto"
      >
        <path d={FULL_R} fill="#26251e" opacity="0" data-part="r" />
        <path d={FULL_I} fill="#26251e" opacity="0" data-part="i" />
        <path d={FULL_U} fill="#26251e" opacity="0" data-part="u" />
        <path d={FULL_M} fill="#26251e" opacity="0" data-part="m" />
        <g data-group="a">
          <path d={FULL_A} fill="#26251e" opacity="0" data-part="full-a" />
          <path
            d={CHEVRON_A}
            fill="#26251e"
            opacity="0"
            data-part="chevron-a"
          />
        </g>
        <g data-group="t">
          <path d={FULL_T} fill="#26251e" opacity="0" data-part="full-t" />
          <path
            d={CROSSBAR_T}
            fill="#26251e"
            opacity="0"
            data-part="crossbar-t"
          />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-[16vh] sm:pt-[14vh] lg:pt-[12vh] px-[6vw] sm:px-0">
        <h1
          className="text-[9vw] sm:text-[6vw] lg:text-[4vw] text-black-100 font-[500] leading-[1.1] uppercase opacity-0"
          data-coming-soon
        >
          {t('coming_soon.title')}
        </h1>

        <p
          className="text-[3.5vw] sm:text-[2vw] lg:text-[1vw] text-black-100/70 font-[450] leading-[1.85] text-center mt-[3vw] sm:mt-[2vw] lg:mt-[1.5vw] opacity-0"
          data-subtitle
        >
          {t('coming_soon.subtitle')}
        </p>

        <div
          className="bg-black-100/15 w-[8vw] sm:w-[5vw] lg:w-[3vw] h-px mt-[6vw] sm:mt-[4vw] lg:mt-[3vw] origin-center"
          data-divider
        />

        <div
          className="flex flex-col items-center text-center mt-[6vw] sm:mt-[4vw] lg:mt-[3vw] opacity-0"
          data-contact-block
        >
          <a
            href={`mailto:${t('footer.contact_email')}`}
            className="text-[3.8vw] sm:text-[2.2vw] lg:text-[1.1vw] text-black-100 font-[500] transition-colors duration-300 hover:text-black-100/60"
          >
            {t('footer.contact_email')}
          </a>
          <a
            href={`tel:${COMPANY.phone.replace(/[\s()]/g, '')}`}
            className="text-[3.8vw] sm:text-[2.2vw] lg:text-[1.1vw] text-black-100/70 font-[450] mt-[2vw] sm:mt-[1vw] lg:mt-[0.6vw] transition-colors duration-300 hover:text-black-100"
          >
            {COMPANY.phone}
          </a>
          <p className="text-[3vw] sm:text-[1.6vw] lg:text-[0.82vw] text-black-100/55 font-[450] leading-[1.7] mt-[3vw] sm:mt-[2vw] lg:mt-[1.2vw]">
            {COMPANY.address}, {COMPANY.city}, {COMPANY.country}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonPage
