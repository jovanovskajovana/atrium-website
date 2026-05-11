'use client'

import { useEffect, useRef, useState } from 'react'

import Navigation from '@/components/Navigation'

const Header = () => {
  const lastY = useRef(0)

  const [hidden, setHidden] = useState(false)

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
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 bg-beige-50/20 backdrop-blur-[8px] w-full z-50 transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      data-header
    >
      <Navigation />
    </header>
  )
}

export default Header
