'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

import { PROJECTS } from '@/constants/projects'

import { useLenis } from '@/components/LenisProvider'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

type GridMode = 'two' | 'four'

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

type ProjectWithIndex = (typeof PROJECTS)[number] & { originalIndex: number }

type LayoutRow = {
  type: 'pair' | 'pair-reverse' | 'single-center'
  items: number[]
}

const buildTwoLayout = (total: number): LayoutRow[] => {
  const cycle: LayoutRow['type'][] = [
    'pair',
    'single-center',
    'pair-reverse',
    'single-center',
  ]
  const rows: LayoutRow[] = []
  let idx = 0
  let step = 0

  while (idx < total) {
    const type = cycle[step % cycle.length]
    const count = type.includes('pair') ? Math.min(2, total - idx) : 1
    rows.push({ type, items: Array.from({ length: count }, (_, i) => idx + i) })
    idx += count
    step++
  }

  return rows
}

const buildFourLayout = (total: number): number[][] => {
  const rows: number[][] = []
  for (let i = 0; i < total; i += 4) {
    const count = Math.min(4, total - i)
    rows.push(Array.from({ length: count }, (_, j) => i + j))
  }
  return rows
}

const gridToggleIconBox =
  'pointer-events-none flex h-[65%] w-[65%] items-center justify-center'

const GridPreviewTwo = ({ active }: { active: boolean }) => (
  <span className={gridToggleIconBox} aria-hidden>
    <span className="grid grid-cols-2 h-full w-full gap-[12%]">
      <span
        className={`rounded-[0.06vw] ${active ? 'bg-black-100' : 'bg-black-100/50'}`}
      />
      <span
        className={`rounded-[0.06vw] ${active ? 'bg-black-100' : 'bg-black-100/50'}`}
      />
    </span>
  </span>
)

const GridPreviewFour = ({ active }: { active: boolean }) => (
  <span className={gridToggleIconBox} aria-hidden>
    <span className="grid grid-cols-2 grid-rows-2 gap-[14%] h-full w-full">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`rounded-[0.05vw] ${active ? 'bg-black-100' : 'bg-black-100/50'}`}
        />
      ))}
    </span>
  </span>
)

