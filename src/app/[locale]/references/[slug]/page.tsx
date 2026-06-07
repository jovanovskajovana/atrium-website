import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import IconArrow from '@/components/icons/icon-arrow'

import { PROJECTS, getProjectBySlug } from '@/constants/projects'

import { Link } from '@/i18n/navigation'

import { buildPageMetadata, withSiteName } from '@/lib/metadata'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  const t = await getTranslations({ locale })

  return buildPageMetadata({
    locale,
    title: withSiteName(t(`references.project_${project.slug}`)),
    description: t(`references.project_${project.slug}_description`),
    href: { pathname: '/references/[slug]', params: { slug } },
    image: project.image,
  })
}

const ProjectPage = async ({ params }: Props) => {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) return notFound()

  const t = await getTranslations()

  const title = t(`references.project_${project.slug}`)
  const sector = t(`references.sector_${project.sector}`)
  const description = t(`references.project_${project.slug}_description`)

  const specs = [
    { label: t('references.detail.architecture'), value: project.architect },
    { label: t('references.detail.location'), value: project.location },
    { label: t('references.detail.year'), value: String(project.year) },
    { label: t('references.detail.client'), value: project.client },
  ]

  const galleryImages = project.gallery.slice(1)

  return (
    <main className="overflow-x-hidden">
      <section className="pt-[18.5vh] pb-[10%]">
        <div className="max-w-[75vw] mx-auto">
          <Link
            href="/references"
            className="group inline-block text-[0.72vw] text-black-100/45 tracking-[0.14em] uppercase pl-0 mb-[2.5em] transition-[color,padding] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-black-100 hover:pl-[1vw]"
          >
            <IconArrow className="inline-block w-[0.7vw] h-[0.7vw] mr-[0.35em] rotate-[225deg] transition-transform duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-[0.25vw]" />
            {t('references.detail.back')}
          </Link>

          <p className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase mb-[1.4%]">
            {sector}
          </p>
          <h1 className="text-[4vw] text-black-100 font-[500] leading-[1.1] uppercase ml-[-0.2vw]">
            {title}
          </h1>
          <p className="text-[1.1vw] text-black-100/75 leading-[1.85] max-w-[52vw] mt-[2.5%]">
            {description}
          </p>
        </div>

        <div className="max-w-[75vw] mt-[5%] mx-auto">
          <div className="overflow-hidden aspect-[16/10]">
            <Image
              src={project.image}
              alt={title}
              width={1600}
              height={1000}
              className="w-full h-full object-cover"
              sizes="75vw"
              priority
            />
          </div>
        </div>

        <div className="max-w-[75vw] mt-[5%] mx-auto">
          <p className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase mb-[2%]">
            {t('references.detail.overview')}
          </p>
          <dl className="grid grid-cols-4 gap-x-[1.5vw] gap-y-[2vw] border-t border-black-100/15 pt-[2.5%]">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <dt className="text-[0.75vw] text-black-100/50 font-[500] tracking-[0.2em] uppercase mb-[0.5vw]">
                  {spec.label}
                </dt>
                <dd className="text-[0.95vw] text-black-100/75 leading-[1.6]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {galleryImages.length > 0 && (
          <div className="max-w-[75vw] mt-[6%] mx-auto">
            <div className="grid grid-cols-2 gap-[1.5vw]">
              {galleryImages.map((src, i) => (
                <div
                  key={src}
                  className={`overflow-hidden aspect-[4/3] ${
                    galleryImages.length % 2 !== 0 &&
                    i === galleryImages.length - 1
                      ? 'col-span-2 aspect-[16/9]'
                      : ''
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${title} — ${i + 1}`}
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    sizes="38vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default ProjectPage
