import type { Project } from '@/interfaces/project'

export interface IconProps {
  fillColor?: string
  className?: string
}

export type ProjectsGridMode = 'two' | 'four'

export interface ProjectsLayoutRow {
  type: 'pair' | 'pair-reverse' | 'single-center'
  items: number[]
}

export interface ProjectWithOriginalIndex extends Project {
  originalIndex: number
}
