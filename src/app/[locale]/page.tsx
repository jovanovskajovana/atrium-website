'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import Button from '@/components/Button'
import IntroAnimation from '@/components/IntroAnimation'

import { COLLAGE_REST, IMG9 } from '@/constants/intro-animation'
import { FEATURED_PROJECTS } from '@/constants/projects'

import useIntroAnimation from '@/hooks/useIntroAnimation'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const t = useTranslations()
  const locale = useLocale()

  const { showIntro, completeIntro } = useIntroAnimation()

  const introJustEndedRef = useRef(false)
  const img9Ref = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const section4Ref = useRef<HTMLElement>(null)
  const section5Ref = useRef<HTMLElement>(null)
  const section6Ref = useRef<HTMLElement>(null)
  const section7Ref = useRef<HTMLElement>(null)
  const section8Ref = useRef<HTMLElement>(null)
  const section9Ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (showIntro) {
      introJustEndedRef.current = true
      window.scrollTo(0, 0)
      return
    }

    const comingFromIntro = introJustEndedRef.current
    introJustEndedRef.current = false

    const section1 = section1Ref.current
    const section2 = section2Ref.current
    const img9 = img9Ref.current
    if (!section1 || !section2 || !img9) return

    const ctx = gsap.context(() => {
      const heroTagline = document.querySelector('[data-hero-tagline]')
      const collageItems = section1.querySelectorAll('[data-collage-item]')
      const collageBg = section1.querySelector('[data-collage-bg]')

      if (!comingFromIntro) {
        if (collageBg) {
          gsap.set(collageBg, { y: 30, autoAlpha: 0 })
          gsap.to(collageBg, {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
          })
        }

        if (collageItems.length) {
          gsap.set(collageItems, { y: 30, autoAlpha: 0 })
          gsap.to(collageItems, {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            stagger: 0.05,
          })
        }

        if (heroTagline) {
          gsap.fromTo(
            heroTagline,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
          )
        }
      }

      const img9Rect = img9.getBoundingClientRect()
      const img9Pos = section1.querySelector('[data-img9-position]')
      const colRect = img9Pos ? img9Pos.getBoundingClientRect() : img9Rect

      const fromScale = colRect.width / img9Rect.width
      const fromX = colRect.left - img9Rect.left
      const fromY = colRect.top - img9Rect.top

      gsap.set(img9, {
        transformOrigin: '0% 0%',
        x: fromX,
        y: fromY,
        scale: fromScale,
        autoAlpha: 0,
      })

      const imgEl = img9.querySelector('img')

      const scatterDirs = [
        { x: -300, y: -200, rotation: -12, scale: 1.5 },
        { x: 300, y: -200, rotation: 12, scale: 1.5 },
      ]

      const s1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section1,
          start: 'top top',
          end: '+=50%',
          scrub: 0.5,
        },
      })

      s1Tl.to(
        img9,
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: 'none',
        },
        0
      )

      if (imgEl) {
        s1Tl.fromTo(
          imgEl,
          { scale: 1 },
          { scale: 1.15, duration: 1, ease: 'none' },
          0
        )
      }

      collageItems.forEach((item, i) => {
        const dir = scatterDirs[i % scatterDirs.length]
        s1Tl.to(item, { ...dir, opacity: 0, duration: 1 }, 0)
      })

      if (collageBg) {
        s1Tl.to(
          collageBg,
          {
            y: -250,
            rotation: 5,
            scale: 1.4,
            opacity: 0,
            duration: 1,
          },
          0
        )
      }

      if (heroTagline) {
        s1Tl.to(
          heroTagline,
          { y: -60, opacity: 0, duration: 0.6, ease: 'power2.inOut' },
          0
        )
      }

      const s2Label = section2.querySelector('[data-section-label]')
      const s2Titles = section2.querySelectorAll('[data-s2-title]')
      const textBlock = section2.querySelector('[data-text-reveal]')

      if (textBlock && s2Titles.length) {
        if (s2Label) gsap.set(s2Label, { y: 20, opacity: 0 })
        gsap.set(s2Titles, { y: 20, opacity: 0 })

        const s2Tl = gsap.timeline({ paused: true })

        if (s2Label) {
          s2Tl.to(
            s2Label,
            { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
            0
          )
        }

        s2Tl.to(
          s2Titles,
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: 'power3.out',
          },
          0
        )

        ScrollTrigger.create({
          trigger: textBlock,
          start: 'top 85%',
          onEnter: () => s2Tl.play(),
          onLeaveBack: () => s2Tl.reverse(),
        })
      }

      const heroText = section2.querySelector(
        '[data-s2-hero-text]'
      ) as HTMLElement | null
      if (heroText) {
        const raw = heroText.textContent || ''
        heroText.innerHTML = ''
        const words = raw.split(/(\s+)/)
        words.forEach((segment) => {
          if (/^\s+$/.test(segment)) {
            heroText.appendChild(document.createTextNode(segment))
            return
          }
          const wordWrap = document.createElement('span')
          wordWrap.style.display = 'inline'
          for (const char of segment) {
            const s = document.createElement('span')
            s.textContent = char
            s.style.willChange = 'opacity'
            wordWrap.appendChild(s)
          }
          heroText.appendChild(wordWrap)
        })
        const chars = heroText.querySelectorAll('span > span')
        gsap.set(chars, { opacity: 0.12 })
        gsap.to(chars, {
          opacity: 1,
          duration: 2,
          stagger: 0.04,
          scrollTrigger: {
            trigger: heroText,
            start: 'top 95%',
            end: 'bottom 15%',
            scrub: 1,
            fastScrollEnd: true,
          },
        })
      }

      const btnBlock = section2.querySelector('[data-s2-cta-row]')

      if (btnBlock) {
        gsap.set(btnBlock, { y: 40, opacity: 0 })
        ScrollTrigger.create({
          trigger: btnBlock,
          start: 'top 95%',
          onEnter: () =>
            gsap.to(btnBlock, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
            }),
          onLeaveBack: () =>
            gsap.to(btnBlock, {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
            }),
        })
      }

      const section3 = section3Ref.current
      if (section3) {
        const s3Image = section3.querySelector('[data-s3-image]')
        const s3ImgEl = s3Image?.querySelector('img')
        const s3Label = section3.querySelector('[data-s3-label]')
        const s3Title = section3.querySelector('[data-s3-title]')
        const s3Subtitle = section3.querySelector('[data-s3-subtitle]')

        if (s3Image) gsap.set(s3Image, { y: 40, autoAlpha: 0 })
        if (s3Label) gsap.set(s3Label, { y: 20, opacity: 0 })
        if (s3Title) gsap.set(s3Title, { y: 40, opacity: 0 })
        if (s3Subtitle) gsap.set(s3Subtitle, { y: 20, opacity: 0 })

        const s3ImgTl = gsap.timeline({ paused: true })

        if (s3Image) {
          s3ImgTl.to(s3Image, {
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: 'power3.out',
          })
        }
        if (s3ImgEl) {
          s3ImgTl.fromTo(
            s3ImgEl,
            { scale: 1.08 },
            { scale: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }

        const s3TextTl = gsap.timeline({ paused: true })

        if (s3Label) {
          s3TextTl.to(
            s3Label,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
        }
        if (s3Title) {
          s3TextTl.to(
            s3Title,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0.1
          )
        }
        if (s3Subtitle) {
          s3TextTl.to(
            s3Subtitle,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.25
          )
        }

        ScrollTrigger.create({
          trigger: s3Label || s3Title,
          start: 'top 90%',
          onEnter: () => s3TextTl.play(),
          onLeaveBack: () => s3TextTl.reverse(),
        })

        ScrollTrigger.create({
          trigger: s3Image,
          start: 'top 85%',
          onEnter: () => s3ImgTl.play(),
          onLeaveBack: () => s3ImgTl.reverse(),
        })

        const s3Body = section3.querySelector('[data-s3-body]')
        if (s3Body) {
          gsap.set(s3Body, { y: 30, opacity: 0 })
          ScrollTrigger.create({
            trigger: s3Body,
            start: 'top 90%',
            onEnter: () =>
              gsap.to(s3Body, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
              }),
            onLeaveBack: () =>
              gsap.to(s3Body, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
              }),
          })
        }
      }

      const section4 = section4Ref.current
      if (section4) {
        const projectItems = section4.querySelectorAll('[data-project-item]')
        const projectLink = section4.querySelector('[data-project-link]')

        const vw = window.innerWidth
        const s4Tl = gsap.timeline({ paused: true })

        projectItems.forEach((item, i) => {
          gsap.set(item, { x: vw, opacity: 0 })
          s4Tl.to(
            item,
            { x: 0, opacity: 1, duration: 2, ease: 'power2.inOut' },
            i * 0.08
          )
        })

        if (projectLink) {
          gsap.set(projectLink, { y: 20, opacity: 0 })
          ScrollTrigger.create({
            trigger: projectLink,
            start: 'top 90%',
            onEnter: () =>
              gsap.to(projectLink, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
              }),
            onLeaveBack: () =>
              gsap.to(projectLink, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
              }),
          })
        }

        ScrollTrigger.create({
          trigger: section4,
          start: 'top 85%',
          onEnter: () => s4Tl.play(),
          onLeaveBack: () => s4Tl.reverse(),
        })
      }

      const section5 = section5Ref.current
      if (section5) {
        const pillarLabel = section5.querySelector('[data-section-label]')
        const numbers = section5.querySelectorAll('[data-pillar-num]')
        const titles = section5.querySelectorAll('[data-pillar-title]')
        const texts = section5.querySelectorAll('[data-pillar-text]')

        if (pillarLabel) gsap.set(pillarLabel, { y: 20, opacity: 0 })
        gsap.set(numbers, { y: 60, opacity: 0 })
        gsap.set(titles, { y: 30, opacity: 0 })
        gsap.set(texts, { y: 20, opacity: 0 })

        const tl = gsap.timeline({ paused: true })

        if (pillarLabel) {
          tl.to(
            pillarLabel,
            { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
            0
          )
        }

        tl.to(
          numbers,
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            stagger: 0.15,
          },
          0.3
        )

        tl.to(
          titles,
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.15,
          },
          0.5
        )

        tl.to(
          texts,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.15,
          },
          0.7
        )

        ScrollTrigger.create({
          trigger: section5,
          start: 'top 85%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        })
      }

      const section6 = section6Ref.current
      if (section6) {
        const prodLabel = section6.querySelector('[data-production-label]')
        const prodTitle = section6.querySelector('[data-production-title]')
        const prodText = section6.querySelector('[data-production-text]')
        const prodBtn = section6.querySelector('[data-production-btn]')

        gsap.set(section6, { y: 60, autoAlpha: 0 })
        if (prodLabel) gsap.set(prodLabel, { y: 20, opacity: 0 })
        if (prodTitle) gsap.set(prodTitle, { y: 40, opacity: 0 })
        if (prodText) gsap.set(prodText, { y: 20, opacity: 0 })
        if (prodBtn) gsap.set(prodBtn, { y: 20, opacity: 0 })

        const prodTl = gsap.timeline({ paused: true })

        prodTl.to(
          section6,
          { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' },
          0
        )

        if (prodLabel) {
          prodTl.to(
            prodLabel,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.3
          )
        }
        if (prodTitle) {
          prodTl.to(
            prodTitle,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0.4
          )
        }
        if (prodText) {
          prodTl.to(
            prodText,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.6
          )
        }
        if (prodBtn) {
          prodTl.to(
            prodBtn,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.8
          )
        }

        ScrollTrigger.create({
          trigger: section6,
          start: 'top 80%',
          onEnter: () => prodTl.play(),
          onLeaveBack: () => prodTl.reverse(),
        })
      }

      const section7 = section7Ref.current
      if (section7) {
        const designTitle = section7.querySelector('[data-design-title]')
        const designText = section7.querySelector('[data-design-text]')
        const designOptions = section7.querySelector('[data-design-options]')

        if (designTitle) gsap.set(designTitle, { y: 40, opacity: 0 })
        if (designText) gsap.set(designText, { y: 20, opacity: 0 })
        if (designOptions) gsap.set(designOptions, { y: 40, opacity: 0 })

        const designTl = gsap.timeline({ paused: true })

        if (designTitle) {
          designTl.to(
            designTitle,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0
          )
        }
        if (designText) {
          designTl.to(
            designText,
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            0.2
          )
        }
        if (designOptions) {
          designTl.to(
            designOptions,
            { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
            0.4
          )
        }

        ScrollTrigger.create({
          trigger: section7,
          start: 'top 80%',
          onEnter: () => designTl.play(),
          onLeaveBack: () => designTl.reverse(),
        })
      }

      const section8 = section8Ref.current
      if (section8) {
        const susItems = section8.querySelectorAll('[data-sus-item]')
        if (susItems.length) {
          gsap.set(susItems, { y: 50, opacity: 0 })
          const susTl = gsap.timeline({ paused: true })
          susTl.to(susItems, {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.2,
          })
          ScrollTrigger.create({
            trigger: section8,
            start: 'top 80%',
            onEnter: () => susTl.play(),
            onLeaveBack: () => susTl.reverse(),
          })
        }
      }

      const section9 = section9Ref.current
      if (section9) {
        const s9Label = section9.querySelector('[data-section-label]')
        if (s9Label) {
          gsap.set(s9Label, { y: 20, opacity: 0 })
          ScrollTrigger.create({
            trigger: section9,
            start: 'top 85%',
            onEnter: () =>
              gsap.to(s9Label, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
              }),
            onLeaveBack: () =>
              gsap.to(s9Label, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
              }),
          })
        }

        const partnerLogos = section9.querySelectorAll('[data-partner-logo]')
        gsap.set(partnerLogos, { autoAlpha: 0, y: 50, x: 25, rotation: 6 })

        const partnersTl = gsap.timeline({ paused: true })
        partnerLogos.forEach((logo, i) => {
          partnersTl.to(
            logo,
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              rotation: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            i * 0.1
          )
        })

        ScrollTrigger.create({
          trigger: section9,
          start: 'top 50%',
          onEnter: () => partnersTl.play(),
          onLeaveBack: () => partnersTl.reverse(),
        })
      }
    })

    return () => ctx.revert()
  }, [showIntro])

  return (
    <main className="relative overflow-x-hidden">
      <div
        className="absolute top-[15.5vh] left-1/2 -translate-x-1/2 text-center pointer-events-none"
        data-hero-tagline
      >
        <h1 className="text-[3vw] text-black-100 font-[500] leading-[1.12] uppercase mb-[0.4em]">
          {t('home.section_1_title_1')}
          <br />
          {t('home.section_1_title_2')}
        </h1>
        <p className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase">
          {t('home.section_1_label')}
        </p>
      </div>

      <section
        ref={section1Ref}
        className={`relative w-full h-screen ${showIntro ? 'invisible' : 'visible'}`}
      >
        <div
          className="absolute bottom-0 left-[34.333vw] w-[31.333vw] aspect-square overflow-hidden"
          data-collage-bg
        >
          <Image
            src="/assets/img-1.webp"
            alt="Atrium"
            width={1920}
            height={1194}
            className="w-full h-full object-cover"
            loading="eager"
            priority
          />
        </div>

        {COLLAGE_REST.map((img, i) => (
          <div
            key={i}
            className={`absolute aspect-square overflow-hidden ${img.className}`}
            data-collage-item
          >
            <Image
              src={img.src}
              alt="Atrium"
              width={img.w}
              height={img.h}
              className="w-full h-full object-cover"
              loading="eager"
              priority
            />
          </div>
        ))}

        <div
          className={`absolute invisible ${IMG9.className}`}
          style={{ aspectRatio: `${IMG9.w}/${IMG9.h}` }}
          data-img9-position
        />
      </section>

      <section ref={section2Ref} className="pt-[6%]">
        <div
          ref={img9Ref}
          className="relative flex items-center overflow-hidden opacity-0 z-20"
        >
          <Image
            src={IMG9.src}
            alt="Atrium"
            width={IMG9.w}
            height={IMG9.h}
            className="w-full flex-shrink-0"
            sizes="100vw"
            loading="eager"
            priority
          />
        </div>

        <div className="max-w-[75vw] mt-[5%] mx-auto" data-text-reveal>
          <p
            className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase mb-[1.8%]"
            data-section-label
          >
            {t('home.section_2_label')}
          </p>
          <h2
            className="text-[4vw] text-black-100 font-[500] leading-[1.1] uppercase ml-[-0.2vw]"
            data-s2-title
          >
            {t('home.section_2_title_1')}
          </h2>
          <h2
            className="text-[4vw] text-black-100 font-[500] leading-[1.1] uppercase ml-[-0.2vw]"
            data-s2-title
          >
            {t('home.section_2_title_2')}
          </h2>
          <p
            className="text-[2vw] text-black-100 leading-[1.5] mt-[5%]"
            data-s2-hero-text
          >
            {t('home.section_2_text_1')}
          </p>
        </div>

        <div
          className="flex justify-center gap-[1.5vw] mt-[6%] mb-[12%]"
          data-s2-cta-row
        >
          <Button as={Link} href="/references">
            {t('home.section_2_cta_1')}
          </Button>
          <Button>{t('home.section_2_cta_2')}</Button>
          <Button as={Link} href="/production">
            {t('home.section_2_cta_3')}
          </Button>
        </div>
      </section>

      <section ref={section3Ref} className="mb-[12%]">
        <div className="flex flex-col items-center text-center">
          <p
            className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase mb-[1.8%]"
            data-s3-label
          >
            {t('home.section_4_label')}
          </p>
          <h2
            className="text-[2.8vw] text-black-100 font-[500] leading-[1.25] uppercase max-w-[60vw] mb-[2%]"
            data-s3-title
          >
            {t('home.section_3_title')}
          </h2>
          <p
            className="text-[1.3vw] text-black-100/70 font-[450] mb-[5%]"
            data-s3-subtitle
          >
            {t('home.section_3_text')}
          </p>
          <div
            className="relative overflow-hidden w-[35vw] aspect-[4/5]"
            data-s3-image
          >
            <Image
              src="/assets/img-11.webp"
              alt={t('home.section_3_title')}
              width={960}
              height={1200}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="text-[1.1vw] text-black-100 font-[450] leading-[1.85] text-left w-[35vw] mt-[5%]"
            data-s3-body
          >
            <p>{t.rich('home.section_2_text_2', { br: () => <br /> })}</p>
            <p className="mt-[1.5em]">
              {t.rich('home.section_2_text_3', { br: () => <br /> })}
            </p>
          </div>
        </div>
      </section>

      <section ref={section4Ref} className="mb-[12%]">
        <div className="flex justify-center gap-[1.5vw]">
          {FEATURED_PROJECTS.map((project, i) => {
            const isLarge = i % 2 === 0
            const w = isLarge ? '25vw' : '20vw'
            return (
              <Link
                key={project.slug}
                href={{
                  pathname: '/references/[slug]',
                  params: { slug: project.slug },
                }}
                className="group shrink-0"
                style={{ width: w }}
                data-project-item
              >
                <div
                  className="relative overflow-hidden aspect-[960/1294]"
                  style={{ width: w }}
                >
                  <Image
                    src={project.image}
                    alt={t(`home.section_4_project_${i + 1}`)}
                    width={960}
                    height={1294}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-black-100/0 transition-colors duration-500 group-hover:bg-black-100/20" />
                </div>

                <p className="text-[1vw] text-black-100 font-[550] leading-[1.3] uppercase mt-[1em]">
                  {t(`home.section_4_project_${i + 1}`)}
                </p>
                <p className="text-[0.82vw] text-black-100/60 font-[450] uppercase mt-[1%]">
                  {t(`references.sector_${project.sector}`)}
                </p>
              </Link>
            )
          })}
        </div>

        {/* <div className="flex justify-center mt-[6%]" data-project-link>
          <Link
            href="/references"
            className="relative text-[1vw] text-black-100 font-[550] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-black-100 after:origin-left after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-right hover:after:scale-x-0"
          >
            {t('home.section_4_cta')}
          </Link>
        </div> */}
      </section>

      <section ref={section5Ref} className="mb-[12%]">
        <p
          className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase text-center mb-[3.5%]"
          data-section-label
        >
          {t('home.section_5_label')}
        </p>
        <div>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n}>
              <div className="grid grid-cols-[6vw_1fr] items-start gap-[2.5vw] border-t border-black-100/8 first:border-t-0 py-[2.5%] pl-[23.25vw] pr-[12vw]">
                <span
                  className="text-[3.4vw] text-black-100/10 font-[500] leading-none"
                  data-pillar-num
                >
                  {String(n).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <h3
                    className="text-[1.2vw] text-black-100 font-[550] leading-[1.2] uppercase pt-[0.5%]"
                    data-pillar-title
                  >
                    {t(`home.section_5_pillar_${n}_title`)}
                  </h3>
                  <p
                    className="text-[1.05vw] text-black-100/70 font-[450] leading-[1.85] max-w-[38vw] mt-[2%]"
                    data-pillar-text
                  >
                    {t(`home.section_5_pillar_${n}_text`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={section6Ref}
        className="bg-black-100 py-[10%] mb-[12%] mx-[1.5vw]"
      >
        <div className="max-w-[75vw] mx-auto">
          <p
            className="text-[0.95vw] text-white-100/90 font-[600] tracking-[0.15em] uppercase mb-[1.8%]"
            data-production-label
          >
            {t('home.section_6_label')}
          </p>
          <h2
            className="text-[4vw] text-white-100 font-[500] leading-[1.1] uppercase"
            data-production-title
          >
            {t('home.section_6_title')}
          </h2>
          <p
            className="text-[1.1vw] text-white-100/70 font-[450] leading-[1.85] max-w-[56vw] mt-[2.5%]"
            data-production-text
          >
            {t('home.section_6_text')}
          </p>
          <div className="mt-[5%]" data-production-btn>
            <Button as={Link} href="/production" variant="light">
              {t('home.section_6_cta')}
            </Button>
          </div>
        </div>
      </section>

      <section ref={section7Ref} className="mb-[14%]">
        <div className="max-w-[75vw] mx-auto">
          <h2
            className="text-[2.8vw] text-black-100 font-[500] leading-[1.2] uppercase ml-[-0.2vw]"
            data-design-title
          >
            {t('home.section_7_title')}
          </h2>
          <p
            className="text-[1.1vw] text-black-100/70 font-[450] leading-[1.85] mt-[1.8%]"
            data-design-text
          >
            {t('home.section_7_text')}
          </p>

          <div
            className="grid grid-cols-2 gap-[1.5vw] mt-[5%]"
            data-design-options
          >
            <Link href="/design-your-space" className="group block">
              <div className="overflow-hidden aspect-[4/3]">
                <Image
                  src="/assets/img-18.webp"
                  alt={t('home.section_7_option_1')}
                  width={960}
                  height={720}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="text-[1.2vw] text-black-100 font-[550] leading-[1.2] uppercase mt-[4%]">
                {t('home.section_7_option_1')}
              </h3>
              <p className="text-[1.05vw] text-black-100/70 font-[450] leading-[1.85] mt-[1.5%]">
                {t('home.section_7_option_1_text')}
              </p>
            </Link>

            <Link href="/design-your-space" className="group block">
              <div className="overflow-hidden aspect-[4/3]">
                <Image
                  src="/assets/img-19.webp"
                  alt={t('home.section_7_option_2')}
                  width={960}
                  height={720}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="text-[1.2vw] text-black-100 font-[550] leading-[1.2] uppercase mt-[4%]">
                {t('home.section_7_option_2')}
              </h3>
              <p className="text-[1.05vw] text-black-100/70 font-[450] leading-[1.85] mt-[1.5%]">
                {t('home.section_7_option_2_text')}
              </p>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-[1.5vw] mt-[6%]" data-design-btn>
            <div className="flex justify-end">
              <Button as={Link} href="/design-your-space">
                {t('home.section_7_cta_1')}
              </Button>
            </div>
            <div>
              <Button as={Link} href="/design-your-space">
                {t('home.section_7_cta_2')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section ref={section8Ref} className="bg-beige-100 py-[8%] mb-[14%]">
        <div className="text-center max-w-[60vw] mx-auto">
          <h2
            className="text-[2.8vw] text-black-100 font-[500] leading-[1.25] uppercase mb-[2%]"
            data-sus-item
          >
            {t('home.section_8_title_1')}
          </h2>
          <p
            className="text-[1.3vw] text-black-100/70 font-[450] mb-[2.5%]"
            data-sus-item
          >
            {t('home.section_8_text_1')}
          </p>
          <p
            className="text-[1.05vw] text-black-100/70 font-[450] leading-[1.85] max-w-[43vw] mx-auto"
            data-sus-item
          >
            {t.rich('home.section_8_text_2', { br: () => <br /> })}
          </p>
        </div>
      </section>

      <section ref={section9Ref} className="mb-[14%]">
        <p
          className="text-[0.95vw] text-black-100 font-[600] tracking-[0.15em] uppercase text-center mb-[5%]"
          data-section-label
        >
          {t('home.section_9_label')}
        </p>
        <div className="grid grid-cols-6 gap-y-[4.5vw] gap-x-[3.5vw] max-w-[75vw] mx-auto">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-[3.5vw]"
              data-partner-logo
            >
              <Image
                src={`/assets/logo-${i + 1}.webp`}
                alt={`Partner ${i + 1}`}
                width={160}
                height={60}
                className="w-auto max-h-full object-contain opacity-50 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {showIntro && <IntroAnimation onComplete={completeIntro} />}
    </main>
  )
}

export default Home
