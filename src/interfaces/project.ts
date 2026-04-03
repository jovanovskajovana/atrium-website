export type ProjectSector =
  | 'residential'
  | 'hospitality'
  | 'health'
  | 'public'
  | 'office'

export interface Project {
  slug: string
  image: string
  sector: ProjectSector
}
