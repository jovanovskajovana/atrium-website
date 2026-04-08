'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

/* Sector filters — restore with UI below, activeSector state, .filter on list, effect dep, card key
const SECTORS = [
  'all',
  'residential',
  'hospitality',
  'health',
  'public',
  'office',
] as const
type Sector = (typeof SECTORS)[number]
*/

const ReferencesPage = () => {
  const lenis = useLenis()
  const pageRef = useRef<HTMLElement>(null)

  const [gridMode, setGridMode] = useState<ProjectsGridMode>('two')
  // const [activeSector, setActiveSector] = useState<Sector>('all')

  const projectsWithIndex: ProjectWithOriginalIndex[] = PROJECTS.map(
    (p, i) => ({
      ...p,
      originalIndex: i,
    })
  )
  // .filter((p) => activeSector === 'all' || p.sector === activeSector)

  useIsomorphicLayoutEffect(() => {
    const page = pageRef.current

    if (!page) return

    const ctx = gsap.context(() => {
      const rows = page.querySelectorAll('[data-ref-row]')

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

      const toolbar = page.querySelector('[data-references-toolbar]')

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
    }, page)

    return () => ctx.revert()
  }, [gridMode, lenis])

  /*
  const sectorFilters = (
    <div className="flex flex-row gap-[1vw]">
      {SECTORS.map((sector) => (
        <button
          key={sector}
          type="button"
          onClick={() => setActiveSector(sector)}
          className={`text-[0.75vw] uppercase whitespace-nowrap transition-colors duration-300 ${
            activeSector === sector
              ? 'text-black-100 font-[500]'
              : 'text-black-100/40 hover:text-black-100/60'
          }`}
        >
          {sector === 'all'
            ? t('references.filter_all')
            : t(`references.sector_${sector}`)}
        </button>
      ))}
    </div>
  )
  */

  const filtersAndGridToggles = (
    <div
      className="flex flex-row flex-wrap items-end justify-end gap-[1.5vw] opacity-0"
      data-references-toolbar
    >
      {/* {sectorFilters} */}
      <div className="flex shrink-0 flex-row items-center gap-[0.35vw] bg-beige-100 px-[0.55vw] py-[0.45vw]">
        <button
          type="button"
          aria-pressed={gridMode === 'two'}
          onClick={() => setGridMode('two')}
          className={`flex h-[1.5vw] w-[1.5vw] shrink-0 items-center justify-center p-0 transition-opacity duration-300 ${
            gridMode === 'two' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          }`}
        >
          <span
            className="flex h-[65%] w-[65%] items-center justify-center pointer-events-none"
            aria-hidden
          >
            <span className="grid grid-cols-2 h-full w-full gap-[12%]">
              <span
                className={`rounded-[0.06vw] ${gridMode === 'two' ? 'bg-black-100' : 'bg-black-100/50'}`}
              />
              <span
                className={`rounded-[0.06vw] ${gridMode === 'two' ? 'bg-black-100' : 'bg-black-100/50'}`}
              />
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-pressed={gridMode === 'four'}
          onClick={() => setGridMode('four')}
          className={`flex h-[1.5vw] w-[1.5vw] min-h-[1.25rem] min-w-[1.25rem] shrink-0 items-center justify-center p-0 transition-opacity duration-300 ${
            gridMode === 'four' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          }`}
        >
          <span
            className="flex items-center justify-center h-[65%] w-[65%] pointer-events-none"
            aria-hidden
          >
            <span className="grid grid-cols-2 grid-rows-2 gap-[14%] h-full w-full">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`rounded-[0.05vw] ${gridMode === 'four' ? 'bg-black-100' : 'bg-black-100/50'}`}
                />
              ))}
            </span>
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <main ref={pageRef} className="overflow-x-hidden">
      <section className="flex flex-col pt-[18.5vh] pb-[10%] px-[2.2vw]">
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
