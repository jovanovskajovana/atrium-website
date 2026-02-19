'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

import AtriumLogoStep1 from '@/components/icons/atrium-logo-step-1'
import AtriumLogoStep2 from '@/components/icons/atrium-logo-step-2'
import AtriumLogoStep3 from '@/components/icons/atrium-logo-step-3'

const IntroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const imgW = window.innerWidth * 0.6
      const startScale = 20 / imgW

      const tl = gsap.timeline({ delay: 0.2 })

      // Step 1: Atrium logo 1
      tl.fromTo(
        step1Ref.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
      )
        .to(
          step1Ref.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          },
          '+=0.75',
        )

        // Square pulse
        .set(squareRef.current, { scale: 0, opacity: 0 })
        .to(squareRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          squareRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          '+=0.15',
        )

        // Step 2: Atrium logo 2
        .fromTo(
          step2Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
        )
        .to(
          step2Ref.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          },
          '+=0.75',
        )

        // Square pulse
        .set(squareRef.current, { scale: 0, opacity: 0 })
        .to(squareRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          squareRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          '+=0.15',
        )

        // Step 3: Atrium logo 3
        .fromTo(
          step3Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
        )
        .to(
          step3Ref.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          },
          '+=0.75',
        )

        // Square pulse
        .set(squareRef.current, { scale: 0, opacity: 0 })
        .to(squareRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        })

        // Step 4: Image
        .set(squareRef.current, { opacity: 0 }, '+=0.15')
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
      <div ref={step1Ref} className="absolute opacity-0">
        <AtriumLogoStep1 className="w-[4vw] h-auto" />
      </div>

      <div ref={step2Ref} className="absolute opacity-0">
        <AtriumLogoStep2 className="w-[4vw] h-auto" />
      </div>

      <div ref={step3Ref} className="absolute opacity-0">
        <AtriumLogoStep3 className="w-[4vw] h-auto" />
      </div>

      <div
        ref={squareRef}
        className="absolute bg-black-100 opacity-0 w-[0.95vw] h-[0.65vw]"
      />

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