const ReferencesPage = () => {
  const t = useTranslations()
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis
  const pageRef = useRef<HTMLElement>(null)
  const [gridMode, setGridMode] = useState<GridMode>('two')
  // const [activeSector, setActiveSector] = useState<Sector>('all')

  const filteredProjects: ProjectWithIndex[] = PROJECTS.map((p, i) => ({
    ...p,
    originalIndex: i,
  }))
  // .filter((p) => activeSector === 'all' || p.sector === activeSector)

  const twoLayout = buildTwoLayout(filteredProjects.length)
  const fourLayout = buildFourLayout(filteredProjects.length)

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
        lenisRef.current?.resize()
        ScrollTrigger.refresh()
      })
    }, page)

    return () => ctx.revert()
  }, [gridMode])

  const renderCard = (
    project: ProjectWithIndex,
    opts: { width?: string; aspect: string; sizes: string }
  ) => {
    const titleKey = project.originalIndex + 1

    return (
      <div
        key={`${gridMode}-${project.slug}`}
        style={opts.width ? { width: opts.width } : undefined}
        className={`opacity-0 min-w-0 ${opts.width ? '' : 'w-full'}`}
        data-ref-card
      >
        <Link
          href={{
            pathname: '/references/[slug]',
            params: { slug: project.slug },
          }}
          className="group block"
          data-project-item
        >
          <div
            className="relative overflow-hidden w-full"
            style={{ aspectRatio: opts.aspect }}
          >
            <Image
              src={project.image}
              alt={t(`home.section_4_project_${titleKey}`)}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes={opts.sizes}
            />
            <div className="absolute inset-0 bg-black-100/0 transition-colors duration-500 group-hover:bg-black-100/20" />
          </div>
          <p className="text-[0.92vw] font-[500] text-black-100 leading-[1.3] uppercase mt-[3%]">
            {t(`home.section_4_project_${titleKey}`)}
          </p>
          <p className="text-[0.75vw] text-black-100/40 uppercase">
            {t(`references.sector_${project.sector}`)}
          </p>
        </Link>
      </div>
    )
  }

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

  const gridToggleGroup = (
    <div className="flex shrink-0 flex-row items-center gap-[0.35vw] bg-beige-100 px-[0.55vw] py-[0.45vw]">
      <button
        type="button"
        aria-pressed={gridMode === 'two'}
        onClick={() => setGridMode('two')}
        className={`flex h-[1.5vw] w-[1.5vw] min-h-[1.25rem] min-w-[1.25rem] shrink-0 items-center justify-center p-0 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-100/40 ${
          gridMode === 'two' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
        }`}
      >
        <GridPreviewTwo active={gridMode === 'two'} />
      </button>
      <button
        type="button"
        aria-pressed={gridMode === 'four'}
        onClick={() => setGridMode('four')}
        className={`flex h-[1.5vw] w-[1.5vw] min-h-[1.25rem] min-w-[1.25rem] shrink-0 items-center justify-center p-0 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-100/40 ${
          gridMode === 'four' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
        }`}
      >
        <GridPreviewFour active={gridMode === 'four'} />
      </button>
    </div>
  )

  const filtersAndGridToggles = (
    <div
      className="opacity-0 flex flex-row flex-wrap items-end justify-end gap-[1.5vw]"
      data-references-toolbar
    >
      {/* {sectorFilters} */}
      {gridToggleGroup}
    </div>
  )

  const twoLayoutContent = twoLayout.map((row, rowIdx) => {
    switch (row.type) {
      case 'pair':
        return (
          <div
            key={`two-${rowIdx}`}
            data-ref-row
            className="flex items-center gap-[2.2vw] mb-[6%] last:mb-0"
          >
            {renderCard(filteredProjects[row.items[0]], {
              width: '38.5vw',
              aspect: '3/4',
              sizes: '35vw',
            })}
            {row.items[1] !== undefined &&
              renderCard(filteredProjects[row.items[1]], {
                width: '30vw',
                aspect: '4/5',
                sizes: '35vw',
              })}
          </div>
        )

      case 'pair-reverse':
        return (
          <div
            key={`two-${rowIdx}`}
            data-ref-row
            className="flex items-center justify-end gap-[2.2vw] mb-[6%] last:mb-0"
          >
            {row.items[0] !== undefined &&
              renderCard(filteredProjects[row.items[0]], {
                width: '28vw',
                aspect: '4/5',
                sizes: '35vw',
              })}
            {row.items[1] !== undefined &&
              renderCard(filteredProjects[row.items[1]], {
                width: '38.5vw',
                aspect: '3/4',
                sizes: '35vw',
              })}
          </div>
        )

      case 'single-center':
        return (
          <div
            key={`two-${rowIdx}`}
            data-ref-row
            className="flex justify-center mb-[6%] last:mb-0"
          >
            {renderCard(filteredProjects[row.items[0]], {
              width: '35vw',
              aspect: '3/4',
              sizes: '35vw',
            })}
          </div>
        )
    }
  })

  return (
    <main ref={pageRef} className="relative overflow-x-hidden">
      <section className="px-[2.2vw] pt-[18.5vh] pb-[10%] flex flex-col">
        {gridMode === 'two' ? (
          <div className="relative w-full">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-20">
              <div className="pointer-events-auto">{filtersAndGridToggles}</div>
            </div>
            <div className="flex min-w-0 w-full flex-col pt-[0.5%]">
              {twoLayoutContent}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-[2%] flex justify-end">
              {filtersAndGridToggles}
            </div>
            {fourLayout.map((indices, rowIdx) => (
              <div
                key={`four-${rowIdx}`}
                data-ref-row
                className="grid grid-cols-4 gap-[1.5vw] mb-[4%] last:mb-0"
              >
                {indices.map((projectIndex) =>
                  renderCard(filteredProjects[projectIndex], {
                    aspect: '3/4',
                    sizes: '22vw',
                  })
                )}
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  )
}

export default ReferencesPage
