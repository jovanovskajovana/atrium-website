'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import type { ProjectWithOriginalIndex } from '@/interfaces/ui'

export interface ProjectCardProps {
  project: ProjectWithOriginalIndex
  width?: string
  aspect: string
  sizes: string
}

export const ProjectCard = ({
  project,
  width,
  aspect,
  sizes,
}: ProjectCardProps) => {
  const t = useTranslations()

  const titleKey = project.originalIndex + 1
  const projectTitle = t(`home.section_4_project_${titleKey}`)

  return (
    <div
      style={width ? { width } : undefined}
      className={`min-w-0 ${width ? '' : 'w-full'} opacity-0`}
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
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: aspect }}
        >
          <Image
            src={project.image}
            alt={projectTitle}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={sizes}
          />
          <div className="absolute inset-0 bg-black-100/0 transition-colors duration-500 group-hover:bg-black-100/20" />
        </div>
        <p className="text-[1vw] font-[500] text-black-100 leading-[1.3] uppercase mt-[2.5%]">
          {projectTitle}
        </p>
        <p className="text-[0.82vw] font-[450] text-black-100/50 uppercase mt-[1%]">
          {t(`references.sector_${project.sector}`)}
        </p>
      </Link>
    </div>
  )
}
