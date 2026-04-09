import { FC, ReactNode } from 'react'
import { Montserrat, Caveat } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import CursorTracker from '@/components/CursorTracker'
import { LenisProvider } from '@/components/LenisProvider'

import { routing } from '@/i18n/routing'

import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-signature',
  display: 'swap',
})

export const metadata = {
  title: 'Atrium',
  description: '',
  icons: {
    icon: '/assets/favicon.ico',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface RootLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`lenis ${montserrat.variable} ${caveat.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <CursorTracker />
            <Header />
            {children}
            <Footer />
            <CookieBanner />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
