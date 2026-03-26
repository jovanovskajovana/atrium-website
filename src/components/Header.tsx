'use client'

import { useEffect, useRef, useState } from 'react'

import Navigation from '@/components/Navigation'

const SECTION_COUNT = 5

const Header = () => {
  const lastY = useRef(0)

  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentSection = Math.min(
    SECTION_COUNT,
    Math.floor(progress * SECTION_COUNT) + 1
  )
  const sectionLabel = String(currentSection).padStart(2, '0')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const isAnimating = document.body.hasAttribute('data-animating')

      if (!isAnimating && y > 80) {
        setHidden(y > lastY.current)
      } else {
        setHidden(false)
      }

      lastY.current = y

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? y / docHeight : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed top-[14%] left-[3vw] z-[60]">
        <span className="text-[0.8vw] text-black-100/40">
          {sectionLabel} / {String(SECTION_COUNT).padStart(2, '0')}
        </span>
        {/* <div className="relative w-[1px] h-[2.5vw] mt-[50%] ml-[0.1vw]">
          <div className="absolute inset-0 bg-black-100/15" />
          <div
            className="absolute inset-0 bg-black-100 origin-top"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div> */}
      </div>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        data-header
      >
        <Navigation />
      </header>
    </>
  )
}

export default Header
