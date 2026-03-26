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
      <div className="fixed left-[3.25vw] top-1/2 -translate-y-1/2 w-[2px] h-[18vh] z-[60]">
        <div className="absolute inset-0 bg-black-100/15" />
        <div
          className="absolute top-0 left-0 w-full bg-black-100 origin-top"
          style={{ height: `${progress * 100}%` }}
        />
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
