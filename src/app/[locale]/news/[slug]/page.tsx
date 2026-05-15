import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import IconArrow from '@/components/icons/icon-arrow'

import { NEWS_ARTICLES, getNewsArticleBySlug } from '@/constants/news'

import { Link } from '@/i18n/navigation'
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
            className="group inline-block text-[0.72vw] text-black-100/45 tracking-[0.14em] uppercase pl-0 mb-[2.5em] transition-[color,padding] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-black-100 hover:pl-[1vw]"
          >
            <IconArrow className="inline-block w-[0.7vw] h-[0.7vw] mr-[0.35em] rotate-[225deg] transition-transform duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-[0.25vw]" />
            {t('news.back_to_list')}
          </Link>

          <h1 className="text-[2.4vw] text-black-100 font-[450] leading-[1.3] uppercase ml-[-0.2vw]">
            {title}
          </h1>

          <p className="text-[0.82vw] text-black-100/40 tracking-[0.1em] mt-[1.5%]">
            <time dateTime={article.date}>
              {dateFormatter.format(new Date(`${article.date}T12:00:00`))}
            </time>
          </p>
        </div>

        <div className="max-w-[52vw] mt-[4%] mx-auto">
          <div className="overflow-hidden aspect-[16/10]">
            <Image
              src={article.image}
              alt={title}
              width={1200}
              height={750}
              className="w-full h-full object-cover"
              sizes="52vw"
              priority
            />
          </div>
        </div>

        <div className="max-w-[52vw] mt-[4%] mx-auto">
          <p className="text-[0.92vw] text-black-100/60 leading-[1.8]">
            {description}
          </p>
        </div>
      </section>
    </main>
  )
}

export default NewsSlugPage
