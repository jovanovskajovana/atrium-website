import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'

import { NEWS_ARTICLES } from '@/constants/news'

function dateLocaleForAppLocale(locale: string): string {
  if (locale === 'sl') return 'sl-SI'
  if (locale === 'de') return 'de-DE'
  return 'en-GB'
}

const NewsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  const t = await getTranslations()

  const dateFormatter = new Intl.DateTimeFormat(
    dateLocaleForAppLocale(locale),
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )

  return (
    <main className="relative overflow-x-hidden">
      <section className="pt-[18.5vh] pb-[10%] px-[2.2vw]">
        <div className="max-w-[75vw] mx-auto">
          <p className="text-[2.8vw] xs:text-[2.2vw] sm:text-[0.8rem] md:text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase mb-[2%]">
            {t('news.label')}
          </p>

          <ul className="list-none p-0 m-0 border-b border-black-100/10">
            {NEWS_ARTICLES.map((article, index) => {
              const title = t(`news.items.${article.slug}.title`)
              const description = t(`news.items.${article.slug}.description`)
              const formattedDate = dateFormatter.format(
                new Date(`${article.date}T12:00:00`)
              )
              const num = String(index + 1).padStart(2, '0')

              return (
                <li key={article.slug} className="border-t border-black-100/10">
                  <article>
                    <Link
                      href={{
                        pathname: '/news/[slug]',
                        params: { slug: article.slug },
                      }}
                      className="group/news grid w-full grid-cols-1 gap-y-[4vw] gap-x-[2vw] bg-transparent px-[1.5vw] py-[2vw] transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] outline-none hover:bg-black-100 focus-visible:bg-black-100 sm:grid-cols-[minmax(2rem,4vw)_minmax(0,16vw)_1fr] sm:items-start md:grid-cols-[minmax(2.5rem,5vw)_minmax(0,16vw)_1fr_minmax(5rem,9vw)] md:gap-x-[2vw] md:px-[2vw] focus-visible:ring-2 focus-visible:ring-black-100/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white-100"
                    >
                      <span
                        className="text-[8vw] xs:text-[7vw] sm:text-[2.8vw] md:text-[3.2vw] font-light leading-none tabular-nums text-black-100/15 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/news:text-white-100/35 group-focus-visible/news:text-white-100/35 sm:pt-[0.15vw]"
                        aria-hidden
                      >
                        {num}
                      </span>

                      <div className="aspect-[4/3] w-full max-w-[280px] overflow-hidden bg-beige-100 sm:max-w-none sm:mx-0 mx-auto">
                        <Image
                          src={article.image}
                          alt={title}
                          width={720}
                          height={540}
                          className="h-full w-full object-cover"
                          sizes="(max-width: 640px) 280px, 16vw"
                        />
                      </div>

                      <div className="min-w-0 sm:pt-[0.25vw]">
                        <h2 className="text-[3.8vw] xs:text-[3.4vw] sm:text-[0.95rem] md:text-[1.1vw] font-[500] uppercase leading-[1.2] text-black-100 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/news:text-white-100 group-focus-visible/news:text-white-100">
                          {title}
                        </h2>
                        <p className="pt-[2%] text-[3.1vw] xs:text-[2.85vw] sm:text-[0.88rem] md:text-[0.92vw] leading-[1.8] text-black-100/60 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] max-w-none md:max-w-[32vw] group-hover/news:text-white-100/65 group-focus-visible/news:text-white-100/65">
                          {description}
                        </p>
                        <time
                          dateTime={article.date}
                          className="mt-[3%] block text-[2.6vw] xs:text-[2.4vw] sm:text-[0.68rem] md:text-[0.75vw] tracking-[0.06em] text-black-100/40 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden group-hover/news:text-white-100/45 group-focus-visible/news:text-white-100/45"
                        >
                          {formattedDate}
                        </time>
                      </div>

                      <time
                        dateTime={article.date}
                        className="hidden self-start pt-[0.35vw] text-right text-[0.75vw] tracking-[0.1em] text-black-100/40 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] md:block group-hover/news:text-white-100/45 group-focus-visible/news:text-white-100/45"
                      >
                        {formattedDate}
                      </time>
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default NewsPage
