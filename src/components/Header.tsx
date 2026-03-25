'use client'

import { useEffect, useRef, useState } from 'react'

import Navigation from '@/components/Navigation'

const Header = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <div
          className="bg-black-100 h-full origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <header className="fixed top-0 left-0 w-full z-50" data-header>
        <Navigation />
      </header>
    </>
  )
}

export default Header
