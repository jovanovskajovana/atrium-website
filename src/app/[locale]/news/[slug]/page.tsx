import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'

import { getNewsArticleBySlug } from '@/constants/news'
import { getDateLocale } from '@/i18n/locale'

interface NewsSlugPageProps {
  params: Promise<{ locale: string; slug: string }>
}

const NewsSlugPage = async ({ params }: NewsSlugPageProps) => {
  const { locale, slug } = await params
  const article = getNewsArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const t = await getTranslations()
  const title = t(`news.items.${article.slug}.title`)
  const description = t(`news.items.${article.slug}.description`)

  const dateFormatter = new Intl.DateTimeFormat(getDateLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="overflow-x-hidden">
      <article className="pt-[18.5vh] pb-[12%] px-[2.2vw] max-w-[48rem] mx-auto">
        <Link
          href="/news"
          className="inline-block text-[2.8vw] xs:text-[2.2vw] sm:text-[0.72rem] md:text-[0.72vw] uppercase tracking-[0.14em] text-black-100/45 hover:text-black-100 transition-colors duration-300 mb-[2.5em]"
        >
          ← {t('news.back_to_list')}
        </Link>

        <time
          dateTime={article.date}
          className="block text-[2.8vw] xs:text-[2.2vw] sm:text-[0.72rem] md:text-[0.72vw] uppercase tracking-[0.12em] text-black-100/45 mb-[1em]"
        >
          {dateFormatter.format(new Date(`${article.date}T12:00:00`))}
        </time>

        <h1 className="text-[7vw] xs:text-[6vw] sm:text-[2rem] md:text-[1.85vw] font-[450] text-black-100 leading-[1.15] uppercase mb-[6%]">
          {title}
        </h1>

        <div className="overflow-hidden aspect-[16/10] mb-[6%] bg-beige-100">
          <Image
            src={article.image}
            alt={title}
            width={1200}
            height={750}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </div>

        <p className="text-[3.4vw] xs:text-[3vw] sm:text-[1rem] md:text-[0.92vw] text-black-100/60 leading-[1.85] max-w-[40rem]">
          {description}
        </p>
      </article>
    </main>
  )
}

export default NewsSlugPage
