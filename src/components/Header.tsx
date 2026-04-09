'use client'

import { useEffect, useRef, useState } from 'react'

import Navigation from '@/components/Navigation'

const Header = () => {
  const lastY = useRef(0)

  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)

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
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60]">
        <div
          className="bg-black-100 h-full origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <header
        className={`fixed top-0 left-0 backdrop-blur-[4px] bg-beige-50/40 w-full z-50 transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        data-header
      >
        <Navigation />
      </header>
    </>
  )
}

export default Header
