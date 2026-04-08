import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { getJobListingBySlug } from '@/constants/careers'

interface JobListingPageProps {
  params: Promise<{ locale: string; slug: string }>
}

const JobListingPage = async ({ params }: JobListingPageProps) => {
  const { slug } = await params
  const listing = getJobListingBySlug(slug)

  if (!listing) notFound()

  const t = await getTranslations()
  const { key, roleIndex, sections } = listing
  const prefix = `careers.listings.${key}`

  return (
    <main className="overflow-x-hidden">
      <section className="pt-[18.5vh] pb-[6%]">
        <div className="max-w-[75vw] mx-auto">
          <Link
            href="/careers"
            className="inline-block text-[0.72vw] uppercase tracking-[0.14em] text-black-100/45 hover:text-black-100 transition-colors duration-300 mb-[2.5em]"
          >
            ← {t('careers.listings.back_to_careers')}
          </Link>

          <h1 className="text-[2.8vw] font-[450] text-black-100 leading-[1.08] tracking-[0.02em]">
            {t(`careers.section_4_role_${roleIndex}_title`)}
          </h1>
          <p className="mt-[1.2vw] text-[0.92vw] text-black-100/55">
            &#9679; {t(`${prefix}.subtitle`)}
          </p>
        </div>
      </section>

      <section className="pb-[8%]">
        <div className="max-w-[75vw] mx-auto border-t border-black-100/10 pt-[4%] space-y-[4vw]">
          <div>
            <h2 className="text-[0.92vw] font-[500] text-black-100 mb-[1.5vw]">
              {t(`${prefix}.description_title`)}
            </h2>
            <ul className="space-y-[0.6vw]">
              {Array.from({ length: sections.description }, (_, i) => (
                <li
                  key={i}
                  className="text-[0.82vw] text-black-100/70 leading-[1.75] pl-[1.4vw] relative before:content-['•'] before:absolute before:left-0 before:text-black-100/30"
                >
                  {t(`${prefix}.description_${i + 1}`)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.92vw] font-[500] text-black-100 mb-[1.5vw]">
              {t(`${prefix}.requirements_title`)}
            </h2>
            <ul className="space-y-[0.6vw]">
              {Array.from({ length: sections.requirements }, (_, i) => (
                <li
                  key={i}
                  className="text-[0.82vw] text-black-100/70 leading-[1.75] pl-[1.4vw] relative before:content-['•'] before:absolute before:left-0 before:text-black-100/30"
                >
                  {t(`${prefix}.requirements_${i + 1}`)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.92vw] font-[500] text-black-100 mb-[1.5vw]">
              {t(`${prefix}.offer_title`)}
            </h2>
            <ul className="space-y-[0.6vw]">
              {Array.from({ length: sections.offer }, (_, i) => (
                <li
                  key={i}
                  className="text-[0.82vw] text-black-100/70 leading-[1.75] pl-[1.4vw] relative before:content-['•'] before:absolute before:left-0 before:text-black-100/30"
                >
                  {t(`${prefix}.offer_${i + 1}`)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.92vw] font-[500] text-black-100 mb-[1vw]">
              {t(`${prefix}.location_title`)}
            </h2>
            <p className="text-[0.82vw] text-black-100/70 leading-[1.75]">
              {t(`${prefix}.location_text`)}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-[12%]">
        <div className="max-w-[75vw] mx-auto">
          <div className="mb-[4vw]">
            <h2 className="text-[2.2vw] font-[450] text-black-100 leading-[1.2] uppercase tracking-[0.03em]">
              {t('careers.listings.apply_title')}
            </h2>
            <p className="mt-[0.6vw] text-[0.82vw] text-black-100/40 italic">
              {t('careers.listings.form_label')}
            </p>
          </div>

          <form className="bg-beige-100 px-[4vw] py-[3.5vw]">
            <div className="grid grid-cols-2 gap-x-[4vw] gap-y-[3.2vw]">
              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_firstname')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_lastname')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_email')}
                </span>
                <input
                  type="email"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_phone')}
                </span>
                <input
                  type="tel"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_dob')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_location')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_education')}
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors"
                />
              </label>
              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_attachment')}
                </span>
                <input
                  type="file"
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100/50 outline-none focus:border-black-100/40 transition-colors file:mr-[1vw] file:border-0 file:bg-transparent file:text-black-100/60 file:text-[0.72vw] file:cursor-pointer file:font-[500]"
                />
              </label>
            </div>

            <div className="mt-[3.2vw]">
              <label className="block">
                <span className="block text-[0.78vw] font-[500] text-black-100 mb-[0.8vw]">
                  {t('careers.listings.form_message')}
                </span>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border border-black-100/15 px-[1vw] py-[0.65vw] text-[0.78vw] text-black-100 outline-none focus:border-black-100/40 transition-colors resize-none"
                />
              </label>
            </div>

            <div className="mt-[3vw] flex justify-end">
              <button
                type="button"
                className="group relative inline-flex items-center justify-center text-[0.8vw] border border-black-100 h-[3.3vw] px-[2vw] overflow-hidden"
              >
                <span className="absolute inset-0 bg-black-100 translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
                <span className="relative text-black-100 transition-colors duration-500 ease-in-out group-hover:text-white-100">
                  {t('careers.listings.form_submit')}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default JobListingPage
