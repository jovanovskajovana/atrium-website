import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'

import { NEWS_ARTICLES, getNewsArticleBySlug } from '@/constants/news'
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
  const articleIndex = NEWS_ARTICLES.indexOf(article) + 1
  const title = t(`news.section_1_items.article_${articleIndex}_title`)
  const description = t(
    `news.section_1_items.article_${articleIndex}_description`
  )

  const dateFormatter = new Intl.DateTimeFormat(getDateLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="overflow-x-hidden">
      <section className="pt-[18.5vh] pb-[8%]">
        <div className="max-w-[52vw] mx-auto">
          <Link
            href="/news"
            className="inline-block text-[0.72vw] uppercase tracking-[0.14em] text-black-100/45 hover:text-black-100 transition-colors duration-300 mb-[2.5em]"
          >
            ← {t('news.back_to_list')}
          </Link>

          <h1 className="text-[2.4vw] font-[450] text-black-100 leading-[1.3] uppercase ml-[-0.2vw]">
            {title}
          </h1>

          <p className="text-[0.82vw] text-black-100/60 tracking-[0.1em] mt-[1.5%]">
            <time dateTime={article.date}>
              {dateFormatter.format(new Date(`${article.date}T12:00:00`))}
            </time>
          </p>
        </div>

        <div className="max-w-[52vw] mx-auto mt-[4%]">
          <div className="overflow-hidden aspect-[16/10]">
            <Image
              src={article.image}
              alt={title}
              width={1200}
              height={750}
              className="h-full w-full object-cover"
              sizes="52vw"
              priority
            />
          </div>
        </div>

        <div className="max-w-[52vw] mx-auto mt-[4%]">
          <p className="text-[0.92vw] text-black-100/60 leading-[1.8]">
            {description}
          </p>
        </div>
      </section>
    </main>
  )
}

export default NewsSlugPage
