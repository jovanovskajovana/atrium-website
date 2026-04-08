export const CAREER_ROLE_IDS = [
  'senior-furniture-designer',
  'cnc-specialist',
  'project-engineer',
  'finishing-craftsperson',
] as const

export type CareerRoleId = (typeof CAREER_ROLE_IDS)[number]
