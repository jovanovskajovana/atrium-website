import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LenisProvider } from '@/components/LenisProvider'

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

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`lenis ${montserrat.variable}`}>
      <body>
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}

export default RootLayout
