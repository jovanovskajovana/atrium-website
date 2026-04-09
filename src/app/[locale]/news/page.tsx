'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { NEWS_ARTICLES } from '@/constants/news'

import { Link } from '@/i18n/navigation'
import { getDateLocale } from '@/i18n/locale'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const NewsPage = () => {
  const t = useTranslations()

  const locale = useLocale()

  const section1Ref = useRef<HTMLElement>(null)

  const dateFormatter = new Intl.DateTimeFormat(getDateLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  useIsomorphicLayoutEffect(() => {
    const section1 = section1Ref.current

    if (!section1) return

    const ctx = gsap.context(() => {
      const label = section1.querySelector('[data-news-label]')
      if (label) {
        gsap.fromTo(
          label,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.15,
          }
        )
      }

      const list = section1.querySelector('[data-news-list]')
      if (list) {
        gsap.fromTo(
          list,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.25,
          }
        )
      }

      const rows = section1.querySelectorAll('[data-news-row]')
      rows.forEach((row) => {
        const link = row.querySelector('a')
        if (!link) return

        gsap.set(link, { y: 52, opacity: 0 })

        const tl = gsap.timeline({ paused: true })
        tl.to(
          link,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0
        )

        const img = row.querySelector('img')
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.07 },
            { scale: 1, duration: 1.2, ease: 'power3.out' },
            0
          )
        }

        ScrollTrigger.create({
          trigger: row,
          start: 'top 98%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="overflow-x-hidden">
      <section ref={section1Ref} className="pt-[18.5vh] pb-[10%]">
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.92vw] text-black-100/40 font-[500] tracking-[0.15em] uppercase mb-[2%] opacity-0"
            data-news-label
          >
            {t('news.section_1_label')}
          </p>

          <ul
            className="border-b border-black-100/10 list-none p-0 m-0 opacity-0"
            data-news-list
          >
            {NEWS_ARTICLES.map((article, index) => {
              const n = index + 1
              const title = t(`news.section_1_items.article_${n}_title`)
              const description = t(
                `news.section_1_items.article_${n}_description`
              )
              const formattedDate = dateFormatter.format(
                new Date(`${article.date}T12:00:00`)
              )
              const num = String(index + 1).padStart(2, '0')

              return (
                <li
                  key={article.slug}
                  className="border-t border-black-100/10"
                  data-news-row
                >
                  <article>
                    <Link
                      href={{
                        pathname: '/news/[slug]',
                        params: { slug: article.slug },
                      }}
                      className="group/news grid grid-cols-[minmax(2.5rem,5vw)_minmax(0,16vw)_1fr_minmax(5rem,9vw)] gap-[2vw] items-start w-full py-[2vw] opacity-0 px-0 transition-[background-color,padding] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] outline-none hover:bg-black-100 hover:px-[1vw]"
                    >
                      <span
                        className="text-[3.2vw] text-black-100/15 font-light leading-none mt-[-2%] transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/news:text-white-100/35"
                        aria-hidden
                      >
                        {num}
                      </span>

                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={article.image}
                          alt={title}
                          width={720}
                          height={540}
                          className="h-full w-full object-cover"
                          sizes="16vw"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[1.1vw] font-[500] text-black-100 leading-[1.2] uppercase pt-[1%] transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/news:text-white-100">
                          {title}
                        </h3>
                        <p className="text-[0.92vw] text-black-100/60 leading-[1.8] max-w-[32vw] pt-[2%] transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/news:text-white-100/65">
                          {description}
                        </p>
                      </div>

                      <time
                        dateTime={article.date}
                        className="text-[0.75vw] text-black-100/60 tracking-[0.1em] pt-[4%] text-right transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/news:text-white-100/45"
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
