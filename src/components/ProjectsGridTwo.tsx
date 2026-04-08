'use client'

import { ProjectCard } from './ProjectCard'

import type {
  ProjectWithOriginalIndex,
  ProjectsGridMode,
  ProjectsLayoutRow,
} from '@/interfaces/ui'

export interface ProjectsGridTwoProps {
  projects: ProjectWithOriginalIndex[]
  gridMode: ProjectsGridMode
}

export const ProjectsGridTwo = ({
  projects,
  gridMode,
}: ProjectsGridTwoProps) => {
  const buildTwoLayout = (total: number): ProjectsLayoutRow[] => {
    const cycle: ProjectsLayoutRow['type'][] = [
      'pair',
      'single-center',
      'pair-reverse',
      'single-center',
    ]

    const rows: ProjectsLayoutRow[] = []

    let idx = 0
    let step = 0

    while (idx < total) {
      const type = cycle[step % cycle.length]
      const count = type.includes('pair') ? Math.min(2, total - idx) : 1

      rows.push({
        type,
        items: Array.from({ length: count }, (_, i) => idx + i),
      })

      idx += count
      step++
    }

    return rows
  }

  const twoLayout = buildTwoLayout(projects.length)

  return (
    <>
      {twoLayout.map((row, rowIdx) => {
        switch (row.type) {
          case 'pair':
            return (
              <div
                key={`two-${rowIdx}`}
                className="flex items-center gap-[2.2vw] mb-[6%] last:mb-0"
                data-ref-row
              >
                <ProjectCard
                  key={`${gridMode}-${projects[row.items[0]].slug}`}
                  project={projects[row.items[0]]}
                  width="38.5vw"
                  aspect="3/4"
                  sizes="35vw"
                />
                {row.items[1] !== undefined && (
                  <ProjectCard
                    key={`${gridMode}-${projects[row.items[1]].slug}`}
                    project={projects[row.items[1]]}
                    width="30vw"
                    aspect="4/5"
                    sizes="35vw"
                  />
                )}
              </div>
            )

          case 'pair-reverse':
            return (
              <div
                key={`two-${rowIdx}`}
                className="flex items-center justify-end gap-[2.2vw] mb-[6%] last:mb-0"
                data-ref-row
              >
                {row.items[0] !== undefined && (
                  <ProjectCard
                    key={`${gridMode}-${projects[row.items[0]].slug}`}
                    project={projects[row.items[0]]}
                    width="28vw"
                    aspect="4/5"
                    sizes="35vw"
                  />
                )}
                {row.items[1] !== undefined && (
                  <ProjectCard
                    key={`${gridMode}-${projects[row.items[1]].slug}`}
                    project={projects[row.items[1]]}
                    width="38.5vw"
                    aspect="3/4"
                    sizes="35vw"
                  />
                )}
              </div>
            )

          case 'single-center':
            return (
              <div
                key={`two-${rowIdx}`}
                className="flex justify-center mb-[6%] last:mb-0"
                data-ref-row
              >
                <ProjectCard
                  key={`${gridMode}-${projects[row.items[0]].slug}`}
                  project={projects[row.items[0]]}
                  width="35vw"
                  aspect="3/4"
                  sizes="35vw"
                />
              </div>
            )
        }
      })}
    </>
  )
}
