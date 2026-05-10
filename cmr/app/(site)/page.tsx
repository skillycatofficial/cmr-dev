import dynamic from 'next/dynamic'
import Hero         from '@/components/sections/Hero'
import AboutSection from '@/components/sections/AboutSection'
import { getHeroSlides } from '@/lib/sanity/queries'

// Lazy load below-the-fold components
const LifecycleHighlight = dynamic(() => import('@/components/sections/LifecycleHighlight'))
const Philosophy         = dynamic(() => import('@/components/sections/Philosophy'))
const ProjectsGrid       = dynamic(() => import('@/components/sections/ProjectsGrid'))
const CelebratingSection = dynamic(() => import('@/components/sections/CelebratingSection'))
const Gallery            = dynamic(() => import('@/components/sections/Gallery'))
const Awards             = dynamic(() => import('@/components/sections/Awards'))
const FooterCTA          = dynamic(() => import('@/components/sections/FooterCTA'))

export default async function Home() {
  // Fetch hero slides from Sanity — falls back to static images if not connected
  let heroSlides = undefined
  try {
    const data = await getHeroSlides()
    if (data?.length) heroSlides = data
  } catch {
    // Sanity not connected yet — Hero will use fallback static slides
  }

  return (
    <>
      <Hero slides={heroSlides} />
      <AboutSection />
      <LifecycleHighlight />
      <Philosophy />
      <ProjectsGrid />
      <CelebratingSection />
      <Gallery />
      <Awards />
      <FooterCTA />
    </>
  )
}
