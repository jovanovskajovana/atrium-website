import { useTranslations } from 'next-intl'

import AtriumLogoFull from '@/components/icons/atrium-logo-full'

import { Link } from '@/i18n/navigation'

const Footer = () => {
  const t = useTranslations('footer')

  return (
    <footer className="px-[3vw] pt-[6vh] pb-[5vh] border-t border-black-100/10">
      <div className="grid grid-cols-[1.1fr_1.9fr] gap-[7vw]">
        <div className="flex flex-col justify-between min-h-[16vw]">
          <div>
            <AtriumLogoFull className="w-[13vw] h-auto" />
            <p className="text-[0.84vw] leading-[1.7] text-black-100/55 mt-[6%]">
              {t('quote')}
            </p>
          </div>

          <div>
            <p className="text-[0.74vw] text-black-100/45">
              &copy; {new Date().getFullYear()} Atrium d.o.o. {t('rights')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[5vw]">
          <div className="space-y-[2.2vw]">
            <div>
              <p className="text-[0.72vw] lowercase tracking-[0.13em] text-black-100/35 mb-[0.8vw]">
                {t('contact_title')}
              </p>
              <p className="text-[0.84vw] leading-[1.75] text-black-100/65">
                {t('contact_email')}
              </p>
              <p className="text-[0.84vw] leading-[1.75] text-black-100/65">
                {t('contact_phone')}
              </p>
            </div>

            <div>
              <p className="text-[0.72vw] lowercase tracking-[0.13em] text-black-100/35 mb-[0.8vw]">
                {t('address_title')}
              </p>
              <p className="text-[0.84vw] leading-[1.75] text-black-100/65">
                {t('address_line_1')}
              </p>
              <p className="text-[0.84vw] leading-[1.75] text-black-100/65">
                {t('address_line_2')}
              </p>
              <p className="text-[0.84vw] leading-[1.75] text-black-100/65">
                {t('address_line_3')}
              </p>
            </div>

            <div>
              <p className="text-[0.72vw] lowercase tracking-[0.13em] text-black-100/35 mb-[0.8vw]">
                {t('hours_title')}
              </p>
              <p className="text-[0.84vw] leading-[1.75] text-black-100/65">
                {t('hours_weekdays')}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[0.72vw] lowercase tracking-[0.13em] text-black-100/35 mb-[0.8vw]">
              {t('navigation_title')}
            </p>
            <ul className="space-y-[0.4vw]">
              <li>
                <Link
                  href="/"
                  className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                >
                  {t('home_label')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                >
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/references"
                  className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                >
                  {t('nav_references')}
                </Link>
              </li>
              <li>
                <Link
                  href="/production"
                  className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                >
                  {t('nav_production')}
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                >
                  {t('nav_news')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                >
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-[2.2vw]">
            <div>
              <p className="text-[0.72vw] lowercase tracking-[0.13em] text-black-100/35 mb-[0.8vw]">
                {t('legal_title')}
              </p>
              <ul className="space-y-[0.4vw]">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                  >
                    {t('privacy_notice_label')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                  >
                    {t('cookie_policy_label')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-use"
                    className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                  >
                    {t('terms_of_use_label')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[0.72vw] lowercase tracking-[0.13em] text-black-100/35 mb-[0.8vw]">
                {t('follow_title')}
              </p>
              <ul className="space-y-[0.4vw]">
                <li>
                  <a
                    href={t('instagram_url')}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                  >
                    {t('instagram_label')}
                  </a>
                </li>
                <li>
                  <a
                    href={t('facebook_url')}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                  >
                    {t('facebook_label')}
                  </a>
                </li>
                <li>
                  <a
                    href={t('linkedin_url')}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.84vw] lowercase text-black-100/65 hover:text-black-100 transition-colors"
                  >
                    {t('linkedin_label')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
