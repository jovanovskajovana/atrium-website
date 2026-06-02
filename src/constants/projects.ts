import { Project } from '@/interfaces/project'

export const PROJECT_ASPECT = 1294 / 960
export const PROJECT_LARGE_W = 22.5
export const PROJECT_SMALL_W = 11.25
export const PROJECT_OFFSET = `${(PROJECT_SMALL_W * PROJECT_ASPECT).toFixed(2)}vw`

export const PROJECT_LAYOUT = [
  { size: 'lg', offset: false, labelAbove: false },
  { size: 'sm', offset: false, labelAbove: false },
  { size: 'sm', offset: true, labelAbove: false },
  { size: 'lg', offset: true, labelAbove: true },
] as const

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: 'boutique-hotel',
    image: '/assets/img-5.webp',
    sector: 'residential',
  },
  {
    slug: 'hotel-lobby',
    image: '/assets/img-2.webp',
    sector: 'hospitality',
  },
  {
    slug: 'executive-office',
    image: '/assets/img-12.webp',
    sector: 'office',
  },
  {
    slug: 'restaurant-interior',
    image: '/assets/img-7.webp',
    sector: 'hospitality',
  },
  {
    slug: 'wellness-center',
    image: '/assets/img-25.webp',
    sector: 'hospitality',
  },
  {
    slug: 'penthouse-suite',
    image: '/assets/img-15.webp',
    sector: 'residential',
  },
  {
    slug: 'corporate-lounge',
    image: '/assets/img-3.webp',
    sector: 'office',
  },
  {
    slug: 'design-studio',
    image: '/assets/img-10.webp',
    sector: 'office',
  },
  {
    slug: 'private-residence',
    image: '/assets/img-11.webp',
    sector: 'residential',
  },
  {
    slug: 'luxury-apartment',
    image: '/assets/img-14.webp',
    sector: 'residential',
  },
  {
    slug: 'urban-loft',
    image: '/assets/img-26.webp',
    sector: 'residential',
  },
  {
    slug: 'conference-hall',
    image: '/assets/img-4.webp',
    sector: 'office',
  },
]

export const PROJECTS: Project[] = [
  {
    slug: 'restaurant-interior',
    image: '/assets/img-7.webp',
    sector: 'hospitality',
  },
  {
    slug: 'boutique-hotel',
    image: '/assets/img-5.webp',
    sector: 'residential',
  },
  {
    slug: 'penthouse-suite',
    image: '/assets/img-15.webp',
    sector: 'residential',
  },
  {
    slug: 'private-residence',
    image: '/assets/img-11.webp',
    sector: 'residential',
  },
  {
    slug: 'hotel-lobby',
    image: '/assets/img-2.webp',
    sector: 'hospitality',
  },
  {
    slug: 'executive-office',
    image: '/assets/img-12.webp',
    sector: 'office',
  },
  {
    slug: 'design-studio',
    image: '/assets/img-10.webp',
    sector: 'office',
  },
  {
    slug: 'corporate-lounge',
    image: '/assets/img-3.webp',
    sector: 'office',
  },
  {
    slug: 'luxury-apartment',
    image: '/assets/img-14.webp',
    sector: 'residential',
  },
  {
    slug: 'wellness-center',
    image: '/assets/img-25.webp',
    sector: 'hospitality',
  },
  {
    slug: 'urban-loft',
    image: '/assets/img-26.webp',
    sector: 'residential',
  },
  {
    slug: 'conference-hall',
    image: '/assets/img-4.webp',
    sector: 'office',
  },
]
