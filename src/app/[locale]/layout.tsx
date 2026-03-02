import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LenisProvider } from '@/components/LenisProvider'

import { routing } from '@/i18n/routing'

import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
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

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`lenis ${montserrat.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
