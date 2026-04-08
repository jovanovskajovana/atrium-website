'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLenis } from '@/components/LenisProvider'

import { NEWS_ARTICLES } from '@/constants/news'

import { Link } from '@/i18n/navigation'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

function dateLocaleForAppLocale(locale: string): string {
  if (locale === 'sl') return 'sl-SI'
  if (locale === 'de') return 'de-DE'
  return 'en-GB'
}

const NewsPage = () => {
  const t = useTranslations()
  const locale = useLocale()
  const lenis = useLenis()
  const pageRef = useRef<HTMLElement>(null)

  const dateFormatter = new Intl.DateTimeFormat(
    dateLocaleForAppLocale(locale),
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )

  useIsomorphicLayoutEffect(() => {
    const page = pageRef.current

    if (!page) return

    const ctx = gsap.context(() => {
      const label = page.querySelector('[data-news-label]')
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

      const rows = page.querySelectorAll('[data-news-row]')
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
          start: 'top 88%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      })

      requestAnimationFrame(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
      })
    }, page)

    return () => ctx.revert()
  }, [lenis])

  return (
    <main ref={pageRef} className="relative overflow-x-hidden">
      <section className="pt-[18.5vh] pb-[10%] px-[2.2vw]">
        <div className="max-w-[75vw] mx-auto">
          <p
            data-news-label
            className="text-[2.8vw] xs:text-[2.2vw] sm:text-[0.8rem] md:text-[0.92vw] text-black-100/40 tracking-[0.15em] uppercase mb-[2%] opacity-0"
          >
            {t('news.section_1_label')}
          </p>

          <ul className="list-none p-0 m-0 border-b border-black-100/10">
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
                  data-news-row
                  className="border-t border-black-100/10"
                >
                  <article>
                    <Link
                      href={{
                        pathname: '/news/[slug]',
                        params: { slug: article.slug },
                      }}
                      className="group/news grid w-full grid-cols-1 gap-y-[4vw] gap-x-[2vw] bg-transparent py-[2vw] px-[1vw] opacity-0 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] outline-none hover:bg-black-100 focus-visible:bg-black-100 sm:grid-cols-[minmax(2rem,4vw)_minmax(0,16vw)_1fr] sm:items-start md:grid-cols-[minmax(2.5rem,5vw)_minmax(0,16vw)_1fr_minmax(5rem,9vw)] md:gap-x-[2vw] focus-visible:ring-2 focus-visible:ring-black-100/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white-100"
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
