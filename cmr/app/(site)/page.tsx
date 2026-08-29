import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/AboutSection'
import { getHeroSlides, getAllProjects, getGalleryItems, getAwards, getPageMetadata } from '@/lib/wordpress'

const defaultMetadata: Metadata = {
  title: 'CMR Developers Kerala | Luxury Villa Builders in Kannur & Ernakulam — Since 2012',
  description: 'Build your dream villa in Kerala with CMR Developers — 600+ luxury villas delivered across Kannur, Ernakulam & Kottayam. Vastu-compliant, bank-approved. Trusted by NRI families since 2012. Explore projects & book a site visit.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/',
  },
  openGraph: {
    title: 'CMR Developers Kerala | Luxury Villa Builders in Kannur & Ernakulam — Since 2012',
    description: 'Build your dream villa in Kerala with CMR Developers — 600+ luxury villas delivered across Kannur, Ernakulam & Kottayam. Vastu-compliant, bank-approved. Trusted by NRI families since 2012.',
    url: 'https://www.cmrdevelopers.com/',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — Premium Luxury Villas in Kerala',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMR Developers Kerala | Luxury Villa Builders in Kannur & Ernakulam — Since 2012',
    description: 'Build your dream villa in Kerala with CMR Developers — 600+ luxury villas delivered across Kannur, Ernakulam & Kottayam. Vastu-compliant, bank-approved.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('home', defaultMetadata)
}

// Lazy load below-the-fold components
const LifecycleHighlight = dynamic(() => import('@/components/sections/LifecycleHighlight'))
const Philosophy = dynamic(() => import('@/components/sections/Philosophy'))
const ProjectsGrid = dynamic(() => import('@/components/sections/ProjectsGrid'))
const CelebratingSection = dynamic(() => import('@/components/sections/CelebratingSection'))
const Gallery = dynamic(() => import('@/components/sections/Gallery'))
const Awards = dynamic(() => import('@/components/sections/Awards'))
const FooterCTA = dynamic(() => import('@/components/sections/FooterCTA'))

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.cmrdevelopers.com/#organization',
      'name': 'CMR Developers',
      'url': 'https://www.cmrdevelopers.com',
      'logo': 'https://www.cmrdevelopers.com/logo.png',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-9206838383',
        'contactType': 'sales',
        'email': 'info@cmrdevelopers.com',
        'areaServed': 'IN',
        'availableLanguage': ['en', 'ml']
      },
      'sameAs': [
        'https://www.facebook.com/cmrdeveloperspvtltd',
        'https://www.instagram.com/cmrvillaproject/',
        'https://www.youtube.com/channel/UCEfYEItWDu0KTEsLblmnAyA',
        'https://www.linkedin.com/company/cmrdevelopers'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.cmrdevelopers.com/#website',
      'url': 'https://www.cmrdevelopers.com',
      'name': 'CMR Developers',
      'publisher': {
        '@id': 'https://www.cmrdevelopers.com/#organization'
      }
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.cmrdevelopers.com/#localbusiness',
      'name': 'CMR Developers',
      'image': 'https://www.cmrdevelopers.com/images/extracted/cmr-interior-living.jpg',
      'telephone': '+91-9206838383',
      'email': 'info@cmrdevelopers.com',
      'priceRange': '$$$',
      'paymentAccepted': 'Cash, Cheque, Bank Transfer',
      'sameAs': [
        'https://www.facebook.com/cmrdeveloperspvtltd',
        'https://www.instagram.com/cmrvillaproject/',
        'https://www.youtube.com/channel/UCEfYEItWDu0KTEsLblmnAyA',
        'https://www.linkedin.com/company/cmrdevelopers'
      ],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Union Complex, 2nd Floor, South Bazar, Near Kannur–Taliparamba Highway',
        'addressLocality': 'Kannur',
        'addressRegion': 'Kerala',
        'postalCode': '670001',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 11.8762,
        'longitude': 75.3738
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '09:00',
        'closes': '21:00'
      }
    }
  ]
}

export default async function Home() {
  // Fetch hero slides — falls back to static images if not connected
  let heroSlides = undefined
  try {
    const data = await getHeroSlides()
    if (data?.length) heroSlides = data
  } catch {
    // Hero will use fallback static slides
  }

  // Fetch projects, gallery items, and awards from WordPress
  let projects = undefined
  let galleryItems = undefined
  let awardsData = undefined
  try {
    const [projectsRes, galleryRes, awardsRes] = await Promise.all([
      getAllProjects(),
      getGalleryItems(),
      getAwards(),
    ])
    if (projectsRes?.length) projects = projectsRes
    if (galleryRes?.length) galleryItems = galleryRes
    if (awardsRes?.length) awardsData = awardsRes
  } catch {
    // Components will use fallback static data
  }

  // First hero image — prefer WordPress slide with valid image, fall back to static
  const validSlides = heroSlides?.filter((slide: { image?: string }) => slide && slide.image && slide.image.trim() !== '')
  const firstHeroImage = validSlides?.[0]?.image || '/images/slide/cmrslide1.webp'

  return (
    <>
      {/* Preload the LCP hero image so it's discoverable before JS runs */}
      <link
        rel="preload"
        as="image"
        href={firstHeroImage}
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero slides={heroSlides} />
      <AboutSection />
      <LifecycleHighlight />
      <Philosophy />
      <ProjectsGrid initialProjects={projects} />
      <CelebratingSection />
      <Gallery initialItems={galleryItems} />
      {/* <Awards initialAwards={awardsData} /> */}
      <FooterCTA />
    </>
  )
}
