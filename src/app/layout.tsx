import { ReactNode } from 'react'

import '@/styles/globals.css'

import { LenisProvider } from '@/components/LenisProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="en" className="lenis">
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
