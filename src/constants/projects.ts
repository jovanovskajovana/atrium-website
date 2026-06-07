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

export const FEATURED_PROJECTS: Pick<Project, 'slug' | 'image' | 'sector'>[] = [
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
    architect: 'Studio Atrium',
    location: 'Ljubljana, Slovenia',
    year: 2023,
    client: 'Gostilna Mesto d.o.o.',
    gallery: [
      '/assets/img-7.webp',
      '/assets/img-8.webp',
      '/assets/img-6.webp',
      '/assets/img-20.webp',
    ],
  },
  {
    slug: 'boutique-hotel',
    image: '/assets/img-5.webp',
    sector: 'residential',
    architect: 'Atelier Šmid',
    location: 'Bled, Slovenia',
    year: 2022,
    client: 'Hotel Vila Bled',
    gallery: [
      '/assets/img-5.webp',
      '/assets/img-1.webp',
      '/assets/img-22.webp',
      '/assets/img-9.webp',
    ],
  },
  {
    slug: 'penthouse-suite',
    image: '/assets/img-15.webp',
    sector: 'residential',
    architect: 'Studio Atrium',
    location: 'Vienna, Austria',
    year: 2024,
    client: 'Private commission',
    gallery: [
      '/assets/img-15.webp',
      '/assets/img-11.webp',
      '/assets/img-14.webp',
      '/assets/img-21.webp',
    ],
  },
  {
    slug: 'private-residence',
    image: '/assets/img-11.webp',
    sector: 'residential',
    architect: 'Biro Kvadrat',
    location: 'Maribor, Slovenia',
    year: 2023,
    client: 'Private commission',
    gallery: [
      '/assets/img-11.webp',
      '/assets/img-14.webp',
      '/assets/img-15.webp',
      '/assets/img-23.webp',
    ],
  },
  {
    slug: 'hotel-lobby',
    image: '/assets/img-2.webp',
    sector: 'hospitality',
    architect: 'Studio Atrium',
    location: 'Zagreb, Croatia',
    year: 2022,
    client: 'Esplanade Group',
    gallery: [
      '/assets/img-2.webp',
      '/assets/img-1.webp',
      '/assets/img-3.webp',
      '/assets/img-24.webp',
    ],
  },
  {
    slug: 'executive-office',
    image: '/assets/img-12.webp',
    sector: 'office',
    architect: 'Werkraum Architekten',
    location: 'Munich, Germany',
    year: 2024,
    client: 'Helios AG',
    gallery: [
      '/assets/img-12.webp',
      '/assets/img-3.webp',
      '/assets/img-10.webp',
      '/assets/img-18.webp',
    ],
  },
  {
    slug: 'design-studio',
    image: '/assets/img-10.webp',
    sector: 'office',
    architect: 'Studio Atrium',
    location: 'Ljubljana, Slovenia',
    year: 2023,
    client: 'Forma Studio',
    gallery: [
      '/assets/img-10.webp',
      '/assets/img-18.webp',
      '/assets/img-19.webp',
      '/assets/img-12.webp',
    ],
  },
  {
    slug: 'corporate-lounge',
    image: '/assets/img-3.webp',
    sector: 'office',
    architect: 'Werkraum Architekten',
    location: 'Graz, Austria',
    year: 2022,
    client: 'Steiermark Invest',
    gallery: [
      '/assets/img-3.webp',
      '/assets/img-4.webp',
      '/assets/img-24.webp',
      '/assets/img-18.webp',
    ],
  },
  {
    slug: 'luxury-apartment',
    image: '/assets/img-14.webp',
    sector: 'residential',
    architect: 'Atelier Šmid',
    location: 'Trieste, Italy',
    year: 2024,
    client: 'Private commission',
    gallery: [
      '/assets/img-14.webp',
      '/assets/img-15.webp',
      '/assets/img-11.webp',
      '/assets/img-21.webp',
    ],
  },
  {
    slug: 'wellness-center',
    image: '/assets/img-25.webp',
    sector: 'hospitality',
    architect: 'Studio Atrium',
    location: 'Rogaška Slatina, Slovenia',
    year: 2023,
    client: 'Terme Rogaška',
    gallery: [
      '/assets/img-25.webp',
      '/assets/img-26.webp',
      '/assets/img-22.webp',
      '/assets/img-6.webp',
    ],
  },
  {
    slug: 'urban-loft',
    image: '/assets/img-26.webp',
    sector: 'residential',
    architect: 'Biro Kvadrat',
    location: 'Ljubljana, Slovenia',
    year: 2024,
    client: 'Private commission',
    gallery: [
      '/assets/img-26.webp',
      '/assets/img-23.webp',
      '/assets/img-20.webp',
      '/assets/img-9.webp',
    ],
  },
  {
    slug: 'conference-hall',
    image: '/assets/img-4.webp',
    sector: 'office',
    architect: 'Werkraum Architekten',
    location: 'Portorož, Slovenia',
    year: 2022,
    client: 'Kongresni Center',
    gallery: [
      '/assets/img-4.webp',
      '/assets/img-3.webp',
      '/assets/img-24.webp',
      '/assets/img-1.webp',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
