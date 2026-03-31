import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { PROJECTS } from '@/constants/projects'

interface Props {
  params: { slug: string }
}

const ProjectPage = ({ params }: Props) => {
  const project = PROJECTS.find((p) => p.slug === params.slug)

  if (!project) return notFound()

  const t = useTranslations('home')
  const index = PROJECTS.indexOf(project)

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t(`section_4_project_${index + 1}`)}</h1>
      </div>
    </main>
  )
}

export default ProjectPage
