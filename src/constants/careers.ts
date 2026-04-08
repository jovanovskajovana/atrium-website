export interface JobListing {
  slug: string
  key: string
  roleIndex: number
  sections: {
    description: number
    requirements: number
    offer: number
  }
}

export const JOB_LISTINGS: JobListing[] = [
  {
    slug: 'senior-furniture-designer',
    key: 'senior_furniture_designer',
    roleIndex: 1,
    sections: { description: 6, requirements: 5, offer: 4 },
  },
  {
    slug: 'cnc-programming-specialist',
    key: 'cnc_programming_specialist',
    roleIndex: 2,
    sections: { description: 6, requirements: 5, offer: 4 },
  },
  {
    slug: 'project-engineer-hospitality',
    key: 'project_engineer_hospitality',
    roleIndex: 3,
    sections: { description: 6, requirements: 5, offer: 4 },
  },
  {
    slug: 'senior-finishing-craftsperson',
    key: 'senior_finishing_craftsperson',
    roleIndex: 4,
    sections: { description: 6, requirements: 5, offer: 4 },
  },
  {
    slug: 'woodwork-engineer',
    key: 'woodwork_engineer',
    roleIndex: 5,
    sections: { description: 7, requirements: 5, offer: 4 },
  },
  {
    slug: 'furniture-assembler',
    key: 'furniture_assembler',
    roleIndex: 6,
    sections: { description: 7, requirements: 7, offer: 4 },
  },
]

export function getJobListingBySlug(slug: string): JobListing | undefined {
  return JOB_LISTINGS.find((l) => l.slug === slug)
}
