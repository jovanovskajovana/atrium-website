'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

import { PROJECTS } from '@/constants/projects'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

type LayoutRow = {
  type: 'pair' | 'pair-reverse' | 'single-center'
  items: number[]
}

const buildLayout = (total: number): LayoutRow[] => {
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

const ReferencesPage = () => {
  const t = useTranslations()
  const pageRef = useRef<HTMLElement>(null)

  const layout = buildLayout(PROJECTS.length)

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
    }, page)

    return () => ctx.revert()
  }, [])

  const renderCard = (index: number, width: string, aspect: string) => {
    const project = PROJECTS[index]

    return (
      <div
        key={project.slug}
        style={{ width }}
        className="opacity-0"
        data-ref-card
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
            style={{ aspectRatio: aspect }}
          >
            <Image
              src={project.image}
              alt={t(`home.section_4_project_${index + 1}`)}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="35vw"
            />
            <div className="absolute inset-0 bg-black-100/0 transition-colors duration-500 group-hover:bg-black-100/20" />
          </div>
          <p className="text-[0.92vw] font-[500] text-black-100 leading-[1.3] uppercase mt-[3%]">
            {t(`home.section_4_project_${index + 1}`)}
          </p>
          <p className="text-[0.75vw] text-black-100/40 uppercase">
            {t(`references.sector_${project.sector}`)}
          </p>
        </Link>
      </div>
    )
  }

  return (
    <main ref={pageRef} className="relative overflow-x-hidden">
      <section className="px-[2.2vw] pt-[20vh] pb-[10%] flex flex-col">
        {layout.map((row, rowIdx) => {
          switch (row.type) {
            case 'pair':
              return (
                <div
                  key={rowIdx}
                  data-ref-row
                  className="flex items-center gap-[2.2vw] mb-[6%] last:mb-0"
                >
                  {renderCard(row.items[0], '38.5vw', '3/4')}
                  {row.items[1] !== undefined &&
                    renderCard(row.items[1], '30vw', '4/5')}
                </div>
              )

            case 'pair-reverse':
              return (
                <div
                  key={rowIdx}
                  data-ref-row
                  className="flex items-center justify-end gap-[2.2vw] mb-[6%] last:mb-0"
                >
                  {row.items[0] !== undefined &&
                    renderCard(row.items[0], '28vw', '4/5')}
                  {row.items[1] !== undefined &&
                    renderCard(row.items[1], '38.5vw', '3/4')}
                </div>
              )

            case 'single-center':
              return (
                <div
                  key={rowIdx}
                  data-ref-row
                  className="flex justify-center mb-[6%] last:mb-0"
                >
                  {renderCard(row.items[0], '35vw', '3/4')}
                </div>
              )
          }
        })}
      </section>
    </main>
  )
}

export default ReferencesPage
