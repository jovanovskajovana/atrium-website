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

const COL_OFFSETS = ['pt-[10vw]', 'pt-[24vw]', 'pt-0']

const ReferencesPage = () => {
  const t = useTranslations()
  const pageRef = useRef<HTMLElement>(null)

  const columns = [0, 1, 2].map((col) =>
    PROJECTS.filter((_, i) => i % 3 === col)
  )

  useIsomorphicLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      const cards = page.querySelectorAll('[data-ref-card]')
      cards.forEach((card) => {
        gsap.set(card, { y: 60, opacity: 0 })

        const tl = gsap.timeline({ paused: true })
        tl.to(card, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        })

        const img = card.querySelector('img')
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.08 },
            { scale: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      })
    }, page)

    return () => ctx.revert()
  }, [])

  const renderCard = (
    project: (typeof PROJECTS)[number],
    originalIndex: number
  ) => {
    const num = String(originalIndex + 1).padStart(2, '0')

    return (
      <div key={project.slug} data-ref-card>
        <Link
          href={{
            pathname: '/references/[slug]',
            params: { slug: project.slug },
          }}
          className="group block"
        >
          <p className="text-[0.75vw] text-black-100/40 tracking-[0.15em] mb-[2%]">
            {num}
          </p>
          <div className="relative overflow-hidden aspect-[3/4]">
            <Image
              src={project.image}
              alt={t(`home.section_4_project_${originalIndex + 1}`)}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="30vw"
            />
            <div className="absolute inset-0 bg-black-100/0 transition-colors duration-500 group-hover:bg-black-100/20" />
          </div>
          <p className="text-[0.92vw] font-[500] text-black-100 leading-[1.3] uppercase mt-[3%]">
            {t(`home.section_4_project_${originalIndex + 1}`)}
          </p>
          <p className="text-[0.75vw] text-black-100/40 uppercase mt-[1%]">
            {t(`references.sector_${project.sector}`)}
          </p>
        </Link>
      </div>
    )
  }

  return (
    <main ref={pageRef} className="relative overflow-x-hidden">
      <section className="px-[10vw] pt-[20vh] pb-[10%]">
        <div className="grid grid-cols-3 gap-x-[4vw]">
          {columns.map((colProjects, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-[10vw] ${COL_OFFSETS[colIdx]}`}
            >
              {colProjects.map((project) => {
                const index = PROJECTS.indexOf(project)
                return renderCard(project, index)
              })}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ReferencesPage
