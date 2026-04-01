import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { PROJECTS } from '@/constants/projects'

interface Props {
  params: Promise<{ slug: string }>
}

const ProjectPage = async ({ params }: Props) => {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) return notFound()

  const t = await getTranslations()
  const index = PROJECTS.indexOf(project)

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t(`home.section_4_project_${index + 1}`)}</h1>
      </div>
    </main>
  )
}

export default ProjectPage
