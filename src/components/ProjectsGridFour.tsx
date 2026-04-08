'use client'

import { ProjectCard } from './ProjectCard'

import type {
  ProjectWithOriginalIndex,
  ProjectsGridMode,
} from '@/interfaces/ui'

export interface ProjectsGridFourProps {
  projects: ProjectWithOriginalIndex[]
  gridMode: ProjectsGridMode
}

export const ProjectsGridFour = ({
  projects,
  gridMode,
}: ProjectsGridFourProps) => {
  const buildFourLayout = (total: number): number[][] => {
    const rows: number[][] = []

    for (let i = 0; i < total; i += 4) {
      const count = Math.min(4, total - i)

      rows.push(Array.from({ length: count }, (_, j) => i + j))
    }

    return rows
  }

  const fourLayout = buildFourLayout(projects.length)

  return (
    <>
      {fourLayout.map((indices, rowIdx) => (
        <div
          key={`four-${rowIdx}`}
          className="grid grid-cols-4 gap-[1.5vw] mb-[4%] last:mb-0"
          data-ref-row
        >
          {indices.map((projectIndex) => (
            <ProjectCard
              key={`${gridMode}-${projects[projectIndex].slug}`}
              project={projects[projectIndex]}
              aspect="3/4"
              sizes="22vw"
            />
          ))}
        </div>
      ))}
    </>
  )
}
