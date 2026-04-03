'use client'

import { useEffect, useRef } from 'react'

import IconArrow from '@/components/icons/icon-arrow'

import {
  CURSOR_TRACKER,
  CURSOR_TRACKER_SELECTORS,
  type CursorTrackerMode,
} from '@/constants/cursor-tracker'

const CursorTracker = () => {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const mode = useRef<CursorTrackerMode>('default')
  const raf = useRef(0)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    const arrow = arrowRef.current

    if (!outer || !inner || !arrow) return

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const cursorModeFromTarget = (
      eventTarget: EventTarget | null
    ): CursorTrackerMode => {
      if (!eventTarget || !(eventTarget instanceof Node)) return 'default'

      const el =
        eventTarget instanceof Element ? eventTarget : eventTarget.parentElement

      if (!el) return 'default'
      if (el.closest('[data-project-item]')) return 'project'
      if (el.closest(CURSOR_TRACKER_SELECTORS)) return 'interactive'

      return 'default'
    }

    const setMode = (next: CursorTrackerMode) => {
      if (next === mode.current) return
      mode.current = next

      const { BASE_VW, HOVER_GROW, PROJECT_GROW } = CURSOR_TRACKER

      let mult = 1
      if (next === 'project') mult = PROJECT_GROW
      else if (next === 'interactive') mult = HOVER_GROW

      const side = BASE_VW * mult
      inner.style.width = `${side}vw`
      inner.style.height = `${side}vw`

      const isProject = next === 'project'
      arrow.style.opacity = isProject ? '1' : '0'
      arrow.style.transform = isProject ? 'scale(1)' : 'scale(0.88)'
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      if (!visible.current) {
        visible.current = true
        smooth.current.x = e.clientX
        smooth.current.y = e.clientY
        outer.style.opacity = '1'
      }
    }

    const onMouseLeave = () => {
      visible.current = false
      outer.style.opacity = '0'
    }

    const onMouseOver = (e: MouseEvent) => {
      setMode(cursorModeFromTarget(e.target))
    }

    const tick = () => {
      const { x: tx, y: ty } = target.current
      const s = smooth.current
      const k = CURSOR_TRACKER.LERP

      s.x += (tx - s.x) * k
      s.y += (ty - s.y) * k
      outer.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(tick)
    }

    inner.style.transition = 'width 0.22s ease-out, height 0.22s ease-out'
    arrow.style.transition =
      'opacity 0.28s ease-out, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)'

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver)

    raf.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const baseVw = CURSOR_TRACKER.BASE_VW

  return (
    <div
      ref={outerRef}
      className="fixed top-0 left-0 opacity-0 will-change-transform pointer-events-none z-[9999]"
    >
      <div
        ref={innerRef}
        className="relative flex shrink-0 items-center justify-center rounded-full border border-brown-100 bg-transparent box-border"
        style={{ width: `${baseVw}vw`, height: `${baseVw}vw` }}
      >
        <span
          ref={arrowRef}
          className="absolute inset-0 flex items-center justify-center text-brown-100 opacity-0 scale-[0.88] pointer-events-none"
          aria-hidden="true"
        >
          <IconArrow className="text-current" />
        </span>
      </div>
    </div>
  )
}

export default CursorTracker
