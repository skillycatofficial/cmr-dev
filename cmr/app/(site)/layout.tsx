import type { ReactNode } from 'react'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import PageTransition from '@/components/providers/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
