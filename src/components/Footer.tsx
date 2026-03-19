import { useTranslations } from 'next-intl'

import AtriumLogoFull from '@/components/icons/atrium-logo-full'

const Footer = () => {
  const t = useTranslations('footer')

  return (
    <footer className="flex items-center justify-between px-[3vw] py-[4vh] border-t border-black-100/10">
      <AtriumLogoFull className="w-[2vw] h-auto" />
      <p className="text-[0.72vw] text-black-100/40">
        &copy; {new Date().getFullYear()} Atrium d.o.o.
      </p>
    </footer>
  )
}

export default Footer
