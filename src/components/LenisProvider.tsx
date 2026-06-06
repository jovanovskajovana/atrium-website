'use client'

import { useEffect, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisOptions } from 'lenis'
import 'lenis/dist/lenis.css'

import { usePathname } from '@/i18n/navigation'

import { gsap, ScrollTrigger } from '@/lib/gsap'

export { useLenis }

const defaultOptions: LenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
  syncTouch: false,
  anchors: true,
  autoRaf: false,
}

interface LenisProviderProps {
  children: ReactNode
  options?: LenisOptions
}

const LenisGsapBridge = () => {
  const pathname = usePathname()
  const lenis = useLenis(ScrollTrigger.update)

  useEffect(() => {
    if (!lenis) return

    const update = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [lenis])

  useEffect(() => {
    if (!lenis) return

    lenis.scrollTo(0, { immediate: true, force: true })

    const rafId = requestAnimationFrame(() => {
      lenis.resize()
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(rafId)
  }, [pathname, lenis])

  return null
}

export const LenisProvider = ({
  children,
  options = {},
}: LenisProviderProps) => {
  return (
    <ReactLenis root options={{ ...defaultOptions, ...options }}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  )
}
