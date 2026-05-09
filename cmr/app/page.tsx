import dynamic from 'next/dynamic'
import Hero             from '@/components/sections/Hero'
import AboutSection     from '@/components/sections/AboutSection'

// Lazy load below-the-fold components
const LifecycleHighlight = dynamic(() => import('@/components/sections/LifecycleHighlight'))
const Philosophy        = dynamic(() => import('@/components/sections/Philosophy'))
const ProjectsGrid      = dynamic(() => import('@/components/sections/ProjectsGrid'))
const CelebratingSection = dynamic(() => import('@/components/sections/CelebratingSection'))
const Gallery           = dynamic(() => import('@/components/sections/Gallery'))
const Awards            = dynamic(() => import('@/components/sections/Awards'))
const FooterCTA         = dynamic(() => import('@/components/sections/FooterCTA'))

export default function Home() {
  return (
    <>
      <Hero />
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
