'use client'

import Image from 'next/image'

import IntroAnimation from '@/components/IntroAnimation'

import { COLLAGE_IMAGES } from '@/constants/intro-animation'

import useIntroAnimation from '@/hooks/useIntroAnimation'

const Home = () => {
  const { showIntro, completeIntro } = useIntroAnimation()

  return (
    <main>
      <section
        className={`relative h-screen w-full ${showIntro ? 'invisible' : 'visible'}`}
      >
        <div
          className="absolute inset-0 w-[60vw] m-auto h-fit"
          style={{ transform: 'translate(10vw, -18vh) scale(0.47)' }}
        >
          <Image
            src="/assets/img-1.webp"
            alt="Atrium"
            width={1920}
            height={1194}
            className="w-full"
            priority
          />
        </div>

        {COLLAGE_IMAGES.map((img, i) => (
          <div key={img.src} className={`absolute ${img.className}`}>
            <Image
              src={img.src}
              alt="Atrium"
              width={img.w}
              height={img.h}
              className="w-full h-auto"
            />
          </div>
        ))}
      </section>

      {showIntro && <IntroAnimation onComplete={completeIntro} />}
    </main>
  )
}

export default Home
