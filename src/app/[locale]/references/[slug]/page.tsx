import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { PROJECTS } from '@/constants/projects'

import { buildPageMetadata, withSiteName } from '@/lib/metadata'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  const t = await getTranslations({ locale })

  return buildPageMetadata({
    locale,
    title: withSiteName(t(`references.project_${project.slug}`)),
    description: t('metadata.references_project.description'),
    href: { pathname: '/references/[slug]', params: { slug } },
    image: project.image,
  })
}

const ProjectPage = async ({ params }: Props) => {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) return notFound()

  const t = await getTranslations()

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>{t(`references.project_${project.slug}`)}</h1>
      </div>
    </main>
  )
}

export default ProjectPage
