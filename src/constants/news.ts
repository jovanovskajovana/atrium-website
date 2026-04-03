import type { NewsArticle } from '@/interfaces/news'

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'showroom-opening-maribor',
    image: '/assets/news-img-1.webp',
    date: '2026-03-01',
  },
  {
    slug: 'eu-production-standards',
    image: '/assets/news-img-2.webp',
    date: '2026-02-14',
  },
  {
    slug: 'sustainable-sourcing-2025',
    image: '/assets/news-img-3.webp',
    date: '2026-01-22',
  },
  {
    slug: 'manufacturing-capacity-expansion',
    image: '/assets/news-img-4.webp',
    date: '2025-12-08',
  },
  {
    slug: 'hospitality-partnership',
    image: '/assets/news-img-5.webp',
    date: '2025-11-19',
  },
  {
    slug: 'design-week-presence',
    image: '/assets/news-img-6.webp',
    date: '2025-10-05',
  },
  {
    slug: 'craftsmanship-recognition',
    image: '/assets/news-img-7.webp',
    date: '2025-09-12',
  },
  {
    slug: 'engineering-team-growth',
    image: '/assets/news-img-8.webp',
    date: '2025-08-28',
  },
  {
    slug: 'export-network-update',
    image: '/assets/news-img-9.webp',
    date: '2025-07-16',
  },
]

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug)
}
