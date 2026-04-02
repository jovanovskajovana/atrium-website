'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

import { PROJECTS } from '@/constants/projects'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const SECTORS = ['all', 'residential', 'hospitality', 'office'] as const
type Sector = (typeof SECTORS)[number]

type Slot = { width: string; aspect: string; offsetTop: string }

type RowPattern = {
  justify: string
  gap?: string
  pr?: string
  pl?: string
  slots: Slot[]
}

const PATTERNS: RowPattern[] = [
  {
    justify: 'flex-start',
    gap: '2.2vw',
    slots: [
      { width: '38vw', aspect: '3/4', offsetTop: '0' },
      { width: '30vw', aspect: '4/5', offsetTop: '6vw' },
    ],
  },
  {
    justify: 'flex-end',
    pr: '10vw',
    slots: [{ width: '32vw', aspect: '3/4', offsetTop: '0' }],
  },
  {
    justify: 'flex-end',
    gap: '2.2vw',
    slots: [
      { width: '27vw', aspect: '4/5', offsetTop: '0' },
      { width: '36vw', aspect: '3/4', offsetTop: '7vw' },
    ],
  },
  {
    justify: 'flex-start',
    pl: '14vw',
    slots: [{ width: '34vw', aspect: '4/5', offsetTop: '0' }],
  },
  {
    justify: 'flex-start',
    gap: '2.2vw',
    pl: '4vw',
    slots: [
      { width: '34vw', aspect: '4/5', offsetTop: '5vw' },
      { width: '28vw', aspect: '3/4', offsetTop: '0' },
    ],
  },
  {
    justify: 'flex-end',
    slots: [{ width: '33vw', aspect: '3/4', offsetTop: '0' }],
  },
]

const buildLayout = (total: number) => {
  const rows: { pattern: RowPattern; indices: number[] }[] = []
  let idx = 0
  let step = 0

  while (idx < total) {
    const pattern = PATTERNS[step % PATTERNS.length]
    const count = Math.min(pattern.slots.length, total - idx)
    rows.push({
      pattern,
      indices: Array.from({ length: count }, (_, i) => idx + i),
    })
    idx += count
    step++
  }

  return rows
}

const ReferencesPage = () => {
  const t = useTranslations()
  const pageRef = useRef<HTMLElement>(null)
  const [activeSector, setActiveSector] = useState<Sector>('all')

  const filteredProjects = PROJECTS.map((p, i) => ({
    ...p,
    originalIndex: i,
  })).filter((p) => activeSector === 'all' || p.sector === activeSector)

  const layout = buildLayout(filteredProjects.length)

  useIsomorphicLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      const rows = page.querySelectorAll('[data-ref-row]')
      rows.forEach((row) => {
        const cards = row.querySelectorAll('[data-ref-card]')
        cards.forEach((card) => gsap.set(card, { y: 60, opacity: 0 }))

        const tl = gsap.timeline({ paused: true })
        cards.forEach((card, i) => {
          tl.to(
            card,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            i * 0.15
          )

          const img = card.querySelector('img')
          if (img) {
            tl.fromTo(
              img,
              { scale: 1.08 },
              { scale: 1, duration: 1.3, ease: 'power3.out' },
              i * 0.15
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
    }, page)

    return () => ctx.revert()
  }, [activeSector])

  return (
    <main ref={pageRef} className="relative overflow-x-hidden">
      <div
        className="absolute top-[16.5vh] left-1/2 -translate-x-1/2 text-center"
        data-hero-tagline
      >
        <h1 className="text-[2.6vw] font-[450] text-black-100 leading-[1.15] uppercase mb-[0.4em]">
          {t('references.title_1')} {t('references.title_2')}
        </h1>
        <div className="flex justify-center items-center">
          {SECTORS.map((sector, i) => (
            <div key={sector} className="flex items-center">
              {i > 0 && (
                <span className="text-[0.92vw] text-black-100/30 mx-[0.5vw]">
                  ·
                </span>
              )}
              <button
                onClick={() => setActiveSector(sector)}
                className={`text-[0.92vw] uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeSector === sector
                    ? 'text-black-100'
                    : 'text-black-100/40 hover:text-black-100/60'
                }`}
              >
                {sector === 'all'
                  ? t('references.filter_all')
                  : t(`references.sector_${sector}`)}
              </button>
            </div>
          ))}
        </div>
      </div>

      <section className="flex flex-col pt-[40vh] pb-[10%] px-[2.2vw]">
        <div className="flex flex-col">
          {layout.map((row, rowIdx) => (
            <div
              key={rowIdx}
              data-ref-row
              className="flex items-start mb-[8%] last:mb-0"
              style={{
                justifyContent: row.pattern.justify,
                gap: row.pattern.gap,
                paddingRight: row.pattern.pr,
                paddingLeft: row.pattern.pl,
              }}
            >
              {row.indices.map((projIdx, slotIdx) => {
                const slot = row.pattern.slots[slotIdx]
                const project = filteredProjects[projIdx]

                return (
                  <div
                    key={project.slug}
                    data-ref-card
                    style={{ width: slot.width, marginTop: slot.offsetTop }}
                  >
                    <Link
                      href={{
                        pathname: '/references/[slug]',
                        params: { slug: project.slug },
                      }}
                      className="group block"
                    >
                      <div
                        className="relative overflow-hidden w-full"
                        style={{ aspectRatio: slot.aspect }}
                      >
                        <Image
                          src={project.image}
                          alt={t(
                            `home.section_4_project_${project.originalIndex + 1}`
                          )}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-black-100/0 transition-colors duration-500 group-hover:bg-black-100/20" />
                      </div>
                      <p className="text-[0.92vw] font-[500] text-black-100 leading-[1.3] uppercase mt-[3%]">
                        {t(
                          `home.section_4_project_${project.originalIndex + 1}`
                        )}
                      </p>
                      <p className="text-[0.75vw] text-black-100/40 uppercase">
                        {t(`references.sector_${project.sector}`)}
                      </p>
                    </Link>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ReferencesPage
