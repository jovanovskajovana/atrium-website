export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/references', key: 'references' },
  { href: '/production', key: 'production' },
  { href: '/news', key: 'news' },
  { href: '/careers', key: 'careers' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const

export const LOCALE_LABELS: Record<string, string> = {
  en: 'english',
  de: 'deutsch',
  sl: 'slovenščina',
}
