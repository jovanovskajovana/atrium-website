'use client'

import { useEffect, useRef } from 'react'

const S = 36
const C = S / 2
const ARM = 14
const GAP = 4

const SELECTORS =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

const CursorTracker = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const hovering = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    const dot = dotRef.current
    const cross = crossRef.current
    if (!dot || !cross) return

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY

      if (!visible.current) {
        visible.current = true
        dot.style.opacity = hovering.current ? '0' : '1'
        cross.style.opacity = hovering.current ? '1' : '0'
      }
    }

    const onMouseLeave = () => {
      visible.current = false
      dot.style.opacity = '0'
      cross.style.opacity = '0'
    }

    const onMouseOver = (e: MouseEvent) => {
      const next = !!(e.target as HTMLElement).closest(SELECTORS)
      if (next === hovering.current) return
      hovering.current = next

      if (next) {
        dot.style.opacity = '0'
        cross.style.transition = 'opacity 1s ease'
        cross.style.opacity = '1'
      } else {
        cross.style.transition = 'none'
        cross.style.opacity = '0'
        dot.style.opacity = '1'
      }
    }

    const tick = () => {
      const { x, y } = pos.current
      dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
      cross.style.transform = `translate(${x}px,${y}px)`
      raf.current = requestAnimationFrame(tick)
    }

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

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-white-100 rounded-full mix-blend-difference opacity-0 will-change-transform pointer-events-none z-[9999]"
      />
      <div
        ref={crossRef}
        className="fixed top-0 left-0 mix-blend-difference opacity-0 will-change-transform pointer-events-none z-[9999]"
        style={{ marginLeft: -C, marginTop: -C }}
      >
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
          <path
            d={`M${C} ${C - GAP - ARM}v${ARM}m0 ${GAP * 2}v${ARM}M${C - GAP - ARM} ${C}h${ARM}m${GAP * 2} 0h${ARM}`}
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </>
  )
}

export default CursorTracker
