export type ProjectSector =
  | 'hospitality'
  | 'residential'
  | 'office'
  | 'retail'
  | 'public'
  | 'health'

export interface Project {
  slug: string
  image: string
  sector: ProjectSector
}
