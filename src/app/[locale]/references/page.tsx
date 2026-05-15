'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

import { ProjectsGridFour } from '@/components/ProjectsGridFour'
import { ProjectsGridTwo } from '@/components/ProjectsGridTwo'
import { useLenis } from '@/components/LenisProvider'

import { PROJECTS } from '@/constants/projects'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

import type {
  ProjectWithOriginalIndex,
  ProjectsGridMode,
} from '@/interfaces/ui'

gsap.registerPlugin(ScrollTrigger)

const SECTORS = [
  'all',
  'hospitality',
  'residential',
  'office',
  'retail',
  'public',
  'health',
] as const
type Sector = (typeof SECTORS)[number]

const ReferencesPage = () => {
  const t = useTranslations()
  const lenis = useLenis()

  const section1Ref = useRef<HTMLElement>(null)

  const [gridMode, setGridMode] = useState<ProjectsGridMode>('two')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeSector, setActiveSector] = useState<Sector>('all')

  const filterListRef = useRef<HTMLDivElement>(null)

  const handleSectorClick = useCallback((sector: Sector) => {
    setActiveSector(sector)
    setFilterOpen(false)
  }, [])

  useEffect(() => {
    const pills = filterListRef.current?.querySelectorAll('[data-sector-pill]')
    if (!pills) return

    if (filterOpen) {
      gsap.fromTo(
        pills,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.08,
        }
      )
    } else {
      gsap.to(pills, { opacity: 0, y: 8, duration: 0.35, ease: 'power2.in' })
    }
  }, [filterOpen])

  const projectsWithIndex: ProjectWithOriginalIndex[] = PROJECTS.map(
    (p, i) => ({
      ...p,
      originalIndex: i,
    })
  ).filter((p) => activeSector === 'all' || p.sector === activeSector)

  useIsomorphicLayoutEffect(() => {
    const section1 = section1Ref.current

    if (!section1) return

    const ctx = gsap.context(() => {
      const rows = section1.querySelectorAll('[data-ref-row]')

      rows.forEach((row) => {
        const cards = row.querySelectorAll('[data-ref-card]')
        cards.forEach((card) => gsap.set(card, { y: 60, opacity: 0 }))

        const tl = gsap.timeline({ paused: true })
        cards.forEach((card) => {
          tl.to(
            card,
            {
              y: 0,
              opacity: 1,
              duration: 1.3,
              ease: 'power3.out',
            },
            0
          )

          const img = card.querySelector('img')
          if (img) {
            tl.fromTo(
              img,
              { scale: 1.08 },
              { scale: 1, duration: 1.3, ease: 'power3.out' },
              0
            )
          }
        })

        ScrollTrigger.create({
          trigger: row,
          start: 'top 85%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      })

      const toolbar = section1.querySelector('[data-references-toolbar]')

      if (toolbar) {
        gsap.fromTo(
          toolbar,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
        )
      }

      requestAnimationFrame(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
      })
    })

    return () => ctx.revert()
  }, [gridMode, activeSector, lenis])

  const sectorPills = (
    <div
      ref={filterListRef}
      className={`absolute right-0 top-full flex flex-col items-end gap-[0.4vw] mt-[0.5vw] z-30 ${filterOpen ? '' : 'pointer-events-none'}`}
    >
      {SECTORS.map((sector) => (
        <button
          key={sector}
          type="button"
          data-sector-pill
          onClick={() => handleSectorClick(sector)}
          className={`rounded-full text-[0.78vw] font-semibold tracking-[0.03em] uppercase whitespace-nowrap transition-colors duration-200 py-[0.5vw] px-[1.3vw] opacity-0 ${
            activeSector === sector
              ? 'bg-black-100 text-white-100'
              : 'bg-grey-100 text-black-100 hover:bg-beige-200'
          }`}
        >
          {sector === 'all'
            ? t('references.filter_all')
            : t(`references.sector_${sector}`)}
        </button>
      ))}
    </div>
  )

  const filtersAndGridToggles = (
    <div
      className="flex flex-row items-start justify-end gap-[1.5vw] opacity-0"
      data-references-toolbar
    >
      <div className="relative flex flex-col items-end">
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          className="flex items-center gap-[0.4vw] bg-grey-100 rounded-full text-[0.78vw] text-black-100 font-semibold tracking-[0.03em] uppercase transition-all duration-300 py-[0.5vw] pl-[1.3vw] pr-[1vw] hover:bg-beige-200"
        >
          {t('references.sectors')}
          <span
            className={`inline-block text-[0.9vw] leading-none transition-transform duration-300 ${
              filterOpen ? 'rotate-45' : 'rotate-0'
            }`}
          >
            +
          </span>
        </button>
        {sectorPills}
      </div>
      <div className="flex flex-row shrink-0 items-center gap-[0.35vw] bg-grey-100 py-[0.45vw] px-[0.55vw]">
        <button
          type="button"
          aria-pressed={gridMode === 'two'}
          onClick={() => setGridMode('two')}
          className={`flex shrink-0 items-center justify-center w-[1.5vw] h-[1.5vw] p-0 transition-opacity duration-300 ${
            gridMode === 'two' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          }`}
        >
          <span
            className="flex items-center justify-center w-[65%] h-[65%] pointer-events-none"
            aria-hidden
          >
            <span className="grid grid-cols-2 gap-[12%] w-full h-full">
              <span
                className={`${gridMode === 'two' ? 'bg-black-100' : 'bg-black-100/50'} rounded-[0.06vw]`}
              />
              <span
                className={`${gridMode === 'two' ? 'bg-black-100' : 'bg-black-100/50'} rounded-[0.06vw]`}
              />
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-pressed={gridMode === 'four'}
          onClick={() => setGridMode('four')}
          className={`flex shrink-0 items-center justify-center w-[1.5vw] min-w-[1.25rem] h-[1.5vw] min-h-[1.25rem] p-0 transition-opacity duration-300 ${
            gridMode === 'four' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          }`}
        >
          <span
            className="flex items-center justify-center w-[65%] h-[65%] pointer-events-none"
            aria-hidden
          >
            <span className="grid grid-cols-2 grid-rows-2 gap-[14%] w-full h-full">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`${gridMode === 'four' ? 'bg-black-100' : 'bg-black-100/50'} rounded-[0.05vw]`}
                />
              ))}
            </span>
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <main className="overflow-x-hidden">
      <section
        ref={section1Ref}
        className="flex flex-col pt-[18.5vh] pb-[10%] px-[1.5vw]"
      >
        {gridMode === 'two' ? (
          <div className="relative w-full">
            <div className="absolute left-0 right-0 top-0 pointer-events-none z-20">
              <div className="pointer-events-auto">{filtersAndGridToggles}</div>
            </div>
            <div className="flex flex-col min-w-0 w-full pt-[0.5%]">
              <ProjectsGridTwo
                projects={projectsWithIndex}
                gridMode={gridMode}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-[2%]">
              {filtersAndGridToggles}
            </div>
            <ProjectsGridFour
              projects={projectsWithIndex}
              gridMode={gridMode}
            />
          </>
        )}
      </section>
    </main>
  )
}

export default ReferencesPage
